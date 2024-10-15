import React from "react";
import "./OtherAbout.css";
import AnimatedSection from "../../components/AnimatedSection";

const CertificatesSection = () => {
  return (
    <section className="certificates-section">
      <div className="certificates-container">
        <div className="certificate">
          <AnimatedSection animationType="slideInFromTop">
            <p>CIDA Certification</p>
          </AnimatedSection>
          <AnimatedSection animationType="zoomIn" delay={500}>
            <img
              src="/img/ictad-cert.webp"
              alt="Certificate 1"
              loading="lazy"
            />
          </AnimatedSection>
        </div>
        <div className="certificate">
          <AnimatedSection animationType="slideInFromTop" delay={1000}>
            <p>ISO Certification</p>
          </AnimatedSection>
          <AnimatedSection animationType="zoomIn" delay={1500}>
            <img src="/img/iso-cert.webp" alt="Certificate 2" loading="lazy" />
          </AnimatedSection>
        </div>
      </div>
      <AnimatedSection animationType="slideInFromBottom">
        <div className="line-other"></div>
        <p className="final-text-other">Providing witness to our claims.</p>
      </AnimatedSection>
    </section>
  );
};

export default CertificatesSection;
