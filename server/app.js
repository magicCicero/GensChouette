const express = require("express");
const cors = require("cors");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const uuidv4 = require('uuid/v4');

const crypto = require("crypto");
const fetch = require("node-fetch");
const { sendEmailNotification } = require("./utils/emailService");
const fs = require('fs');

const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const uploadPath = "../client/public/assets/img/products";

const authRouter = require("./route/authRoute");
const proudctRouter = require("./route/productRouter");
const sellRouter = require("./route/sellRouter");

// Middlewarers
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(express.static("Data"));

app.use((req, res, next) => {
  res.header("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(authRouter);
app.use(proudctRouter);
app.use(sellRouter);

// session, cookie management
app.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: uuidv4().toString(),
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: true 
}));

// Amazon Pay Setup
require("dotenv").config();
const SELLER_ID = process.env.SELLER_ID;
const STORE_ID = process.env.STORE_ID;
const PUBLIC_KEY_ID = process.env.PUBLIC_KEY_ID;
// const PRIVATE_KEY = process.env.PRIVATE_KEY.replace(/\\n/g, "\n"); // Handle multiline private key
const PRIVATE_KEY = fs.readFileSync("./AmazonPay_SANDBOX_privatekey.pem");
const CHECKOUT_REVIEW_RETURN_URL = process.env.CHECKOUT_REVIEW_RETURN_URL;
const CHECKOUT_RESULT_RETURN_URL = process.env.CHECKOUT_RESULT_RETURN_URL;

const BASE_URL = process.env.NODE_ENV === "production"
  ? "https://api.amazonpay.jp"
  : "https://sandbox.amazonpay.jp";

// amazon pay
const AmazonPayClient = require('./utils/amazonPayClient');
const amazonPay = new AmazonPayClient();
const checkoutSessionManager = require('./utils/checkoutSessionManager');

// Add a new endpoint to serve the SELLER_ID.
app.get("/config/seller-id", (req, res) => {
  try {
    res.json({ sellerId: SELLER_ID });
  } catch (error) {
    console.error("Error fetching Seller ID:", error);
    res.status(500).json({ error: "Failed to fetch Seller ID" });
  }
});

// Generate Checkout Session Config for Amazon Pay Button Render
app.post("/amazon-checkout-session", (req, res) => {
  const { amount } = req.body;
  
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid payment amount" });
  }

  const payload = {
    webCheckoutDetails: {
      checkoutReviewReturnUrl: CHECKOUT_REVIEW_RETURN_URL
    },
    storeId: STORE_ID,
    scopes: ["name", "email", "phoneNumber", "billingAddress"],
    paymentDetails: {
      chargeAmount: {
        amount: amount, // Format to two decimal places
        currencyCode: "JPY",
      },
    },
  };

  const payloadJSON = JSON.stringify(payload);

  try {
    const signature = amazonPay.webstoreClient.generateButtonSignature(payload);
    res.json({
      payloadJSON,
      signature,
      publicKeyId: PUBLIC_KEY_ID,
    });
  } catch (error) {
    console.error("Error generating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session." });
  }
});

// getCheckoutSession
app.get("/getCheckoutSession", async (req, res) => {
  const {checkoutSessionId} = req.query;
  console.log("------- getCheckoutSession API called ----------", checkoutSessionId);

  const headers = {
    'x-amz-pay-idempotency-key': uuidv4().toString().replace(/-/g, ''),
    'x-amz-pay-date': new Date().toISOString(), // Use the correct current time
  };
  
  const response = amazonPay.webstoreClient.getCheckoutSession(checkoutSessionId, headers);
  response.then((result) => {
    console.log("reponse.data >>>>>>>>>> ", result.data);
    res.json(result.data);
  }).catch(err => {
    console.error(err);
    res.status(500);
  });
});

// updateCheckoutSession
app.get("/updateCheckoutSession", async (req, res) => {
  console.log("------------- updateCheckoutSession API called -------------------");
  const {checkoutSessionId} = req.query;
    const payload = {
        webCheckoutDetails: {
            checkoutResultReturnUrl: CHECKOUT_RESULT_RETURN_URL
        },
        paymentDetails: {
            paymentIntent: 'Authorize',
            canHandlePendingAuthorization: true,
            chargeAmount: {
                amount: 30, // should get from frontend.
                currencyCode: 'JPY'
            }
        },
        merchantMetadata: {
            merchantReferenceId: 'ORDER_12345', // should be unique for each order from your database order table
            merchantStoreName: 'Gens Chouette',
            noteToBuyer: 'Thank you for purchasing!',
            customInformation: ''
        }
    };

  try{
    const response = await amazonPay.webstoreClient.updateCheckoutSession(checkoutSessionId, payload)
    res.json(response.data)
  } catch(err) {
    console.error(err);
    res.status(500);
  };
});

// completeCheckoutSession
app.get("/completeCheckoutSession", async (req, res) => {
  console.log("------------------- completeCheckoutSession API called -----------------");
  const {checkoutSessionId} = req.query;

  const payload = {
    chargeAmount: {
        amount: 30.00,
        currencyCode: "JPY"
    }
  }
  try{
    const response = await amazonPay.webstoreClient.completeCheckoutSession(checkoutSessionId, payload);

    //saving chargePermission and ChargeId in session
    req.session.chargePermissionId = response.data.chargePermissionId;
    req.session.chargeId = response.data.chargeId;
    res.send(response.data);
  } catch(err) {
    console.error(err);
    res.status(500);
  };
    
});

// getCharge
app.get('/getCharge', async (req, res) => {
  const {chargeId} = req.query;

  try{
    const response = await amazonPay.webstoreClient.getCharge(chargeId)
    res.send(response.data);
  } catch(err){
    console.log(err);
    res.send(err.response.data);
  };
});

// Process Payment Confirmation from Amazon Pay
app.post("/process-payment", async (req, res) => {
  const { orderReferenceId, amount, productID } = req.body;

  if (!orderReferenceId) {
    return res.status(400).json({ error: "Missing orderReferenceId" });
  }

  try {
    const response = await fetch(`${BASE_URL}/v2/confirm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        AmazonOrderReferenceId: orderReferenceId,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Payment confirmed successfully:", data);
      res.json({ success: true, data });
      sendEmailNotification(orderReferenceId, amount, productID);
    } else {
      console.error("Payment confirmation failed:", data);
      res.status(500).json({ error: "Failed to confirm payment", details: data });
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ error: "An unexpected error occurred during payment confirmation" });
  }
});

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath); // Define the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Define the filename for uploaded files
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res, next) => {
  return res.json(req.file.filename);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const port = process.env.PORT || 3001;

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
