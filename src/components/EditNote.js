import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const EditNote = () => {
  const { id } = useParams();  // Note ID from the URL params
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  // Fetch the specific note by ID when the component loads
  useEffect(() => {
    const fetchNote = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/api/notes/${id}`, {  // Fetch note by ID
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
  }, [id]);  // Ensure it refetches if `id` changes

  // Handle the form submission to update the note
  const handleEditNote = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const updatedNote = { title, content };

    // Send the PUT request to update the specific note by ID
    const response = await fetch(`${apiUrl}/api/notes/${id}`, {  // Update note by ID
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedNote),
    });

    if (response.ok) {
      navigate('/');  // Navigate back to the homepage or notes list
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
