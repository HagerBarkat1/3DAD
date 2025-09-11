import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser, updateUser } from '../services/authService';
import { predictWithModel, loadModel } from '../services/mlModelService';
import usePredictionService from '../services/predictionService';
import './Dashboard.css';

// User Info Modal Component
const UserInfoModal = ({ user, onClose, onSave }) => {
  const [userInfo, setUserInfo] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    address: user.address || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(userInfo);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="user-info-modal">
        <h2>User Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userInfo.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={userInfo.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={userInfo.address}
              onChange={handleChange}
              rows="3"
            />
          </div>
          <div className="modal-buttons">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="save-btn">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getCurrentUser());
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showInputForm, setShowInputForm] = useState(true);
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState({
    hour: '',
    weekday: '',
    electricity_consumed: '',
    temperature: '',
    humidity: '',
    wind_speed: '',
    avg_past_consumption: ''
  });
  const [needlePosition, setNeedlePosition] = useState(0);
  const needleAnimationRef = useRef(null);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);
  
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
    // Force a page reload to ensure all components update correctly
    window.location.href = '/';
  };
  
  const handleSaveUserInfo = (updatedInfo) => {
    // Call the updateUser function from authService
    const result = updateUser(user.id, updatedInfo);
    
    if (result.success) {
      // Update the local state with the updated user info
      const updatedUser = { ...user, ...updatedInfo };
      setUser(updatedUser);
    } else {
      // Handle error (could show an error message)
      console.error('Failed to update user info:', result.message);
    }
  };
  
  // Function to animate the needle with oscillation effect
  const animateNeedle = (targetValue) => {
    // Clear any existing animation
    if (needleAnimationRef.current) {
      cancelAnimationFrame(needleAnimationRef.current);
    }
    
    // Target position in degrees (0 = normal, 180 = anomaly)
    const targetPosition = targetValue === 1 ? 180 : 0;
    
    // Current position
    let currentPosition = 0;
    // Oscillation parameters
    let amplitude = 25; // Reduced initial oscillation amplitude
    const dampingFactor = 0.85; // Increased damping for faster reduction
    const frequency = 0.3; // Increased frequency for faster oscillation
    let time = 0;
    
    // Animation function
    const animate = () => {
      time += 0.08; // Increased time step for faster animation
      
      // Calculate position with damped oscillation
      const oscillation = amplitude * Math.sin(frequency * time * Math.PI * 2);
      amplitude *= dampingFactor;
      
      // Move towards target with oscillation
      const progress = Math.min(time / 1.5, 1); // 1.5 seconds animation (reduced from 3)
      currentPosition = (targetPosition * progress) + (oscillation * (1 - progress));
      
      // Update needle position
      setNeedlePosition(currentPosition);
      
      // Continue animation if not complete
      if (progress < 1 || Math.abs(oscillation) > 0.3) { // Reduced threshold for earlier completion
        needleAnimationRef.current = requestAnimationFrame(animate);
      } else {
        // Ensure final position is exactly the target
        setNeedlePosition(targetPosition);
        needleAnimationRef.current = null;
      }
    };
    
    // Start animation
    needleAnimationRef.current = requestAnimationFrame(animate);
  };
  
  // Load ML model when component mounts
  useEffect(() => {
    const initModel = async () => {
      try {
        await loadModel();
        console.log('ML model loaded successfully');
      } catch (error) {
        console.error('Error loading ML model:', error);
      }
    };
    
    initModel();
    
    // Cleanup animation on unmount
    return () => {
      if (needleAnimationRef.current) {
        cancelAnimationFrame(needleAnimationRef.current);
      }
    };
  }, []);
  
  // If no user, show loading or redirect
  if (!user) {
    return <div className="loading">Loading...</div>;
  }
  
  return (
    <div className="dashboard-page">
      {/* Lightning Effects */}
      <div className="lightning lightning1"></div>
      <div className="lightning lightning2"></div>
      <div className="lightning lightning3"></div>
      <div className="lightning lightning4"></div>
      <div className="lightning lightning5"></div>
      <div className="lightning lightning6"></div>
      
      {/* Header - Same as in App.js */}
      <div className="navbar">
        <div className="logo-container">
          <img src="/assets/Logo.png" alt="3DAD Logo" className="logo" />
        </div>
        <div className="site-name">3DAD</div>
        <div className="nav-buttons">
          <button className="login-nav-btn" onClick={() => setShowUserInfo(true)}>User Info</button>
          <button className="login-nav-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      
      {/* User Info Modal */}
      {showUserInfo && (
        <UserInfoModal 
          user={user} 
          onClose={() => setShowUserInfo(false)} 
          onSave={handleSaveUserInfo} 
        />
      )}
      
      {/* Main Content - Prediction Form or Result */}
      <div className="prediction-container">
        <h1 className="prediction-title">Electricity Anomaly Prediction</h1>
        
        {showInputForm ? (
          <div className="input-form-container">
            <form className="prediction-form" onSubmit={async (e) => {
              e.preventDefault();
              setIsLoading(true);
              setShowInputForm(false);
              
              try {
                // Convert string values to numbers for prediction
                const numericFormData = {
                  hour: parseInt(formData.hour),
                  weekday: parseInt(formData.weekday),
                  electricity_consumed: parseFloat(formData.electricity_consumed),
                  temperature: parseFloat(formData.temperature),
                  humidity: parseFloat(formData.humidity),
                  wind_speed: parseFloat(formData.wind_speed),
                  avg_past_consumption: parseFloat(formData.avg_past_consumption)
                };
                
                // Make prediction using the ML model service
                const result = await predictWithModel(numericFormData);
                
                // Start needle animation
                animateNeedle(result.prediction);
                
                // Set the final prediction result after animation
                setTimeout(() => {
                  setIsLoading(false);
                  setPredictionResult(result.prediction);
                }, 1500); // Reduced from 3000ms to 1500ms to match the new animation duration
              } catch (error) {
                console.error('Prediction error:', error);
                setIsLoading(false);
                setShowInputForm(true);
                alert('Error making prediction: ' + error.message);
              }
            }}>
              <div className="form-group">
                <label htmlFor="hour">Hour</label>
                <input 
                  type="number" 
                  id="hour" 
                  name="hour" 
                  min="0" 
                  max="23" 
                  value={formData.hour}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow empty string or valid numbers including zero
                    const parsedValue = value === '' ? '' : parseInt(value);
                    // Only update if it's empty or a valid number (including 0)
                    if (value === '' || !isNaN(parsedValue)) {
                      // Validate range only if it's a number
                      if (value !== '' && (parsedValue < 0 || parsedValue > 23)) {
                        // Don't update if out of range
                        return;
                      }
                      setFormData({...formData, hour: value});
                    }
                  }}
                  required 
                  placeholder="Range: 0-23, Example: 14 (represents 2 PM)" 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="weekday">Day of the Week (Weekday)</label>
                <input 
                  type="number" 
                  id="weekday" 
                  name="weekday" 
                  min="0" 
                  max="6" 
                  value={formData.weekday}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow empty string or valid numbers including zero
                    const parsedValue = value === '' ? '' : parseInt(value);
                    // Only update if it's empty or a valid number (including 0)
                    if (value === '' || !isNaN(parsedValue)) {
                      // Validate range only if it's a number
                      if (value !== '' && (parsedValue < 0 || parsedValue > 6)) {
                        // Don't update if out of range
                        return;
                      }
                      setFormData({...formData, weekday: value});
                    }
                  }}
                  required 
                  placeholder="Range: 0-6, 0=Monday, 6=Sunday, Example: 3 (Thursday)" 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="electricity_consumed">Current Electricity Consumption </label>
                <input 
                  type="number" 
                  id="electricity_consumed" 
                  name="electricity_consumed" 
                  min="0" 
                  max="1" 
                  step="any"
                  value={formData.electricity_consumed}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow empty string or valid numbers including zero
                    const parsedValue = value === '' ? '' : parseFloat(value);
                    // Only update if it's empty or a valid number (including 0)
                    if (value === '' || !isNaN(parsedValue)) {
                      // Validate range only if it's a number
                      if (value !== '' && (parsedValue < 0 || parsedValue > 1)) {
                        // Don't update if out of range
                        return;
                      }
                      setFormData({...formData, electricity_consumed: value});
                    }
                  }}
                  required 
                  placeholder="Range: 0.0-1.0, Example: 0.45" 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="temperature">Temperature </label>
                <input 
                  type="number" 
                  id="temperature" 
                  name="temperature" 
                  min="0" 
                  max="1" 
                  step="any"
                  value={formData.temperature}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow empty string or valid numbers including zero
                    const parsedValue = value === '' ? '' : parseFloat(value);
                    // Only update if it's empty or a valid number (including 0)
                    if (value === '' || !isNaN(parsedValue)) {
                      // Validate range only if it's a number
                      if (value !== '' && (parsedValue < 0 || parsedValue > 1)) {
                        // Don't update if out of range
                        return;
                      }
                      setFormData({...formData, temperature: value});
                    }
                  }}
                  required 
                  placeholder="Range: 0.0-1.0, Example: 0.47" 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="humidity">Humidity </label>
                <input 
                  type="number" 
                  id="humidity" 
                  name="humidity" 
                  min="0" 
                  max="1" 
                  step="any"
                  value={formData.humidity}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow empty string or valid numbers including zero
                    const parsedValue = value === '' ? '' : parseFloat(value);
                    // Only update if it's empty or a valid number (including 0)
                    if (value === '' || !isNaN(parsedValue)) {
                      // Validate range only if it's a number
                      if (value !== '' && (parsedValue < 0 || parsedValue > 1)) {
                        // Don't update if out of range
                        return;
                      }
                      setFormData({...formData, humidity: value});
                    }
                  }}
                  required 
                  placeholder="Range: 0.0-1.0, Example: 0.40" 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="wind_speed">Wind Speed </label>
                <input 
                  type="number" 
                  id="wind_speed" 
                  name="wind_speed" 
                  min="0" 
                  max="1" 
                  step="any"
                  value={formData.wind_speed}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow empty string or valid numbers including zero
                    const parsedValue = value === '' ? '' : parseFloat(value);
                    // Only update if it's empty or a valid number (including 0)
                    if (value === '' || !isNaN(parsedValue)) {
                      // Validate range only if it's a number
                      if (value !== '' && (parsedValue < 0 || parsedValue > 1)) {
                        // Don't update if out of range
                        return;
                      }
                      setFormData({...formData, wind_speed: value});
                    }
                  }}
                  required 
                  placeholder="Range: 0.0-1.0, Example: 0.44" 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="avg_past_consumption">Average Past Consumption </label>
                <input 
                  type="number" 
                  id="avg_past_consumption" 
                  name="avg_past_consumption" 
                  min="0" 
                  max="1" 
                  step="any"
                  value={formData.avg_past_consumption}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow empty string or valid numbers including zero
                    const parsedValue = value === '' ? '' : parseFloat(value);
                    // Only update if it's empty or a valid number (including 0)
                    if (value === '' || !isNaN(parsedValue)) {
                      // Validate range only if it's a number
                      if (value !== '' && (parsedValue < 0 || parsedValue > 1)) {
                        // Don't update if out of range
                        return;
                      }
                      setFormData({...formData, avg_past_consumption: value});
                    }
                  }}
                  required 
                  placeholder="Range: 0.0-1.0, Example: 0.69" 
                />
              </div>
              
              <button type="submit" className="charge-btn">CHARGE</button>
            </form>
          </div>
        ) : (
          <div className="result-container">
            {isLoading ? (
              <div className="loading-prediction">
                <div className="speedometer">
                  <div className="speedometer-dial"></div>
                  <div 
                    className="speedometer-needle loading-needle" 
                    style={{ transform: `rotate(${needlePosition}deg)` }}
                  ></div>
                  <div className="speedometer-labels">
                    <span className="label-0">Normal</span>
                    <span className="label-1">Anomaly</span>
                  </div>
                </div>
                <p>Analyzing electricity data...</p>
              </div>
            ) : (
              <div className="prediction-result">
                <div className="speedometer">
                  <div className="speedometer-dial"></div>
                  <div className={`speedometer-needle ${predictionResult === 1 ? 'needle-anomaly' : 'needle-normal'}`}></div>
                  <div className="speedometer-labels">
                    <span className="label-0">Normal</span>
                    <span className="label-1">Anomaly</span>
                  </div>
                </div>
                {predictionResult === 1 ? (
                  <div className="result-alert">
                    <h2 className="result-text anomaly-title">Abnormal Consumption Detected</h2>
                    <div className="status-badge alert">Status: Alert: Abnormal Usage</div>
                    <p className="result-description">
                      Our system has detected irregular energy consumption, which may result in:
                    </p>
                    <ul className="alert-list">
                      <li>Increased electricity costs</li>
                      <li>Potential safety hazards (e.g., overheating or fire risk)</li>
                      <li>Unauthorized or unexpected energy usage</li>
                    </ul>
                    
                    <h3 className="section-title">Potential Causes:</h3>
                    <ul className="causes-list">
                      <li>Equipment operating outside of normal schedule</li>
                      <li>Malfunctioning or inefficient devices</li>
                      <li>Unauthorized consumption or possible theft</li>
                    </ul>
                    
                    <h3 className="section-title">Recommended Actions:</h3>
                    <ul className="action-list">
                      <li>Review recent equipment operation and identify any irregular usage</li>
                      <li>Inspect for malfunctioning appliances or systems</li>
                      <li>Ensure no unauthorized access or unplanned energy consumption</li>
                      <li>Contact your service provider if suspicious activity persists</li>
                    </ul>
                  </div>
                ) : (
                  <div className="result-normal">
                    <h2 className="result-text normal-title">Normal Consumption</h2>
                    <div className="status-badge normal">Status: Normal</div>
                    <p className="result-description">
                      Your energy consumption is within the expected range.
                      No unusual activity has been detected. Continue with your standard operational practices to maintain stable performance and cost efficiency.
                    </p>
                  </div>
                )}
                
                <button className="recharge-btn" onClick={() => {
                  setShowInputForm(true);
                  setPredictionResult(null);
                  // Reset needle position
                  setNeedlePosition(0);
                  // Clear any ongoing animation
                  if (needleAnimationRef.current) {
                    cancelAnimationFrame(needleAnimationRef.current);
                    needleAnimationRef.current = null;
                  }
                }}>RECHARGE</button>
              </div>
            )}
          </div>
        )}
      </div>
      
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
      
      {showScrollTop && (
        <button className="scroll-top-btn" onClick={scrollToTop}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="lightblue" stroke="white" strokeWidth="1">
            <path d="M12 3l-8 8h5v10h6v-10h5z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Dashboard;