import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Client_testimonials.css";
import { fetchClients } from "../../../network/clients_api";
import { Client as ClientModel } from "../../models/client";
import { API_BASE_URL } from "../../../network/config";

// Skeleton loader component
const SkeletonLoader = ({ count }: { count: number }) => (
  <div className="skeleton-loader">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="skeleton-logo" />
    ))}
  </div>
);

const ClientCarousel = () => {
  const [clients, setClients] = useState<ClientModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [skeletonCount, setSkeletonCount] = useState(0);

  useEffect(() => {
    async function loadClients() {
      try {
        const fetchedClients = await fetchClients();
        setClients(fetchedClients);
      } catch (error) {
        console.error("Failed to load clients:", error);
      } finally {
        setLoading(false);
      }
    }

    loadClients();
  }, []);

  // Set skeleton count based on window width
  const updateSkeletonCount = () => {
    const width = window.innerWidth;
    if (width < 480) {
      setSkeletonCount(1);
    } else if (width < 600) {
      setSkeletonCount(2);
    } else if (width < 1024) {
      setSkeletonCount(3);
    } else {
      setSkeletonCount(6);
    }
  };

  useEffect(() => {
    updateSkeletonCount();
    window.addEventListener("resize", updateSkeletonCount);
    return () => {
      window.removeEventListener("resize", updateSkeletonCount);
    };
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const formatImageUrl = (url: string) =>
    url ? `${API_BASE_URL}/storage/${url}` : "";

  return (
    <section className="client-carousel-section">
      <div className="line-testi"></div>
      <h2 className="header-test">Our Clients</h2>
      {loading ? (
        <SkeletonLoader count={skeletonCount} />
      ) : clients.length === 0 ? (
        <p>No clients found.</p>
      ) : (
        <Slider {...settings}>
          {clients.map((client) => {
            return (
              <div key={client.id} className="client-logo-container">
                <img
                  src={formatImageUrl(client.imageUrl)}
                  alt={client.name}
                  className="client-logo"
                />
              </div>
            );
          })}
        </Slider>
      )}
    </section>
  );
};

export default ClientCarousel;
