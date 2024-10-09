import React from "react";
import AnimatedSection from "../../components/AnimatedSection";
import "./HeroService.css";
import heroImage from "../../images/services-cover.png";

const HeroService = () => {
  return (
    <div className="services-page">
      <div className="hero-section" id="hero-section">
        <AnimatedSection animationType="fadeIn">
          <img src={heroImage} alt="Hero Section" className="hero-image" />
        </AnimatedSection>
        <div className="hero-text">
          <h1>
            <AnimatedSection animationType="slideInFromLeft" delay={500}>
              <span className="inline-text">What</span>
            </AnimatedSection>
            <AnimatedSection animationType="slideInFromLeft" delay={1000}>
              <span className="inline-text next-word">We</span>
            </AnimatedSection>
            <AnimatedSection animationType="slideInFromLeft" delay={1500}>
              <span className="highlight">OFFER</span>
            </AnimatedSection>
          </h1>
          <AnimatedSection animationType="fadeIn" delay={2000}>
            <p>
              At Synergy Engineering, we provide a comprehensive suite of
              services and solutions designed to meet the diverse needs of our
              clients. With providing scalable and reliable services and
              solutions, we bring innovative, efficient, and excellence projects
              for you.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default HeroService;
