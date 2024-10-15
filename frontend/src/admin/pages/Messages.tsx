import "../css/main.css";
import "../css/table.css";
import Search from "../components/Search";
import { ChangeEvent, useEffect, useState } from "react";
import * as ContactsApi from "../../network/contacts_api";
import { Contact } from "./../models/contact";
import { HiDotsVertical } from "react-icons/hi";
import ActionPopup from "../components/ActionPopup";
import ConfirmationPopup from "../components/ConfirmationPopup";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

function Messages() {
  const [query, setQuery] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]); // State to hold the contacts
  const [Loading, setLoading] = useState(true);
  const [showLoadingError, setShowLoadingError] = useState(false);
  const [activeContactId, setActiveContactId] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState<"success" | "error">("success");
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [contactToDelete, setContactToDelete] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadContacts() {
      try {
        setShowLoadingError(false);
        setLoading(true);
        const contacts = await ContactsApi.fetchContacts();

        contacts.sort((a, b) => {
          const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
          const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
          return dateB - dateA;
        });

        setContacts(contacts);
      } catch (error) {
        console.error(error);
        setShowLoadingError(true);
      } finally {
        setLoading(false);
      }
    }
    loadContacts();
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  const togglePopup = (contactId: number) => {
    setActiveContactId((prevId) => (prevId === contactId ? null : contactId));
  };

  const handleEditClick = (contact: Contact) => {
    navigate(`/admin/messages/${contact.id}`);
  };

  async function handleDeleteClick(contact: Contact) {
    setContactToDelete(contact.id);
    setShowDeletePopup(true);
  }

  const confirmDelete = async () => {
    if (contactToDelete) {
      try {
        await ContactsApi.deleteContact(contactToDelete);
        setContacts(
          contacts.filter(
            (existingContact) => existingContact.id !== contactToDelete
          )
        );
        setPopupMessage("Contact deleted successfully!");
        setPopupType("success");
        setShowPopup(true);
      } catch (error) {
        console.error(error);
        setPopupMessage("Failed to delete contact. Please try again.");
        setPopupType("error");
        setShowPopup(true);
      } finally {
        setContactToDelete(null);
        setShowDeletePopup(false);
      }
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setContactToDelete(null);
  };

  // Filter contacts based on the search query
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.subject.toLowerCase().includes(query.toLowerCase()) ||
      contact.message.toLowerCase().includes(query.toLowerCase()) ||
      contact.first_name.toLowerCase().includes(query.toLowerCase()) ||
      contact.last_name.toLowerCase().includes(query.toLowerCase()) ||
      contact.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section id="section">
      <div className="flex">
        <Search
          query={query}
          onSearchChange={handleSearchChange}
          placeholder="Search Keyword..."
        />
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
              <th className="hd-fname">First Name</th>
              <th className="hd-lname">Last Name</th>
              <th className="hd-email">Email</th>
              <th className="hd-subject">Subject</th>
              <th className="hd-message">Message</th>
              <th className="hd-recieved">Received</th>
              <th className="hd-action"></th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <tr key={contact.id} className="contact-trow">
                  <td className="fname-column">{contact.first_name}</td>
                  <td className="lname-column">{contact.last_name}</td>
                  <td className="email-column">{contact.email}</td>
                  <td className="subject-column">{contact.subject}</td>
                  <td className="message-column">{contact.message}</td>
                  <td>
                    {new Date(contact.created_at).toLocaleDateString("en-GB")}{" "}
                    {new Date(contact.created_at).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>

                  <td id="menu-container">
                    {activeContactId === contact.id && (
                      <div className="popup-menu">
                        <button
                          className="popup-btn"
                          onClick={() => handleEditClick(contact)}
                        >
                          View
                        </button>
                        <button
                          className="popup-btn"
                          onClick={() => handleDeleteClick(contact)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                    <button
                      className="menu-icon"
                      onClick={() => {
                        togglePopup(contact.id);
                      }}
                    >
                      <HiDotsVertical />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} style={{ textAlign: "center" }}>
                  No contacts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      {showPopup && (
        <ActionPopup
          message={popupMessage}
          type={popupType}
          onClose={() => setShowPopup(false)}
          position="top-right"
        />
      )}
      {showDeletePopup && contactToDelete && (
        <ConfirmationPopup
          message={`Are you sure you want to delete this contact?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          type="warning"
        />
      )}
    </section>
  );
}

export default Messages;
