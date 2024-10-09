import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HeroSection from "./HeroSection";
import About from "./About";
import Services from "./Services";
import Offer from "./Offer";
import Projects from "./Featured_Projects";
import Blog from "./Blog_home";
import GlobalPresence from "./Global_Presence";
import ContactUs from "./ContactusSection";
import "./Home.css";
import ClientCarousel from "./Client_testimonials";

const Home = () => {
  return (
    <div className="home">
      <Header />
      <HeroSection />
      <About />
      <Services />
      <Offer />
      <Projects />
      <ClientCarousel />
      <Blog />
      <GlobalPresence />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Home;
