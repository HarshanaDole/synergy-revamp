import React, { useEffect, useState } from "react";
import AnimatedSection from "../../components/AnimatedSection";
import "./HeroBlog.css";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./../../../network/config";

const BlogsPage = () => {
  const [latestBlog, setLatestBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the latest blog from the backend
    const fetchLatestBlog = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/blogs/latest`);
        const data = await response.json();
        setLatestBlog(data);
      } catch (error) {
        console.error("Error fetching the latest blog:", error);
      }
    };

    fetchLatestBlog();
  }, []);

  const handleReadNow = () => {
    if (latestBlog) {
      navigate(`/blog/${latestBlog.id}`);
    }
  };

  return (
    <section className="blogs-hero-section">
      <div className="blogs-hero-content">
        <div className="blogs-hero-text">
          <h1>
            <AnimatedSection animationType="fadeIn">Our</AnimatedSection>
            <AnimatedSection animationType="slideInFromLeft" delay={500}>
              <span className="highlight">BLOGS</span>
            </AnimatedSection>
          </h1>
        </div>
        <div className="blog-card-hero">
          <AnimatedSection animationType="scaleUp" delay={1000}>
            <h2 className="heroblog-header">{latestBlog.title}</h2>
            <p>
              <strong>Date:</strong> 2024/10/10
            </p>
            <p>This is a summary of the blog</p>
            <button className="read-now-button-blog" onClick={handleReadNow}>
              Read Now
            </button>
          </AnimatedSection>
        </div>
      </div>
      <AnimatedSection animationType="slideInFromLeft" delay={1500}>
        <hr className="horizontal-line" />
      </AnimatedSection>
    </section>
  );
};

export default BlogsPage;
