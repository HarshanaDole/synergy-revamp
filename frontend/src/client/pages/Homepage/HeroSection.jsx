import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AnimatedSection from '../../components/AnimatedSection';
import { FaArrowRight } from 'react-icons/fa';
import './HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleLearnMoreClick = () => {
    navigate('/services');
    window.scrollTo(0, 0);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000, // Adjust speed for smooth transition
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500, // Adjust autoplay speed
    fade: true, // Enable fade effect
  };

  return (
    <AnimatedSection animationType="fadeIn">
      <section className='hero'>
        <Slider {...settings}>
          <div className='hero-slide hero-slide1'>
            <div className="content">
              <AnimatedSection animationType="slideInFromTop">
              <h1>Securing Tomorrow,<br /> Today.</h1>
              </AnimatedSection>
              <AnimatedSection animationType="slideInFromTop" delay={200}>
              <p>Providing innovative Engineering solutions to transform ideas into reality.</p>
              </AnimatedSection>
              <AnimatedSection animationType="slideInFromTop" delay={400}>
              <button onClick={handleLearnMoreClick}>
                Learn More
                <FaArrowRight size={20}/>
              </button>
              </AnimatedSection>
            </div>
          </div>
          <div className='hero-slide hero-slide2'>
            <div className="content">
              <AnimatedSection animationType="slideInFromTop">
              <h1>Engineering Excellence,<br /> Building the Future</h1>
              </AnimatedSection>
              <AnimatedSection animationType="slideInFromTop" delay={200}>
              <p>Delivering cutting-edge technology and engineering expertise.</p>
              </AnimatedSection>
              <AnimatedSection animationType="slideInFromTop" delay={400}>
              <button onClick={handleLearnMoreClick}>
                Learn More
                <FaArrowRight size={20}/>
              </button> 
              </AnimatedSection>
            </div>
          </div> 
          <div className='hero-slide hero-slide3'>
            <div className="content">
              <AnimatedSection animationType="slideInFromTop">
              <h1>Designing the Future,<br /> One innovation at a Time</h1>
              </AnimatedSection>
              <AnimatedSection animationType="slideInFromTop" delay={200}>
              <p>Partnering with you to bring your projects to life with excellence.</p>
              </AnimatedSection>
              <AnimatedSection animationType="slideInFromTop" delay={400}>
              <button onClick={handleLearnMoreClick}>
                Learn More
                <FaArrowRight size={20}/>
              </button>
              </AnimatedSection>
            </div>
          </div>
        </Slider>
      </section>
    </AnimatedSection>
  );
};

export default HeroSection;
