import React, { useState } from 'react';
import RoleLayout from '../../components/RoleLayout';
import './ResolveDisputePage.css';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  // Typography,
} from '@mui/material';

const ResolveDisputePage = () => {
  const [disputes, setDisputes] = useState([
    { id: 1, studentName: 'Juan Dela Cruz', course: 'BSIT', description: 'Attendance marked incorrectly', status: 'Pending' },
    { id: 2, studentName: 'Maria Santos', course: 'BSCS', description: 'Class schedule mismatch', status: 'Pending' },
    { id: 3, studentName: 'Pedro Reyes', course: 'BSEd', description: 'Absent marked, but was present in class', status: 'Pending' },
  ]);

  const handleResolve = (id) => {
    const updatedDisputes = disputes.map((dispute) =>
      dispute.id === id ? { ...dispute, status: 'Resolved' } : dispute
    );
    setDisputes(updatedDisputes);
  };

  const handleDismiss = (id) => {
    const updatedDisputes = disputes.map((dispute) =>
      dispute.id === id ? { ...dispute, status: 'Dismissed' } : dispute
    );
    setDisputes(updatedDisputes);
  };

  return (
    <RoleLayout>
      <div className="resolve-dispute-page">
        <h1 variant="h4" className="resolve-dispute-header">
          Resolve Disputes
        </h1>

        <TableContainer component={Paper} className="dispute-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student Name</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Dispute Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {disputes.map((dispute) => (
                <TableRow key={dispute.id}>
                  <TableCell>{dispute.studentName}</TableCell>
                  <TableCell>{dispute.course}</TableCell>
                  <TableCell>{dispute.description}</TableCell>
                  <TableCell>{dispute.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => handleResolve(dispute.id)}
                      style={{
                        marginRight: '10px',
                        backgroundColor: dispute.status === 'Resolved' ? '#086308' : '',
                        color: dispute.status === 'Resolved' ? '#fff' : '#086308',
                      }}
                    >
                      Resolve
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDismiss(dispute.id)}
                      style={{
                        backgroundColor: dispute.status === 'Dismissed' ? '#f22028' : '',
                        color: dispute.status === 'Dismissed' ? '#fff' : '#f22028',
                      }}
                    >
                      Dismiss
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </RoleLayout>
  );
};

export default ResolveDisputePage;
