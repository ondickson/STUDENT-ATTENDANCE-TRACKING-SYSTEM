// components/QrScanner.js
import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QrScanner = ({ onScanSuccess }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    scanner.render(
      (decodedText) => {
        scanner.clear(); // stop scanning after success
        onScanSuccess(decodedText);
      },
      (errorMessage) => {
        // Optional: log errors or ignore
        console.log("QR scan error:", errorMessage);
      }
    );

    return () => scanner.clear();
  }, [onScanSuccess]);

  return <div id="qr-reader" />;
};

export default QrScanner;
