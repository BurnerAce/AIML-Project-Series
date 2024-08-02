import React, { useState, useEffect } from 'react';
import './ChatPage.css';
import { Button, Input } from '@chakra-ui/react';
import axios from 'axios';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  // Retrieve username from localStorage
  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      setMessages([{ type: 'bot', text: `Welcome, ${username}! How can I assist you today?` }]);
    }
  }, []);

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      setMessages([...messages, { type: 'user', text: inputValue }]);
      setInputValue('');

      try {
        const response = await axios.post('http://localhost:5000/api/chat', {
          message: inputValue,
        });
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: 'bot', text: response.data.text },
        ]);
      } catch (error) {
        console.log(error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: 'bot', text: 'Sorry, I could not process your request.' },
        ]);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    window.location.href = '/';
  };

  return (
    <div className="chat-container">
      <div className="chat-content">
        <div className="chat-header">
          <h1 className="chat-heading">Admisser Bot</h1>
          <p className="chat-subtext">
            Here to solve your college admission-related queries
          </p>
          <Button className="logout-button" onClick={() => setShowLogoutPopup(true)}>
            Logout
          </Button>
        </div>
        <div className="chat-box">
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${
                  message.type === 'bot' ? 'chat-message-bot' : 'chat-message-user'
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="chat-input-box">
            <Input
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="chat-input"
            />
            <Button onClick={handleSendMessage} className="chat-send-button">
              ➤
            </Button>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="logout-popup-overlay">
          <div className="logout-popup">
            <p>Are you sure you want to logout?</p>
            <div className="logout-popup-buttons">
              <Button onClick={() => setShowLogoutPopup(false)}>Cancel</Button>
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
