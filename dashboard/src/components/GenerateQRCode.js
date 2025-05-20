// components/GenerateQRCode.js
import QRCode from "qrcode.react";

const GenerateQRCode = ({ sessionId }) => {
  const qrData = JSON.stringify({
    sessionId, // unique class or attendance session ID
    timestamp: new Date().toISOString(),
  });

  return (
    <div>
      <h2>Scan to Register Attendance</h2>
      <QRCode value={qrData} size={256} />
    </div>
  );
};
