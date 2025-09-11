import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaUsers, 
  FaBox, 
  FaShoppingCart 
} from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <nav>
        <NavLink to="/dashboard" className="nav-item">
          <FaHome style={{ marginRight: '10px' }} />
          Dashboard
        </NavLink>
        <NavLink to="/users" className="nav-item">
          <FaUsers style={{ marginRight: '10px' }} />
          Users
        </NavLink>
        <NavLink to="/products" className="nav-item">
          <FaBox style={{ marginRight: '10px' }} />
          Products
        </NavLink>
        <NavLink to="/orders" className="nav-item">
          <FaShoppingCart style={{ marginRight: '10px' }} />
          Orders
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;