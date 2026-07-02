'use server';

import nodemailer from 'nodemailer';

export interface EmailAttachment {
  filename: string;
  content: Buffer;
  contentType: string;
}

function getTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE !== 'false';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error('SMTP_USER and SMTP_PASS must be configured in .env to send emails.');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

/**
 * Send a single email to one or more explicit recipients.
 */
export async function sendEmail({
  to,
  subject,
  html,
  text,
  attachments = [],
}: {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  attachments?: EmailAttachment[];
}) {
  const transporter = getTransporter();
  const from = process.env.SMTP_FROM || `Rotaract District 3192 <tech.rotaract3192@gmail.com>`;

  const info = await transporter.sendMail({
    from,
    to: Array.isArray(to) ? to.join(', ') : to,
    subject,
    text: text || html.replace(/<[^>]*>/g, ''),
    html,
    attachments: attachments.map(a => ({
      filename: a.filename,
      content: a.content,
      contentType: a.contentType,
    })),
  });

  console.log('Email sent:', info.messageId);
  return info;
}

/**
 * Blast an HTML email to an explicit list of recipients in BCC batches of 50.
 * Supports optional file attachments (passed as Buffers).
 */
export async function blastEmailToMembers(
  subject: string,
  htmlContent: string,
  recipients: string[],
  attachments: EmailAttachment[] = [],
) {
  if (recipients.length === 0) {
    console.log('blastEmailToMembers: no recipients supplied, skipping.');
    return;
  }

  const transporter = getTransporter();
  const from = process.env.SMTP_FROM || `Rotaract District 3192 <tech.rotaract3192@gmail.com>`;
  const plainText = htmlContent.replace(/<[^>]*>/g, '');

  const nodemailerAttachments = attachments.map(a => ({
    filename: a.filename,
    content: a.content,
    contentType: a.contentType,
  }));

  // BCC batches of 50 to avoid SMTP recipient limits and spam filters
  const BATCH_SIZE = 50;
  for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
    const batch = recipients.slice(i, i + BATCH_SIZE);
    await transporter.sendMail({
      from,
      to: from,
      bcc: batch,
      subject,
      text: plainText,
      html: htmlContent,
      attachments: nodemailerAttachments,
    });
    console.log(`Blasted batch ${Math.floor(i / BATCH_SIZE) + 1}: ${batch.length} recipients`);
  }

  console.log(`Email blast complete — ${recipients.length} total recipients, ${attachments.length} attachment(s).`);
}
