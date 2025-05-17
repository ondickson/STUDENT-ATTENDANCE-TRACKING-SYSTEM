import React, { useEffect, useState } from 'react';
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
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

const RaiseDisputePage = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    course: '',
    date: '',
    reason: '',
  });

  const [disputes, setDisputes] = useState([]);
  const userId = localStorage.getItem('userId');

  // Fetch disputes on mount
  useEffect(() => {
    const fetchDisputes = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/disputes/user/${userId}`);
        const data = await res.json();
        setDisputes(data);
      } catch (err) {
        console.error('Failed to fetch disputes:', err);
      }
    };

    fetchDisputes();
  }, [userId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/disputes/raise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userId }),
      });

      if (res.ok) {
        alert('Dispute submitted successfully!');
        setFormData({ fullname: '', course: '', date: '', reason: '' });

        // Refresh disputes
        const updatedRes = await fetch(`http://localhost:5000/api/disputes/user/${userId}`);
        const updatedData = await updatedRes.json();
        setDisputes(updatedData);
      } else {
        const errData = await res.json();
        alert(`Failed to submit: ${errData.message}`);
        console.log('Submitting:', { ...formData, userId });
        console.log('Response:', res);
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('An error occurred while submitting the dispute.');
    }
  };

  return (
    <RoleLayout>
      <div className="raise-dispute-page">
        <Paper className="dispute-form-container" elevation={3}>
          <Typography variant="h4" gutterBottom className="dispute-title">
            Raise Attendance Dispute
          </Typography>

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

        {/* Dispute History Table */}
        <div style={{ marginTop: '40px' }}>
          <Typography variant="h5" gutterBottom>
            My Submitted Disputes
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {disputes.map((d) => (
                  <TableRow key={d._id}>
                    <TableCell>{d.date}</TableCell>
                    <TableCell>{d.reason}</TableCell>
                    <TableCell>
                      <strong style={{
                        color: d.status === 'Resolved' ? 'green'
                          : d.status === 'Dismissed' ? 'red'
                          : 'orange'
                      }}>
                        {d.status}
                      </strong>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </RoleLayout>
  );
};

export default RaiseDisputePage;
