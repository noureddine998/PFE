import React from "react";
import './HomePage.css';
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
import emptyballot from '../../images/Emptyballot.png'
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
      <h1>VOTE!</h1>
        <p>FAIS ENTENDRE TA VOIX!</p>
        <Link to="Login"><button>INSCRIPTION/CONNEXION UTILISATEUR</button></Link>
      </div>
    </div>
  );
};

export default HomePage;
