import { useEffect, useState } from "react";
import AnimatedSection from "../../components/AnimatedSection";
import "./HeroBlog.css";
import "./BlogGrid.css";
import { Blog } from "../../models/blog";
import * as BlogsApi from "../../../network/blogs_api";
import { API_BASE_URL } from "../../../network/config";

const BlogGrid = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [latestBlog, setLatestBlog] = useState<Blog | null>(null);
  const [Loading, setLoading] = useState(true);
  const [showLoadingError, setShowLoadingError] = useState(false);

  const [showRecent, setShowRecent] = useState(true);

  const handleShowRecent = () => setShowRecent(true);
  const handleShowAll = () => setShowRecent(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setShowLoadingError(false);
        setLoading(true);
        const fetchedBlogs = await BlogsApi.fetchBlogs();
        if (fetchedBlogs && fetchedBlogs.length > 0) {
          // Sort blogs by date, assuming you have a 'date' property in your blog objects
          fetchedBlogs.sort((a, b) => {
            const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
            const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
            return dateA - dateB;
          });

          // Set the blogs and the latest blog
          setBlogs(fetchedBlogs);
          setLatestBlog(fetchedBlogs[0]); // The latest blog will be the first in the sorted array
        }
      } catch (error) {
        setShowLoadingError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleReadNowClick = (blog: Blog) => {
    const blogUrl = `/blogs/${blog.id}`;
    window.open(blogUrl, "_blank");
  };

  const formatImageUrl = (path: string) => {
    return `${API_BASE_URL}/storage/${path}`;
  };

  return (
    <>
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
          {!Loading && latestBlog && (
            <div className="blog-card-hero">
              <AnimatedSection animationType="scaleUp" delay={1000}>
                <h2 className="heroblog-header">{latestBlog?.headline}</h2>
                <p>
                  <strong>Date:</strong>{" "}
                  {latestBlog
                    ? new Date(latestBlog.created_at).toLocaleDateString()
                    : "Loading..."}
                </p>
                <p>{latestBlog?.subheadings[0].content}</p>
                <button
                  className="read-now-button-blog"
                  onClick={() => latestBlog && handleReadNowClick(latestBlog)} // Ensure latestBlog is not null
                  disabled={!latestBlog} // Optionally disable the button if latestBlog is null
                >
                  Read More
                </button>
              </AnimatedSection>
            </div>
          )}
        </div>
        <AnimatedSection animationType="slideInFromLeft" delay={1500}>
          <hr className="horizontal-line" />
        </AnimatedSection>
      </section>

      {showLoadingError && (
        <p style={{ textAlign: "center" }}>
          Something went wrong. Please refresh the page.
        </p>
      )}
      {!Loading && (
        <section className="blog-grid-section">
          <div className="blog-selection">
            <AnimatedSection animationType="slideInFromTop">
              <span
                className={`blog-selection-text ${showRecent ? "active" : ""}`}
                onClick={handleShowRecent}
              >
                Recent
              </span>
            </AnimatedSection>
            <AnimatedSection animationType="slideInFromTop" delay={400}>
              <span
                className={`blog-selection-text ${!showRecent ? "active" : ""}`}
                onClick={handleShowAll}
              >
                All
              </span>
            </AnimatedSection>
          </div>
          <div className="blog-grid">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <div key={blog.id} className="blog-card">
                  <img
                    src={formatImageUrl(blog.imageUrl)}
                    alt="Blog"
                    className="blog-image"
                  />
                  <div className="blog-card-content">
                    <h2 className="blog-title">{blog.headline}</h2>
                    <p className="blog-author">By {blog.author}</p>
                    <p className="blog-date">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    className="read-now-button"
                    onClick={() => handleReadNowClick(blog)}
                  >
                    Read Now
                  </button>
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center" }}>No blogs available.</p>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default BlogGrid;
