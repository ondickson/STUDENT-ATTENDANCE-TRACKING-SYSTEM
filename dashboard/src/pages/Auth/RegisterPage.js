import { TextField, Button, Paper, MenuItem } from '@mui/material';
import './RegisterPage.css';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
 
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Registration successful!');
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
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          <TextField
            select
            label="Course"
            name="course"
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
