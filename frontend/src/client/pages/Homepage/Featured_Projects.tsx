import { useState, useEffect } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import AnimatedSection from "../../components/AnimatedSection";
import "./Featured_Projects.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchProjects } from "../../../network/projects_api";
import { Project as ProjectModel } from "../../models/project";
import { API_BASE_URL } from "../../../network/config";

const Projects = () => {
  const [projects, setProjects] = useState<ProjectModel[]>([]);
  const [currentProject, setCurrentProject] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProjects() {
      try {
        const fetchedProjects = await fetchProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Failed to load projects:", error);
      }
    }

    loadProjects();
  }, []);

  const handleSeeMoreClick = () => {
    navigate("/projects");
    window.scrollTo(0, 0);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_: number, newIndex: number) => setCurrentProject(newIndex),
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const formatImageUrl = (url: string) => {
    if (!url) {
      return "";
    }
    return `${API_BASE_URL}/storage/${url}`;
  };

  return (
    <>
      {projects.length > 0 && (
        <section className="featured-projects-section">
          <div
            className="featured-projects-container"
            style={{
              backgroundImage: `url(${formatImageUrl(
                projects[currentProject].imageUrl
              )})`,
            }}
          >
            <div className="featured-projects-overlay">
              <div className="project-left-content">
                <div className="featured-projects-content">
                  {/* <AnimatedSection animationType="slideInFromLeft"> */}
                  <h2>Featured Projects</h2>
                  <p>
                    Explore our work to see how we bring complex ideas to life
                    and set new standards in engineering excellence.
                  </p>
                  <button
                    onClick={handleSeeMoreClick}
                    className="see-more-button"
                  >
                    See More
                  </button>
                  {/* </AnimatedSection> */}
                </div>
              </div>
              <div className="project-right-content">
                <div className="project">
                  <AnimatedSection animationType="slideInFromRight">
                    <h3 className="project-client">
                      {projects[currentProject].client.name}
                    </h3>
                  </AnimatedSection>
                </div>
              </div>
            </div>
          </div>
          <div className="last">
            <AnimatedSection animationType="slideInFromBottom">
              <div className="line-project"></div>
              <p className="final-text-projects">
                Build to Last. Handled to Perfection.
              </p>
            </AnimatedSection>
          </div>
          <Slider {...settings} className="project-slider">
            {projects.map((project, index) => (
              <div key={index}>
                <div className="project-slide">
                  <h3>{project.type}</h3>
                </div>
              </div>
            ))}
          </Slider>
        </section>
      )}
    </>
  );
};

export default Projects;
