import { useState } from "react";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import AnimatedSection from "../../components/AnimatedSection";
import "./ContactContent.css";
import { useForm } from "react-hook-form";
import { ContactInput, createContact } from "../../../network/contacts_api";

const ContactContent = () => {
  const [submissionStatus, setSubmissionStatus] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>();

  const onSubmit = async (data: ContactInput) => {
    setSubmissionStatus(""); // Reset the status before submitting
    try {
      await createContact(data);
      setSubmissionStatus(
        "Thank you! Your message has been sent successfully."
      );
      reset();
    } catch (error) {
      setSubmissionStatus(
        "There was an error submitting your message. Please try again."
      );
      console.error("Error submitting form:", error);
    }
  };

  const emailAddress = "info@synergyeng.biz";
  const mapLocationUrl = "https://maps.app.goo.gl/jFTYCHwoe5arQnGZ8";

  return (
    <section className="contact-us-section">
      <div className="contact-container">
        <div className="contact-left">
          <AnimatedSection animationType="slideInFromLeft">
            <h1>
              Get in Touch
              <br />
              With <span className="highlight">US</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection animationType="slideInFromLeft" delay={500}>
            <h2>Let's Talk!</h2>
            <p>
              Get in touch with us using the enquiry form or contact information
              below.
            </p>
          </AnimatedSection>
          <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="name-fields">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="First Name"
                  {...register("firstName", { required: true })}
                />
                {errors.firstName && (
                  <div className="error-text">First name is required</div>
                )}
              </div>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Last Name"
                  {...register("lastName", { required: true })}
                />
                {errors.lastName && (
                  <div className="error-text">Last name is required</div>
                )}
              </div>
            </div>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <div className="error-text">Email is required</div>
              )}
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Subject"
                {...register("subject", { required: true })}
              />
              {errors.subject && (
                <div className="error-text">Subject is required</div>
              )}
            </div>
            <div className="input-group">
              <textarea
                placeholder="Message"
                {...register("message", { required: true })}
              ></textarea>
              {errors.message && (
                <div className="error-text">Message is required</div>
              )}
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Submit"}
            </button>
          </form>
          {submissionStatus && (
            <div className="submission-status">{submissionStatus}</div>
          )}
        </div>
        <div className="contact-right">
          <AnimatedSection animationType="fadeIn" delay={400}>
            <img
              src="/img/Contactus.webp"
              alt="Contact Us"
              className="contact-image"
              loading="lazy"
            />
          </AnimatedSection>
          <div className="contact-info">
            {/* Phone */}
            <div className="contact-info-item">
              <AnimatedSection animationType="fadeIn" delay={800}>
                <div className="icon">
                  <FaPhone size={35} />
                </div>
              </AnimatedSection>
              <AnimatedSection animationType="slideInFromRight" delay={800}>
                <div className="contact-item-text">
                  <p className="contact-info-header">Phone</p>
                  <p className="contact-info-text">+94 112 156 815</p>
                </div>
              </AnimatedSection>
            </div>
            {/* Email */}
            <div className="contact-info-item">
              <AnimatedSection animationType="fadeIn" delay={1200}>
                <div className="icon">
                  <MdEmail size={35} />
                </div>
              </AnimatedSection>
              <AnimatedSection animationType="slideInFromRight" delay={1200}>
                <div className="contact-item-text">
                  <p className="contact-info-header">Email</p>
                  <p className="contact-info-text">
                    <a href={`mailto:${emailAddress}`} className="email-link">
                      {emailAddress}
                    </a>
                  </p>
                </div>
              </AnimatedSection>
            </div>
            {/* Location */}
            <div className="contact-info-item">
              <AnimatedSection animationType="fadeIn" delay={1600}>
                <div className="icon">
                  <FaMapMarkerAlt size={35} />
                </div>
              </AnimatedSection>
              <AnimatedSection animationType="slideInFromRight" delay={1600}>
                <div className="contact-item-text">
                  <p className="contact-info-header">Location</p>
                  <p className="contact-info-text">
                    <a
                      href={mapLocationUrl}
                      className="map-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      452 B Susilarama Road, Malabe, Sri Lanka
                    </a>
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
          <div className="follow-us">
            <AnimatedSection animationType="fadeIn" delay={2000}>
              <h3>Follow Us</h3>
            </AnimatedSection>
            <div className="social-icons">
              <AnimatedSection animationType="rotate" delay={2400}>
                <a href="https://web.facebook.com/synergypvtltd">
                  <FaFacebook size={35} />
                </a>
              </AnimatedSection>
              <AnimatedSection animationType="rotate" delay={2800}>
                <a href="https://www.linkedin.com/company/synergypvtltd/">
                  <FaLinkedin size={35} />
                </a>
              </AnimatedSection>
              <AnimatedSection animationType="rotate" delay={3200}>
                <a href="https://www.instagram.com/synergypvtltd">
                  <FaInstagram size={35} />
                </a>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
      {/* Google Map Embed */}
      <div className="contact-map-container animate-on-load">
        <AnimatedSection animationType="zoomIn">
          <div className="map-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.888300732019!2d79.95935711140103!3d6.903959018594701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2572a454fd22f%3A0x58a6feabd0342671!2sSynergy%20Engineering%20(Pvt)%20Ltd!5e0!3m2!1sen!2slk!4v1717603168029!5m2!1sen!2slk"
              width="100%"
              height="600"
              allowFullScreen
              loading="lazy"
              title="company-location"
            ></iframe>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ContactContent;
