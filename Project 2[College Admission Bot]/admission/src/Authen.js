import React, { useState } from 'react';
import './Authen.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Button, Input, FormLabel } from '@chakra-ui/react';
import axios from 'axios';
import logo from './Design.jpeg';
import 'react-tabs/style/react-tabs.css';

export default function Authen() {
  const [signInForm, setSignInForm] = useState({ email: '', password: '' });
  const [signUpForm, setSignUpForm] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
  });

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signin', signInForm);
      console.log('Sign In Successful:', response);
      // const data = await response.json();
      // Save the user's name in localStorage
      localStorage.setItem('username', response.data.user.name);

      window.location.href = '/chatbot';
    } catch (error) {
      console.error('Sign In Error:', error.response.data.error);
      alert('Invalid credentials. Please try again.');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', signUpForm);
      console.log('Sign Up Successful:', response.data);

      // Save the user's name in localStorage
      localStorage.setItem('username', signUpForm.name);

      window.location.href = '/chatbot';
    } catch (error) {
      console.error('Sign Up Error:', error.response.data.error);
      alert('Registration failed. Please try again.');
    }
  };


  return (
    <div className="sign-container">
      <div className="sign-content">
        <div>
          <img src={logo} alt="Chatbot Logo" className="sign-logo" />
          <h2 className="sign-heading">Sign in to your account</h2>
        </div>
        <Tabs className="sign-tabs">
          <TabList className="sign-tabs-list">
            <Tab>Sign In</Tab>
            <Tab>Sign Up</Tab>
          </TabList>

          <TabPanel>
            <form className="sign-form" onSubmit={handleSignIn}>
              <div>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={signInForm.email}
                  onChange={(e) => setSignInForm({ ...signInForm, email: e.target.value })}
                />
              </div>
              <div>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  required
                  value={signInForm.password}
                  onChange={(e) => setSignInForm({ ...signInForm, password: e.target.value })}
                />
              </div>
              <Button type="submit" className="sign-button">
                Sign in
              </Button>
            </form>
          </TabPanel>

          <TabPanel>
            <form className="sign-form" onSubmit={handleSignUp}>
              <div>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={signUpForm.name}
                  onChange={(e) => setSignUpForm({ ...signUpForm, name: e.target.value })}
                />
              </div>
              <div>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={signUpForm.email}
                  onChange={(e) => setSignUpForm({ ...signUpForm, email: e.target.value })}
                />
              </div>
              <div>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  required
                  value={signUpForm.password}
                  onChange={(e) => setSignUpForm({ ...signUpForm, password: e.target.value })}
                />
              </div>
              <div>
                <FormLabel htmlFor="location">Location</FormLabel>
                <Input
                  id="location"
                  type="text"
                  placeholder="City, Country"
                  required
                  value={signUpForm.location}
                  onChange={(e) => setSignUpForm({ ...signUpForm, location: e.target.value })}
                />
              </div>
              <Button type="submit" className="sign-button">
                Sign up
              </Button>
            </form>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
