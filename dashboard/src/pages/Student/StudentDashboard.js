import React from 'react';
import RoleLayout from '../../components/RoleLayout';
import './StudentDashboard.css';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  // You could fetch this data from backend in real implementation
  const studentName = 'Juan Dela Cruz';
  const course = 'BSIT';
  const attendanceStats = {
    totalClasses: 50,
    attended: 45,
    absences: 5,
  };

  const attendancePercentage = Math.round((attendanceStats.attended / attendanceStats.totalClasses) * 100);

  return (
    <RoleLayout>
      <div className="student-dashboard">
        <h1 variant="h4" className="dashboard-title">
          Welcome, {studentName}
        </h1>

        <Grid container spacing={3} className="dashboard-grid">
          <Grid item xs={12} md={4}>
            <Card className="dashboard-card" style={{ borderTop: '6px solid #086308' }}>
              <CardContent>
                <Typography variant="h6">Course</Typography>
                <Typography variant="body1">{course}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card className="dashboard-card" style={{ borderTop: '6px solid #086308' }}>
              <CardContent>
                <Typography variant="h6">Attendance</Typography>
                <Typography variant="body1">{attendanceStats.attended} / {attendanceStats.totalClasses} ({attendancePercentage}%)</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card className="dashboard-card" style={{ borderTop: '6px solid #f22028' }}>
              <CardContent>
                <Typography variant="h6">Absences</Typography>
                <Typography variant="body1">{attendanceStats.absences}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <div className="dashboard-actions">
          <Button
            variant="contained"
            component={Link}
            to="/student/view-attendance"
            style={{ backgroundColor: '#086308', color: '#fff' }}
          >
            View Attendance
          </Button>

          <Button
            variant="contained"
            component={Link}
            to="/student/class-schedule"
            style={{ backgroundColor: '#086308', color: '#fff' }}
          >
            Class Schedule
          </Button>

          <Button
            variant="contained"
            component={Link}
            to="/student/raise-dispute"
            style={{ backgroundColor: '#f22028', color: '#fff' }}
          >
            Raise Dispute
          </Button>
        </div>
      </div>
    </RoleLayout>
  );
};

export default StudentDashboard;
