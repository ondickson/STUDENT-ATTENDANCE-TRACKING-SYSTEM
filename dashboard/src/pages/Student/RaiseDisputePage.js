import React, { useState } from 'react';
import RoleLayout from '../../components/RoleLayout';
import './RaiseDisputePage.css';
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Paper,
  // Typography,
} from '@mui/material';

const RaiseDisputePage = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    course: '',
    date: '',
    reason: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dispute submitted:', formData);
    alert('Dispute submitted successfully!');
    setFormData({ fullname: '', course: '', date: '', reason: '' });
  };

  return (
    <RoleLayout>
      <div className="raise-dispute-page">
        <Paper className="dispute-form-container" elevation={3}>
          <h1 variant="h4" className="dispute-title">
            Raise Attendance Dispute
          </h1>

          <form onSubmit={handleSubmit} className="dispute-form">
            <TextField
              label="Full Name"
              name="fullname"
              fullWidth
              className="form-field"
              value={formData.fullname}
              onChange={handleChange}
              required
            />

            <FormControl fullWidth className="form-field" required>
              <InputLabel>Course</InputLabel>
              <Select
                value={formData.course}
                onChange={handleChange}
                name="course"
                label="Course"
              >
                <MenuItem value="BSIT">BSIT</MenuItem>
                <MenuItem value="BSCS">BSCS</MenuItem>
                <MenuItem value="BSEd">BSEd</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Date of Attendance"
              type="date"
              name="date"
              fullWidth
              className="form-field"
              value={formData.date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />

            <TextField
              label="Reason for Dispute"
              multiline
              rows={4}
              name="reason"
              fullWidth
              className="form-field"
              value={formData.reason}
              onChange={handleChange}
              required
            />

            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: '#086308', color: '#fff' }}
            >
              Submit Dispute
            </Button>
          </form>
        </Paper>
      </div>
    </RoleLayout>
  );
};

export default RaiseDisputePage;
