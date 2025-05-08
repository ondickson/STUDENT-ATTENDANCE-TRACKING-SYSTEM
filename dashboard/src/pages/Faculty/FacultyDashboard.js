import React from 'react';
import RoleLayout from '../../components/RoleLayout';
import './FacultyDashboard.css';

const FacultyDashboardPage = () => {
  return (
    <RoleLayout>
      <div className="faculty-dashboard">
        <h1 className="faculty-dashboard-header">Faculty Dashboard</h1>

        <div className="faculty-stats-container">
          <div className="faculty-stat-card">
            <h2>Total Students</h2>
            <p>250</p>
          </div>

          <div className="faculty-stat-card green">
            <h2>Classes Today</h2>
            <p>3</p>
          </div>

          <div className="faculty-stat-card red">
            <h2>Pending Disputes</h2>
            <p>5</p>
          </div>
        </div>
      </div>
    </RoleLayout>
  );
};

export default FacultyDashboardPage;
