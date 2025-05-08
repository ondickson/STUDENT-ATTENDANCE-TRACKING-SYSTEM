import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { TextField, Button, Container, Box } from '@mui/material';
import './LoginPage.css';

function LoginPage() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      role: 'admin',
    };

    login(userData);
  };

  return (
    <div className="login-wrapper">
      {/* Logo at the top, outside container */}
      <div className='login-logo-container'>
      <img src="/nvsulogo.jpeg" alt="NVSU Logo" className="login-logo" />
      </div>
      

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
          <form onSubmit={handleSubmit} className="login-form">
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
    </div>
  );
}

export default LoginPage;
