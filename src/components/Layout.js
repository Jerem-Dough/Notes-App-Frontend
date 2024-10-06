import React from 'react';
import { Container } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token'); 

  return (
    <>
      <Container maxWidth="lg" style={{ marginTop: isLoggedIn ? '40px' : '0' }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
