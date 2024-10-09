import React from "react";
import AnimatedSection from "../../components/AnimatedSection";
import "./WhyUS.css";
import companyLogo from "../../images/Synergy_logo.png";

const WhyUs = () => {
  return (
    <section className="why-us">
        <div className="content">
          <h2>
          <AnimatedSection animationType="slideInFromLeft">
            Why
          </AnimatedSection>
            <AnimatedSection animationType="scaleUp" delay={800}>
            <strong className="highlight">SYNERGY?</strong>
            </AnimatedSection>
          </h2>
          <AnimatedSection animationType="slideInFromLeft" delay={1000}>
          <p>
            We are committed to providing exceptional services and solutions to
            our clients. Our expertise in mechanical, electrical, and plumbing
            (MEP) systems ensures that we deliver innovative, safe, and
            energy-efficient solutions that meet our clients' needs. We strive
            for excellence in everything we do, and our goal is to be recognized
            as the leading provider of MEP services.
          </p>
          </AnimatedSection>
        </div>
      <div className="logo-container-why">
        <img src={companyLogo} alt="Company Logo" className="half-logo" />
      </div>
    </section>
  );
};

export default WhyUs;
