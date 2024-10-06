import React, { useEffect, useState } from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from './Header';  // Import the new Header component

const Dashboard = ({ darkMode, setDarkMode }) => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  // Fetch notes when the component mounts
  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/notes', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      setNotes(data);
    };

    fetchNotes();
  }, []);

  return (
    <Container sx={{ paddingTop: '20px', minHeight: '100vh', maxHeight: '100vh', overflowY: 'auto' }}>
      {/* Use the shared Header component */}
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Notes Section */}
      <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
        <Typography variant="h4" gutterBottom>Your Notes</Typography>

        {/* Button to create a new note */}
        <Button
          variant="contained"
          sx={{
            marginBottom: '20px',
            backgroundColor: darkMode ? '#6a1b9a' : '#1976d2',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: darkMode ? '#5a1281' : '#115293',
            },
          }}
          onClick={() => navigate('/create')}
        >
          Add New Note
        </Button>
      </Box>

      {/* Notes Grid */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column', // Stack notes vertically
          gap: '20px',  // Space between notes
          overflowY: 'auto',  // Enable scrolling for the notes section
        }}
      >
        {notes.length > 0 ? (
          notes.map((note) => (
            <Box
              key={note._id}
              sx={{
                padding: '20px',
                backgroundColor: 'var(--box-background-color)',
                borderRadius: '8px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                textAlign: 'left',
                wordWrap: 'break-word',  // Ensure long text breaks properly
                overflowWrap: 'anywhere',  // Allow text to break within words
                minWidth: '300px',  // Set a minimum width for notes
              }}
            >
              <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                {note.title}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                {note.content}
              </Typography>

              {/* Edit Button */}
              <Button
                variant="outlined"
                sx={{
                  color: darkMode ? '#6a1b9a' : '#1976d2',  // Purple in dark mode, blue in light mode
                  borderColor: darkMode ? '#6a1b9a' : '#1976d2',
                  '&:hover': {
                    backgroundColor: darkMode ? '#5a1281' : '#115293',
                    borderColor: darkMode ? '#5a1281' : '#115293',
                  },
                  marginRight: '10px',
                }}
                onClick={() => navigate(`/edit/${note._id}`)}
              >
                Edit
              </Button>

              {/* Delete Button */}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#d32f2f', // Red for delete button
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#b71c1c',
                  },
                }}
                onClick={async () => {
                  const token = localStorage.getItem('token');
                  await fetch(`http://localhost:5000/api/notes/${note._id}`, {
                    method: 'DELETE',
                    headers: {
                      'Authorization': `Bearer ${token}`,
                    },
                  });
                  setNotes(notes.filter((n) => n._id !== note._id));
                }}
              >
                Delete
              </Button>
            </Box>
          ))
        ) : (
          <Typography>You currently have no notes.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default Dashboard;
