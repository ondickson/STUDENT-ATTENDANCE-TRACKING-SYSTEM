// src/contexts/AuthContext.js
import { createContext, useState, useEffect } from 'react';


export const AuthContext = createContext();

let inactivityTimer;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [logoutReason, setLogoutReason] = useState(null);

  // Function to logout a user
  const logout = (reason = null) => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.clear();
    setLogoutReason(reason);
  };

  // Function to login a user
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setLogoutReason(null);
  };

  // Check if there is a logged-in user on page load and handle inactivity
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const startInactivityTimer = () => {
      inactivityTimer = setTimeout(() => {
        logout('inactive'); // Auto logout after inactivity
      }, 500000); // 50 seconds
    };

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      startInactivityTimer();
    };

    startInactivityTimer();

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

  return (
    <AuthContext.Provider value={{ user, login, logout, logoutReason }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
