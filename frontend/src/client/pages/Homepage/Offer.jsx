import React from "react";
import AnimatedSection from "../../components/AnimatedSection";
import { useNavigate } from "react-router-dom";
import "./Offer.css";

const Offer = () => {
  const navigate = useNavigate();

  const handleLearnMoreClick = (solution) => {
    navigate(`/services#${solution}`);
  };

  return (
    <section className="offer-section">
      <AnimatedSection animationType="slideInFromLeft">
        <h2 className="offer-header">
          <span className="what-word">WHAT</span>
          <div className="we-offer">
            <span className="vertical-we">WE</span>
            <span className="horizontal-offer">OFFER</span>
          </div>
        </h2>
      </AnimatedSection>
      <AnimatedSection animationType="scaleUp">
        <div className="offer-cards">
          <div
            className="offer-card"
            style={{ backgroundImage: `url(${"/img/Offer_mechanical.webp"})` }}
          >
            <AnimatedSection animationType="slideInFromTop">
              <div className="offer-content">
                <div className="first-head">Mechanical</div>
                <div className="first-head">Solutions</div>
                <p>
                  We offer tailored mechanical solutions for industrial and
                  commercial needs, including heat and steam systems, chilled
                  water systems, VRF systems, ventilation, steam and pneumatic
                  distribution. Trust Synergy for innovative and reliable
                  mechanical engineering expertise.
                </p>
                <div className="button-container">
                  <button
                    onClick={() => handleLearnMoreClick("mechanical-solutions")}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </AnimatedSection>
          </div>
          <div
            className="offer-card"
            style={{ backgroundImage: `url(${"/img/Offer_electrical.webp"})` }}
          >
            <AnimatedSection animationType="slideInFromBottom">
              <div className="offer-content">
                <div className="first-head">Electrical</div>
                <div className="first-head">Solutions</div>
                <p>
                  We provide complete electrical services including power
                  substations, generators, transformers, low and medium voltage
                  systems, and advanced lighting solutions. We ensure reliable
                  and efficient electrical infrastructure for your projects.
                </p>
                <div className="button-container">
                  <button
                    onClick={() => handleLearnMoreClick("electrical-solutions")}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </AnimatedSection>
          </div>
          <div
            className="offer-card"
            style={{ backgroundImage: `url(${"/img/Offer_plumbing.webp"})` }}
          >
            <AnimatedSection animationType="slideInFromTop">
              <div className="offer-content">
                <div className="first-head">Plumbing</div>
                <div className="first-head">Solutions</div>
                <p>
                  We provide comprehensive plumbing services for residential and
                  industrial needs, including water supply piping, sanitary
                  drainage, pumping stations, and industrial piping. Our
                  expertise ensures reliable, high-quality solutions tailored to
                  your requirements.
                </p>
                <div className="button-container">
                  <button
                    onClick={() => handleLearnMoreClick("plumbing-solutions")}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </AnimatedSection>
          </div>
          <div
            className="offer-card"
            style={{ backgroundImage: `url(${"img/Offer_elv.webp"})` }}
          >
            <AnimatedSection animationType="slideInFromBottom">
              <div className="offer-content">
                <div className="first-head">ELV & Data</div>
                <div className="first-head">Solutions</div>
                <p>
                  We specialize in the design and installation of low voltage
                  systems, including data cabling, security systems, networking
                  systems, and audiovisual solutions. Our expertise ensures
                  reliable and efficient infrastructure to support your
                  technology needs.
                </p>
                <div className="button-container">
                  <button onClick={() => handleLearnMoreClick("elv-solutions")}>
                    Learn More
                  </button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection animationType="slideInFromBottom">
        <div className="final-container">
          <div className="line-offer"></div>
          <p className="final-text-offer">
            At Syngery, we offer you the best. And more.
          </p>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default Offer;
