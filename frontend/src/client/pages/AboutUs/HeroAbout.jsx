import React from 'react';
import './HeroAbout.css';
import heroImage from '../../images/story.jpg';
import AnimatedSection from '../../components/AnimatedSection';

const AboutHeroSection = () => {
  return (
    <AnimatedSection animationType="fadeIn">
      <section className="about-hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="about-hero-content">
          <AnimatedSection animationType="slideInfromDiagonal" delay={500}>
          <div className="hero-about-header">
            <h1>Our<br /> <span className="highlight">STORY</span></h1>
          </div>
          </AnimatedSection>
          <div className="hero-about-text">
            <AnimatedSection animationType="fadeInWithScale" delay={1000}>
            <p>
            Synergy Engineering stands at the forefront of the electromechanical 
            contracting industry in Colombo, Sri Lanka, blending innovation and 
            excellence for over a decade. Renowned for our expertise in executing 
            large-scale projects both domestically and internationally, we have 
            established a reputation for delivering superior solutions tailored to 
            meet diverse client needs.
            </p>
            </AnimatedSection>
            <AnimatedSection animationType="fadeInWithScale" delay={2000}>
            <p>
            Our journey is driven by a team of highly skilled professionals dedicated 
            to providing end-to-end services. From meticulous design and precision 
            construction to seamless project handover and comprehensive post-project 
            maintenance, Synergy Engineering ensures each phase is executed with the 
            highest standards of quality and efficiency. What sets us apart is our 
            unparalleled pool of resources. Our human capital comprises seasoned experts 
            who bring a wealth of knowledge and experience to every project.
            </p>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};

export default AboutHeroSection;
