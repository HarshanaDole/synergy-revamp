import React, { useEffect, useState } from "react";
import "../css/main.css";
import "../css/blogs.css";
import SearchBar from "../components/Search";
import SmallButton from "../components/SmallButton";
import { useLocation, useNavigate } from "react-router-dom";
import * as BlogsApi from "../../network/blogs_api"; // API file to fetch blogs from the backend
import { Blog } from "../models/blog"; // Assuming you have a Blog model interface
import { API_BASE_URL } from "../../network/config";
import { Blog as BlogModel } from "../models/blog";
import ActionPopup from "../components/ActionPopup";
import ConfirmationPopup from "../components/ConfirmationPopup";
import Spinner from "../components/Spinner";

function BlogView() {
  const [blogs, setBlogs] = useState<Blog[]>([]); // Store blogs from the API
  const [Loading, setLoading] = useState(true);
  const [showLoadingError, setShowLoadingError] = useState(false);
  const [query, setQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState<"success" | "error">("success");
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.showPopup) {
      setPopupMessage(location.state.message);
      setPopupType(location.state.type);
      setShowPopup(true);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setShowLoadingError(false);
        setLoading(true);
        const fetchedBlogs = await BlogsApi.fetchBlogs();
        setBlogs(fetchedBlogs);
      } catch (error) {
        setShowLoadingError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleEditClick = (blog: BlogModel) => {
    navigate(`/admin/blogs/edit/${blog.id}`);
  };

  const handleDeleteClick = async (blog: BlogModel) => {
    setBlogToDelete(blog.id);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    if (blogToDelete) {
      try {
        await BlogsApi.deleteBlog(blogToDelete);
        setBlogs(
          blogs.filter((existingBlog) => existingBlog.id !== blogToDelete)
        );
        setPopupMessage("Blog deleted successfully!");
        setPopupType("success");
        setShowPopup(true);
      } catch (error) {
        console.error(error);
        setPopupMessage("Failed to delete blog. Please try again.");
        setPopupType("error");
        setShowPopup(true);
      } finally {
        setBlogToDelete(null);
        setShowDeletePopup(false);
      }
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setBlogToDelete(null);
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.headline.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const formatImageUrl = (path: string) => {
    return `${API_BASE_URL}/storage/${path}`;
  };

  return (
    <section id="section">
      <div className="flex">
        <SearchBar
          query={query}
          onSearchChange={handleSearchChange}
          placeholder="Search for Blog Title..."
        />
        <SmallButton to="/admin/blogs/add" />
      </div>

      {Loading && <Spinner fullPage color="var(--main-color)" />}
      {showLoadingError && (
        <p style={{ textAlign: "center" }}>
          Something went wrong. Please refresh the page.
        </p>
      )}
      {!Loading && !showLoadingError && (
        <div className="blog-grid">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <div key={blog.id} className="blog-card">
                <img
                  src={formatImageUrl(blog.imageUrl)}
                  alt={blog.headline}
                  className="blog-image"
                  loading="lazy"
                />
                <h3 className="blog-title">{blog.headline}</h3>
                <p className="blog-author">By {blog.author}</p>
                <p className="blog-date">
                  {new Date(blog.created_at).toLocaleDateString()}
                </p>
                <div className="blog-actions">
                  <button
                    className="blog-btn"
                    onClick={() => handleEditClick(blog)}
                  >
                    Edit
                  </button>
                  <button
                    className="blog-btn-del"
                    onClick={() => handleDeleteClick(blog)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>No blogs available.</p>
          )}
        </div>
      )}
      {showPopup && (
        <ActionPopup
          message={popupMessage}
          type={popupType}
          onClose={() => setShowPopup(false)}
          position="top-right"
        />
      )}
      {showDeletePopup && blogToDelete && (
        <ConfirmationPopup
          message={`Are you sure you want to delete this blog?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          type="warning"
        />
      )}
    </section>
  );
}

export default BlogView;
