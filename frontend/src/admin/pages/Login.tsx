import { Link, useNavigate } from "react-router-dom";
import "../css/main.css";
import "../css/login-register.css";
import { FaUser } from "react-icons/fa6";
import { useState } from "react";
import { RiEyeCloseLine, RiEyeFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import * as UsersApi from "../../network/users_api";
import { User } from "../models/user";
import ActionPopup from "../components/ActionPopup";
import Spinner from "../components/Spinner";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UsersApi.SignUpCredentials>();

  const navigate = useNavigate();
  const [backendError, setBackendError] = useState<string | undefined>(
    undefined
  );
  const [isLocked, setIsLocked] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const toggleLocked = () => {
    setIsLocked(!isLocked);
  };

  async function onSubmit(credentials: UsersApi.LoginCredentials) {
    try {
      const user = await UsersApi.login(credentials);
      onLoginSuccessful(user);
    } catch (error) {
      console.error(error);
      setBackendError(
        (error as { message: string }).message ||
          "An error occurred. Please try again."
      );
      setShowPopup(true);
    }
  }

  async function onLoginSuccessful(user: User) {
    console.log("Login Successful: ", user);
    navigate("/admin", {
      state: { showPopup: true, message: "Login Successful!" },
    });
  }

  return (
    <>
      {isSubmitting && (
        <div className="spinner-container">
          <Spinner fullPage />
        </div>
      )}
      <div className={`login-register-bg ${isSubmitting ? "loading" : ""}`}>
        <form
          className="login-form-container"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1>Login</h1>
          {backendError && <p className="error-message">{backendError}</p>}
          <div className={`input-box ${errors.username ? "invalid" : ""}`}>
            <input
              type="text"
              placeholder="Enter Username"
              {...register("username", { required: "Username is Required" })}
            />
            <FaUser className="login-icon" />
          </div>
          <div className={`input-box ${errors.password ? "invalid" : ""}`}>
            <input
              type={isLocked ? "password" : "text"}
              placeholder="Enter Password"
              {...register("password", { required: "Password is Required" })}
            />
            {isLocked ? (
              <RiEyeCloseLine
                className="login-icon locked"
                onClick={toggleLocked}
              />
            ) : (
              <RiEyeFill
                className="login-icon unlocked"
                onClick={toggleLocked}
              />
            )}
          </div>
          <button className="btn" type="submit" disabled={isSubmitting}>
            Login
          </button>
          <Link to="/admin/register" className="nav-link">
            Register
          </Link>
        </form>

        {showPopup && (
          <ActionPopup
            message={backendError || "An error occurred. Please try again."}
            onClose={() => setShowPopup(false)}
            type="error"
            position="top-right"
          />
        )}
      </div>
    </>
  );
};

export default Login;
