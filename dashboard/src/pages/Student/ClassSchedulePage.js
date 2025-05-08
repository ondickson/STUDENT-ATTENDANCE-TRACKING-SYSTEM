import React, { useState } from 'react';
import RoleLayout from '../../components/RoleLayout';
import './ClassSchedulePage.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ClassSchedulePage = () => {
  const [schedule] = useState([
    { id: 1, course: 'BSIT', day: 'Monday', time: '10:00 AM - 12:00 PM' },
    { id: 2, course: 'BSCS', day: 'Tuesday', time: '1:00 PM - 3:00 PM' },
    { id: 3, course: 'BSEd', day: 'Wednesday', time: '9:00 AM - 11:00 AM' },
  ]);

  return (
    <RoleLayout>
      <div className="class-schedule-page">
        <h1 variant="h4" className="class-schedule-header">
          My Class Schedule
        </h1>

        <TableContainer component={Paper} className="schedule-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course</TableCell>
                <TableCell>Day</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedule.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.course}</TableCell>
                  <TableCell>{item.day}</TableCell>
                  <TableCell>{item.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </RoleLayout>
  );
};

export default ClassSchedulePage;
