import React from 'react';
import { jwtDecode } from 'jwt-decode';
import RoleLayout from '../../components/RoleLayout';
import './ScanQRCodePage.css';
import axios from 'axios';

import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import QrScanner from '../../components/QrScanner';




const ScanQRCodePage = () => {

  const { user } = useContext(AuthContext);

  const handleScanSuccess = async (data) => {
    console.log('Scanned QR Code:', data);
    let sessionId;

    try {
      const parsedData = JSON.parse(data);
      sessionId = parsedData.sessionId;
      if (!sessionId) throw new Error('Invalid QR Code');
    } catch (err) {
      alert('Invalid QR code format.');
      return;
    }

    // Fallback: Try extracting userId
    let userId = user?.id;
    if (!userId) {
      try {
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);

        userId = decoded.id;
      } catch {
        alert('Unable to determine user identity.');
        return;
      }
    }

    const attendanceRecord = {
      userId,
      sessionId,
      date: new Date().toISOString().split('T')[0],
      status: 'present',
    };

    try {
      const response = await axios.post(
        'http://localhost:5000/api/attendance/mark-via-qr',
        attendanceRecord,
      );
      console.log('✅ Attendance submitted:', response.data);
      alert('Attendance marked successfully!');
    } catch (error) {
      console.error('❌ Server error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Server error.');
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
