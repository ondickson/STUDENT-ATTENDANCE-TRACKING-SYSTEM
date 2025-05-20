// src/components/AutoLogoutRedirect.js
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const AutoLogoutRedirect = () => {
  const { user, logoutReason } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && logoutReason === 'inactive') {
    //   alert('Logged out due to inactivity.');
      navigate('/');
    }
  }, [user, logoutReason, navigate]);

  return null;
};

export default AutoLogoutRedirect;
