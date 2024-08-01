import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Chat.css'; // Import the CSS file
import botImg from './bot.jpg'; // Import bot image
import { FaArrowRight } from 'react-icons/fa'; // Import the arrow icon

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userImg, setUserImg] = useState('');
  const [logoutPopup, setLogoutPopup] = useState(false); // Added state for logout popup
  const chatBoxRef = useRef(null); // Create a ref for the chat box
  const navigate = useNavigate();
  axios.defaults.withCredentials=true;
  useEffect(() => {
    const username = localStorage.getItem('username');
    const profilePicture = localStorage.getItem('profilePicture');
    if (username && profilePicture) {
      setIsLoggedIn(true);
      setUserImg(profilePicture);
      // Send greeting message
      setMessages([{ user: 'Bot', text: `Hi ${username}! How can I help you today?` }]);
    }
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the chat box whenever messages change
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    const username = localStorage.getItem('username');
    const loc = localStorage.getItem('location');

    const response = await axios.post('https://aiml-project-series.vercel.app/api/chat', { userId: username, loc: loc, message: input });
    setMessages([...messages, { user: 'You', text: input }, { user: 'Bot', text: response.data.response }]);
    setInput('');
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('profilePicture');
    navigate('/');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="center-box">
        <p>You must be logged in first to talk to our chatbot</p>
        <button onClick={() => navigate('/')}>Sign In/Log In</button>
      </div>
    );
  }

  return (
    <div className={`chat-container `}>
      <button className="logout-button" onClick={() => setLogoutPopup(true)}>Logout</button>
      <header>
        <h1>BurnerAce</h1>
        <p>A friendly chatbot</p>
        <p>Still learning to answer</p>
      </header>
      <div className="chat-box scrollable" ref={chatBoxRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.user === 'You' ? 'user-message' : 'bot-message'}`}>
            <img src={msg.user === 'You' ? userImg : botImg} alt={msg.user} className="avatar" />
            <div className="text">
              <strong>{msg.user}:</strong> {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress} // Handle the "Enter" key press
        />
        <button onClick={sendMessage}>
          <FaArrowRight />
        </button>
      </div>

      {logoutPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>You are leaving so soon 😢</p>
            <p>Are you sure you want to logout?</p>
            <button className='cancel-button' onClick={() => setLogoutPopup(false)}>Cancel</button>
            <button className='logout_button' onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
