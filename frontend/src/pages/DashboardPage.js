// frontend/src/pages/DashboardPage.js

import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardPage.css'; 

// We'll use Font Awesome icons from the 'react-icons' library
// If you haven't installed it: npm install react-icons
import { 
  FaStar, FaRegEdit, FaBrain, FaSeedling, 
  FaHeartbeat, FaAppleAlt, FaMoon, FaCommentDots, FaBell 
} from 'react-icons/fa';

// This is a great placeholder illustration from storyset.com (as per your plan)
// You can download your own and import it from your 'assets' folder
import heroIllustration from '../assets/health.jpeg';

function DashboardPage() {
  return (
    <div className="homepage-container">
      
      {/* --- 1. HERO SECTION (Updated) --- */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-headline">
            Understand Your Heart Health. Instantly.
          </h1>
          {/* This is your new subheading */}
          <p className="hero-subheading">
            AI-powered insights for your heart, mind, and body. Personalized
            recommendations that adapt to your health data.
          </p>
          <div className="hero-actions">
            <Link to="/predict" className="hero-button-primary">
              Get Your Free Prediction
            </Link>
          </div>
        </div>
        <div className="hero-image-container">
          <img 
            src={heroIllustration}
            alt="AI Health Assistant" 
            className="hero-image"
          />
        </div>
      </section>

      {/* --- 2. HOW IT WORKS SECTION (New) --- */}
      <section className="how-it-works-section">
        <h2 className="section-heading">How It Works</h2>
        <p className="section-subheading">Get your personalized plan in three simple steps.</p>
        <div className="how-it-works-steps">
          
          <div className="step-card">
            <div className="step-icon"><FaRegEdit /></div>
            <h3>1. Enter Your Details</h3>
            <p>Securely provide your key health metrics, lifestyle habits, and medical history.</p>
          </div>
          
          <div className="step-card">
            <div className="step-icon"><FaBrain /></div>
            <h3>2. AI Analyzes Your Data</h3>
            <p>Our advanced AI analyzes your data against millions of data points to find hidden patterns.</p>
          </div>
          
          <div className="step-card">
            <div className="step-icon"><FaSeedling /></div>
            <h3>3. Get Your Personalized Plan</h3>
            <p>Receive actionable insights for nutrition, stress, and wellness, tailored just for you.</p>
          </div>

        </div>
      </section>

      {/* --- 3. OUR FEATURES SECTION (New) --- */}
      <section className="features-section">
        <h2 className="section-heading">A Complete Health Assistant</h2>
        <p className="section-subheading">One platform for all your proactive health needs.</p>
        <div className="features-grid">
          
          <div className="feature-card">
            <div className="feature-icon" style={{color: '#e74c3c'}}><FaHeartbeat /></div>
            <h3>Heart Risk Prediction</h3>
            <p>Understand your cardiovascular risk with our core AI model.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon" style={{color: 'var(--color-secondary)'}}><FaAppleAlt /></div>
            <h3>Smart Nutrition Plan</h3>
            <p>Get food recommendations based on your predictions and goals.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon" style={{color: 'var(--color-primary)'}}><FaMoon /></div>
            <h3>Stress & Sleep Management</h3>
            <p>Techniques and tracking to improve your mental well-being.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon" style={{color: 'var(--color-accent)'}}><FaCommentDots /></div>
            <h3>AI Health Chatbot</h3>
            <p>Ask questions and get instant, helpful answers 24/7.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon" style={{color: '#f39c12'}}><FaBell /></div>
            <h3>Emergency Alert System</h3>
            <p>Proximity-based alerts for high-risk users (coming soon).</p>
          </div>

        </div>
      </section>

      {/* --- 4. SOCIAL PROOF SECTION (Your existing stats cards) --- */}
      <section className="social-proof-section">
        <div className="stat-card">
          <h3><FaStar style={{color: '#f1c40f'}} /> 4.9*</h3>
          <p>Average user rating from 2,000+ reviews</p>
        </div>
        <div className="stat-card">
          <h3>HHS Aligned</h3>
          <p>Our model is built on data aligned with public health standards</p>
        </div>
        <div className="stat-card">
          <h3>2M+</h3>
          <p>Predictions delivered to our users last year</p>
        </div>
      </section>
      
    </div>
  );
}

export default DashboardPage;