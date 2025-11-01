require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmail() {
  // Create a test account (for development only)
  // const testAccount = await nodemailer.createTestAccount();

  // Create reusable transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // Send test email
  const info = await transporter.sendMail({
    from: `"ExploreX Booking" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // Send to yourself for testing
    subject: 'Test Email from Booking Service',
    text: 'This is a test email from the ExploreX booking service',
    html: '<b>This is a test email from the ExploreX booking service</b>'
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

testEmail().catch(console.error);
