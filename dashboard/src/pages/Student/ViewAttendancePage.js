import React from 'react';
import RoleLayout from '../../components/RoleLayout';
import './ViewAttendancePage.css';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
//   Typography,
} from '@mui/material';

const ViewAttendancePage = () => {
  const attendanceData = [
    { date: '2025-05-01', subject: 'Web Development', status: 'Present' },
    { date: '2025-05-02', subject: 'Data Structures', status: 'Absent' },
    { date: '2025-05-03', subject: 'Database Systems', status: 'Present' },
    { date: '2025-05-04', subject: 'Networking', status: 'Present' },
    { date: '2025-05-05', subject: 'Operating Systems', status: 'Absent' },
  ];

  return (
    <RoleLayout>
      <div className="view-attendance-page">
        <h1 variant="h4" className="page-title">
          Attendance Record
        </h1>

        <TableContainer component={Paper} className="attendance-table-container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="header-cell">Date</TableCell>
                <TableCell className="header-cell">Subject</TableCell>
                <TableCell className="header-cell">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceData.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.subject}</TableCell>
                  <TableCell
                    style={{
                      color: entry.status === 'Present' ? '#086308' : '#f22028',
                      fontWeight: 'bold',
                    }}
                  >
                    {entry.status}
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

export default ViewAttendancePage;
