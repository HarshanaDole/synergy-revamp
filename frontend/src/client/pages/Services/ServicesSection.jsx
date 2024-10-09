import React, { useState } from 'react';
import AnimatedSection from '../../components/AnimatedSection';
import './ServicesSection.css';

// Example images (replace with your actual images)
import ConsultingImage from '../../images/consulting.jpg';
import DesigningImage from '../../images/designing.png';
import ContractingImage from '../../images/contracting.png';

const servicesData = {
  consulting: {
    title: "Consulting",
    description: "Synergy Engineering provides expert consulting services to guide your projects from conception to completion. Our team offers strategic advice and technical expertise to ensure efficient, cost-effective solutions tailored to your unique needs.",
    image: ConsultingImage,
  },
  designing: {
    title: "Designing",
    description: "Our designing services focus on creating innovative and functional designs that meet the highest standards of quality and sustainability. We collaborate closely with clients to develop customized plans that optimize performance and aesthetics.",
    image: DesigningImage,
  },
  contracting: {
    title: "Contracting",
    description: "We offer comprehensive contracting services, managing every aspect of your project with precision and professionalism. We ensure timely execution, adherence to budgets, and superior quality in all our endeavors.",
    image: ContractingImage,
  }
};

const ServicesSection = () => {
  const [activeService, setActiveService] = useState('consulting');

  return (
    <section className="services-section">
      <AnimatedSection animationType="slideInFromBottom">
        <div className="line-servicesSec"></div>
        <h2>Our Services</h2>
      </AnimatedSection>
      
      <div className="services-buttons-container">
        <button 
          className={`service-button ${activeService === 'consulting' ? 'active' : ''}`} 
          onClick={() => setActiveService('consulting')}
        >
          Consulting
        </button>
        <button 
          className={`service-button ${activeService === 'designing' ? 'active' : ''}`} 
          onClick={() => setActiveService('designing')}
        >
          Designing
        </button>
        <button 
          className={`service-button ${activeService === 'contracting' ? 'active' : ''}`} 
          onClick={() => setActiveService('contracting')}
        >
          Contracting
        </button>
      </div>

      <AnimatedSection animationType="fadeIn">
        <div className="service-details">
          <div className="service-description">
            <h3>{servicesData[activeService].title}</h3>
            <p>{servicesData[activeService].description}</p>
          </div>
          <div className="service-image">
            <img src={servicesData[activeService].image} alt={servicesData[activeService].title} />
          </div>
        </div>
      </AnimatedSection>
      
      <AnimatedSection animationType="slideInFromBottom">
        <div className="line-servicesSec-last"></div>
        <p className="final-text-serviceSec">From start to finish, we are with you at every step</p>
      </AnimatedSection>
    </section>
  );
};

export default ServicesSection;
