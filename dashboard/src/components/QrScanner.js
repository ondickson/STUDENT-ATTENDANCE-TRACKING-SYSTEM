// components/QrScanner.js
import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";


const QrScanner = ({ onScanSuccess }) => {
useEffect(() => {
  const scanner = new Html5QrcodeScanner(
    "qr-reader",
    {
      fps: 10,
      qrbox: { width: 500, height: 500 },
      aspectRatio: 1.0,
      disableFlip: false, // Try changing this if camera is mirrored
    },
    true 
  );

  const successCallback = (decodedText, decodedResult) => {
    console.log("✅ QR Code Scanned:", decodedText);
    scanner.clear();
    onScanSuccess(decodedText);
  };

  const errorCallback = (errorMessage) => {
    if (errorMessage !== "NotFoundException") {
      console.warn("⚠️ QR scan warning:", errorMessage);
    }
  };

  scanner.render(successCallback, errorCallback);

  return () => {
    scanner.clear().catch((err) => console.error("Scanner cleanup error:", err));
  };
}, [onScanSuccess]);


  return <div id="qr-reader" style={{ width: "100%" }} />;
};

export default QrScanner;
