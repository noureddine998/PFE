import React from "react";
import './style.css';
import Navbar from '../../components/Navbar/Navbar';
import LoginForm from '../../components/LoginUser/LoginUser';
const HomePage = () => {
  return (
    <div className="home-page-container">
      <div className="content-area"></div>
    <header className="site-header clearfix">
      <Navbar/>
      <nav>
        <div className="logo">
          <h1>E-Vote</h1>
        </div>
      </nav>
      <section>
        <div className="leftside">
          <img src="img/home_page.png" alt="Home Page" />
        </div>
        <div className="rightside">
        </div>
      </section>
    </header>
      <div className="login-form-area">
      <LoginForm />
      </div>
    </div>
    
  );
};

export default HomePage;
