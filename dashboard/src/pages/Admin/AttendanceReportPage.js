// src/pages/Admin/AttendanceReportPage.js
import React from 'react';
import RoleLayout from '../../components/RoleLayout';
import './AttendanceReportPage.css';
import {
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';

const AttendanceReportPage = () => {
  return (
    <RoleLayout>
      <h1 className="page-title">Attendance Report</h1>

      <div className="filter-section">
        <FormControl className="filter-control">
          <InputLabel id="course-label" fullWidth>Course</InputLabel>
          <Select labelId="course-label" defaultValue="Course" >
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
          <Select labelId="year-label" defaultValue="1st Year">
            <MenuItem value="1">1st Year</MenuItem>
            <MenuItem value="2">2nd Year</MenuItem>
            <MenuItem value="3">3rd Year</MenuItem>
            <MenuItem value="4">4th Year</MenuItem>
          </Select>
        </FormControl>

        <Button className="generate-button" variant="contained" color="success">
          Generate Report
        </Button>
      </div>

      <div className="report-table">
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
            <tr>
              <td>Juan Dela Cruz</td>
              <td>BSIT</td>
              <td>3</td>
              <td>45</td>
              <td>42</td>
              <td>3</td>
            </tr>
            <tr>
              <td>Maria Santos</td>
              <td>BSCS</td>
              <td>2</td>
              <td>45</td>
              <td>43</td>
              <td>2</td>
            </tr>
          </tbody>
        </table>
      </div>
    </RoleLayout>
  );
};

export default AttendanceReportPage;
