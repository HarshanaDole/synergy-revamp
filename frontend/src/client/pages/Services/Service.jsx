import React from "react";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HeroService from "./HeroService";
import ServicesSection from "./ServicesSection";
import SolutionsSection from "./Solutions";

const Services = () => {
    return (
        <div className="services">
            <Header />
            <HeroService />
            <ServicesSection />
            <SolutionsSection />
            <Footer />
        </div>
    )
}

export default Services;