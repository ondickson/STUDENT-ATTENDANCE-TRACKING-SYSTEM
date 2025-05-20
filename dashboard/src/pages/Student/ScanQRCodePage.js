import React from 'react';
import QrScanner from '../../components/QrScanner';
import RoleLayout from '../../components/RoleLayout';
import './ScanQRCodePage.css';

const ScanQRCodePage = () => {
const handleScanSuccess = async (data) => {
  try {
    console.log('Scanned QR Code:', data);

    // ✅ Parse JSON string, not URL
    const { sessionId } = JSON.parse(data);

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'student') {
      alert('Only students can mark attendance.');
      return;
    }

    const attendanceRecord = {
      userId: user._id,
      sessionId,
      status: 'present',
      date: new Date().toISOString().split('T')[0],
    };

    const response = await fetch('http://localhost:5000/api/attendance/mark-qr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([attendanceRecord]),
    });

    if (response.ok) {
      alert('Attendance marked successfully!');
    } else {
      const errorData = await response.json();
      console.error('Server error:', errorData);
      alert('Failed to mark attendance.');
    }
  } catch (err) {
    console.error('QR Scan error:', err);
    alert('Invalid QR code or network error.');
  }
};


  return (
    <RoleLayout>
      <div className="scan-page">
        <h2>Scan QR to Mark Your Attendance</h2>
        <div className="qr-scanner-container">
          <QrScanner onScanSuccess={handleScanSuccess} />
        </div>
      </div>
    </RoleLayout>
  );
};

export default ScanQRCodePage;
