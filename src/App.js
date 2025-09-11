import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import { isAuthenticated, getCurrentUser, logoutUser } from './services/authService';

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check authentication status when app loads
    if (isAuthenticated()) {
      setUser(getCurrentUser());
    }
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    // Initialize scroll position check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const handleLogout = () => {
    logoutUser();
    setUser(null);
    navigate('/');
  };
  
  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (isAuthenticated() && window.location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [navigate]);
  
  const HomePage = () => {
  
  return (
    <div className="landing-page">
      <div className="lightning1"></div>
      <div className="lightning2"></div>
      <div className="lightning3"></div>
      <div className="lightning4"></div>
      <div className="lightning5"></div>
      <div className="lightning6"></div>
      <div className="navbar">
        <div className="logo-container">
          <img src="/assets/Logo.png" alt="3DAD Logo" className="logo" />
        </div>
        <div className="site-name">3DAD</div>
        <div className="nav-buttons">
          {user ? (
            <>
              <span className="welcome-text">Welcome, {user.name}</span>
              <button className="login-nav-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button className="login-nav-btn" onClick={() => navigate('/login')}>Login</button>
              <button className="signup-nav-btn" onClick={() => navigate('/signup')}>Sign Up</button>
            </>
          )}
        </div>
      </div>
      
      <div className="content-container">
        <div className="left-details-container">
          <div className="logo-left-container">
            <img src="/assets/Logo.png" alt="3DAD Logo" className="logo-left" />
          </div>
          <div className="text-content">
            <h1 className="site-title">3DAD</h1>
            <h2 className="site-slogan">"Catch Unusual, Save Usual."</h2>
            <p className="site-concept">
              Smart Energy Anomaly Detection
              Predict and prevent unusual energy usage instantly to save costs and ensure reliable operations.</p>
          </div>
        </div>
        <div className="right-info-container">
          <div className="details-section">
            <h2 className="details-heading">AI-Powered Anomaly Detection</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3>Real-Time Anomaly Detection</h3>
                <p>Detect abnormal energy consumption patterns instantly with advanced SVM algorithms.</p>
              </div>
              <div className="feature-card">
                <h3>Predictive Analytics</h3>
                <p>Anticipate inefficiencies before they affect operations using historical consumption trends.</p>
              </div>
              <div className="feature-card">
                <h3>Smart Optimization</h3>
                <p>Reduce energy waste by up to 30% with AI-driven recommendations.</p>
              </div>
              <div className="feature-card">
                <h3>Proven Accuracy & Reliability</h3>
                <p>Achieves 97.7% accuracy and 99.3% abnormal recall across diverse datasets.</p>
              </div>
            </div>
            <button className="learn-more-btn" onClick={() => navigate('/signup')}>EXPLORE FEATURES</button>
          </div>
        </div>
      </div>
      
      {showScrollTop && (
        <button className="scroll-top-btn" onClick={scrollToTop}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="lightblue" stroke="white" strokeWidth="1">
            <path d="M12 3l-8 8h5v10h6v-10h5z" />
          </svg>
        </button>
      )}
      
      {/* Footer - Same as in App.js */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Developers</h3>
            <p>Hager Mahmoud Barkat</p>
            <p>Ahmed Mohammed Ramadan</p>
          </div>

          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: hagermahmoudbarkat123@gmail.com</p>
            <p>Email: ar1895460@gmail.com</p>
          </div>
        
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/hager-barkat-1590b2269/" className="social-link linkedin-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              <a href="https://www.linkedin.com/in/ahmed-ramadan-27071125a/" className="social-link linkedin-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

            </div>
          </div>
          
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 3DAD. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
  };
  
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
