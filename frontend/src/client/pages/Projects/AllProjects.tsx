import { useEffect, useState, useRef } from "react";
import AnimatedSection from "../../components/AnimatedSection";
import "./AllProjects.css";
import { fetchProjects } from "../../../network/projects_api";
import { Project as ProjectModel } from "../../models/project";
import { API_BASE_URL } from "../../../network/config";

const AllProjects: React.FC = () => {
  const [projects, setProjects] = useState<ProjectModel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const projectsPerPage = 4;
  const projectCardsRef = useRef<(HTMLDivElement | null)[]>([]); // To store refs for each project card

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        const fetchedProjects = await fetchProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLDivElement;
            const backgroundImage = target.getAttribute("data-bg");
            if (backgroundImage) {
              target.style.backgroundImage = `url(${backgroundImage})`;
              observer.unobserve(target); // Stop observing once the image is loaded
            }
          }
        });
      },
      { rootMargin: "200px 0px", threshold: 0.1 } // Trigger when 10% of the card is visible
    );

    // Observe each project card
    projectCardsRef.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      // Cleanup observer on unmount
      observer.disconnect();
    };
  }, [projects, currentPage]);

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
        {loading
          ? Array.from({ length: projectsPerPage }).map((_, index) => (
              <div key={index} className="project-card skeleton-card">
                <div className="skeleton-content">
                  <div className="skeleton-title"></div>
                  <div className="skeleton-text"></div>
                  <div className="skeleton-text short"></div>
                </div>
              </div>
            ))
          : currentProjects.map((project, index) => {
              const formattedImageUrl = formatImageUrl(project.imageUrl);
              return (
                <AnimatedSection
                  key={project.id}
                  animationType="fadeIn"
                  delay={index * 800}
                >
                  <div
                    className="project-card"
                    ref={(el) => (projectCardsRef.current[index] = el)}
                    data-bg={formattedImageUrl}
                    style={{ backgroundImage: "none" }}
                  >
                    <div className="project-content">
                      <h3>{project.type}</h3>
                      <p>{project.client.name}</p>
                      <p className="project-year">{project.year}</p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
      </div>

      {!loading && (
        <div className="pagination">
          {pageNumbers.map((number) => (
            <span
              key={number}
              className={`page-number ${
                currentPage === number ? "active" : ""
              }`}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </span>
          ))}
        </div>
      )}
    </section>
  );
};

export default AllProjects;
