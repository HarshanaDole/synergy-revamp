import { useEffect, useState } from "react";
import "./OurClients.css";
import AnimatedSection from "../../components/AnimatedSection";
import { Client as ClientModel } from "../../models/client";
import { fetchClients } from "../../../network/clients_api";
import { API_BASE_URL } from "../../../network/config";

const OurClients: React.FC = () => {
  const [clients, setClients] = useState<ClientModel[]>([]);

  useEffect(() => {
    async function loadClients() {
      try {
        const clients = await fetchClients();
        setClients(clients);
      } catch (error) {
        console.log("Error fetching clients:", error);
      }
    }
    loadClients();
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
    </section>
  );
};

export default OurClients;
