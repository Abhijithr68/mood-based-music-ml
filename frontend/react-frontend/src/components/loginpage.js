import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";  // Import useNavigate
import { Link } from 'react-router-dom';
import '../styles/loginpage.css';  // Adjust the path if your CSS file is located elsewhere


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset error
    setSuccess(''); // Reset success

    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      
      if (response.status === 200) {
        setSuccess('Login successful!');
        // You can store the user info in localStorage or state
        localStorage.setItem('user_id', response.data.user_id);  // Save user_id (or session)
        // Redirect to homepage after successful login
        navigate("/home");
      }
    } catch (err) {
      setError(err.response.data.message);  // Show error message from backend
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;