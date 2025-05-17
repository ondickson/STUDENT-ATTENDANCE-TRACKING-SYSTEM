import React, { useEffect, useState } from 'react';
import RoleLayout from '../../components/RoleLayout';
import './StudentDashboard.css';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import axios from 'axios';

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [attendanceStats, setAttendanceStats] = useState(null);

  useEffect(() => {
    // Get student info from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setStudent(storedUser);

    // Fetch attendance stats if user exists
    if (storedUser?.id) {
      axios
        .get(`http://localhost:5000/api/attendance/stats/${storedUser.id}`)
        .then((res) => setAttendanceStats(res.data))
        .catch((err) => {
          console.error('⚠️ Error fetching attendance stats:', err);
          setAttendanceStats({ totalClasses: 0, attended: 0, absences: 0 });
        });
    }
  }, []);

  const attendancePercentage = attendanceStats
    ? Math.round((attendanceStats.attended / attendanceStats.totalClasses) * 100)
    : 0;

  return (
    <RoleLayout>
      <div className="student-dashboard">
        <h1 className="dashboard-title">
          Welcome, {student?.fullName || 'Student'}
        </h1>

        <Grid container spacing={3} className="dashboard-grid">
          <Grid item xs={12} md={4}>
            <Card className="dashboard-card" style={{ borderTop: '6px solid #086308' }}>
              <CardContent>
                <Typography variant="h6">Course</Typography>
                <Typography variant="body1">{student?.course || '—'}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card className="dashboard-card" style={{ borderTop: '6px solid #086308' }}>
              <CardContent>
                <Typography variant="h6">Attendance</Typography>
                <Typography variant="body1">
                  {attendanceStats ? `${attendanceStats.attended} / ${attendanceStats.totalClasses} (${attendancePercentage}%)` : 'Loading...'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card className="dashboard-card" style={{ borderTop: '6px solid #f22028' }}>
              <CardContent>
                <Typography variant="h6">Absences</Typography>
                <Typography variant="body1">
                  {attendanceStats ? attendanceStats.absences : 'Loading...'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </RoleLayout>
  );
};

export default StudentDashboard;
