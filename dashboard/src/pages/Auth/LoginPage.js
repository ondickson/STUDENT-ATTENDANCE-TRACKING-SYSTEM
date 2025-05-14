import { TextField, Button, Container, Box } from '@mui/material';
import './LoginPage.css';
import { Link } from 'react-router-dom';

function LoginPage() {

  return (
    <div className="login-wrapper">
      {/* Logo at the top, outside container */}
      {/* <div className='login-logo-container'>
      <img src="/nvsulogo.jpeg" alt="NVSU Logo" className="login-logo" />
      </div> */}
      

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
          <form className="login-form">
            <h1 className="login-header">Login</h1>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email"
              type="email"
              className="login-input"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
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
