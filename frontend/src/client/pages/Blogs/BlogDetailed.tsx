import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as BlogsApi from "../../../network/blogs_api"; // Adjust the import as necessary
import "./BlogDetailed.css";
import { Blog } from "../../models/blog";
import { API_BASE_URL } from "../../../network/config";

const BlogDetailed = () => {
  const { id } = useParams();
  const [blogDetails, setBlogDetails] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const fetchedBlog = await BlogsApi.fetchBlog(id);
        setBlogDetails(fetchedBlog);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  const formatImageUrl = (path: string) => {
    return `${API_BASE_URL}/storage/${path}`;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading blog details.</p>;

  return (
    <div className="blog-detail-container">
      {blogDetails && (
        <div className="blog-detail-content">
          <h1>{blogDetails.headline}</h1>
          <img
            src={formatImageUrl(blogDetails.imageUrl)}
            alt="Blog"
            className="blog-detail-image"
          />
          <div className="blog-meta-container">
            <p>
              <span className="blog-meta-data">BY:</span> {blogDetails.author}
            </p>
            <p>
              <span className="blog-meta-data">PUBLISHED:</span>{" "}
              {new Date(blogDetails.created_at).toLocaleDateString()}
            </p>
          </div>

          {blogDetails.subheadings.map((subtopic, index) => (
            <div key={index} className="blog-subtopic">
              <h2>{subtopic.subheading}</h2>
              <p>{subtopic.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogDetailed;
