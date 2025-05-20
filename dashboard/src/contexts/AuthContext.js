// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

let inactivityTimer;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [logoutReason, setLogoutReason] = useState(null);

  // Check if there is a logged-in user on page load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    startInactivityTimer();

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      startInactivityTimer();
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer);

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
      clearTimeout(inactivityTimer);
    };
  }, []);

  const startInactivityTimer = () => {
    inactivityTimer = setTimeout(() => {
      logout('inactive'); // auto logout
    }, 10000); // 10 seconds
  };

  // Function to login a user
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setLogoutReason(null);
  };

  // Function to logout a user
  const logout = (reason = null) => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.clear();
    setLogoutReason(reason);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, logoutReason }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
