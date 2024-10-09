import React from "react";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ContactContent from "./ContactContent";

const Contact = () => {
    return (
        <div className="contact">
            <Header />
            <ContactContent />
            <Footer />
        </div>
    );
};

export default Contact;