import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Dashboard,
  Assignment,
  Group,
  ReportProblem,
  Visibility,
  ErrorOutline,
  Logout,
  Menu,
  Close,
} from '@mui/icons-material';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const role = location.pathname.split('/')[1];

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const linksByRole = {
    admin: [
      {
        label: 'Dashboard',
        path: '/admin/dashboard',
        icon: <Dashboard fontSize="small" />,
      },
      {
        label: 'Attendance Report',
        path: '/admin/attendance-report',
        icon: <Assignment fontSize="small" />,
      },
      {
        label: 'User Management',
        path: '/admin/user-management',
        icon: <Group fontSize="small" />,
      },
      {
        label: 'Resolve Disputes',
        path: '/admin/resolve-dispute',
        icon: <ReportProblem fontSize="small" />,
      },
    ],
    faculty: [
      {
        label: 'Dashboard',
        path: '/faculty/dashboard',
        icon: <Dashboard fontSize="small" />,
      },
      {
        label: 'Mark Attendance',
        path: '/faculty/mark-attendance',
        icon: <Assignment fontSize="small" />,
      },
      {
        label: 'Resolve Disputes',
        path: '/faculty/resolve-dispute',
        icon: <ReportProblem fontSize="small" />,
      },
    ],
    student: [
      {
        label: 'Dashboard',
        path: '/student/dashboard',
        icon: <Dashboard fontSize="small" />,
      },
      {
        label: 'View Attendance',
        path: '/student/view-attendance',
        icon: <Visibility fontSize="small" />,
      },
      {
        label: 'Raise Dispute',
        path: '/student/raise-dispute',
        icon: <ErrorOutline fontSize="small" />,
      },
      {
        label: 'Scan QR Code',
        path: '/student/scanqrcode',
        icon: <ErrorOutline fontSize="small" />,
      },
    ],
  };

  const links = linksByRole[role] || [];

  const handleLogout = () => {
  localStorage.clear(); 
  navigate('/');
};


  return (
    <>
      <button className="hamburger" onClick={toggleSidebar}>
        {isOpen ? <Close /> : <Menu />}
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <img src="/nvsulogo.jpeg" alt="NVSU Logo" className="sidebar-logo" />
          <div className="sidebar-role">{role.toUpperCase()}</div>
        </div>

        <ul className="sidebar-links" onClick={closeSidebar}>
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.path}>
                <Link to={link.path} className={isActive ? 'active' : ''}>
                  <span className="icon">{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>
            <Logout fontSize="small" className="icon" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
