import React, { useEffect, useState } from 'react';
import RoleLayout from '../../components/RoleLayout';
import './FacultyDashboard.css';

const FacultyDashboardPage = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [pendingDisputes, setPendingDisputes] = useState(0);

  useEffect(() => {
    // Fetch all users and count students
    const fetchStudents = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/users');
        const data = await res.json();
        const studentCount = data.filter((u) => u.role === 'student').length;
        setTotalStudents(studentCount);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };

    // Fetch all disputes and count pending
    const fetchDisputes = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/disputes');
        const data = await res.json();
        const pending = data.filter((d) => d.status === 'Pending').length;
        setPendingDisputes(pending);
      } catch (err) {
        console.error('Failed to fetch disputes:', err);
      }
    };

    fetchStudents();
    fetchDisputes();
  }, []);

  return (
    <RoleLayout>
      <div className="faculty-dashboard">
        <h1 className="faculty-dashboard-header">Faculty Dashboard</h1>

        <div className="faculty-stats-container">
          <div className="faculty-stat-card">
            <h2>Total Students</h2>
            <p>{totalStudents}</p>
          </div>

          <div className="faculty-stat-card">
            <h2>Pending Disputes</h2>
            <p>{pendingDisputes}</p>
          </div>
        </div>
      </div>
    </RoleLayout>
  );
};

export default FacultyDashboardPage;
