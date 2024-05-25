import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './VerticalNav.css';
import { FaHome, FaList, FaSignOutAlt } from 'react-icons/fa';

function VerticalNav() {
  return (
    <nav className="vertical-nav">
      <div className="nav-logo">MENU</div>
      <ul className="nav-items">
        <li className="nav-item">
          <Link to="/adminPage" className="nav-link">
            <FaHome className="nav-icon" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/DistrictList" className="nav-link"> {/* Update this line */}
            <FaList className="nav-icon" />
            <span className='test'>liste électorale de circonscription</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/CandidatesList" className="nav-link"> {/* Update this line */}
            <FaList className="nav-icon" />
            <span className='test'>Liste Candidates</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/statistics" className="nav-link"> {/* Update this line */}
            <FaList className="nav-icon" />
            <span className='test'>statistics</span>
          </Link>
        </li>
        <li className="nav-item">
          {/* Implement sign out functionality as needed */}
          <FaSignOutAlt className="nav-icon" />
          <span className='test'>Se déconnecter</span>
        </li>
      </ul>
    </nav>
  );
}

export default VerticalNav;
