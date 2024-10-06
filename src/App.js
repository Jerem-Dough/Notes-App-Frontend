import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';  
import Dashboard from './components/Dashboard';
import CreateNote from './components/CreateNote';
import Signup from './components/Signup';
import Login from './components/Login';
import EditNote from './components/EditNote';  
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Global dark mode logic
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
    <Router>
      <Routes>
        <Route element={<Layout darkMode={darkMode} setDarkMode={setDarkMode} />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Dashboard darkMode={darkMode} setDarkMode={setDarkMode} /></PrivateRoute>} />
          <Route path="/create" element={<PrivateRoute><CreateNote darkMode={darkMode} setDarkMode={setDarkMode} /></PrivateRoute>} />
          <Route path="/edit/:id" element={<PrivateRoute><EditNote /></PrivateRoute>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;