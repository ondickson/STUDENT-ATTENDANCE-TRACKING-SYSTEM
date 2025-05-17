import React, { useEffect, useState } from 'react';
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
  CircularProgress,
  Typography,
} from '@mui/material';
import axios from 'axios';

const ViewAttendancePage = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/attendance/${user.id}`);
        setAttendanceData(res.data);
      } catch (err) {
        console.error('❌ Error fetching attendance:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchAttendance();
  }, [user?.id]);

  return (
    <RoleLayout>
      <div className="view-attendance-page">
        <h1 className="page-title">Attendance Record</h1>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <CircularProgress />
          </div>
        ) : attendanceData.length === 0 ? (
          <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>
            No attendance records found.
          </Typography>
        ) : (
          <TableContainer component={Paper} className="attendance-table-container">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="header-cell">Date</TableCell>
                  <TableCell className="header-cell">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendanceData.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                    <TableCell
                      style={{
                        color: entry.status === 'present' ? '#086308' : '#f22028',
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                      }}
                    >
                      {entry.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </RoleLayout>
  );
};

export default ViewAttendancePage;
