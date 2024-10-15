import React from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import AnimatedSection from "./AnimatedSection";
import "./Footer.css";

const Footer = () => {
  return (
    <AnimatedSection animationType="slideInFromLeft">
      <footer className="footer">
        <div className="footer-top">
          <img
            src="/img/synergy-engineering-logo.webp"
            alt="Company Logo"
            className="footer-logo"
            loading="lazy"
          />
          <p className="company-text">Engineering refined, and redefined.</p>
          <div className="line-footer"></div>
        </div>

        <div className="footer-content">
          <div className="quick-links">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/projects">Projects</Link>
              </li>
              <li>
                <Link to="/blogs">Blogs</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div className="contact-info-footer">
            <div className="contact-info-content">
              <h3>Contact</h3>
              <p>
                <strong>Address:</strong>{" "}
                <a
                  href="https://maps.app.goo.gl/jFTYCHwoe5arQnGZ8"
                  className="footer-address-link"
                >
                  452 B Susilarama Road, Malabe, Sri Lanka
                </a>
              </p>
              <p>
                <strong>Phone:</strong> +994 (0) 11 2156815
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:info@synergyeng.biz"
                  className="footer-email-link"
                >
                  info@synergyeng.biz
                </a>
              </p>
              <p>
                <strong>Fax:</strong> +94 112 156 815
              </p>
              <div className="social-icons-footer">
                <a href="https://www.linkedin.com/company/synergypvtltd/">
                  <FaLinkedin size={35} />
                </a>
                <a href="https://web.facebook.com/synergypvtltd">
                  <FaFacebook size={35} />
                </a>
                <a href="https://www.instagram.com/synergypvtltd">
                  <FaInstagram size={35} />
                </a>
              </div>
            </div>
          </div>

          <div className="newsletter">
            <h3>Newsletter</h3>
            <p>Subscribe to our Newsletter to stay updated.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email ..." />
              <button>
                <FaArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Synergy Engineering. All rights
            reserved.
          </p>
          <div className="credits">
            <p>Developed by </p>
            <div className="credit-img-container">
              <img
                src="/img/code-one-white-01.webp"
                alt="Code:ONE logo"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </footer>
    </AnimatedSection>
  );
};

export default Footer;
