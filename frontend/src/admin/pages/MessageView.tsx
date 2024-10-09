import React, { useState, useEffect } from "react";
import "../css/main.css";
import Header from "../components/Header";
import * as ContactsApi from "../../network/contacts_api";
import { Contact } from "../models/contact";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const SingleMessagePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLoadingError, setShowLoadingError] = useState(false);

  useEffect(() => {
    const fetchMessage = async () => {
      if (id) {
        try {
          setShowLoadingError(false);
          setLoading(true);
          const contact = await ContactsApi.fetchContact(id);
          setMessage(contact);
        } catch (error) {
          console.error(error);
          setShowLoadingError(true);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchMessage();
  }, [id]);

  return (
    <div>
      <Header />
      <div className="single-message-page-container">
        {loading && <Spinner fullPage color="var(--main-color)" />}
        {showLoadingError && (
          <p style={{ textAlign: "center" }}>
            Something went wrong. Please refresh the page.
          </p>
        )}

        {!loading && !showLoadingError && (
          <div className="message-detail">
            <h2>{message?.subject}</h2>
            <p>
              <strong>From:</strong> {message?.first_name} {message?.last_name}
            </p>
            <p>
              <strong>Email:</strong> {message?.email}
            </p>
            <p>
              <strong>Date:</strong> {message?.created_at}
            </p>
            <div className="message-content">
              <p>{message?.message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleMessagePage;
