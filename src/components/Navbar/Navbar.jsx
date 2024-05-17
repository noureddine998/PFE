import React from "react";
import { Link } from 'react-router-dom'
import './style.css'

const Navbar = () =>{
  return (
    <div className ="navbar">
            
            <div className ="container">
                
                <div className ="logo">
                    <h2 className ="logo-text">Logo</h2>
                </div>
                
                
                
                <ul className ="ul-list">
                    <li className ="list-item"><Link to="/">Home</Link></li>
                    <li className ="list-item"><Link to="/Login">Login</Link></li>
                    <li className ="list-item"><Link to="/Signup">Signup</Link></li>
                    <li className ="list-item"><Link to="/AdminLogin">AdminLogin</Link></li>
                    <li className ="list-item"><Link to="/">Resultat</Link></li>
                    <li className ="list-item"><Link to="/Contact">Contact</Link></li>
                </ul>
                
            </div>
            
        </div>
  )
}

export default Navbar;
