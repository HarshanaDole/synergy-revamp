import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HeroAbout from "../AboutUs/HeroAbout";
import VisionMissionSection from "./VisionMission";
import WhyUs from "./WhyUS";
import CertificatesSection from "./OtherAbout";
import OurClients from "./OurClients";

const AboutUs = () => {
  return (
    <div className="aboutus">
      <Header />
      <HeroAbout />
      <VisionMissionSection />
      <OurClients />
      <WhyUs />
      <CertificatesSection />
      <Footer />
    </div>
  );
};

export default AboutUs;
