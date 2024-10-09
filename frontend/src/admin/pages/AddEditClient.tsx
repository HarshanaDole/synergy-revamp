import Header from "../components/Header";
import "../css/main.css";
import Uploader from "../components/Uploader";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Client } from "../models/client";
import { useForm } from "react-hook-form";
import { ClientInput } from "../../network/clients_api";
import * as ClientsApi from "../../network/clients_api";
import ActionPopup from "../components/ActionPopup";

const AddEditClient = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [existingClient, setExistingClient] = useState<Client | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [defaultImage = existingClient?.imageUrl, setDefaultImage] = useState<
    string | null
  >(null);
  const [showImageError, setShowImageError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState<"success" | "error">("error");

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<ClientInput>();

  useEffect(() => {
    const fetchClient = async () => {
      if (id) {
        try {
          const client = await ClientsApi.fetchClient(id);
          setExistingClient(client);
          setValue("name", client.name);
          setDefaultImage(client.imageUrl);
          setImage(null);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchClient();
  }, [id, setValue]);

  const handleImageChange = (file: File | null) => {
    console.log("image changed: ", file);
    setImage(file);
    setShowImageError(false);
  };

  const validateForm = async () => {
    const isValid = await trigger();
    let hasError = false;

    if (!image && !defaultImage) {
      setShowImageError(true);
      hasError = true;
    } else {
      setShowImageError(false);
    }

    if (!isValid || hasError) {
      setPopupMessage("Please fix the errors in the form");
      setPopupType("error");
      setShowPopup(true);
    }

    return isValid && !hasError;
  };

  async function onClientSubmit(input: ClientInput) {
    const isValid = await validateForm();

    if (!isValid) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", input.name);
      if (image) {
        formData.append("imageUrl", image);
      }

      if (existingClient) {
        const updatedClient = await ClientsApi.updateClient(
          existingClient.id,
          formData
        );
        onClientSave(updatedClient, "Client updated successfully!");
      } else {
        const newClient = await ClientsApi.createClient(formData);
        onClientSave(newClient, "Client added successfully!");
      }
    } catch (error) {
      console.error(error);
      onClientSaveError("Failed to save client");
    }
  }

  async function onClientSave(client: Client, message: string) {
    console.log("Client Saved: ", client);
    navigate("/admin/clients", {
      state: { showPopup: true, message, type: "success" },
    });
  }

  async function onClientSaveError(message: string) {
    navigate("/admin/clients", {
      state: { showPopup: true, message, type: "error" },
    });
  }

  return (
    <>
      <Header />
      <section className="page-layout" id="section">
        <div className="add-items">
          <h1>{existingClient ? "Edit Client" : "Add New Client"}</h1>
          <form
            id="addEditClientForm"
            onSubmit={handleSubmit(onClientSubmit)}
            className="form-container"
            encType="multipart/form-data"
          >
            <Uploader
              onImageChange={handleImageChange}
              setImage={setImage}
              image={image}
              setDefaultImage={setDefaultImage}
              defaultImage={defaultImage}
              showError={showImageError}
            />
            <div className="input-box-container">
              <div className="title-container">
                <span className="title">Name</span>
                <span className="required">*</span>
              </div>
              <div
                className={`input-box ${
                  errors.name ? "invalid" : dirtyFields.name ? "valid" : ""
                }`}
              >
                <input
                  type="text"
                  {...register("name", { required: "Name is Required" })}
                  autoComplete="off"
                />
                {errors.name && (
                  <p className="error-message">{errors.name.message}</p>
                )}
              </div>
            </div>
            <div className="btn-container">
              <button
                type="submit"
                form="addEditClientForm"
                className="add-btn"
                onClick={validateForm}
                disabled={isSubmitting}
              >
                {existingClient ? "Update Client" : "Add Client"}
              </button>
            </div>
          </form>
        </div>
      </section>
      {showPopup && (
        <ActionPopup
          message={popupMessage}
          type={popupType}
          onClose={() => setShowPopup(false)}
          position="top-right"
        />
      )}
    </>
  );
};

export default AddEditClient;
