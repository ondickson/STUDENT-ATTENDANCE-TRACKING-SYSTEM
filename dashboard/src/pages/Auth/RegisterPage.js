import { useState } from 'react';
import { TextField, Button, Paper, MenuItem, Typography } from '@mui/material';
import './RegisterPage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    course: '',
    year: '',
  });

  const [feedback, setFeedback] = useState({ message: '', type: '' }); // type: 'success' or 'error'

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ message: '', type: '' });

    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/register',
        formData,
      );
      console.log('🟢 Registration success:', res.data);

      setFeedback({
        message: '✅ Registration successful! Redirecting to login...',
        type: 'success',
      });

      // Delay 2 seconds before redirecting
      setTimeout(() => {
        window.location.href = 'http://localhost:3000/';
      }, 2000);
    } catch (err) {
      console.error(
        '🔴 Registration error:',
        err.response?.data || err.message,
      );

      setFeedback({
        message: `❌ Registration failed: ${
          err.response?.data?.message || err.message
        }`,
        type: 'error',
      });
    }
  };

  return (
    <div className="register-page">
      <Paper elevation={3} className="register-container">
        <h1 className="register-title">Student Registration</h1>

        <form onSubmit={handleSubmit} className="register-form">
          <TextField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            select
            label="Course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          >
            {[
              'BSA',
              'BSMath',
              'BSCS',
              'BSIT',
              'BSAgrib',
              'BSBA',
              'BSCE',
              'BSHM',
              'BSF',
              'BPEd',
            ].map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Year Level"
            name="year"
            value={formData.year}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          >
            {[1, 2, 3, 4].map((y) => (
              <MenuItem key={y} value={y}>{`${y}st Year`}</MenuItem>
            ))}
          </TextField>

          {feedback.message && (
            <Typography
              variant="body1"
              sx={{
                mb: 2,
                color: feedback.type === 'success' ? 'green' : 'red',
              }}
            >
              {feedback.message}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: '#086308', color: '#fff' }}
            fullWidth
          >
            Register
          </Button>
        </form>
      </Paper>

      <p>
        Already have an account?{' '}
        <Link to="/" style={{ color: 'blue', textDecoration: 'underline' }}>
          Login here
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
