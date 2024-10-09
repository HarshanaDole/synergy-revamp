import React, { useState, useEffect } from "react";
import AnimatedSection from "../../components/AnimatedSection";
import './Services.css';
import Consulting from '../../images/consulting.png';
import Designing from '../../images/designing.png';
import Contracting from '../../images/contracting.png';
import Synlogo from '../../images/Synergy_logo.png';

const Services = () => {
    const [activeService, setActiveService] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setActiveService(1), 1000),
            setTimeout(() => setActiveService(2), 3000),
            setTimeout(() => setActiveService(3), 5000),
        ];
        return () => timers.forEach(timer => clearTimeout(timer));
    }, []);

    return (
        <section className='lifecycle'>
                <img 
                src={Synlogo}
                alt="Background Logo"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: 'auto',
                    zIndex: -1,
                    opacity: 0.3,
                }}
                />
            <AnimatedSection animationType="slideInFromBottom">
                <div className="line-service"></div>
                <h2 className="Header-service">Our Services</h2>
            </AnimatedSection>
            <div className='circle'>
                <div id="consulting" className={`service consulting ${activeService >= 1 ? 'active' : ''}`}>
                    <img src={Consulting} alt='Consulting Icon' />
                    <div className="service-content">
                        <h3>Consulting</h3>
                        <p>We specialize in the design and installation of low voltage systems, including data cabling, security systems, and audiovisual solutions. Our expertise ensures reliable and efficient infrastructure to support your technology needs.</p>
                    </div>
                </div>
                <div id="designing" className={`service designing ${activeService >= 2 ? 'active' : ''}`}>
                    <img src={Designing} alt='Designing Icon' />
                    <div className="service-content">
                        <h3>Designing</h3>
                        <p>We specialize in the design and installation of low voltage systems, including data cabling, security systems, and audiovisual solutions. Our expertise ensures reliable and efficient infrastructure to support your technology needs.</p>
                    </div>
                </div>
                <div id="contracting" className={`service contracting ${activeService >= 3 ? 'active' : ''}`}>
                    <img src={Contracting} alt='Contracting Icon' />
                    <div className="service-content">
                        <h3>Contracting</h3>
                        <p>We specialize in the design and installation of low voltage systems, including data cabling, security systems, and audiovisual solutions. Our expertise ensures reliable and efficient infrastructure to support your technology needs.</p>
                    </div>
                </div>
            </div>
            <div className="line1"></div>
            <p className='final-text'>At Synergy, we offer you the best. And more.</p>
        </section>
    );
};

export default Services;
