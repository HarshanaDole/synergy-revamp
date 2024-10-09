import React from "react";
import { useNavigate } from "react-router-dom";
import AnimatedSection from "../../components/AnimatedSection";
import "./About.css";
import aboutImage from "../../images/Whoweare.png";

const About = () => {
  const navigate = useNavigate();

  const handleReadMoreClick = () => {
    navigate("/about");
  };

  return (
    <section className="about">
      <div className="about-content">
        <div className="about-image">
          <AnimatedSection animationType="scaleUp">
            <img src={aboutImage} alt="About Us" />
          </AnimatedSection>
        </div>
        <div className="about-text">
          <AnimatedSection animationType="slideInFromRight">
            <h2 className="first">WHO</h2>
            <h2 className="subtitle">We Are</h2>
            <p>
              Synergy Engineering (Pvt) Ltd is a pioneering Electro Mechanical
              Contractor based in Colombo, Sri Lanka. Our strength is derived
              from our key executives who possess industry exposure of more than
              25 years putting together 500,000 man hours. We have achieved high
              customer retention due to quality and flexibility towards
              customers. We provide complete solutions to customers which begin
              with design, build, transfer, and post-project maintenance support
              through workforce allocations.
            </p>
            <button className="readmore-btn" onClick={handleReadMoreClick}>
              Read More
            </button>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default About;
