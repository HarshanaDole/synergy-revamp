// src/components/SplashScreen.js
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./SplashScreen.css";
import splashVideo from "../images/synergy logo animation.mp4";

const SplashScreen = ({ onAnimationEnd }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onAnimationEnd) {
        onAnimationEnd();
      }
    }, 8500); // Duration of the splash screen (5 seconds in this case)
    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  if (!isVisible) return null;

  return (
    <div className="splash-screen">
      <video className="splash-video" autoPlay muted preload="auto">
        <source src={splashVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

SplashScreen.propTypes = {
  onAnimationEnd: PropTypes.func, // Validate onAnimationEnd as a function
};

export default SplashScreen;
