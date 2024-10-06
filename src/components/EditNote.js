import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const EditNote = () => {
  const { id } = useParams();  // Get the note ID from the URL
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  // Fetch the note data when the component mounts
  useEffect(() => {
    const fetchNote = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setTitle(data.title);
        setContent(data.content);
      } else {
        console.error("Error fetching note:", data.message);
      }
    };

    fetchNote();
  }, [id]);

  // Handle editing the note
  const handleEditNote = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const updatedNote = { title, content };

    const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedNote),
    });

    if (response.ok) {
      navigate('/');  // Redirect to home after editing
    } else {
      console.error('Error updating note:', await response.json());
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Edit Note</Typography>
      <form onSubmit={handleEditNote}>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Content"
          fullWidth
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          Save Changes
        </Button>
      </form>
    </Container>
  );
};

export default EditNote;
