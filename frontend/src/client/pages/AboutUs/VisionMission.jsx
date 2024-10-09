import React from 'react';
import './VisionMission.css';
import AnimatedSection from '../../components/AnimatedSection';
import visionImage from '../../images/vision_icon.png';
import missionImage from '../../images/mission_icon.png';

const VisionMissionSection = () => {
  console.log('Rendering VisionMissionSection');

  return (
      <section className="vision-mission">
        <div className="vision-mission-content">
          <div className="vision">
            <div className="text-container">
            <AnimatedSection animationType="scaleUp">
              <h2>Our<br /> <span className="highlight">VISION</span></h2>
              </AnimatedSection>
              <AnimatedSection animationType="fadeIn" delay={800}>
              <div className="image-container">
                <img src={visionImage} alt="Vision" />
              </div>
              </AnimatedSection>
              <AnimatedSection animationType="fadeInWithScale" delay={1400}>
              <p>
                “To be globally recognized as a leader in mechanical, electrical & plumbing (MEP) solutions by providing a superior service 
                and innovative solutions to our clients and becoming their preferred supplier of professional services.”
              </p>
              </AnimatedSection>
            </div>
          </div>
          <AnimatedSection animationType="fadeIn" delay={1800}>
          <div className='divider-about'></div>
          </AnimatedSection>
          <div className="mission">
            <div className="text-container">
              <AnimatedSection animationType="scaleUp" delay={2000}>
              <h2>Our<br /><span className="highlight">MISSION</span></h2>
              </AnimatedSection>
              <AnimatedSection animationType="fadeIn" delay={2800}>
              <div className="image-container">
                <img src={missionImage} alt="Mission" />
              </div>
              </AnimatedSection>
              <AnimatedSection animationType="fadeInWithScale" delay={3400}>
              <p>
                “To deliver the best mechanical, electrical & plumbing (MEP) solutions and services to our clients that are innovative, safe, 
                energy efficient, affordable and technically superior.”
              </p>
              </AnimatedSection>
            </div>
          </div>
        </div>
        <div className="footer-content-vimi">
          <div className="line-story"></div>
          <p className='final-text-story'>Standards set high. And Goals even higher.</p>
        </div>
      </section>
  );
};

export default VisionMissionSection;
