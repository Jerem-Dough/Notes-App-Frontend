import React from 'react';
import { Box, Typography, Switch } from '@mui/material';

const Header = ({ darkMode, setDarkMode }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: darkMode ? '#6a1b9a' : '#1976d2', // Purple in dark mode, blue in light mode
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
        width: '100%', // Adjust the width to match design
        marginLeft: 'auto',
        marginRight: 'auto', // Center the header horizontally
        color: '#ffffff',
      }}
    >
      <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
        Jeremy's Notes App
      </Typography>
      <Box display="flex" alignItems="center">
        <Typography variant="body1" sx={{ marginRight: 1 }}>
          Dark Mode
        </Typography>
        <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
      </Box>
    </Box>
  );
};

export default Header;
