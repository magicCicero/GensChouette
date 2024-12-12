const nodemailer = require("nodemailer");
const runQuery = require('./database');  // Import the updated runQuery function

require("dotenv").config();

// Create a transporter using your email service credentials
const transporter = nodemailer.createTransport({
  service: "gmail",  
  auth: {
    user: process.env.EMAIL_USER,  
    pass: process.env.EMAIL_PASS,   
  },
});

// Function to send email
const sendEmailNotification = async (orderReferenceId, amount, productID, userID) => {  
  try {
    // Step 1: Fetch customerID from productTable using productID
    const productQuery = 'SELECT userID FROM product WHERE id = ?';
    const connect = await runQuery();
    const productResult = await connect.query(productQuery, [productID]);
    console.log( "<<<<<<<<< productResult >>>>>>>>>>", productResult);
    console.log( "<<<<<<<<< productResult[0].userID >>>>>>>>>>", productResult[0][0].userID);

    if (productResult.length === 0) {
      throw new Error('Product not found');
    }
    const sellerID = productResult[0][0].userID;
    
    console.log( "<<<<<<<<< sellerID >>>>>>>>>>", sellerID);

    // Step 2: Fetch sellerName and sellerEmail from sellerTable using sellerID
    const sellerQuery = 'SELECT name, email FROM user WHERE id = ?';
    const sellerResult = await connect.query(sellerQuery, [sellerID]);

    if (sellerResult.length === 0) {
      throw new Error('seller not found');
    }
    const { name, email } = sellerResult[0];

    // Step 3: Fetch buyer from userTable using userID
    // const buyerQuery = 'SELECT name, email FROM user WHERE id = ?';
    // const buyerResult = await runQuery(buyerQuery, [userID]);

    // if (buyerResult.length === 0) {
      // throw new Error('buyer not found');
    // }
    // const buyerName = buyerResult[0].name;
    // const buyerEmail = buyerResult[0].email;

    // Step 4: Prepare the email content
    const mailOptions = {
      from: process.env.EMAIL_USER,  
      to: process.env.EMAIL_ADMIN, 
      subject: `Payment Successful: Order #${orderReferenceId}`,
      text: `Dear Admin,

        A payment has been successfully processed for the following order:

        Order Reference ID: ${orderReferenceId}
        Amount Paid: ¥${amount} JPY
        Payment Status: SUCCESS

        Seller Information:
        - Name: ${name}
        - Email: ${email}

        Buyer Information:
        - Name: Ishida Mei 
        - Email: mobileengineer8954@gmail.com

        Please review the order and take the necessary action to process the shipment.

        Thank you,
        Your Amazon Pay System`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

  } catch (error) {
    console.error('Error in sendEmailNotification:', error.message);
  }
};

module.exports = { sendEmailNotification };
