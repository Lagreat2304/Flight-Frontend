import React, { useState, useRef} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import './Login.css'; 


const Login = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const alertRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: loginUsername,
          password: loginPassword,
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        console.log('Login successful!', data.user);
        setUserEmail(loginUsername);
        setSuccessMessage('Login Successfull');
        setUserProfile(data.user); 
        setIsLoggedIn(true); 
        navigate('/home');
      } else {
        console.error('Login failed:', data.message);
        setErrorMessage('Invalid User Credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  
  return (
    <div className="login-form">
      {errorMessage && (
        <div className="message-box error" ref={alertRef}>
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Alert severity="error" onClose={() => setErrorMessage('')}>
              {errorMessage}
            </Alert>
          </Stack>
        </div>
      )}
      {successMessage && (
        <div className="message-box success" ref={alertRef}>
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Alert severity="success" onClose={() => setSuccessMessage('')}>
              {successMessage}
            </Alert>
          </Stack>
          </div>
      )}
      
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <label htmlFor="loginUsername">Username:</label>
        <input
          type="text"
          id="loginUsername"
          name="loginUsername"
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
          required
        />

        <label htmlFor="loginPassword">Password:</label>
        <input
          type="password"
          id="loginPassword"
          name="loginPassword"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
      <div className="signup-link">
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Login;
