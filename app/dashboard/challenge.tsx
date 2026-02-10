import React, { useState } from "react";
import { getChallenge, verifyResponse } from "@/lib/challenge-response";

export default function ChallengePage() {
  const [challenge] = useState(getChallenge());
  const [response, setResponse] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyResponse(response)) {
      setResult("Correct! You are verified.");
    } else {
      setResult("Incorrect. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 20 }}>
      <h2>Challenge Response</h2>
      <p>{challenge}</p>
      <form onSubmit={handleSubmit}>
        <input value={response} onChange={e => setResponse(e.target.value)} placeholder="Your answer" />
        <button type="submit">Submit</button>
      </form>
      {result && <p>{result}</p>}
    </div>
  );
}
