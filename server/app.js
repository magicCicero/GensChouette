const express = require("express");
const cors = require("cors");
const multer = require("multer");
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

// Add a new endpoint to serve the SELLER_ID.
app.get("/config/seller-id", (req, res) => {
  try {
    res.json({ sellerId: SELLER_ID });
  } catch (error) {
    console.error("Error fetching Seller ID:", error);
    res.status(500).json({ error: "Failed to fetch Seller ID" });
  }
});

// Generate Checkout Session Config for Amazon Pay
app.post("/amazon-checkout-session", (req, res) => {
  const { amount } = req.body;
  
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid payment amount" });
  }

  const payload = {
    webCheckoutDetails: {
      checkoutReviewReturnUrl: CHECKOUT_REVIEW_RETURN_URL
      // checkoutResultReturnUrl: CHECKOUT_RESULT_RETURN_URL
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
    const Client = require('@amazonpay/amazon-pay-api-sdk-nodejs');
    const config = {
      publicKeyId: PUBLIC_KEY_ID,
      privateKey: PRIVATE_KEY,
      region: 'jp',
      sandbox: true
  };
  
  const testPayClient = new Client.AmazonPayClient(config);
  const signature = testPayClient.generateButtonSignature(payload);
    // const signature = crypto
    //   .createSign("RSA-SHA256")
    //   .update(payloadJSON)
    //   .sign(PRIVATE_KEY, "base64");

    console.log("PUBLIC_KEY_ID: ", PUBLIC_KEY_ID, " <---------> signature: ", signature);
    

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
