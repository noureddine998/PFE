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
         
        </nav>
        <section>
          <div className="leftside">
            
          </div>
        </section>
      </header>
      <div className="rightside">
      <h1 style={{ color: "white" }}>VOTE!</h1>
        <p style={{ color: "white" }}> LET YOUR VOICE BE HEARD! </p>
        <Link to="Login" style={{ color: "white" }} ><button>USER SIGN-UP/LOGIN</button></Link>
      </div>
    </div>
  );
};

export default HomePage;
