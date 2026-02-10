// Email service for sending documents as PDF
// Uses the backend API endpoint

export interface EmailOptions {
  to: string;
  subject: string;
  body: string;
  documentName: string;
  documentContent: string;
}

export async function sendEmailWithPDF(options: EmailOptions): Promise<{ success: boolean; message: string }> {
  try {
    const { to, subject, body, documentName, documentContent } = options;

    console.log('Sending email via API:', {
      to,
      subject,
      documentName,
    });

    // Call backend API to send email
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        subject,
        body,
        documentName,
        documentContent,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to send email');
    }

    console.log(`✓ Email sent to ${to}`);

    return {
      success: true,
      message: result.message || `Document sent to ${to}`,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: `Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

// Generate PDF content from HTML
export function generatePDFContent(htmlContent: string, documentTitle: string): string {
  // In production, use a library like jsPDF or pdfkit
  // For now, return a formatted text version that could be converted to PDF
  return `
    ═══════════════════════════════════════════════════════════
    Holy Angel University - Official Document
    ═══════════════════════════════════════════════════════════
    
    Document: ${documentTitle}
    Generated: ${new Date().toLocaleString()}
    
    ───────────────────────────────────────────────────────────
    
    ${htmlContent}
    
    ───────────────────────────────────────────────────────────
    This is an official document from Holy Angel University
    Registrar Office
  `;
}

// Format document for email body
export function formatDocumentForEmail(studentName: string, documentType: string, documentContent: string): string {
  return `
Dear ${studentName},

Your requested document has been processed and is ready.

Document Type: ${documentType}
Request Date: ${new Date().toLocaleString()}

Please find the document attached to this email.

If you have any questions about this document, please contact the Registrar Office.

Best regards,
Holy Angel University Registrar Office
  `;
}
