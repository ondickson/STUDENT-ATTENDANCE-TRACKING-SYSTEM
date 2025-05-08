// src/components/DashboardLayout.js
import React from 'react';
import Sidebar from './Sidebar';
import './DashboardLayout.css';

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
