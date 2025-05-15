import React, { useEffect, useState } from 'react';
import RoleLayout from '../../components/RoleLayout';
import './AttendanceReportPage.css';
import {
  // Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

const AttendanceReportPage = () => {
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get('/api/users/students-with-attendance');
        setStudents(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching students:', err);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) => {
    const courseMatch = selectedCourse
      ? student.course === selectedCourse
      : true;
    const yearMatch = selectedYear
      ? student.year === parseInt(selectedYear)
      : true;
    return courseMatch && yearMatch;
  });

  return (
    <RoleLayout>
      <h1 className="page-title">Attendance Report</h1>

      <div className="filter-section">
        <FormControl className="filter-control">
          <InputLabel id="course-label">Course</InputLabel>
          <Select
            labelId="course-label"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
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
          </Select>
        </FormControl>

        <FormControl className="filter-control">
          <InputLabel id="year-label">Year</InputLabel>
          <Select
            labelId="year-label"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="1">1st Year</MenuItem>
            <MenuItem value="2">2nd Year</MenuItem>
            <MenuItem value="3">3rd Year</MenuItem>
            <MenuItem value="4">4th Year</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="report-table">
        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <CircularProgress />
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Course</th>
                <th>Year</th>
                <th>Total Classes</th>
                <th>Attended</th>
                <th>Absent</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => {
                  const attendance = student.attendance || []; // fallback to empty array
                  const total = attendance.length;
                  const attended = attendance.filter(
                    (a) => a.status === 'present',
                  ).length;
                  const absent = total - attended;

                  return (
                    <tr key={index}>
                      <td>{student.fullName}</td>
                      <td>{student.course}</td>
                      <td>{student.year}</td>
                      <td>{total}</td>
                      <td>{attended}</td>
                      <td>{absent}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6">No students found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </RoleLayout>
  );
};

export default AttendanceReportPage;
