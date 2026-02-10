import React, { useState } from "react";
import { setCameraDirection, CameraDirection } from "@/lib/camera-depth";

export default function CameraSettingsPage() {
  const [direction, setDirection] = useState<CameraDirection>("center");
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dir = e.target.value as CameraDirection;
    setDirection(dir);
    setStatus(setCameraDirection(dir));
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 20 }}>
      <h2>Camera 3D Depth Settings</h2>
      <label htmlFor="direction">Camera Direction:</label>
      <select id="direction" value={direction} onChange={handleChange}>
        <option value="left">Left</option>
        <option value="right">Right</option>
        <option value="center">Center</option>
      </select>
      {status && <p style={{ marginTop: 16 }}>{status}</p>}
    </div>
  );
}
