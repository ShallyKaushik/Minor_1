import React from 'react';
import './AboutPage.css'; // We will create this CSS file
import { Link } from 'react-router-dom';

// Placeholder images for the team. You can replace these.
const teamImg1 = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80';
const teamImg2 = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80';
const teamImg3 = 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200&h=200&fit=crop&q=80';

function AboutPage() {
  return (
    <div className="about-page-container">
      
      {/* --- 1. Header --- */}
      <div className="about-header">
        <h1>Our Mission</h1>
        <p>
          We're leveraging advanced AI to make proactive healthcare smarter, 
          more accessible, and personalized for everyone.
        </p>
      </div>

      {/* --- 2. Our Story Section --- */}
      <div className="about-content">
        <div className="about-card">
          <h2>Our Story</h2>
          <p>
            HeartHealth began as a research project with a simple question: 
            Can we use machine learning to predict heart disease risk earlier and 
            more accurately than traditional methods? Today, that research has 
            evolved into a comprehensive platform. We believe that the best 
            healthcare isn't just about treating sickness—it's about proactively
            managing wellness.
          </p>
          <p>
            Our team of data scientists, medical professionals, and engineers 
            are dedicated to building tools that empower you. By turning complex 
            medical data into clear, actionable insights, we help you take control 
            of your health journey.
          </p>
        </div>

        {/* --- 3. Meet the Team Section --- */}
        <div className="team-section">
          <h2>Meet the Team (Placeholders)</h2>
          <div className="team-grid">
            
            <div className="team-member-card">
              <img src={teamImg1} alt="Team Member 1" />
              <h3>Dr. Alex Chen</h3>
              <p>Chief Medical Officer</p>
            </div>
            
            <div className="team-member-card">
              <img src={teamImg2} alt="Team Member 2" />
              <h3>Dr. Sarah Jenkins</h3>
              <p>Lead Data Scientist</p>
            </div>
            
            <div className="team-member-card">
              <img src={teamImg3} alt="Team Member 3" />
              <h3>Michael B. Jordan</h3>
              <p>Lead Engineer</p>
            </div>

          </div>
        </div>

        {/* --- 4. Call to Action (CTA) --- */}
        <div className="about-cta-section">
          <h2>Join Us on Our Mission</h2>
          <p>
            Take the first step towards proactive health. 
            Get your free, instant risk prediction today.
          </p> {/* <-- THIS IS THE FIX (was </D>) */}
          <Link to="/predict" className="about-cta-button">
            Predict Your Risk Now
          </Link>
        </div>
      </div>

    </div>
  );
}

export default AboutPage;