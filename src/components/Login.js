import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Link, Switch } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiUrl}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      navigate('/');
    } else {
      console.error('Login failed:', data.message);
    }
  };

  // Update CSS variables for dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.style.setProperty('--background-color', '#121212');
      document.documentElement.style.setProperty('--text-color', '#e0e0e0');
      document.documentElement.style.setProperty('--box-background-color', '#1e1e1e');
      document.documentElement.style.setProperty('--button-color', '#bb86fc');
    } else {
      document.documentElement.style.setProperty('--background-color', '#f5f5f5');
      document.documentElement.style.setProperty('--text-color', '#333');
      document.documentElement.style.setProperty('--box-background-color', '#ffffff');
      document.documentElement.style.setProperty('--button-color', '#1976d2');
    }
  }, [darkMode]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '90vh',
        backgroundColor: 'var(--background-color)',
        padding: 0,
        margin: 0,
      }}
    >
      {}
      <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
        <Typography variant="body1" component="div" sx={{ color: 'var(--text-color)' }}>
          Dark Mode
        </Typography>
        <Switch
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          color="default"
        />
      </Box>

      {}
      <Typography variant="h3" gutterBottom style={{ whiteSpace: 'nowrap', color: 'var(--text-color)' }}>
        Jeremy's Notes App
      </Typography>

      <Box
        sx={{
          width: '100%',
          maxWidth: '400px',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'var(--box-background-color)',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: 'var(--text-color)' }}>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            inputProps={{ style: { fontSize: 18, padding: '10px', color: 'var(--text-color)' } }}
            InputLabelProps={{ style: { fontSize: 18, color: 'var(--text-color)' } }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            inputProps={{ style: { fontSize: 18, padding: '10px', color: 'var(--text-color)' } }}
            InputLabelProps={{ style: { fontSize: 18, color: 'var(--text-color)' } }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: '20px', padding: '10px', fontSize: '18px', backgroundColor: 'var(--button-color)' }}
          >
            Login
          </Button>
        </form>
        <Link href="/signup" sx={{ marginTop: '20px', display: 'block', fontSize: '16px', color: 'var(--text-color)' }}>
          Create an Account
        </Link>
      </Box>
    </Box>
  );
};

export default Login;
