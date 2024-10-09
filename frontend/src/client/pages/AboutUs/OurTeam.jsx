import React from "react";
import './OurTeam.css';
import teamImage from '../../images/Hero1.png';

const teamMembers = [
    {name: 'Sajith Priyantha', position: 'Director', left: '10%', top: '20%' },
];

const TeamSection = () => {
    return (
        <section className="team-section">
            <div className="line-team"></div>
            <h2>Meet Our <strong>TEAM</strong></h2>
            <div className="team-image-container">
                <img src={teamImage} alt="Team" className="team-image" />
                {teamMembers.map((member, index) => (
                    <div 
                    key={index}
                    className="team-member-info"
                    style={{ left: member.left, top: member.top }}
                    >
                        <div className="info">
                            <p className="name">{member.name}</p>
                            <p className="position">{member.position}</p>
                        </div>
                    </div>    
                ))}
            </div>
        </section>
    );
};

export default TeamSection;