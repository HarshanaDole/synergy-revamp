import React, { useState, useEffect } from "react";
import AnimatedSection from "../../components/AnimatedSection";
import "./Services.css";

const Services = () => {
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setActiveService(1), 1000),
      setTimeout(() => setActiveService(2), 3000),
      setTimeout(() => setActiveService(3), 5000),
    ];
    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  return (
    <>
      <section className="lifecycle">
        <img
          className="cycle-img"
          src="/img/Synergy_logo.webp"
          alt="Background Logo"
          loading="lazy"
        />
        <AnimatedSection animationType="slideInFromBottom">
          <div className="line-service"></div>
          <h2 className="Header-service">Our Services</h2>
        </AnimatedSection>
        <div className="circle">
          <div
            id="consulting"
            className={`service consulting ${
              activeService >= 1 ? "active" : ""
            }`}
          >
            <img src="/img/consult.webp" alt="Consulting Icon" loading="lazy" />
            <div className="service-content">
              <h3>Consulting</h3>
              <p>
                We specialize in the design and installation of low voltage
                systems, including data cabling, security systems, and
                audiovisual solutions. Our expertise ensures reliable and
                efficient infrastructure to support your technology needs.
              </p>
            </div>
          </div>
          <div
            id="designing"
            className={`service designing ${
              activeService >= 2 ? "active" : ""
            }`}
          >
            <img
              src="/img/architect.webp"
              alt="Designing Icon"
              loading="lazy"
            />
            <div className="service-content">
              <h3>Designing</h3>
              <p>
                We specialize in the design and installation of low voltage
                systems, including data cabling, security systems, and
                audiovisual solutions. Our expertise ensures reliable and
                efficient infrastructure to support your technology needs.
              </p>
            </div>
          </div>
          <div
            id="contracting"
            className={`service contracting ${
              activeService >= 3 ? "active" : ""
            }`}
          >
            <img
              src="/img/note-taking.webp"
              alt="Contracting Icon"
              loading="lazy"
            />
            <div className="service-content">
              <h3>Contracting</h3>
              <p>
                We specialize in the design and installation of low voltage
                systems, including data cabling, security systems, and
                audiovisual solutions. Our expertise ensures reliable and
                efficient infrastructure to support your technology needs.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="final-text-container">
        <div className="line1"></div>
        <p className="final-text">
          At Synergy, we offer you the best. And more.
        </p>
      </div>
    </>
  );
};

export default Services;
