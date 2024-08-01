import React from 'react';
import './Authen.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Button, Input, FormLabel } from '@chakra-ui/react';
import logo from './Design.jpeg';
import 'react-tabs/style/react-tabs.css';

export default function Authen() {
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
            <form className="sign-form">
              <div>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input id="email" type="email" placeholder="name@example.com" required />
              </div>
              <div>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="sign-button">
                Sign in
              </Button>
            </form>
          </TabPanel>

          <TabPanel>
            <form className="sign-form">
              <div>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input id="name" type="text" placeholder="John Doe" required />
              </div>
              <div>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input id="email" type="email" placeholder="name@example.com" required />
              </div>
              <div>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input id="password" type="password" required />
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
