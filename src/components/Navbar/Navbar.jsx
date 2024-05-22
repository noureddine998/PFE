import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <div className="header-content">
        <img src="/backgrounds/7.png" alt="Logo" />
          <nav>
            <ul className="list">
              <li className="dropdown">
                <Link className="link-item" to="/">Home</Link>
              </li>
              <li>
                <Link className="link-item" to="/about">About</Link>
              </li>
              <li>
                <Link className="link-item" to="/services">Services</Link>
              </li>
              <li>
                <Link className="link-item" to="/team">Team</Link>
              </li>
              <li>
                <Link className="link-item" to="/blog">Blog</Link>
              </li>
              <li>
                <Link className="link-item" to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
          <div className="login">
            
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
