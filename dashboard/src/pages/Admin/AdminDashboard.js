import React, { useEffect, useState } from 'react';
import RoleLayout from '../../components/RoleLayout';
import './AdminDashboard.css';

function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [pendingDisputes, setPendingDisputes] = useState(0);

  useEffect(() => {
    // Fetch total users
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/users');
        const data = await res.json();
        setTotalUsers(data.length);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };

    // Fetch pending disputes
    const fetchDisputes = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/disputes');
        const data = await res.json();
        const pendingCount = data.filter((d) => d.status === 'Pending').length;
        setPendingDisputes(pendingCount);
      } catch (err) {
        console.error('Failed to fetch disputes:', err);
      }
    };

    fetchUsers();
    fetchDisputes();
  }, []);

  return (
    <RoleLayout>
      <div className="admin-dashboard">
        <h1 className="admin-header">Admin Dashboard</h1>

        <div className="stats-container">
          <div className="stat-card">
            <h2>Total Users</h2>
            <p>{totalUsers}</p>
          </div>

          <div className="stat-card primary">
            <h2>Pending Disputes</h2>
            <p>{pendingDisputes}</p>
          </div>
        </div>
      </div>
    </RoleLayout>
  );
}

export default AdminDashboard;
