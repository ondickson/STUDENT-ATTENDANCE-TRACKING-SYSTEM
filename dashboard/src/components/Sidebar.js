import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Dashboard,
  Assignment,
  Group,
  ReportProblem,
  Event,
  Visibility,
  ErrorOutline,
  MenuBook,
  Logout,
} from '@mui/icons-material';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const role = location.pathname.split('/')[1];

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
        label: 'Class Schedule',
        path: '/faculty/class-schedule',
        icon: <Event fontSize="small" />,
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
        label: 'Class Schedule',
        path: '/student/class-schedule',
        icon: <MenuBook fontSize="small" />,
      },
    ],
  };

  const links = linksByRole[role] || [];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src="/nvsulogo.jpeg" alt="NVSU Logo" className="sidebar-logo" />
        <div className="sidebar-role">{role.toUpperCase()}</div>
      </div>

      <ul className="sidebar-links">
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
  );
};

export default Sidebar;
