import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AllProjects from "./AllProjects";

const Project = () => {
  return (
    <div className="projects">
      <Header />
      <AllProjects />
      <Footer />
    </div>
  );
};

export default Project;
