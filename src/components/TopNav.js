import React from 'react';
import { NavLink } from 'react-router-dom';
import './TopNav.css';

const TopNav = () => {
  return (
    <header className="topnav">
      <nav className="topnav-links">
        <NavLink to="/"       className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Documents</NavLink>
        <NavLink to="/status" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Email</NavLink>
      </nav>
      <div className="topnav-brand">AR Automation</div>
      <div className="topnav-right">
        {/* Auth placeholder — will be replaced with Cognito */}
      </div>
    </header>
  );
};

export default TopNav;
