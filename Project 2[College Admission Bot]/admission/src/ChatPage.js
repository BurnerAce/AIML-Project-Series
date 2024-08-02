import React, { useState, useEffect } from 'react';
import './ChatPage.css';
import { Button, Input } from '@chakra-ui/react';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [userStream, setUserStream] = useState('');

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      setMessages([{ type: 'bot', text: `Welcome, ${username}! How can I assist you today?` }]);
    }
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const userMsg = inputValue;
      setMessages([...messages, { type: 'user', text: userMsg }]);
      setInputValue('');

      let botReply = '';

      if (!userStream) {
        if (userMsg.toLowerCase().includes('engineering')) {
          botReply = 'You are interested in Engineering. The JEE Mains and Advanced are major exams for admission. JEE Mains is held for entry into NITs, IIITs, and other CFTIs, while JEE Advanced is for admission into IITs.';
          setUserStream('Engineering');
        } else if (userMsg.toLowerCase().includes('medicine')) {
          botReply = 'You are interested in Medicine. NEET is the primary exam for MBBS and BDS admissions. It covers topics from Physics, Chemistry, and Biology.';
          setUserStream('Medicine');
        } else if (userMsg.toLowerCase().includes('ca')) {
          botReply = 'You are interested in becoming a CA. The CA course has three levels: CA Foundation, CA Intermediate, and CA Final. The process includes passing exams and completing articleship.';
          setUserStream('CA');
        } else if (userMsg.toLowerCase().includes('law')) {
          botReply = 'You are interested in Law. For legal studies, you can take CLAT or LSAT. CLAT is for admissions to NLUs, while LSAT is accepted by various law schools.';
          setUserStream('Law');
        } else if (userMsg.toLowerCase().includes('ips')) {
          botReply = 'You are interested in becoming an IPS Officer. The IAS/IPS exam is conducted by UPSC and includes Prelims, Mains, and Interview stages.';
          setUserStream('IPS');
        } else {
          botReply = 'Please specify your stream (e.g., Engineering, Medicine, CA, Law, IPS).';
        }
      } else {
        // Handle questions based on the specified stream
        if (userStream === 'Engineering') {
          if (userMsg.toLowerCase().includes('top colleges')) {
            botReply = 'Top engineering colleges include: IIT Bombay, IIT Delhi, IIT Madras, NIT Trichy, and IIIT Hyderabad. They offer various engineering disciplines.';
          } else if (userMsg.toLowerCase().includes('fees')) {
            botReply = 'The fees for top engineering colleges can range from ₹1 lakh to ₹10 lakhs per year, depending on the institute and program.';
          } else if (userMsg.toLowerCase().includes('documents')) {
            botReply = 'For Engineering admissions, you generally need documents like: 10th and 12th mark sheets, JEE Mains/Advanced scorecard, ID proof, Passport-sized photographs, and Category certificate (if applicable).';
          } else if (userMsg.toLowerCase().includes('prerequisites')) {
            botReply = 'For Engineering, prerequisites usually include passing 10+2 with Physics, Chemistry, and Mathematics. Some institutes might have additional requirements.';
          } else if (userMsg.toLowerCase().includes('courses offered')) {
            botReply = 'Engineering offers courses like: B.Tech in Computer Science, Mechanical Engineering, Civil Engineering, Electrical Engineering, and Electronics & Communication.';
          } else if (userMsg.toLowerCase().includes('exams timing')) {
            botReply = 'JEE Mains is usually conducted in January and April, while JEE Advanced is in May. You should focus on Physics, Chemistry, and Mathematics for preparation.';
          } else if (userMsg.toLowerCase().includes('study tips')) {
            botReply = 'For Engineering, focus on solving previous years’ papers, practice mock tests regularly, and understand fundamental concepts thoroughly.';
          } else if (userMsg.toLowerCase().includes('what is it like studying')) {
            botReply = 'Engineering is challenging but rewarding. It involves rigorous coursework and practical applications. Expect a mix of theoretical learning and hands-on projects.';
          } else if (userMsg.toLowerCase().includes('change stream') || userMsg.toLowerCase().includes('other stream')) {
            botReply = 'Which stream would you like to know about? (e.g., Medicine, CA, Law, IPS)';
            setUserStream('');
          } else {
            botReply = 'For Engineering queries, please specify what you need to know.';
          }
        } else if (userStream === 'Medicine') {
          if (userMsg.toLowerCase().includes('top colleges')) {
            botReply = 'Top medical colleges include: AIIMS Delhi, PGIMER Chandigarh, JIPMER Puducherry, and CMC Vellore.';
          } else if (userMsg.toLowerCase().includes('fees')) {
            botReply = 'The fees for top medical colleges can range from ₹5 lakhs to ₹20 lakhs per year, depending on the institution.';
          } else if (userMsg.toLowerCase().includes('documents')) {
            botReply = 'For Medicine admissions, you generally need documents like: 10th and 12th mark sheets, NEET scorecard, ID proof, Passport-sized photographs, and Category certificate (if applicable).';
          } else if (userMsg.toLowerCase().includes('prerequisites')) {
            botReply = 'For Medicine, prerequisites include passing 10+2 with Physics, Chemistry, and Biology. You also need to qualify NEET.';
          } else if (userMsg.toLowerCase().includes('courses offered')) {
            botReply = 'Medicine offers courses like: MBBS, BDS, BAMS, BHMS, and BPT.';
          } else if (userMsg.toLowerCase().includes('exams timing')) {
            botReply = 'NEET is usually held in May. You should focus on Physics, Chemistry, and Biology for preparation.';
          } else if (userMsg.toLowerCase().includes('study tips')) {
            botReply = 'For Medicine, focus on NCERT textbooks, solve previous years’ papers, and keep up with medical journals and current affairs.';
          } else if (userMsg.toLowerCase().includes('what is it like studying')) {
            botReply = 'Studying Medicine involves extensive theoretical knowledge and practical skills. It can be demanding but offers the chance to make a significant impact on people’s lives.';
          } else if (userMsg.toLowerCase().includes('change stream') || userMsg.toLowerCase().includes('other stream')) {
            botReply = 'Which stream would you like to know about? (e.g., Engineering, CA, Law, IPS)';
            setUserStream('');
          } else {
            botReply = 'For Medicine queries, please specify what you need to know.';
          }
        } else if (userStream === 'CA') {
          if (userMsg.toLowerCase().includes('top institutes')) {
            botReply = 'Top CA institutes include: ICAI, EduPristine, and SuperProfs.';
          } else if (userMsg.toLowerCase().includes('fees')) {
            botReply = 'The fees for CA coaching can range from ₹30,000 to ₹1 lakh, depending on the course and institute.';
          } else if (userMsg.toLowerCase().includes('documents')) {
            botReply = 'For CA, you generally need documents like: 10th and 12th mark sheets, ID proof, CA registration proof, and Passport-sized photographs.';
          } else if (userMsg.toLowerCase().includes('prerequisites')) {
            botReply = 'For CA, prerequisites include passing 10+2. For CA Foundation, no additional requirements are needed.';
          } else if (userMsg.toLowerCase().includes('courses offered')) {
            botReply = 'CA offers courses like: CA Foundation, CA Intermediate, and CA Final. There are also specialized courses like CMA and CS.';
          } else if (userMsg.toLowerCase().includes('exams timing')) {
            botReply = 'CA Foundation exams are usually held in June and December. You should study Accounting, Law, and Economics.';
          } else if (userMsg.toLowerCase().includes('study tips')) {
            botReply = 'For CA, focus on understanding concepts deeply, practice extensively, and use resources like ICAI study material and previous years’ papers.';
          } else if (userMsg.toLowerCase().includes('what is it like studying')) {
            botReply = 'Studying CA involves a lot of dedication and self-study. It is rigorous but opens up rewarding career opportunities in finance and accounting.';
          } else if (userMsg.toLowerCase().includes('change stream') || userMsg.toLowerCase().includes('other stream')) {
            botReply = 'Which stream would you like to know about? (e.g., Engineering, Medicine, Law, IPS)';
            setUserStream('');
          } else {
            botReply = 'For CA queries, please specify what you need to know.';
          }
        } else if (userStream === 'Law') {
          if (userMsg.toLowerCase().includes('top colleges')) {
            botReply = 'Top law colleges include: National Law School of India University, National Academy of Legal Studies and Research, and National Law University.';
          } else if (userMsg.toLowerCase().includes('fees')) {
            botReply = 'The fees for top law colleges can range from ₹1 lakh to ₹10 lakhs per year, depending on the institute.';
          } else if (userMsg.toLowerCase().includes('documents')) {
            botReply = 'For Law admissions, you generally need documents like: 10th and 12th mark sheets, CLAT/LSAT scorecard, ID proof, Passport-sized photographs, and Category certificate (if applicable).';
          } else if (userMsg.toLowerCase().includes('prerequisites')) {
            botReply = 'For Law, prerequisites include passing 10+2 with a minimum percentage. You also need to qualify CLAT or LSAT.';
          } else if (userMsg.toLowerCase().includes('courses offered')) {
            botReply = 'Law offers courses like: BA LLB, BBA LLB, and LLM.';
          } else if (userMsg.toLowerCase().includes('exams timing')) {
            botReply = 'CLAT is usually held in May, and LSAT in June. Prepare with a focus on English, General Knowledge, Legal Reasoning, and Logical Reasoning.';
          } else if (userMsg.toLowerCase().includes('study tips')) {
            botReply = 'For Law, read legal articles, practice previous years’ papers, and develop strong analytical and logical reasoning skills.';
          } else if (userMsg.toLowerCase().includes('what is it like studying')) {
            botReply = 'Studying Law involves understanding legal principles and practical applications. It requires strong analytical skills and a keen interest in current affairs.';
          } else if (userMsg.toLowerCase().includes('change stream') || userMsg.toLowerCase().includes('other stream')) {
            botReply = 'Which stream would you like to know about? (e.g., Engineering, Medicine, CA, IPS)';
            setUserStream('');
          } else {
            botReply = 'For Law queries, please specify what you need to know.';
          }
        } else if (userStream === 'IPS') {
          if (userMsg.toLowerCase().includes('top institutes')) {
            botReply = 'Top institutes for IPS training include: Lal Bahadur Shastri National Academy of Administration and Sardar Patel Institute of Public Administration.';
          } else if (userMsg.toLowerCase().includes('fees')) {
            botReply = 'The fees for IPS preparation can range from ₹50,000 to ₹2 lakhs, depending on coaching institutes and resources used.';
          } else if (userMsg.toLowerCase().includes('documents')) {
            botReply = 'For IPS, you need documents like: ID proof, graduation certificates, UPSC admit card, and Passport-sized photographs.';
          } else if (userMsg.toLowerCase().includes('prerequisites')) {
            botReply = 'For IPS, prerequisites include completing a Bachelor’s degree and qualifying the UPSC exam.';
          } else if (userMsg.toLowerCase().includes('courses offered')) {
            botReply = 'IPS training includes courses on public administration, law enforcement, and criminal justice. The training focuses on leadership and management skills.';
          } else if (userMsg.toLowerCase().includes('exams timing')) {
            botReply = 'UPSC Civil Services Prelims are usually held in June, Mains in September, and Interviews in February/March. Preparation should cover General Studies, Optional subjects, and Interview skills.';
          } else if (userMsg.toLowerCase().includes('study tips')) {
            botReply = 'For IPS, focus on current affairs, General Studies, and your chosen optional subject. Regular revisions and mock tests are crucial for success.';
          } else if (userMsg.toLowerCase().includes('what is it like studying')) {
            botReply = 'Studying for IPS involves rigorous preparation and understanding of administrative practices. It requires dedication, analytical skills, and a strong grasp of current affairs.';
          } else if (userMsg.toLowerCase().includes('change stream') || userMsg.toLowerCase().includes('other stream')) {
            botReply = 'Which stream would you like to know about? (e.g., Engineering, Medicine, CA, Law)';
            setUserStream('');
          } else {
            botReply = 'For IPS queries, please specify what you need to know.';
          }
        } else {
          botReply = 'Please specify your stream or ask a question related to it.';
        }
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'bot', text: botReply },
      ]);
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
                className={`chat-message ${message.type === 'bot' ? 'chat-message-bot' : 'chat-message-user'
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
