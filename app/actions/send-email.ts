'use server';

import nodemailer from 'nodemailer';

export async function sendEmail(formData: FormData) {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const experience = formData.get('experience') as string;
  const message = formData.get('message') as string;

  // Validate the data
  if (!firstName || !lastName || !email || !message) {
    return { success: false, error: 'Missing required fields' };
  }

  // Create a transporter using SMTP settings from environment variables
  // These should be set in your Vercel project settings
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    // Send the email
    await transporter.sendMail({
      from: `"FVRC Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER, // Where the email will be sent
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Experience: ${experience}
        
        Message:
        ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Experience:</strong> ${experience}</p>
        <br />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error: 'Failed to send message. Please try again later.' };
  }
}
