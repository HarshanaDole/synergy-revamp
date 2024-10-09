import React from 'react';
import { useSpring, animated, config } from 'react-spring';
import { useInView } from 'react-intersection-observer';

const AnimatedSection = ({ children, animationType, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const animations = {
    slideInFromBottom: {
      transform: inView ? 'translateY(0)' : 'translateY(100px)',
      opacity: inView ? 1 : 0,
    },
    slideInFromTop: {
      transform: inView ? 'translateY(0)' : 'translateY(-100px)',
      opacity: inView ? 1 : 0,
    },
    slideInFromLeft: {
      transform: inView ? 'translateX(0)' : 'translateX(-100px)',
      opacity: inView ? 1 : 0,
    },
    slideInFromRight: {
      transform: inView ? 'translateX(0)' : 'translateX(100px)',
      opacity: inView ? 1 : 0,
    },
    fadeIn: {
      opacity: inView ? 1 : 0,
      delay: delay,
    },
    scaleUp: {
      transform: inView ? 'scale(1)' : 'scale(0)',
      opacity: inView ? 1 : 0,
      config: { tension: 120, friction: 80 },
      delay: delay,
    },
    popUp: {
      transform: inView ? 'scale(1)' : 'scale(0.3)',
      opacity: inView ? 1 : 0,
    },
    rotate: {
      transform: inView ? 'rotate(0deg)' : 'rotate(180deg)',
      opacity: inView ? 1 : 0,
    },
    zoomIn: {
      transform: inView ? 'scale(1)' : 'scale(0.5)',
      opacity: inView ? 1 : 0,
      delay: delay,
    },
    staggeredFadeIn: {
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(20px)',
    },
    slideInfromDiagonal: {
      transform: inView ? 'translate(0, 0)' : 'translate(-100px, -100px)',
      opacity: inView ? 1 : 0,
      delay: delay,
    },
    fadeInWithScale: {
      transform: inView ? 'scale(1)' : 'scale(0.95)',
      opacity: inView ? 1 : 0,
      config: { tension: 50, friction: 150 },
      delay: delay,
    },
  };

  const animation = useSpring({
    ...animations[animationType],
    config: { tension: 170, friction: 26 },
    delay,
  });

  return (
    <animated.div ref={ref} style={animation}>
      {children}
    </animated.div>
  );
};

export default AnimatedSection;
