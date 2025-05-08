import React from 'react';
import RoleLayout from '../../components/RoleLayout';
import './ResolveDisputePage.css';
import { Button } from '@mui/material';

const ResolveDisputePage = () => {
  // Dummy data
  const disputes = [
    {
      id: 1,
      student: 'Juan Dela Cruz',
      course: 'BSIT',
      date: '2025-04-15',
      reason: 'Marked absent but attended',
      status: 'Pending',
    },
    {
      id: 2,
      student: 'Maria Santos',
      course: 'BSCS',
      date: '2025-04-17',
      reason: 'System error',
      status: 'Pending',
    },
  ];

  return (
    <RoleLayout>
      <div className="resolve-dispute-page">
        <h1 className="resolve-dispute-header">Resolve Attendance Disputes</h1>

        <table className="dispute-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Course</th>
              <th>Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {disputes.map((dispute) => (
              <tr key={dispute.id}>
                <td>{dispute.student}</td>
                <td>{dispute.course}</td>
                <td>{dispute.date}</td>
                <td>{dispute.reason}</td>
                <td>{dispute.status}</td>
                <td className="action-buttons">
                  <Button variant="contained" color="success">Approve</Button>
                  <Button variant="contained" color="error">Reject</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </RoleLayout>
  );
};

export default ResolveDisputePage;
