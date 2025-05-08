// src/pages/Admin/AdminDashboard.js
import React from 'react';
import RoleLayout from '../../components/RoleLayout';
import './AdminDashboard.css';

function AdminDashboard() {
  return (
    <RoleLayout>
      <div className="admin-dashboard">
        <h1 className="admin-header">Admin Dashboard</h1>

        <div className="stats-container">
          <div className="stat-card">
            <h2>Total Users</h2>
            <p>123</p>
          </div>

          <div className="stat-card primary">
            <h2>Pending Disputes</h2>
            <p>8</p>
          </div>

          <div className="stat-card alert">
            <h2>Alerts</h2>
            <p>2</p>
          </div>
        </div>
      </div>
    </RoleLayout>
  );
}

export default AdminDashboard;
