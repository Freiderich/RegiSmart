import React, { useState } from "react";
import { isActionAllowed } from "@/lib/role-anomaly";

export default function RoleCheckPage() {
  const [role, setRole] = useState("student");
  const [action, setAction] = useState("");
  const [result, setResult] = useState("");

  const handleCheck = () => {
    if (isActionAllowed(role, action)) {
      setResult("Action allowed for this role.");
    } else {
      setResult("Action NOT allowed for this role.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 20 }}>
      <h2>Role-Based Anomaly Detection</h2>
      <label htmlFor="role">Role:</label>
      <select id="role" value={role} onChange={e => setRole(e.target.value)}>
        <option value="student">Student</option>
        <option value="alumni">Alumni</option>
        <option value="admin">Admin</option>
      </select>
      <input value={action} onChange={e => setAction(e.target.value)} placeholder="Action (e.g. view, pay, manage)" />
      <button onClick={handleCheck}>Check</button>
      {result && <p style={{ marginTop: 16 }}>{result}</p>}
    </div>
  );
}
