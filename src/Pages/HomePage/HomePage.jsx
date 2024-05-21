import React from "react";
import './HomePage.css';
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';


const HomePage = () => {
  return (
    <div className="home-page-container">
      <div className="content-area"></div>
      <header className="site-header clearfix">
        <Navbar/>
        <nav>
          <div className="logo">
            <h1 style={{ color: "black" }}>E-Vote</h1>
          </div>
        </nav>
        <section>
          <div className="leftside">
            
          </div>
        </section>
      </header>
      <div className="rightside">
      <h1 style={{ color: "black" }}>VOTE!</h1>
        <p style={{ color: "black" }}> LET YOUR VOICE BE HEARD! </p>
        <Link to="Login" style={{ color: "black" }} ><button>USER SIGN-UP/LOGIN</button></Link>
      </div>
    </div>
  );
};

export default HomePage;
