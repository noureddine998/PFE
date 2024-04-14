import React from "react";
import { Link } from "react-router-dom";
import './style.css';

const Login = () => {
  // Define inline styles for the button
  const buttonStyle = {
    marginTop: '40px',
    marginBottom: '40px',
    marginRight: '18px',
    width: '160px',
    height: '45px',
    color: 'white',
    cursor: 'pointer',
    lineHeight: '45px',
    borderRadius: '5px',
    background: '#34d8eb',
    transition: 'background 0.5s' // Transition for smooth color change
  };
  const buttonStyle1 = {
    marginTop: '40px',
    marginBottom: '40px',
    marginLeft:"30px",
    
    width: '160px',
    height: '45px',
    color: 'white',
    cursor: 'pointer',
    lineHeight: '45px',
    borderRadius: '5px',
    background: '#34d8eb',
    transition: 'background 0.5s' // Transition for smooth color change
  };

  // Define hover styles for the button
  const handleMouseOver = (e) => {
    e.target.style.background = '#2890e6';
  };

  const handleMouseOut = (e) => {
    e.target.style.background = '#34d8eb';
  };

  return (
    <div className="center">
      <div className="header">Login Form</div>
      <form>
        <input
          type="text"
          placeholder="Email or Username"
          name="email_address"
          required=""
        />
        <i className="far fa-envelope" />
        <input
          id="pswrd"
          type="password"
          placeholder="Password"
          name="password"
          required=""
        />
        {/* Use a div or a span instead of Link for wrapping the button */}
        <div>
          <Link to="/adminAddCandidate">
            <button
              type="submit"
              style={buttonStyle}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              Login
            </button>
          </Link>
          <button
              type="submit"
              style={buttonStyle1}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              Forgot Password?
            </button>
        </div>
      </form>
      
    </div>
  );
};

export default Login;
