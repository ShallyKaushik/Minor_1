// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// --- Import All Your Reusable Components ---
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatbotIcon from './components/ChatbotIcon';

// --- Import All Your Pages ---
import DashboardPage from './pages/DashboardPage';   // Your homepage
import PredictorPage from './pages/PredictorPage';   // The predictor tool
import FeaturesPage from './pages/FeaturesPage';    // The "Features" page
import AboutPage from './pages/AboutPage';        // The "About" page
import ChatbotPage from './pages/ChatbotPage';      // The "Chatbot" page
import NutritionPage from './pages/NutritionPage'; // <-- This is the new page

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar is outside <Routes>, so it appears on every page */}
        <Navbar />
        
        {/* main-content ensures the footer stays at the bottom */}
        <main className="main-content">
          {/* Routes handles switching between your pages */}
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/predict" element={<PredictorPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/chatbot" element={<ChatbotPage />} /> 
            <Route path="/nutrition" element={<NutritionPage />} /> {/* <-- This is the new route */}
            
            {/* Future routes like /stress 
              would be added here.
            */}
          </Routes>
        </main>
        
        {/* ChatbotIcon is outside <Routes>, so it appears on every page */}
        <ChatbotIcon />
        
        {/* Footer is outside <Routes>, so it appears on every page */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;