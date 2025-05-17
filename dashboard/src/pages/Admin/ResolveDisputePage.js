import React, { useEffect, useState } from 'react';
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
} from '@mui/material';

const ResolveDisputePage = () => {
  const [disputes, setDisputes] = useState([]);

  useEffect(() => {
    fetchDisputes();
  }, []);

  const fetchDisputes = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/disputes');
      const data = await res.json();
      setDisputes(data);
    } catch (err) {
      console.error('Failed to fetch disputes:', err);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/disputes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setDisputes((prevDisputes) =>
          prevDisputes.map((d) =>
            d._id === id ? { ...d, status: newStatus } : d,
          ),
        );
      } else {
        const errorData = await res.json();
        alert(`Update failed: ${errorData.message}`);
      }
    } catch (err) {
      console.error('Status update error:', err);
    }
  };

  const formatDate = (isoDate) => {
    const d = new Date(isoDate);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <RoleLayout>
      <div className="resolve-dispute-page">
        <h1 className="resolve-dispute-header">Resolve Disputes</h1>
        <TableContainer component={Paper} className="dispute-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student Name</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Attendance Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {disputes.map((dispute) => (
                <TableRow key={dispute._id}>
                  <TableCell>{dispute.fullname}</TableCell>
                  <TableCell>{dispute.course}</TableCell>
                  <TableCell>{dispute.reason}</TableCell>
                  <TableCell>{formatDate(dispute.date)}</TableCell>
                  <TableCell>{dispute.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => updateStatus(dispute._id, 'Resolved')}
                      style={{
                        marginRight: '10px',
                        backgroundColor:
                          dispute.status === 'Resolved' ? '#086308' : '',
                        color:
                          dispute.status === 'Resolved' ? '#fff' : '#086308',
                      }}
                    >
                      Resolve
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => updateStatus(dispute._id, 'Dismissed')}
                      style={{
                        backgroundColor:
                          dispute.status === 'Dismissed' ? '#f22028' : '',
                        color:
                          dispute.status === 'Dismissed' ? '#fff' : '#f22028',
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
