import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <header className="navbar-header">
      <nav className="navbar-container">
        {/* 1. Logo */}
        <div className="navbar-logo">
          <Link to="/">
            🩺 HeartHealth
          </Link>
        </div>
        
        {/* 2. Navigation Links */}
        <ul className="navbar-links">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/features">Features</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/chatbot">Chatbot</NavLink>
          </li>
        </ul>

        {/* 3. Action Buttons (Static) */}
        <div className="navbar-actions">
          {/* We can add this back later */}
          {/* <Link to="/login" className="navbar-button-secondary">
            Login
          </Link> */}
          <Link to="/predict" className="navbar-button-primary">
            Predict Now
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;