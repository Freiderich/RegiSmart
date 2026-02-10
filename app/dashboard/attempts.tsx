import React, { useState } from "react";
import { recordAttempt, isBlocked, resetAttempts } from "@/lib/attempts-cooldown";

export default function AttemptsPage() {
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("");

  const handleAttempt = () => {
    recordAttempt(userId);
    if (isBlocked(userId)) {
      setStatus("Account blocked due to repeated mistakes. Try again later.");
    } else {
      setStatus("Attempt recorded. You are not blocked.");
    }
  };

  const handleReset = () => {
    resetAttempts(userId);
    setStatus("Attempts reset. You can try again.");
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 20 }}>
      <h2>Attempts & Cooldown</h2>
      <input value={userId} onChange={e => setUserId(e.target.value)} placeholder="User ID" />
      <button onClick={handleAttempt}>Record Attempt</button>
      <button onClick={handleReset} style={{ marginLeft: 8 }}>Reset Attempts</button>
      {status && <p style={{ marginTop: 16 }}>{status}</p>}
    </div>
  );
}
