# Email Configuration Guide

## Overview
The booking service sends automated confirmation emails when a payment is successfully processed. The email includes:
- Booking confirmation details
- Complete package information
- Day-by-day itinerary
- What's included in the package
- Payment receipt
- Contact information

## Setup Instructions

### Option 1: Gmail (Recommended for Testing)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Copy the 16-character password

3. **Update `.env` file**:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
```

### Option 2: Other Email Services

#### SendGrid
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASSWORD=your-sendgrid-api-key
```

#### AWS SES
```env
EMAIL_HOST=email-smtp.us-east-1.amazonaws.com
EMAIL_PORT=587
EMAIL_USER=your-aws-access-key
EMAIL_PASSWORD=your-aws-secret-key
```

#### Mailgun
```env
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_USER=your-mailgun-username
EMAIL_PASSWORD=your-mailgun-password
```

### Option 3: Development/Testing (Ethereal Email)

For testing without a real email account, you can use Ethereal Email:

1. Visit https://ethereal.email/
2. Click "Create Ethereal Account"
3. Copy the SMTP credentials
4. Update `.env` with the provided credentials

**Note**: Emails sent to Ethereal are not delivered but can be viewed in their web interface.

## Testing the Email Functionality

1. **Create a booking** through the frontend
2. **Complete the payment** on the booking details page
3. **Check the console logs** for:
   ```
   Sending confirmation email to: user@example.com
   Confirmation email sent successfully
   ```
4. **Check your email inbox** for the confirmation email

## Troubleshooting

### Email not sending
- Check console logs for error messages
- Verify EMAIL_USER and EMAIL_PASSWORD are correct
- Ensure your email service allows SMTP access
- Check if 2FA is enabled (Gmail requires app passwords)

### Gmail "Less secure app" error
- Use an App Password instead of your regular password
- Enable 2-Factor Authentication first

### Port blocked
- Try port 465 (SSL) instead of 587 (TLS)
- Check firewall settings

## Email Template Customization

The email template is located in:
```
src/utils/emailService.js
```

You can customize:
- Email styling (colors, fonts, layout)
- Content sections
- Company branding
- Footer information

## Production Recommendations

1. **Use a dedicated email service** (SendGrid, AWS SES, Mailgun)
2. **Set up SPF and DKIM records** for better deliverability
3. **Monitor email delivery** and bounce rates
4. **Implement email queuing** for high-volume scenarios
5. **Add email templates** for different languages
6. **Store email logs** for audit purposes

## Security Notes

- Never commit `.env` files with real credentials
- Use environment variables in production
- Rotate email passwords regularly
- Monitor for suspicious activity
- Implement rate limiting for email sending
