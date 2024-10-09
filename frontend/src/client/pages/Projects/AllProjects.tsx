import { useEffect, useState } from "react";
import AnimatedSection from "../../components/AnimatedSection";
import "./AllProjects.css";
import { fetchProjects } from "../../../network/projects_api";
import { Project as ProjectModel } from "../../models/project";
import { API_BASE_URL } from "../../../network/config";

const AllProjects: React.FC = () => {
  const [projects, setProjects] = useState<ProjectModel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;

  useEffect(() => {
    async function loadProjects() {
      try {
        const fetchedProjects = await fetchProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }
    loadProjects();
  }, []);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(projects.length / projectsPerPage); i++) {
    pageNumbers.push(i);
  }

  const formatImageUrl = (url: string) => {
    if (!url) {
      return ""; // Return an empty string if no URL is provided
    }
    return `${API_BASE_URL}/storage/${url}`;
  };

  return (
    <section className="all-projects">
      <h2 className="allproj-head">
        <AnimatedSection animationType="slideInFromTop">
          Our <br />
          <span className="highlight-projects">PROJECTS</span>
        </AnimatedSection>
      </h2>
      <div className="project-cards">
        {currentProjects.map((project, index) => {
          const formattedImageUrl = formatImageUrl(project.imageUrl);
          return (
            <AnimatedSection
              key={project.id}
              animationType="fadeIn"
              delay={index * 800} // Adding delay for staggered animation
            >
              <div
                className="project-card"
                style={{
                  backgroundImage: project.imageUrl
                    ? `url(${formattedImageUrl})`
                    : "none",
                }}
              >
                <div className="project-content">
                  <h3>{project.type}</h3>
                  <p>{project.client.name}</p>
                  <p>{project.description}</p>
                  <p>{project.year}</p>
                </div>
              </div>
            </AnimatedSection>
          );
        })}
      </div>
      <div className="pagination">
        {pageNumbers.map((number) => (
          <span
            key={number}
            className={`page-number ${currentPage === number ? "active" : ""}`}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </span>
        ))}
      </div>
    </section>
  );
};

export default AllProjects;
