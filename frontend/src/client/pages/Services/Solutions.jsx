import React, { useEffect } from 'react';
import AnimatedSection from '../../components/AnimatedSection';
import { useLocation } from 'react-router-dom';
import './Solutions.css';
import solution1 from '../../images/mechanical-sol.png';
import solution2 from '../../images/electrical-sol.png';
import solution3 from '../../images/plumbing-sol.png';
import solution4 from '../../images/ELV-sol.png';

const SolutionsSection = () => {

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        const yOffset = 100; // Adjust this value based on your header height
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <section className="solutions-section">
      <AnimatedSection animationType="slideInFromBottom">
      <div className='line-solutions'></div>
      <h2 className='header-sec'>Solutions</h2>
      </AnimatedSection>
      <AnimatedSection animationType="fadeIn">
      <div id='mechanical-solutions' className="solution-card mechanical" style={{ backgroundImage: `url(${solution1})` }}>
        <div className="content">
          <div className="text">
          <AnimatedSection animationType="slideInFromLeft">
            <h3>MECHANICAL SOLUTIONS</h3>
          </AnimatedSection>
          <AnimatedSection animationType="slideInFromBottom" delay={500}>
            <p>We offer innovative mechanical solutions, ensuring efficient and reliable systems tailored to your project's unique requirements. Our approach emphasizes sustainability and cutting-edge technology to optimize performance.</p>
          </AnimatedSection>
          </div>
          <AnimatedSection animationType="slideInFromRight" delay={1000}>
          <ul>
            <li>Chilled water systems (Air/Water cooled)</li>
            <li>Package unit air conditioning for large volume commercial areas</li>
            <li>Variable Refrigerant Flow (VRF) Systems</li>
            <li>Ventilation Systems</li>
            <li>Exhaust Systems</li>
            <li>Steam Distribution Systems</li>
            <li>Pneumatic Distribution Systems</li>
          </ul>
          </AnimatedSection>
        </div>
      </div>
      </AnimatedSection>
      <AnimatedSection animationType="fadeIn">
      <div id='electrical-solutions' className="solution-card electrical" style={{ backgroundImage: `url(${solution2})` }}>
        <div className="content">
          <div className="text">
          <AnimatedSection animationType="slideInFromLeft">
            <h3>ELECTRICAL SOLUTIONS</h3>
          </AnimatedSection>
          <AnimatedSection animationType="slideInFromBottom" delay={500}>
            <p>We provide comprehensive design, installation, and maintenance, delivering safe and effective power infrastructure for your operations. We prioritize reliability and efficiency to support your energy needs.</p>
          </AnimatedSection>
          </div>
          <AnimatedSection animationType="slideInFromRight" delay={1000}>
          <ul>
            <li>Primary and standby power substations</li>
            <li>Generators and Transformers</li>
            <li>Medium Voltage Distribution Systems</li>
            <li>Low Voltage Systems</li>
            <li>Lighting fixtures and Lighting control</li>
            <li>Busbar Risers & Distribution System</li>
            <li>Surge protection, earthing and Lighting protection</li>
            <li>UPS Systems</li>
            <li>Installation of all kinds of Electrical Systems</li>
            <li>Testing and Commissioning</li>
          </ul>
          </AnimatedSection>
        </div>
      </div>
      </AnimatedSection>
      <AnimatedSection animationType="fadeIn">
      <div id='plumbing-solutions' className="solution-card plumbing" style={{ backgroundImage: `url(${solution3})` }}>
        <div className="content">
          <div className="text">
          <AnimatedSection animationType="slideInFromLeft">
            <h3>PLUMBING SOLUTIONS</h3>
            </AnimatedSection>
            <AnimatedSection animationType="slideInFromBottom" delay={500}>
            <p>With advanced plumbing solutions, we ensure robust, efficient, and sustainable systems for all types of projects. Our expertise guarantees compliance and long-term reliability.</p>
            </AnimatedSection>
          </div>
          <AnimatedSection animationType="slideInFromRight" delay={1000}>
          <ul>
            <li>Domestic cold & hot water supply piping Systems</li>
            <li>Sanitary drainage piping Systems</li>
            <li>Sanitary ware Installation</li>
            <li>Installation of Pumps & Tank pumps, Fittings and Accessories</li>
            <li>Pumps and Pumping Stations</li>
            <li>Water Storage Tanks</li>
            <li>Waste Water (Sewage) Treatment Plants</li>
          </ul>
          </AnimatedSection>
        </div>
      </div>
      </AnimatedSection>
      <AnimatedSection animationType="fadeIn">
      <div id='elv-solutions' className="solution-card elv" style={{ backgroundImage: `url(${solution4})` }}>
        <div className="content">
          <div className="text">
          <AnimatedSection animationType="slideInFromLeft">
            <h3>ELV & DATA SOLUTIONS</h3>
            </AnimatedSection>
            <AnimatedSection animationType="slideInFromBottom" delay={500}>
            <p>Our ELV & Data solutions enhance connectivity and security through cutting-edge technology, optimizing communication and IT infrastructure. We focus on seamless integration and advanced features to meet your specific needs.</p>
            </AnimatedSection>
          </div>
          <AnimatedSection animationType="slideInFromRight" delay={1000}>
          <ul>
            <li>Access Control Systems</li>
            <li>Audio & Video Systems</li>
            <li>MATV (Master Antenna Television) Systems & CCTV (Closed Circuit Television) Systems</li>
            <li>Public address Systems</li>
            <li>BMS (Building Management Systems)</li>
            <li>PABX (Private Automatic Branch Exchange) Systems</li>
            <li>Data Communication Systems</li>
            <li>Networking</li>
            <li>Conference Systems</li>
            <li>Video Door Entry Systems</li>
            <li>Testing and Commissioning</li>
          </ul>
          </AnimatedSection>
        </div>
      </div>
      </AnimatedSection>
      <AnimatedSection animationType="slideInFromBottom">
      <div className='line-solution-last'></div>
      <p className='final-text-solutionSec'>Whatever you need, however you need.</p>
      </AnimatedSection>
    </section>
  );
};

export default SolutionsSection;
