import React, { useEffect, useState } from 'react';
import RoleLayout from '../../components/RoleLayout';
import './RaiseDisputePage.css';
import {
  TextField,
  Button,
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
  const userId = localStorage.getItem('userId');
  const fullname = localStorage.getItem('fullName');
  const course = localStorage.getItem('course');

  const [formData, setFormData] = useState({
    date: '',
    reason: '',
  });

  const [disputes, setDisputes] = useState([]);

  useEffect(() => {
    const fetchDisputes = async () => {
      if (!userId) return;
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
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation before sending
    if (!fullname || !course || !userId) {
      alert('User information is missing. Please login again.');
      return;
    }
    if (!formData.date || !formData.reason) {
      alert('Please fill in all fields.');
      return;
    }

    const payload = {
      fullname,
      course,
      userId,
      date: formData.date,
      reason: formData.reason,
    };

    console.log('Submitting dispute:', payload);

    try {
      const res = await fetch('http://localhost:5000/api/disputes/raise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('Dispute submitted successfully!');
        setFormData({ date: '', reason: '' });

        // Refresh disputes
        const updatedRes = await fetch(`http://localhost:5000/api/disputes/user/${userId}`);
        const updatedData = await updatedRes.json();
        setDisputes(updatedData);
      } else {
        const errData = await res.json();
        alert(`Failed to submit: ${errData.message}`);
        console.error('Backend error response:', errData);
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
                        color:
                          d.status === 'Resolved' ? 'green' :
                          d.status === 'Dismissed' ? 'red' : 'orange'
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
