import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const CreateNote = ({ darkMode, setDarkMode }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleCreateNote = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const response = await fetch(`${apiUrl}/api/notes`, {
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
            style: { color: darkMode ? '#ffffff' : '#000000' },
          }}
          InputLabelProps={{
            style: { color: darkMode ? '#ffffff' : '#000000' },
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
            style: { color: darkMode ? '#ffffff' : '#000000' },
          }}
          InputLabelProps={{
            style: { color: darkMode ? '#ffffff' : '#000000' },
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
