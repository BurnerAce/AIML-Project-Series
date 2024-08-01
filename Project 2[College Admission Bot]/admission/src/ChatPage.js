import React, { useState } from 'react';
import './ChatPage.css';
import { Button, Input } from '@chakra-ui/react';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { type: 'user', text: inputValue }]);
      setInputValue('');
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: 'bot', text: 'Here is the bot response.' },
        ]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-content">
        <div className="chat-header">
          <h1 className="chat-heading">Admisser Bot</h1>
          <p className="chat-subtext">
            Here to solve your college admission-related queries
          </p>
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
              
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
