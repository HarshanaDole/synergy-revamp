import { useEffect, useState } from "react";
import "../css/profile.css";
import { FaUserEdit } from "react-icons/fa";
import { GrPowerShutdown } from "react-icons/gr";
import ConfirmationPopup from "../components/ConfirmationPopup";
import "../css/main.css";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import * as UsersApi from "../../network/users_api";
import { UpdateCredentials } from "./../../network/users_api";
import { useForm } from "react-hook-form";
import { User } from "./../models/user";
import ActionPopup from "../components/ActionPopup";
import useUser from "../hooks/useUser";

const ShowEditProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState<boolean>(false);
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState<"success" | "error">("error");
  const navigate = useNavigate();
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateCredentials>();

  useEffect(() => {
    reset({
      username: user?.username || "",
      password: "",
      newPassword: "",
      confirmPassword: "",
    });
  }, [user, reset]);

  const handleLogout = async () => {
    try {
      await UsersApi.logout();
      localStorage.removeItem("token");
      navigate("/admin/login");
    } catch (error) {
      console.error(error);
      alert("Failed to logout. Please try again.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await UsersApi.deleteProfile(user!.id);
      localStorage.removeItem("token");
      navigate("/admin/login");
    } catch (error) {
      console.error(error);
      alert("Failed to delete account. Please try again.");
    }
  };

  async function onProfileSubmit(input: UpdateCredentials) {
    try {
      const updatedProfile = await UsersApi.updateProfile(user!.id, input);
      reset({
        username: input.username,
        password: "",
        newPassword: "",
        confirmPassword: "",
      });
      onProfileSave(updatedProfile, "Profile updated successfully!");
    } catch (error) {
      let errorMessage = "Failed to update profile";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error instanceof Response) {
        const errorData = await error.json();
        errorMessage = errorData.message || "Failed to update profile";
      }
      console.error(errorMessage);
      onProfileSaveError(errorMessage);
    }
  }

  async function onProfileSave(user: User, message: string) {
    console.log("Profile Updated: ", user);
    setIsEditing(false);
    setShowPopup(true);
    setPopupMessage(message);
    setPopupType("success");
  }

  async function onProfileSaveError(message: string) {
    setIsEditing(true);
    setShowPopup(true);
    setPopupMessage(message);
    setPopupType("error");
  }

  return (
    <>
      <Header />
      <div className="profile-container">
        <h1>My Profile</h1>
        <div className="profile-header">
          <img
            src="/img/User-Profile-PNG-High-Quality-Image.png"
            alt="Profile"
            className="profile-pic"
          />
          <h2>{user?.username}</h2>
          <div className="button-group">
            <button
              className="edit-btn"
              onClick={() => setIsEditing(!isEditing)}
            >
              <FaUserEdit /> {isEditing ? "Cancel" : "Edit Profile"}
            </button>
            <button
              className="logout-btn"
              onClick={() => setShowLogoutPopup(true)}
            >
              <GrPowerShutdown /> Logout
            </button>
            <button
              className="delete-btn"
              onClick={() => setShowDeletePopup(true)}
            >
              Delete Account
            </button>
          </div>
        </div>
        <form
          className={`profile-form ${isEditing ? "editing" : ""}`}
          onSubmit={handleSubmit(onProfileSubmit)}
        >
          <div className="input-box-profile">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              {...register("username", { required: "Username is Required" })}
              readOnly={!isEditing}
            />
            {errors.username && (
              <p className="error-message">{errors.username.message}</p>
            )}
          </div>
          {isEditing && (
            <>
              <div className="input-box-profile">
                <label htmlFor="password">Current Password:</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is Required",
                  })}
                />
                {errors.password && (
                  <p className="error-message">{errors.password.message}</p>
                )}
              </div>
              <div className="input-box-profile">
                <label htmlFor="newPassword">New Password:</label>
                <input type="password" {...register("newPassword")} />
                {errors.newPassword && (
                  <p className="error-message">{errors.newPassword.message}</p>
                )}
              </div>
              <div className="input-box-profile">
                <label htmlFor="confirmPassword">Confirm New Password:</label>
                <input
                  type="password"
                  {...register("confirmPassword", {
                    validate: (value) =>
                      value === getValues("newPassword") ||
                      "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="error-message">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <button className="btn" type="submit" disabled={isSubmitting}>
                Save Changes
              </button>
            </>
          )}
        </form>
      </div>

      {showLogoutPopup && (
        <ConfirmationPopup
          message="Are you sure you want to logout?"
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutPopup(false)}
          type="warning"
        />
      )}

      {showPopup && (
        <ActionPopup
          message={popupMessage}
          type={popupType}
          onClose={() => setShowPopup(false)}
          position="top-right"
        />
      )}
      {showDeletePopup && (
        <ConfirmationPopup
          message="Are you sure you want to delete your account?"
          onConfirm={handleDeleteAccount}
          onCancel={() => setShowDeletePopup(false)}
          type="danger"
        />
      )}
    </>
  );
};

export default ShowEditProfile;
