const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const uploadPath = "../client/public/assets/img/products";
const port = 3001;

const AmazonPayments = require("amazon-payments");

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

// Amazon Payment
const amazonPay = AmazonPayments.connect({
  sellerId: "MERCHANT_ID",
  mwsAccessKey: "ACCESS_KEY",
  mwsSecretKey: "SECRET_KEY",
  clientId: "Client_ID",
  region: "jp",
});

app.post("/process-payment", (req, res) => {
  const orderReferenceId = req.body.orderReferenceId;
  const amount = req.body.amount;

  amazonPay
    .setOrderReferenceDetails({
      AmazonOrderReferenceId: orderReferenceId,
      OrderReferenceAttributes: {
        OrderTotal: {
          CurrencyCode: "JPY",
          Amount: amount,
        },
      },
    })
    .then((response) => {
      return amazonPay.confirmOrderReference({
        AmazonOrderReferenceId: orderReferenceId,
      });
    })
    .then((response) => {
      return amazonPay.authorize({
        AmazonOrderReferenceId: orderReferenceId,
        AuthorizationReferenceId: "AUTH_" + new Date().getTime(),
        AuthorizationAmount: {
          CurrencyCode: "JPY",
          Amount: amount,
        },
        TransactionTimeout: 0,
        CaptureNow: true,
      });
    })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
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

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
