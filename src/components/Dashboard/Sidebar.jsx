import React from 'react';
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs';
 import logo from '../../images/logo.png';

 import { Link } from 'react-router-dom'; // Import Link


function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <img src={logo} width={100}/>
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <Link to="/adminPage">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/DistrictsListPage">
                    <BsFillArchiveFill className='icon'/> Districts List
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/CandidatesListPage">
                    <BsFillGrid3X3GapFill className='icon'/> Candidates List
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/">
                    <BsPeopleFill className='icon'/> Sign out
                </Link>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar;