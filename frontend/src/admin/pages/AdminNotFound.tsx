import React from "react";
import { Link } from "react-router-dom";
import "../css/adminNotFount.css";

const AdminNotFound: React.FC = () => {
  return (
    <div className="error-container">
      <div className="top-right-logo">
        <img src="/img/synergy-logo-white_back.png" alt="Logo" />
      </div>
      <div className="error-content">
        <h1>404</h1>
        <p>Oops! Page Not Found. Please try again.</p>
        <Link to="/admin">
          <button>Back to Home</button>
        </Link>
      </div>
      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
    </div>
  );
};

export default AdminNotFound;
