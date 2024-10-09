import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Client_testimonials.css";
import { fetchClients } from "../../../network/clients_api";
import { Client as ClientModel } from "../../models/client";
import { API_BASE_URL } from "../../../network/config";

const ClientCarousel = () => {
  const [clients, setClients] = useState<ClientModel[]>([]);

  useEffect(() => {
    async function loadClients() {
      try {
        const fetchedClients = await fetchClients();
        setClients(fetchedClients);
      } catch (error) {
        console.error("Failed to load clients:", error);
      }
    }

    loadClients();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const formatImageUrl = (url: string) => {
    if (!url) {
      return "";
    }
    return `${API_BASE_URL}/storage/${url}`;
  };

  return (
    <section className="client-carousel-section">
      <div className="line-testi"></div>
      <h2 className="header-test">Our Clients</h2>
      <Slider {...settings}>
        {clients.map((client) => (
          <div key={client.id} className="client-logo-container">
            <img
              src={formatImageUrl(client.imageUrl)}
              alt={client.name}
              className="client-logo"
            />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default ClientCarousel;
