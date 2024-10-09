import Header from "../components/Header";
import "../css/main.css";
import Uploader from "../components/Uploader";
import { Project } from "../models/project";
import { useForm } from "react-hook-form";
import { ProjectInput } from "../../network/projects_api";
import * as ProjectsApi from "../../network/projects_api";
import * as ClientsApi from "../../network/clients_api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Client } from "../models/client";
import CustomDropdown from "../components/CustomDropdown";
import ActionPopup from "../components/ActionPopup";

const AddEditProject = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [existingProject, setExistingProject] = useState<Project | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [defaultImage = existingProject?.imageUrl, setDefaultImage] = useState<
    string | null
  >(null);
  const [showImageError, setShowImageError] = useState(false);
  const [clientError, setClientError] = useState<string | undefined>(undefined);
  const [isClientValid, setIsClientValid] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState<"success" | "error">("error");
  const [selectedClientName, setSelectedClientName] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<ProjectInput>();

  useEffect(() => {
    const fetchProject = async () => {
      if (id) {
        try {
          const project = await ProjectsApi.fetchProject(id);
          setExistingProject(project);
          setDefaultImage(project.imageUrl);
          setImage(null);
          setValue("type", project.type);
          setValue("location", project.location);
          setValue("year", project.year);
          setValue("description", project.description);

          const clients = await ClientsApi.fetchClients();
          setClients(clients);

          const client = clients.find(
            (client) => client.id === project.client_id
          );
          if (client) {
            setValue("client_id", client.id);
            setSelectedClientName(client.name);
          } else {
            setClientError("Client associated with the project not found");
          }

          setIsClientValid(true);
        } catch (error) {
          console.error(error);
        }
      }
    };

    async function loadClients() {
      try {
        const clients = await ClientsApi.fetchClients();
        setClients(clients);
      } catch (error) {
        console.error(error);
      }
    }

    loadClients();
    fetchProject();
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

    if (!isClientValid) {
      setClientError("Client is Required");
      hasError = true;
    } else {
      setClientError(undefined);
    }

    if (!isValid || hasError) {
      setPopupMessage("Please fix the errors in the form");
      setPopupType("error");
      setShowPopup(true);
    }

    return isValid && !hasError;
  };

  async function onProjectSubmit(input: ProjectInput) {
    const isValid = await validateForm();

    if (!isValid) {
      return;
    }

    try {
      const formData = new FormData();
      if (image) {
        formData.append("imageUrl", image);
      }
      formData.append("type", input.type);
      formData.append("client_id", input.client_id);
      formData.append("location", input.location);
      formData.append("year", input.year.toString());
      if (input.description) {
        formData.append("description", input.description);
      }

      if (existingProject) {
        const updatedProject = await ProjectsApi.updateProject(
          existingProject.id,
          formData
        );
        onProjectSave(updatedProject, "Project updated successfully!");
      } else {
        const newProject = await ProjectsApi.createProject(formData);
        onProjectSave(newProject, "Project added successfully!");
      }
    } catch (error) {
      console.error(error);
      onProjectSaveError("Failed to save project. Please try again.");
    }
  }

  async function onProjectSave(project: Project, message: string) {
    console.log("Project Saved: ", project);
    navigate("/admin/projects", {
      state: { showPopup: true, message, type: "success" },
    });
  }

  async function onProjectSaveError(message: string) {
    navigate("/admin/projects", {
      state: { showPopup: true, message, type: "error" },
    });
  }

  const handleClientChange = (selectedClientName: string) => {
    const selectedClient = clients.find(
      (client) => client.name === selectedClientName
    );
    if (selectedClient) {
      setValue("client_id", selectedClient.id);
      setSelectedClientName(selectedClient.name);
      setIsClientValid(true);
    }
  };

  return (
    <>
      <Header />
      <section className="page-layout" id="section">
        <div className="add-items">
          <h1>{existingProject ? "Edit Project" : "Add New Project"}</h1>
          <form
            id="addEditProjectForm"
            onSubmit={handleSubmit(onProjectSubmit)}
            className="form-container"
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
                <span className="title">Title</span>
                <span className="required">*</span>
              </div>
              <div
                className={`input-box ${
                  errors.type ? "invalid" : dirtyFields.type ? "valid" : ""
                }`}
              >
                <input
                  type="text"
                  placeholder="e.g. : Electrical Installation"
                  {...register("type", { required: "Type is Required" })}
                  autoComplete="off"
                />
                {errors.type && (
                  <p className="error-message">{errors.type.message}</p>
                )}
              </div>
            </div>
            <div className="input-box-container">
              <div className="title-container">
                <span className="title">Client</span>
                <span className="required"> *</span>
              </div>
              <CustomDropdown
                options={clients.map((client) => client.name)}
                defaultValue={selectedClientName || "Select Client"}
                onChange={handleClientChange}
                error={clientError}
                isValid={isClientValid}
              />
              {clientError && <p className="error-message">{clientError}</p>}
            </div>
            <div className="input-box-container">
              <div className="title-container">
                <span className="title">Location</span>
                <span className="required"> *</span>
              </div>
              <div
                className={`input-box ${
                  errors.location
                    ? "invalid"
                    : dirtyFields.location
                    ? "valid"
                    : ""
                }`}
              >
                <input
                  type="text"
                  placeholder="Enter Project Address"
                  {...register("location", {
                    required: "Location is Required",
                  })}
                  autoComplete="off"
                />
                {errors.location && (
                  <p className="error-message">{errors.location.message}</p>
                )}
              </div>
            </div>
            <div className="input-box-container">
              <div className="title-container">
                <span className="title">Year</span>
                <span className="required"> *</span>
              </div>
              <div
                className={`input-box ${
                  errors.year ? "invalid" : dirtyFields.year ? "valid" : ""
                }`}
              >
                <input
                  type="text"
                  placeholder="Enter Project Year"
                  {...register("year", {
                    required: "Year is Required",
                  })}
                  autoComplete="off"
                />
                {errors.year && (
                  <p className="error-message">{errors.year.message}</p>
                )}
              </div>
            </div>
            <div className="input-area-container">
              <div className="title-container">
                <span className="title">Description</span>
              </div>
              <div
                className={`input-area ${
                  errors.description
                    ? "invalid"
                    : dirtyFields.description
                    ? "valid"
                    : ""
                }`}
              >
                <textarea
                  placeholder="Type Project Description"
                  {...register("description")}
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="btn-container">
              <button
                type="submit"
                form="addEditProjectForm"
                className="add-btn"
                onClick={validateForm}
                disabled={isSubmitting}
              >
                {existingProject ? "Update Project" : "Add Project"}
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

export default AddEditProject;
