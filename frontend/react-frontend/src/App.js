import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Import Routes and Route from react-router-dom
import LoginPage from './components/loginpage';  // Import LoginPage component
import SignupPage from './components/signuppage' 
import HomePage from './components/homepage';
// Import SignupPage component (if you have it)

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>  {/* Use Routes instead of Switch */}
          {/* Define your routes here */}
          <Route path="/" element={<LoginPage />} />  {/* Default route for Login */}
          <Route path="/signup" element={<SignupPage/>} /> {/*Route for SignUp Page */}
          <Route path="/home" element={<HomePage />} />
          {/* Add more routes here for different pages like Dashboard */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
