import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Chat from './Chat';
import Auth from './Auth';

const AppRoutes = () => {
  const navigate = useNavigate();

  const handleLogin = (username) => {
    localStorage.setItem('username', username);
    navigate('/chatbot', { state: { greeting: `Welcome, ${username}!` } });
  };

  return (
    <Routes>
      <Route path="/" element={<Auth onLogin={handleLogin} />} />
      <Route path="/chatbot" element={<Chat />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <AppRoutes/>
    </Router>
  );
};

export default App;
