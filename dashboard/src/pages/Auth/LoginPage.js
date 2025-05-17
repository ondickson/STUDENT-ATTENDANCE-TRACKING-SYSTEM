import { useState } from 'react';
import { TextField, Button, Container, Box } from '@mui/material';
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password,
    });

    const { token, role, user } = response.data;

    // Save token and role
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);

    // Save entire user object as JSON string for easy access
    localStorage.setItem('user', JSON.stringify(user));

    // Also save individual user properties separately for backward compatibility
    localStorage.setItem('userId', user.id);
    localStorage.setItem('fullName', user.fullName);
    localStorage.setItem('email', user.email);
    localStorage.setItem('course', user.course);
    localStorage.setItem('year', user.year);

    console.log(`✅ Logged in as ${role}`);

    // Redirect based on role
    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else if (role === 'faculty') {
      navigate('/faculty/dashboard');
    } else if (role === 'student') {
      navigate('/student/dashboard');
    } else {
      setError('Unknown role. Contact admin.');
    }
  } catch (err) {
    console.error('❌ Login error:', err);
    setError(err.response?.data?.message || 'Login failed. Try again.');
  }
};


  return (
    <div className="login-wrapper">
      <Container component="main" maxWidth="xs" className="login-container">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '70vh',
          }}
        >
          <form className="login-form" onSubmit={handleLogin}>
            <h1 className="login-header">Login</h1>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="login-button"
              sx={{ marginTop: 2 }}
              style={{ backgroundColor: '#086308', color: '#fff' }}
            >
              Log In
            </Button>
          </form>
        </Box>
      </Container>

      <p>
        Don't have an account?{' '}
        <Link
          to="/register"
          style={{ color: 'blue', textDecoration: 'underline' }}
        >
          Register here
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
