const nodemailer = require('nodemailer');

// Create reusable transporter
const createTransporter = () => {
  // For development, use a test account or configure with your email service
  // For production, use environment variables for email credentials
  
  if (process.env.NODE_ENV === 'production') {
    // Production email configuration (e.g., SendGrid, AWS SES, etc.)
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  } else {
    // Development: Use Ethereal Email (fake SMTP service for testing)
    // Or configure with Gmail for testing
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'your-app-password'
      }
    });
  }
};

// Generate booking confirmation email HTML
const generateBookingConfirmationEmail = (booking, packageDetails, userEmail) => {
  const startDate = new Date(booking.startDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const endDate = new Date(booking.endDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Generate itinerary HTML
  let itineraryHTML = '';
  if (packageDetails.itinerary && packageDetails.itinerary.length > 0) {
    itineraryHTML = packageDetails.itinerary.map(day => `
      <div style="margin-bottom: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
        <h4 style="color: #2563eb; margin: 0 0 10px 0;">Day ${day.day}: ${day.title}</h4>
        <p style="margin: 0; color: #4b5563;">${day.description}</p>
      </div>
    `).join('');
  }

  // Generate included items HTML
  let includedHTML = '';
  if (packageDetails.included && packageDetails.included.length > 0) {
    includedHTML = packageDetails.included.map(item => `
      <li style="margin-bottom: 8px;">
        <strong>${item.name}</strong>${item.description ? ` - ${item.description}` : ''}
      </li>
    `).join('');
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px;">🎉 Booking Confirmed!</h1>
          <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">Your adventure awaits</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 20px;">
          <!-- Success Message -->
          <div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 15px; margin-bottom: 30px; border-radius: 4px;">
            <p style="margin: 0; color: #065f46; font-weight: 600;">✓ Payment Successful</p>
            <p style="margin: 5px 0 0 0; color: #047857; font-size: 14px;">Your booking has been confirmed and payment processed successfully.</p>
          </div>

          <!-- Booking Details -->
          <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 22px;">Booking Details</h2>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Booking ID:</td>
                <td style="padding: 10px 0; color: #1f2937; font-weight: 600; text-align: right;">${booking._id}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Package:</td>
                <td style="padding: 10px 0; color: #1f2937; font-weight: 600; text-align: right;">${packageDetails.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Check-in:</td>
                <td style="padding: 10px 0; color: #1f2937; font-weight: 600; text-align: right;">${startDate}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Check-out:</td>
                <td style="padding: 10px 0; color: #1f2937; font-weight: 600; text-align: right;">${endDate}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Guests:</td>
                <td style="padding: 10px 0; color: #1f2937; font-weight: 600; text-align: right;">${booking.guests} ${booking.guests === 1 ? 'Guest' : 'Guests'}</td>
              </tr>
              <tr style="border-top: 2px solid #e5e7eb;">
                <td style="padding: 15px 0 0 0; color: #1f2937; font-size: 16px; font-weight: 600;">Total Paid:</td>
                <td style="padding: 15px 0 0 0; color: #2563eb; font-size: 20px; font-weight: 700; text-align: right;">$${booking.totalPrice.toLocaleString()}</td>
              </tr>
            </table>
          </div>

          <!-- Package Description -->
          ${packageDetails.description ? `
          <h2 style="color: #1f2937; margin: 0 0 15px 0; font-size: 20px;">About Your Package</h2>
          <p style="color: #4b5563; line-height: 1.6; margin: 0 0 30px 0;">${packageDetails.description}</p>
          ` : ''}

          <!-- What's Included -->
          ${includedHTML ? `
          <h2 style="color: #1f2937; margin: 0 0 15px 0; font-size: 20px;">What's Included</h2>
          <ul style="color: #4b5563; line-height: 1.8; margin: 0 0 30px 0; padding-left: 20px;">
            ${includedHTML}
          </ul>
          ` : ''}

          <!-- Itinerary -->
          ${itineraryHTML ? `
          <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 20px;">Your Itinerary</h2>
          ${itineraryHTML}
          ` : ''}

          <!-- Important Information -->
          <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 30px 0; border-radius: 4px;">
            <h3 style="margin: 0 0 10px 0; color: #92400e; font-size: 16px;">📋 Important Information</h3>
            <ul style="margin: 0; padding-left: 20px; color: #78350f; font-size: 14px; line-height: 1.6;">
              <li>Please arrive 15 minutes before your scheduled check-in time</li>
              <li>Bring a valid ID and this confirmation email</li>
              <li>Contact us at least 48 hours in advance for any changes</li>
              <li>Check our cancellation policy for refund details</li>
            </ul>
          </div>

          <!-- Contact Information -->
          <div style="text-align: center; padding: 20px 0; border-top: 1px solid #e5e7eb; margin-top: 30px;">
            <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">Need help? Contact us:</p>
            <p style="color: #2563eb; margin: 0; font-size: 16px; font-weight: 600;">support@explorex.com | +1 (555) 123-4567</p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f9fafb; padding: 30px 20px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">Thank you for choosing ExploreX!</p>
          <p style="color: #9ca3af; margin: 0; font-size: 12px;">© 2025 ExploreX. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Send booking confirmation email
const sendBookingConfirmationEmail = async (booking, packageDetails, userEmail) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"ExploreX Travel" <${process.env.EMAIL_USER || 'noreply@explorex.com'}>`,
      to: userEmail,
      subject: `🎉 Booking Confirmed - ${packageDetails.name}`,
      html: generateBookingConfirmationEmail(booking, packageDetails, userEmail)
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendBookingConfirmationEmail
};
