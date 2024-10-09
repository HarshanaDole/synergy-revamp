import { useState } from "react";
import AnimatedSection from "../../components/AnimatedSection";
import "./ContactusSection.css";
import contactImage from "../../images/Contact-home.png";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { ContactInput, createContact } from "../../../network/contacts_api";

const ContactUs = () => {
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
    <section className="contact-us-home-section" id="contact-us">
      <div className="contact-us-left">
        <AnimatedSection animationType="slideInFromLeft">
          <img src={contactImage} alt="Contact Us" className="contact-image" />
          <div className="contact-info">
            <div className="contact-item">
              <FaPhone size={34} />
              <div className="contact-item-text">
                <p className="contact-info-header-home">Give Us a call</p>
                <p className="contact-info-text-home">+94 112 156 815</p>
              </div>
            </div>
            <div className="contact-item">
              <MdEmail size={34} />
              <div className="contact-item-text">
                <p className="contact-info-header-home">Send Us an email</p>
                <p className="contact-info-text-home">
                  <a href={`mailto:${emailAddress}`} className="email-link">
                    {emailAddress}
                  </a>
                </p>
              </div>
            </div>
            <div className="contact-item">
              <FaMapMarkerAlt size={34} />
              <div className="contact-item-text">
                <p className="contact-info-header-home">Come see Us</p>
                <p className="contact-info-text-home">
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
            </div>
          </div>
        </AnimatedSection>
      </div>
      <div className="contact-us-right">
        <AnimatedSection animationType="slideInFromRight">
          <h2 className="Header">
            <span className="contact-text">Contact</span>
            <span className="us-text">US</span>
          </h2>
          <p className="Header-text">
            We would love to hear from you. Please fill out the form below and
            we will get in touch with you shortly.
          </p>
          <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="name-fields">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="First Name"
                  {...register("firstName", { required: true })}
                />
                {errors.firstName && (
                  <p className="error-text">First name is required</p>
                )}
              </div>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Last Name"
                  {...register("lastName", { required: true })}
                />
                {errors.lastName && (
                  <p className="error-text">Last name is required</p>
                )}
              </div>
            </div>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              {errors.email && <p className="error-text">Email is required</p>}
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Subject"
                {...register("subject", { required: true })}
              />
              {errors.subject && (
                <p className="error-text">Subject is required</p>
              )}
            </div>
            <div className="input-group">
              <textarea
                placeholder="Message"
                {...register("message", { required: true })}
              ></textarea>
              {errors.message && (
                <p className="error-text">Message is required</p>
              )}
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </form>
          {submissionStatus && (
            <p className="submission-status">{submissionStatus}</p>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ContactUs;
