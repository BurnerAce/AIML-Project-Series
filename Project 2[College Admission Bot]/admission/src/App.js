import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './ChatPage';
import Auth from './Authen';

const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/chatbot" element={<Chat />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
