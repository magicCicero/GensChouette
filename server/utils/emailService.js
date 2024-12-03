const nodemailer = require("nodemailer");
const runQuery = require('./database');  // Import the updated runQuery function

require("dotenv").config();

// Create a transporter using your email service credentials
const transporter = nodemailer.createTransport({
  service: "gmail",  
  auth: {
    user: process.env.EMAIL_USER,  
    pass: process.env.EMAIL_PASS,   // Replace with your email password or app-specific password
  },
});

// Function to send email
const sendEmailNotification = async (orderReferenceId, amount, productID) => {  // Make the function async
  try {
    // Step 1: Fetch customerID from productTable using productID
    const productQuery = 'SELECT userID FROM product WHERE id = ?';
    const productResult = await runQuery(productQuery, [productID]);

    if (productResult.length === 0) {
      throw new Error('Product not found');
    }
    const customerID = productResult[0].userID;

    // Step 2: Fetch customerName and customerEmail from customerTable using customerID
    const customerQuery = 'SELECT customerName, customerEmail FROM user WHERE id = ?';
    const customerResult = await runQuery(customerQuery, [customerID]);

    if (customerResult.length === 0) {
      throw new Error('Customer not found');
    }
    const { name, email } = customerResult[0]; // customerName and customerEmail

    // Step 3: Prepare the email content
    const mailOptions = {
      from: process.env.EMAIL_USER,  
      to: "admin@gmail.com",  // Admin email
      subject: `Payment Successful: Order #${orderReferenceId}`,
      text: `Dear Admin,

        A payment has been successfully processed for the following order:

        Order Reference ID: ${orderReferenceId}
        Amount Paid: ¥${amount} JPY
        Payment Status: SUCCESS

        Customer Information:
        - Name: ${name}
        - Email: ${email}

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
