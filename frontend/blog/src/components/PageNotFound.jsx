import React from 'react';
import { Link } from 'react-router-dom';


function PageNotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-code">404</h1>
        <p className="notfound-text">Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="notfound-btn">Go Home</Link>
      </div>
    </div>
  );
}

export default PageNotFound;
