import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbarContainer">
            <nav className="navbarStyle">
                <ul>
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/results">Resultat</Link></li>
                    <li><Link to="/stats">Statistique</Link></li>
                    {/* <li><Link to="/faq">Faq</Link></li> */}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
