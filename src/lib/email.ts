import nodemailer from 'nodemailer';
import { getDb } from './db';
import { users } from './db/schema';

export async function getTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE !== 'false'; // default to true (port 465)
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    console.warn('Nodemailer SMTP user or password not configured in .env.');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

export async function sendEmail({ to, subject, html, text }: { to: string | string[], subject: string, html: string, text?: string }) {
  try {
    const transporter = await getTransporter();
    const from = process.env.SMTP_FROM || 'Rotaract District 3192 <info@district3192.org>';

    const info = await transporter.sendMail({
      from,
      to: Array.isArray(to) ? to.join(', ') : to,
      subject,
      text: text || html.replace(/<[^>]*>/g, ''),
      html,
    });

    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}

/**
 * Send an email blast to a list of recipients (or all registered members) in secure BCC batches.
 */
export async function blastEmailToMembers(subject: string, htmlContent: string, customRecipients?: string[]) {
  try {
    let emails = customRecipients || [];
    if (!customRecipients || customRecipients.length === 0) {
      const db = getDb();
      const allUsers = await db.query.users.findMany({
        columns: {
          email: true,
        }
      });
      emails = allUsers.map(u => u.email).filter(Boolean);
    }

    if (emails.length === 0) {
      console.log('No recipients found to blast email.');
      return;
    }

    const transporter = await getTransporter();
    const from = process.env.SMTP_FROM || 'Rotaract District 3192 <info@district3192.org>';

    // Batch send in BCC groups of 50 to respect standard SMTP limits and prevent spam filters
    const batchSize = 50;
    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize);
      await transporter.sendMail({
        from,
        to: from, // Send to self
        bcc: batch, // Blind Carbon Copy recipients
        subject,
        text: htmlContent.replace(/<[^>]*>/g, ''),
        html: htmlContent,
      });
    }

    console.log(`Blasted email to ${emails.length} recipients successfully.`);
  } catch (error) {
    console.error('Email blast failed:', error);
    throw error;
  }
}
