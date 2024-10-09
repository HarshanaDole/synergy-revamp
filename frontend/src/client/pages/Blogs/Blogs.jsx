import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BlogGrid from "./BlogGrid";

const Blogs = () => {
  return (
    <div className="blogs">
      <Header />
      <BlogGrid />
      <Footer />
    </div>
  );
};

export default Blogs;
