import React, { useState } from 'react';
import axios from 'axios'; // Import axios to send requests to the backend
import '../styles/signuppage.css'; // Ensure this path points to your CSS file for styling

const SignupPage = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle sign-up logic
  const handleSignup = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    setSuccess(''); // Clear any previous success messages

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Prepare the data to be sent to the backend
      const userData = {
        name,
        dob,
        email,
        password, // Use the hashed password
      };

      // Send the user data to the backend (Node.js server) to store in SQLite
      const response = await axios.post('http://localhost:5000/signup', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      

      if (response.status === 200) {
        setSuccess('Registration successful! You can now log in.');
      }
    } catch (err) {
      setError(err.message); // Display the error message
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-box">
        <h2 className="signup-header">Sign Up</h2>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
        {success && <p className="success-message">{success}</p>} {/* Display success message */}
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="input-field"
            required
          />
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
            placeholder="Set Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
            required
          />
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
        <p>
          Already have an account? <a href="/">Login</a> {/* Link to the login page */}
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
