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
            <span className='test'>District List</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/CandidatesList" className="nav-link"> {/* Update this line */}
            <FaList className="nav-icon" />
            <span className='test'>Candidates List</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/VoterList" className="nav-link"> {/* Update this line */}
            <FaList className="nav-icon" />
            <span className='test'>Voters List</span>
          </Link>
        </li>
        <li className="nav-item">
          {/* Implement sign out functionality as needed */}
          <FaSignOutAlt className="nav-icon" />
          <span className='test'>Sign Out</span>
        </li>
      </ul>
    </nav>
  );
}

export default VerticalNav;
