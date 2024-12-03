const nodemailer = require("nodemailer");

// Create a transporter using your email service credentials
const transporter = nodemailer.createTransport({
  service: "gmail",  
  auth: {
    user: "magicguru0922@gmail.com",  
    pass: "QWE123qweasdf!@#",   // Replace with your email password or app-specific password
  },
});

// Function to send an email
const sendEmail = (orderReferenceId, amount) => {
  const mailOptions = {
    from: "magicguru0922@gmail.com",  // Replace with your email
    to: "admin@gmail.com",                        // Admin email
    subject: `Payment Successful: Order #${orderReferenceId}`,
    text: `Dear Admin,

        A payment has been successfully processed for the following order:

        Order Reference ID: ${orderReferenceId}
        Amount Paid: ¥${amount} JPY
        Payment Status: SUCCESS

        Customer Information:
        - Name: ${customerName}
        - Email: ${customerEmail}

        Please review the order and take the necessary action to process the shipment.

        Thank you,
        Your Amazon Pay System`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { sendEmail };
