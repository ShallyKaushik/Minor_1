// frontend/src/pages/ChatbotPage.js

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ChatbotPage.css'; // We will create this
import { FaHeartbeat, FaAppleAlt, FaMoon, FaCommentDots, FaBell } from 'react-icons/fa';

// 1. THE CHATBOT'S "BRAIN" (Our Script)
const chatScript = {
  '1': {
    message: 'Hi there! I\'m HealthBot, your AI health assistant. What\'s on your mind?',
    options: [
      { text: 'What does "heart risk" mean?', trigger: '3' },
      { text: 'What is "cholesterol"?', trigger: '4' },
      { text: 'What does "cp" (chest pain) mean?', trigger: '5' },
      { text: 'Give me a health tip!', trigger: '6' },
      { text: 'Take me to the predictor', trigger: '7' },
    ],
  },
  '3': {
    message: '"Heart risk" is a percentage that estimates your chance of developing cardiovascular issues. Our AI model calculates this based on your health metrics. It\'s a tool to help you stay proactive!',
    trigger: 'more_options',
  },
  '4': {
    message: 'Cholesterol is a waxy substance found in your blood. While your body needs it, too much "bad" cholesterol (LDL) can build up and increase your risk of heart disease.',
    trigger: 'more_options',
  },
  '5': {
    message: '"cp" stands for Chest Pain Type. Our model uses this as a key factor. Type 0 is "Typical Angina" (a strong risk signal), while Type 3 is "Asymptomatic" (no symptoms).',
    trigger: 'more_options',
  },
  '6': {
    message: 'Here\'s a simple tip: Aim for at least 30 minutes of moderate activity, like a brisk walk, most days of the week. Your heart will thank you!',
    trigger: 'more_options',
  },
  '7': {
    message: 'Sure! Here is the link to the predictor page.',
    component: <Link to="/predict" className="chatbot-link">Go to Predictor</Link>,
    trigger: 'more_options',
  },
  'more_options': {
    message: 'Can I help with anything else?',
    trigger: '2', // Go back to main options (re-using step 2)
  },
  '2': { // Re-using step 2 ID for the loop
    options: [
      { text: 'What does "heart risk" mean?', trigger: '3' },
      { text: 'What is "cholesterol"?', trigger: '4' },
      { text: 'What does "cp" (chest pain) mean?', trigger: '5' },
      { text: 'Give me a health tip!', trigger: '6' },
      { text: 'Take me to the predictor', trigger: '7' },
    ],
  }
};

// 2. THE CHATBOT COMPONENT
function ChatbotPage() {
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState('1');
  const [options, setOptions] = useState(chatScript['1'].options || []);
  const chatEndRef = useRef(null);

  // Scroll to the bottom when new messages are added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Start the chat on first render
  useEffect(() => {
    setMessages([{ from: 'bot', text: chatScript['1'].message }]);
  }, []);

  const handleOptionClick = (option) => {
    // 1. Add user's choice as a message
    const userMessage = { from: 'user', text: option.text };
    
    // 2. Get the bot's response from the script
    const nextStep = chatScript[option.trigger];
    const botMessages = [];

    if (nextStep.message) {
      botMessages.push({ from: 'bot', text: nextStep.message });
    }
    if (nextStep.component) {
      botMessages.push({ from: 'bot', component: nextStep.component });
    }
    
    // 3. Update the messages list
    setMessages([...messages, userMessage, ...botMessages]);
    
    // 4. Update the next set of options
    const nextOptionsStep = chatScript[nextStep.trigger];
    setOptions(nextOptionsStep.options || []);
  };

  return (
    <div className="chatbot-page-container">
      <div className="chatbot-window">
        {/* Header */}
        <div className="chatbot-header">
          <FaCommentDots />
          <span>AI HealthBot</span>
        </div>
        
        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-bubble-container ${msg.from}`}>
              <div className={`chat-bubble`}>
                {msg.text && <p>{msg.text}</p>}
                {msg.component && <div>{msg.component}</div>}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        
        {/* Options */}
        <div className="chatbot-options">
          {options.map((option, index) => (
            <button 
              key={index} 
              className="chatbot-option-button" 
              onClick={() => handleOptionClick(option)}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatbotPage;