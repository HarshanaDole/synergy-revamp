import { useEffect, useState } from "react";
import AnimatedSection from "../../components/AnimatedSection";
import "./Blog_home.css";
import { Blog } from "../../../admin/models/blog";
import * as BlogsApi from "../../../network/blogs_api";
import { API_BASE_URL } from "../../../network/config";

const OurBlog = () => {
  const [latestBlog, setLatestBlog] = useState<Blog | null>(null);
  const [Loading, setLoading] = useState(true);
  const [showLoadingError, setShowLoadingError] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setShowLoadingError(false);
        setLoading(true);
        const fetchedBlogs = await BlogsApi.fetchBlogs();
        if (fetchedBlogs && fetchedBlogs.length > 0) {
          fetchedBlogs.sort((a, b) => {
            const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
            const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
            return dateA - dateB;
          });
          setLatestBlog(fetchedBlogs[0]);
        }
      } catch (error) {
        setShowLoadingError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleReadMoreClick = (blog: Blog) => {
    const blogUrl = `/blogs/${blog.id}`;
    window.open(blogUrl, "_blank");
  };

  const formatImageUrl = (path: string) => {
    return `${API_BASE_URL}/storage/${path}`;
  };

  return (
    <AnimatedSection animationType="fadeIn">
      <section className="our-blog-section">
        <div className="blog-header-container">
          <h2 className="blog-name">BLOG</h2>
          <div className="vertical-line"></div>
        </div>
        {showLoadingError && (
          <p style={{ textAlign: "center" }}>
            Something went wrong. Please refresh the page.
          </p>
        )}
        {!Loading && latestBlog && (
          <div className="blog-card-hero">
            <div className="home-blog-image">
              <img
                src={formatImageUrl(latestBlog.imageUrl)}
                alt={latestBlog.headline}
              />
            </div>
            <div className="blog-info">
              <h3>{latestBlog?.headline}</h3>
              <p className="home-blog-date">
                {latestBlog
                  ? new Date(latestBlog.created_at).toLocaleDateString()
                  : "Loading..."}
              </p>
            </div>

            <div className="blog-read-more">
              <button
                onClick={() => {
                  handleReadMoreClick(latestBlog);
                }}
                className="see-more-button"
              >
                Read More
              </button>
            </div>
          </div>
        )}
      </section>
    </AnimatedSection>
  );
};

export default OurBlog;
