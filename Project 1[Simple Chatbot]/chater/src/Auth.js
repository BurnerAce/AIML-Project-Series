import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Import the CSS file
import dp1 from './dps/dp1.jpg';
import dp2 from './dps/dp2.jpeg';
import dp3 from './dps/dp3.jpeg';
import dp4 from './dps/dp4.jpeg';
import dp5 from './dps/dp5.jpeg';
import dp6 from './dps/dp6.jpeg';
import dp7 from './dps/dp7.jpeg';

const Auth = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState('sign-in');
  const [signInData, setSignInData] = useState({ name: '', password: '', location: '', dp: dp1 });
  const [loginData, setLoginData] = useState({ name: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData({ ...signInData, [name]: value });
  };
  
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signInData),
      });
      const data = await response.json();
      if (data.success) {
        alert('You have been signed in');
        console.log(data.user);
        localStorage.setItem('username', data.user.name);
        localStorage.setItem('profilePicture', data.user.profilePicture);
        localStorage.setItem('location', data.user.location);
        onLogin(data.user.name);
        navigate('/chatbot');
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setError('An error occurred. Please try again.');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('username', data.user.name);
        localStorage.setItem('location', data.user.location);
        localStorage.setItem('profilePicture', data.user.profilePicture);
        onLogin(data.user.name);
        navigate('/chatbot');
      } else {
        setError('Incorrect name or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred. Please try again.');
    }
  };

  const handleDpChange = (dp) => {
    setSignInData({ ...signInData, dp });
  };

  return (
    <div className="auth-container">
      <div className="tabs">
        <button className={activeTab === 'sign-in' ? 'active' : ''} onClick={() => setActiveTab('sign-in')}>Sign In</button>
        <button className={activeTab === 'login' ? 'active' : ''} onClick={() => setActiveTab('login')}>Login</button>
      </div>
      {activeTab === 'login' ? (
        <form onSubmit={handleLoginSubmit} className="form">
          <h2>Login</h2>
          <input type="text" name="name" placeholder="Name" value={loginData.name} onChange={handleLoginChange} required />
          <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} required />
          {error && <div className="error">{error}</div>}
          <button type="submit">Login</button>
        </form>
      ) : (
        <form onSubmit={handleSignInSubmit} className="form">
          <h2>Sign In</h2>
          <input type="text" name="name" placeholder="Name" value={signInData.name} onChange={handleSignInChange} required />
          <input type="password" name="password" placeholder="Password" value={signInData.password} onChange={handleSignInChange} required />
          <input type="text" name="location" placeholder="Location" value={signInData.location} onChange={handleSignInChange} required />
          <p>Choose your profile picture:</p>
          <div className="dp-selection">
            <img src={dp1} alt="dp1" className={signInData.dp === dp1 ? 'selected' : ''} onClick={() => handleDpChange(dp1)} />
            <img src={dp2} alt="dp2" className={signInData.dp === dp2 ? 'selected' : ''} onClick={() => handleDpChange(dp2)} />
            <img src={dp3} alt="dp3" className={signInData.dp === dp3 ? 'selected' : ''} onClick={() => handleDpChange(dp3)} />
            <img src={dp4} alt="dp4" className={signInData.dp === dp4 ? 'selected' : ''} onClick={() => handleDpChange(dp4)} />
            <img src={dp5} alt="dp5" className={signInData.dp === dp5 ? 'selected' : ''} onClick={() => handleDpChange(dp5)} />
            <img src={dp6} alt="dp6" className={signInData.dp === dp6 ? 'selected' : ''} onClick={() => handleDpChange(dp6)} />
            <img src={dp7} alt="dp7" className={signInData.dp === dp7 ? 'selected' : ''} onClick={() => handleDpChange(dp7)} />
          </div>
          <button type="submit">Sign In</button>
        </form>
      )}
    </div>
  );
};

export default Auth;
