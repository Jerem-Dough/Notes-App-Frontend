import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from './Header';  // Import the shared Header component

const CreateNote = ({ darkMode, setDarkMode }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleCreateNote = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:5000/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
      navigate('/');
    } else {
      console.error('Failed to create note');
    }
  };

  return (
    <Container sx={{ paddingTop: '20px', minHeight: '100vh' }}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <Typography variant="h4" gutterBottom>Create a New Note</Typography>
      <form onSubmit={handleCreateNote}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          InputProps={{
            style: { color: darkMode ? '#ffffff' : '#000000' },  // White text in dark mode
          }}
          InputLabelProps={{
            style: { color: darkMode ? '#ffffff' : '#000000' },  // White label in dark mode
          }}
        />
        <TextField
          label="Content"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          InputProps={{
            style: { color: darkMode ? '#ffffff' : '#000000' },  // White text in dark mode
          }}
          InputLabelProps={{
            style: { color: darkMode ? '#ffffff' : '#000000' },  // White label in dark mode
          }}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{
            backgroundColor: darkMode ? '#6a1b9a' : '#1976d2',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: darkMode ? '#5a1281' : '#115293',
            },
          }}
        >
          Create Note
        </Button>
      </form>
    </Container>
  );
};

export default CreateNote;
