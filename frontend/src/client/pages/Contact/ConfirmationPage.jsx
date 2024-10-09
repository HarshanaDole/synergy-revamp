import React, { useState, useEffect } from 'react';
import './ConfirmationPage.css';
import AnimatedSection from '../../components/AnimatedSection';

const ConfirmationPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Simulate loading and success after 3 seconds (adjust as needed)
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowContent(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="confirmation-container">
      {isLoading && (
        <div className="loading-animation">
          <div className="buffer-animation"></div>
        </div>
      )}
      {showContent && (
        <div className="confirmation-content">
          <AnimatedSection animationType="slideInFromTop">
            <div className="success-icon"></div>
          </AnimatedSection>
          <AnimatedSection animationType="fadeIn">
            <p className="success-message">Message sent successfully!</p>
            <p>Your message has been successfully submitted. We will reach out to you shorty.</p>
            <button className="back-button" onClick={() => window.history.back()}>Go Back</button>
          </AnimatedSection>
        </div>
      )}
    </div>
  );
};

export default ConfirmationPage;
