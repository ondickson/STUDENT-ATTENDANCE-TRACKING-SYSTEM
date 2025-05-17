import React, { useState, useEffect } from 'react';
import RoleLayout from '../../components/RoleLayout';
import './MarkAttendancePage.css';
import {
  Button,
  Box,
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
  TextField,
} from '@mui/material';

const MarkAttendancePage = () => {
  const [course, setCourse] = useState('');
  const [date, setDate] = useState(
    () => new Date().toISOString().split('T')[0],
  ); // Default to today
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/users');
        const data = await res.json();

        const filtered = data
          .filter((user) => user.role === 'student')
          .map((student) => ({
            id: student._id,
            name: student.fullName,
            course: student.course,
            year: student.year,
            present: null,
          }));

        setStudents(filtered);
      } catch (err) {
        console.error('Failed to fetch students:', err);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
  const fetchStudentsAndAttendance = async () => {
    try {
      const [usersRes, attendanceData] = await Promise.all([
        fetch('http://localhost:5000/api/users'),
        fetchAttendanceByDate(date),
      ]);
      const users = await usersRes.json();

      const attendanceMap = {};
      attendanceData.forEach((record) => {
        attendanceMap[record.userId] = record.status;
      });

      const filtered = users
        .filter((user) => user.role === 'student')
        .map((student) => ({
          id: student._id,
          name: student.fullName,
          course: student.course,
          year: student.year,
          present: attendanceMap[student._id] === 'present' ? true :
                   attendanceMap[student._id] === 'absent' ? false : null,
        }));

      setStudents(filtered);
    } catch (err) {
      console.error('Failed to fetch students or attendance:', err);
    }
  };

  fetchStudentsAndAttendance();
}, [date]); // rerun when `date` changes


  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleAttendanceChange = (id, status) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, present: status } : student,
      ),
    );
  };

  const handleSubmitAttendance = async () => {
    try {
      const attendanceData = students.map((student) => ({
        userId: student.id,
        date,
        status: student.present ? 'present' : 'absent',
      }));

      const response = await fetch(
        'http://localhost:5000/api/attendance/mark',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(attendanceData),
        },
      );

      if (response.ok) {
        alert('Attendance submitted successfully!');
      } else {
        alert('Failed to submit attendance.');
      }
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  const filteredStudents = course
    ? students.filter((student) => student.course === course)
    : students;

  const presentCount = filteredStudents.filter(
    (student) => student.present,
  ).length;

  const fetchAttendanceByDate = async (selectedDate) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/attendance/by-date?date=${selectedDate}`,
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch attendance:', error);
    return [];
  }
};


  return (
    <RoleLayout>
      <div className="mark-attendance-page">
        <h1 className="mark-attendance-header">Mark Attendance</h1>

        {/* Inside your return statement: */}
        <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={handleDateChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth>
            <InputLabel>Course</InputLabel>
            <Select value={course} onChange={handleCourseChange} label="Course">
              <MenuItem value="">All</MenuItem>
              <MenuItem value="BSA">BSA</MenuItem>
              <MenuItem value="BSMath">BSMath</MenuItem>
              <MenuItem value="BSCS">BSCS</MenuItem>
              <MenuItem value="BSIT">BSIT</MenuItem>
              <MenuItem value="BSAgrib">BSAgrib</MenuItem>
              <MenuItem value="BSBA">BSBA</MenuItem>
              <MenuItem value="BSCE">BSCE</MenuItem>
              <MenuItem value="BSHM">BSHM</MenuItem>
              <MenuItem value="BSF">BSF</MenuItem>
              <MenuItem value="BPEd">BPEd</MenuItem>
              <MenuItem value="BSEd">BSEd</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Typography variant="h6" className="attendance-summary">
          {`Present: ${presentCount} / ${filteredStudents.length}`}
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
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.course}</TableCell>
                    <TableCell>{student.year}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color={student.present === true ? 'success' : 'primary'}
                        onClick={() => handleAttendanceChange(student.id, true)}
                        style={{
                          marginRight: '10px',
                          backgroundColor:
                            student.present === true ? '#086308' : '',
                          color: student.present === true ? '#fff' : '#086308',
                        }}
                      >
                        Present
                      </Button>
                      <Button
                        variant="outlined"
                        color={student.present === false ? 'error' : 'primary'}
                        onClick={() =>
                          handleAttendanceChange(student.id, false)
                        }
                        style={{
                          backgroundColor:
                            student.present === false ? '#f22028' : '',
                          color: student.present === false ? '#fff' : '#f22028',
                        }}
                      >
                        Absent
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No students found for this course.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          onClick={handleSubmitAttendance}
          className="submit-button"
          sx={{ marginTop: 2, backgroundColor: '#086308', color: '#fff' }}
        >
          Submit Attendance
        </Button>
      </div>
    </RoleLayout>
  );
};

export default MarkAttendancePage;
