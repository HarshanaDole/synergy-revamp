import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.css";
import notFoundImage from "../images/client-404.png";

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <img src={notFoundImage} alt="404" className="not-found-image" />
      <h2>Page not found</h2>
      <Link to="/" className="home-button">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
