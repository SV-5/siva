import React, { useState } from 'react';
import Dashboard from './Dashboard';
import SignupPage from './SignupPage'; 
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = () => {
    if (username && password) {
      setLoggedIn(true);
    }
  };

  const handleSignupLinkClick = () => {
    setShowSignup(true);
  };

  return (
    <div>
      <nav className="navbar">
        <span className="navbar-brand">Content discovery</span>
      </nav>
      <div className="login-container">
        {!loggedIn && !showSignup ? (
          <div className="login-box">
            <h2>Login</h2>
            <form>
              <div className="input-box">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-box">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="button" onClick={handleLogin}>
                Login
              </button>
            </form>
            <p>
              New to Content discovery?{' '}
              <span className="signup-link" onClick={handleSignupLinkClick}>
                Sign Up
              </span>
            </p>
          </div>
        ) : loggedIn ? (
          <Dashboard username={username} />
        ) : (
          <SignupPage />
        )}
      </div>
    </div>
  );
};

export default LoginPage;