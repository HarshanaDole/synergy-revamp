import { useEffect, useState } from "react";
import "./OurClients.css";
import AnimatedSection from "../../components/AnimatedSection";
import { Client as ClientModel } from "../../models/client";
import { fetchClients } from "../../../network/clients_api";
import { API_BASE_URL } from "../../../network/config";

const SkeletonLoader = ({ count }: { count: number }) => (
  <div className="skeleton-loader">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="skeleton-logo" />
    ))}
  </div>
);

const OurClients: React.FC = () => {
  const [clients, setClients] = useState<ClientModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [skeletonCount, setSkeletonCount] = useState(0);

  useEffect(() => {
    async function loadClients() {
      try {
        const clients = await fetchClients();
        setClients(clients);
      } catch (error) {
        console.log("Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    }
    loadClients();
  }, []);

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

  const formatImageUrl = (url: string) => {
    if (url) {
      return `${API_BASE_URL}/storage/${url}`;
    }
  };

  return (
    <section className="our-clients">
      <AnimatedSection animationType="slideInFromBottom">
        <div className="line-ourclients"></div>
        <h2>Our Clients</h2>
      </AnimatedSection>
      {loading ? (
        <SkeletonLoader count={skeletonCount} />
      ) : clients.length === 0 ? (
        <p>No clients found.</p>
      ) : (
        <div className="clients-container">
          {clients.map((client, index) => (
            <AnimatedSection animationType="zoomIn" key={index}>
              <img
                src={formatImageUrl(client.imageUrl)}
                alt={client.name}
                className="clients-image"
              />
            </AnimatedSection>
          ))}
        </div>
      )}
    </section>
  );
};

export default OurClients;
