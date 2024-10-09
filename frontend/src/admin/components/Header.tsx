import { NavLink, useNavigate } from "react-router-dom";
import "../css/header.css";
import { useEffect, useState } from "react";
import * as UsersApi from "../../network/users_api";
import ConfirmationPopup from "./ConfirmationPopup";
import ActionPopup from "./ActionPopup";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [showLogoutPopup, setShowLogoutpopup] = useState<boolean>(false);
  const navigate = useNavigate();
  const [backendError, setBackendError] = useState<string | undefined>(
    undefined
  );

  // const { setValue } = useForm();

  // useEffect(() => {
  //   async function checkAuthentication() {
  //     try {
  //       const user = await UsersApi.getLoggedInUser();
  //       setValue("username", user.username);
  //     } catch (error) {
  //       console.error(error);
  //       setBackendError(
  //         (error as { message: string }).message ||
  //           "An error occurred. Please try again."
  //       );
  //       navigate("/admin/login");
  //     }
  //   }

  //   checkAuthentication();
  // }, [navigate, setValue]);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const user = await UsersApi.getLoggedInUser();
  //       setValue("username", user.username);
  //     } catch (error) {
  //       console.error(error);
  //       alert("Failed to load user data.");
  //     }
  //   };

  //   fetchUserData();
  // }, [setValue]);

  const handleDropdownToggle = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const handleScroll = () => {
    if (isActive) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isActive]);

  async function logout() {
    try {
      await UsersApi.logout();
      navigate("/admin/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <header className="header">
      <section className="flex" id="section">
        <NavLink to="/admin">
          <div className="logo-container">
            <div className="img-container">
              <img src="/img/synergy_admin_dark.png" alt="synergy-logo" />
            </div>
            <div className="header-title">
              <div className="logo-text-container">
                <img
                  src="/img/synergy_admin_text.png"
                  alt="synergy-text"
                  className="logo-text"
                />
              </div>
              <span className="admin">Admin</span>
            </div>
          </div>
        </NavLink>
        <nav className={isActive === true ? "navbar active" : "navbar"}>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/projects"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Projects
          </NavLink>
          <NavLink
            to="/admin/blogs"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Blogs
          </NavLink>
          <NavLink
            to="/admin/messages"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Messages
          </NavLink>
          <NavLink
            to="/admin/clients"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Clients
          </NavLink>
        </nav>

        <div className="icons">
          <i className="ri-menu-line" id="menu-icon" onClick={toggleMenu}></i>
          <i
            className="ri-user-3-fill"
            id="profile-icon"
            onClick={handleDropdownToggle}
          ></i>
          {isDropdownVisible && (
            <div className="dropdown-menu">
              <NavLink to="/admin/profile" className="dropdown-item">
                Manage My Account
              </NavLink>
              <div
                className="dropdown-item"
                onClick={() => setShowLogoutpopup(true)}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </section>
      {showLogoutPopup && (
        <ConfirmationPopup
          message="Are you sure you want to Logout?"
          onCancel={() => setShowLogoutpopup(false)}
          onConfirm={logout}
          type="warning"
        />
      )}
      {backendError && (
        <ActionPopup
          message={backendError || "An error occurred. Please try again."}
          onClose={() => setBackendError(undefined)}
          type="error"
          position="bottom-right"
        />
      )}
    </header>
  );
};

export default Header;
