import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h1 className="not-found-title">404 - Page Not Found</h1>
      <p className="not-found-message">
        Sorry, the page you are looking for doesn't exist.
      </p>
      <Link to="/" className="not-found-link">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
