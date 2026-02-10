import React from "react";
import { sendDocumentToEmail } from "@/components/printable-document";
import { addWatermark } from "@/lib/watermark";

export default function ReceiptPage() {
  const email = "student@example.com";
  const receipt = {
    id: "R-2025-001",
    student: "20876916",
    amount: 500,
    date: new Date().toLocaleDateString(),
  };
  const receiptText = `Receipt ID: ${receipt.id}\nStudent: ${receipt.student}\nAmount: ${receipt.amount}\nDate: ${receipt.date}`;
  const watermarked = addWatermark(receiptText, "Holy Angel University Registrar");

  const handleSend = () => {
    sendDocumentToEmail(email, watermarked);
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 20 }}>
      <h2>Receipt</h2>
      <pre>{watermarked}</pre>
      <button onClick={handleSend}>Send to Email</button>
    </div>
  );
}
