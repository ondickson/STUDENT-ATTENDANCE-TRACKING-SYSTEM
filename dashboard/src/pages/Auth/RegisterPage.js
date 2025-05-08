import React, { useState } from 'react';
import { TextField, Button, Paper, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    course: '',
    year: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register data:', formData);
    // TODO: Send to backend using authService
    alert('Registration successful!');
    navigate('/login');
  };

  return (
    <div className="register-page">
      <Paper elevation={3} className="register-container">
        <h1 variant="h4" className="register-title">
          Student Registration
        </h1>

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
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
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
            <MenuItem value="1">1st Year</MenuItem>
            <MenuItem value="2">2nd Year</MenuItem>
            <MenuItem value="3">3rd Year</MenuItem>
            <MenuItem value="4">4th Year</MenuItem>
          </TextField>

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
    </div>
  );
};

export default RegisterPage;
