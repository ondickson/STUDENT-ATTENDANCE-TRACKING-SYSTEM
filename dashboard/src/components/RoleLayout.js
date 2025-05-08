// src/components/RoleLayout.js
import React from 'react';
import Sidebar from './Sidebar';
import './RoleLayout.css';

const RoleLayout = ({ children }) => {
  return (
    <div className="role-layout">
      <Sidebar />
      <div className="role-content">
        {children}
      </div>
    </div>
  );
};

export default RoleLayout;
