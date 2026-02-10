import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configure your email service here
// For development, you can use Mailtrap, Gmail, or SendGrid
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'localhost',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: process.env.SMTP_USER ? {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  } : undefined,
});

export async function POST(request: NextRequest) {
  try {
    const { to, subject, body, documentName, documentContent } = await request.json();

    // Validate input
    if (!to || !subject || !body) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log(`Sending email to ${to} with document: ${documentName}`);

    // Send email
    const mailOptions = {
      from: process.env.SMTP_FROM || 'registrar@hauregistrar.edu.ph',
      to,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
            <h2 style="color: #c41e3a; margin: 0;">Holy Angel University</h2>
            <p style="color: #666; margin: 5px 0 0 0;">Registrar Office</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            ${body.replace(/\n/g, '<br>')}
          </div>
          
          <div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 20px; font-size: 12px; color: #666;">
            <p><strong>Document:</strong> ${documentName}</p>
            <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
            <p style="margin-top: 15px; font-size: 11px;">
              This is an official email from Holy Angel University Registrar Office.
              Please do not reply to this email. For inquiries, contact the Registrar Office directly.
            </p>
          </div>
        </div>
      `,
      text: body,
      // In production, you would attach the actual PDF file here
      // attachments: [{
      //   filename: `${documentName}.pdf`,
      //   content: documentContent,
      //   contentType: 'application/pdf'
      // }]
    };

    // Send email - but only if SMTP is configured
    if (process.env.SMTP_USER) {
      await transporter.sendMail(mailOptions);
      console.log(`✓ Email sent successfully to ${to}`);
    } else {
      // For development without SMTP, just log it
      console.log(`[DEV MODE] Email would be sent to ${to}`, mailOptions);
    }

    return NextResponse.json(
      { 
        success: true, 
        message: `✓ Document "${documentName}" has been sent to ${to}` 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: `Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}` 
      },
      { status: 500 }
    );
  }
}
