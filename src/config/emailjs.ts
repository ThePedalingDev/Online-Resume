// EmailJS Configuration
// To set up EmailJS:
// 1. Go to https://www.emailjs.com/
// 2. Create a free account
// 3. Create an email service (Gmail, Outlook, etc.)
// 4. Create an email template
// 5. Get your Service ID, Template ID, and Public Key
// 6. Set them as environment variables (see .env.example)

export const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_your_service_id',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_your_template_id',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key',
};

// Email template variables that will be sent to your email
export const EMAIL_TEMPLATE_PARAMS = {
  to_email: 'markusfourie@icloud.com', // Your email address
  name: '', // Will be filled from form
  email: '', // Will be filled from form
  message: '', // Will be filled from form
  time: '', // Will be filled with current timestamp
};
