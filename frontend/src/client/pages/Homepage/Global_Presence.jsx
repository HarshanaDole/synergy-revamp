import React, { useState, useEffect } from 'react';
import AnimatedSection from '../../components/AnimatedSection';
import './Global_Presence.css';
import headerImage from '../../images/Global-presence-back.png';
import worldMap from '../../images/map-new-01.png';
import { FaMapMarkerAlt } from 'react-icons/fa';

const locations = [
    { name: 'QATAR', top: '26%', left: '30%' },
    { name: 'PAKISTAN', top: '32%', left: '42%' },
    { name: 'DUBAI', top: '50%', left: '27%' },
    { name: 'INDIA', top: '56%', left: '50%' },
    { name: 'BANGLADESH', top: '45%', left: '60%' },
    { name: 'VIETNAM', top: '47%', left: '77%' },
    { name: 'ETHIOPIA', top: '62%', left: '15%' },
    { name: 'KENYA', top: '72%', left: '23%' },
    { name: 'RWANDA', top: '78%', left: '17%' },
    { name: 'CHINA', top: '15%', left: '60%' },
    { name: 'MALDIVES', top: '82%', left: '48%' }
];

const GlobalPresence = () => {
    const [activeIcons, setActiveIcons] = useState([]);
    const [activeTexts, setActiveTexts] = useState([]);

    useEffect(() => {
        locations.forEach((location, index) => {
            setTimeout(() => {
                setActiveIcons((prevIcons) => [...prevIcons, location.name]);
            }, index * 1000);

            setTimeout(() => {
                setActiveTexts((prevTexts) => [...prevTexts, location.name]);
            }, index * 1000 + 500);
        });
    }, []);

    const getResponsiveMarkerSize = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 576) return 10;
        if (screenWidth < 768) return 16;
        if (screenWidth < 992) return 20;
        return 24;
    };

    const getResponsiveFontSize = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 576) return '0.5rem';
        if (screenWidth < 768) return '1rem';
        if (screenWidth < 992) return '1.25rem';
        return '1.5rem';
    };

    const getMarginTop = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 576) return '20px';
        if (screenWidth < 768) return '-15px';
        if (screenWidth < 992) return '-20px';
        return '-25px';
    };

    return (
        <section className="global-presence-section">
            <AnimatedSection animationType="fadeIn">
                <div className="header-container">
                    <img src={headerImage} alt="Global Presence Header" className="header-image" />
                    <div className="global-presence-overlay">
                        <AnimatedSection animationType="slideInFromTop">
                            <h2>GLOBAL<br /><span className="header-2">PRESENCE</span></h2>
                        </AnimatedSection>
                        <AnimatedSection animationType="slideInFromBottom">
                            <p className="description">
                                We have established a robust global presence, delivering cutting-edge engineering solutions to clients across multiple continents. With a network of strategic partnerships and regional offices, we provide tailored services and products that meet the unique needs of each market. Our commitment to excellence and innovation ensures that we remain a trusted partner for clients worldwide.
                            </p>
                        </AnimatedSection>
                    </div>
                </div>
            </AnimatedSection>
            <div className="map-container">
                <img src={worldMap} alt="World Map" className="world-map" />
                <div className="map-markers">
                    {locations.map((location) => (
                        <React.Fragment key={location.name}>
                            <div className="location" style={{ top: location.top, left: location.left }}>
                                {activeIcons.includes(location.name) && (
                                    <AnimatedSection animationType="popUp">
                                        <FaMapMarkerAlt color='red' size={getResponsiveMarkerSize()} />
                                    </AnimatedSection>
                                )}
                            </div>
                            {activeTexts.includes(location.name) && (
                                <div
                                    className="marker"
                                    style={{
                                        top: location.top,
                                        left: location.left,
                                        fontSize: getResponsiveFontSize(),
                                        marginTop: getMarginTop()
                                    }}
                                >
                                    <AnimatedSection animationType="scaleUp">
                                        {location.name}
                                    </AnimatedSection>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <div className="last-global">
                <AnimatedSection animationType="slideInFromBottom">
                    <div className="line-global"></div>
                    <p className="final-text-global">Reaching Steadily, and Surely.</p>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default GlobalPresence;
