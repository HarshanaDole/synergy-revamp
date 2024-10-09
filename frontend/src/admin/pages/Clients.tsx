import "../css/main.css";
import "../css/table.css";
import Header from "../components/Header";
import { ChangeEvent, useEffect, useState } from "react";
import { Client as ClientModel } from "../models/client";
import { HiDotsVertical } from "react-icons/hi";
import * as ClientsApi from "../../network/clients_api";
import SearchBar from "../components/Search";
import SmallButton from "../components/SmallButton";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import ActionPopup from "../components/ActionPopup";
import ConfirmationPopup from "../components/ConfirmationPopup";
import { API_BASE_URL } from "../../network/config";

function Clients() {
  const [clients, setClients] = useState<ClientModel[]>([]);
  const [Loading, setLoading] = useState(true);
  const [showLoadingError, setShowLoadingError] = useState(false);
  const [query, setQuery] = useState("");
  const [activeClientId, setActiveClientId] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState<"success" | "error">("success");
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [clientToDelete, setClientToDelete] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.showPopup) {
      setPopupMessage(location.state.message);
      setPopupType(location.state.type);
      setShowPopup(true);
    }
  }, [location.state]);

  useEffect(() => {
    async function loadClients() {
      try {
        setShowLoadingError(false);
        setLoading(true);
        const clients = await ClientsApi.fetchClients();

        clients.sort((a, b) => {
          const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
          const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
          return dateA - dateB;
        });

        setClients(clients);
      } catch (error) {
        console.error(error);
        setShowLoadingError(true);
      } finally {
        setLoading(false);
      }
    }
    loadClients();
  }, []);

  const togglePopup = (clientId: string) => {
    setActiveClientId((prevId) => (prevId === clientId ? null : clientId));
  };

  const handleEditClick = (client: ClientModel) => {
    navigate(`/admin/clients/edit/${client.id}`);
  };

  async function handleDeleteClick(client: ClientModel) {
    setClientToDelete(client.id);
    setShowDeletePopup(true);
  }

  const confirmDelete = async () => {
    if (clientToDelete) {
      try {
        await ClientsApi.deleteClient(clientToDelete);
        setClients(
          clients.filter(
            (existingClient) => existingClient.id !== clientToDelete
          )
        );
        setPopupMessage("Client deleted successfully!");
        setPopupType("success");
        setShowPopup(true);
      } catch (error) {
        console.error(error);
        setPopupMessage("Failed to delete client. Please try again.");
        setPopupType("error");
        setShowPopup(true);
      } finally {
        setClientToDelete(null);
        setShowDeletePopup(false);
      }
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setClientToDelete(null);
  };

  const filteredItems = clients.filter((client) => {
    return client.name.toLowerCase().includes(query.toLowerCase());
  });

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  const formatImageUrl = (path: string) => {
    return `${API_BASE_URL}/storage/${path}`;
  };

  const clientsTable = (
    <>
      {filteredItems.map((client, index) => (
        <tr key={client.id}>
          <td>{index + 1}</td>
          <td className="image-cell">
            <img
              src={formatImageUrl(client.imageUrl)}
              alt={client.name}
              className="image"
            />
          </td>
          <td>{client.name}</td>
          <td id="menu-container">
            {activeClientId === client.id && (
              <div className="popup-menu">
                <button
                  className="popup-btn"
                  onClick={() => handleEditClick(client)}
                >
                  Edit
                </button>
                <button
                  className="popup-btn"
                  onClick={() => handleDeleteClick(client)}
                >
                  Delete
                </button>
              </div>
            )}
            <button
              className="menu-icon"
              onClick={() => {
                togglePopup(client.id);
              }}
            >
              <HiDotsVertical />
            </button>
          </td>
        </tr>
      ))}
    </>
  );

  return (
    <div>
      <Header />
      <section id="section">
        <div className="flex">
          <SearchBar
            query={query}
            onSearchChange={handleSearchChange}
            placeholder="Search Client..."
          />
          <SmallButton to="/admin/clients/add" />
        </div>

        {Loading && <Spinner fullPage color="var(--main-color)" />}
        {showLoadingError && (
          <p style={{ textAlign: "center" }}>
            Something went wrong. Please refresh the page.
          </p>
        )}
        {!Loading && !showLoadingError && (
          <table className="tbl">
            <thead>
              <tr>
                <th className="hd-id"></th>
                <th className="hd-image">Image</th>
                <th className="hd-name">Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {clients.length > 0 ? (
                clientsTable
              ) : (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center" }}>
                    You don't have any projects yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </section>
      {showPopup && (
        <ActionPopup
          message={popupMessage}
          type={popupType}
          onClose={() => setShowPopup(false)}
          position="top-right"
        />
      )}
      {showDeletePopup && clientToDelete && (
        <ConfirmationPopup
          message={`Are you sure you want to delete this client?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          type="warning"
        />
      )}
    </div>
  );
}

export default Clients;
