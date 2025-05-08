import React, { useState } from 'react';
import RoleLayout from '../../components/RoleLayout';
import './MarkAttendancePage.css';
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

const MarkAttendancePage = () => {
  const [course, setCourse] = useState('');
  const [students, setStudents] = useState([
    { id: 1, name: 'Juan Dela Cruz', course: 'BSIT', year: '1st Year', present: false },
    { id: 2, name: 'Maria Santos', course: 'BSCS', year: '2nd Year', present: false },
    { id: 3, name: 'Pedro Reyes', course: 'BSEd', year: '3rd Year', present: false },
    { id: 4, name: 'Carlos Tan', course: 'BSIT', year: '1st Year', present: false },
  ]);

  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  };

  const handleAttendanceChange = (id, status) => {
    const updatedStudents = students.map((student) =>
      student.id === id ? { ...student, present: status } : student
    );
    setStudents(updatedStudents);
  };

  const handleSubmitAttendance = () => {
    // Logic for submitting attendance (could be an API call)
    console.log('Attendance submitted:', students);
  };

  const presentCount = students.filter(student => student.present).length;

  return (
    <RoleLayout>
      <div className="mark-attendance-page">
        <h1 variant="h4" className="mark-attendance-header">
          Mark Attendance
        </h1>

        <FormControl className="course-select" fullWidth>
          <InputLabel>Course</InputLabel>
          <Select value={course} onChange={handleCourseChange} label="Course">
            <MenuItem value="BSIT">BSIT</MenuItem>
            <MenuItem value="BSCS">BSCS</MenuItem>
            <MenuItem value="BSEd">BSEd</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="h6" className="attendance-summary">
          {`Present: ${presentCount} / ${students.length}`}
        </Typography>

        <TableContainer component={Paper} className="attendance-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student Name</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Attendance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell>{student.year}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color={student.present ? 'success' : 'primary'}
                      onClick={() => handleAttendanceChange(student.id, true)}
                      style={{
                        marginRight: '10px',
                        backgroundColor: student.present ? '#086308' : '',
                        color: student.present ? '#fff' : '#086308',
                      }}
                    >
                      Present
                    </Button>
                    <Button
                      variant="outlined"
                      color={!student.present ? 'error' : 'primary'}
                      onClick={() => handleAttendanceChange(student.id, false)}
                      style={{
                        backgroundColor: !student.present ? '#f22028' : '',
                        color: !student.present ? '#fff' : '#f22028',
                      }}
                    >
                      Absent
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmitAttendance}
          className="submit-button"
          style={{
            backgroundColor: '#086308',
            color: '#fff',
            marginTop: '20px',
          }}
        >
          Submit Attendance
        </Button>
      </div>
    </RoleLayout>
  );
};

export default MarkAttendancePage;
