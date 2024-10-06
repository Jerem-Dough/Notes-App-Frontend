import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token');  // Check if the user is logged in

  return (
    <>
      {/* Main content goes here */}
      <Container maxWidth="lg" style={{ marginTop: isLoggedIn ? '40px' : '0' }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
