import React from "react";
import "./OtherAbout.css";
import AnimatedSection from "../../components/AnimatedSection";
import certificate1 from "../../images/ictad-cert.png";
import certificate2 from "../../images/iso-cert.png";

const CertificatesSection = () => {
  return (
    <section className="certificates-section">
      <div className="certificates-container">
        <div className="certificate">
          <AnimatedSection animationType="slideInFromTop">
          <p>CIDA Certification</p>
          </AnimatedSection>
          <AnimatedSection animationType="zoomIn" delay={500}>
            <img src={certificate1} alt="Certificate 1" />
          </AnimatedSection>
        </div>
        <div className="certificate">
          <AnimatedSection animationType="slideInFromTop" delay={1000}>
          <p>ISO Certification</p>
          </AnimatedSection>
          <AnimatedSection animationType="zoomIn" delay={1500}>
            <img src={certificate2} alt="Certificate 2" />
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
