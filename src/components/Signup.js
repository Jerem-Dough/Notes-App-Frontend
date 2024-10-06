import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      navigate('/login');  // Redirect to login after successful signup
    } else {
      const data = await response.json();
      console.error('Signup failed:', data.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid container direction="column" justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Typography variant="h4" gutterBottom>Sign Up</Typography>
        <form onSubmit={handleSignup} style={{ width: '100%' }}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth style={{ marginTop: '20px' }}>
            Create Account
          </Button>
        </form>
        <Link href="/login" style={{ marginTop: '20px' }}>
          Already have an account? Login
        </Link>
      </Grid>
    </Container>
  );
};

export default Signup;
