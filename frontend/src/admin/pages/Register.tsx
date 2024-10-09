import { Link, useNavigate } from "react-router-dom";
import "../css/login-register.css";
import { User } from "../models/user";
import { useForm } from "react-hook-form";
import * as UsersApi from "../../network/users_api";
import { useState } from "react";
import Spinner from "../components/Spinner";
import ActionPopup from "../components/ActionPopup";

const Register = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<UsersApi.SignUpCredentials>();

  const navigate = useNavigate();
  const [backendError, setBackendError] = useState<string | undefined>(
    undefined
  );
  const [showPopup, setShowPopup] = useState(false);

  async function onSubmit(credentials: UsersApi.SignUpCredentials) {
    try {
      const newUser = await UsersApi.signUp(credentials);
      onSignUpSuccessful(newUser);
    } catch (error) {
      console.error(error);
      setBackendError(
        (error as { message: string }).message ||
          "An error occurred. Please try again."
      );
      setShowPopup(true);
    }
  }

  async function onSignUpSuccessful(user: User) {
    console.log("Signup Successful: ", user);
    navigate("/admin/login");
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
          <h1>Register</h1>
          {backendError && <p className="error-message">{backendError}</p>}
          <div className={`input-box ${errors.secret_key ? "invalid" : ""}`}>
            <input
              type="text"
              placeholder="Enter Secret Key"
              {...register("secret_key", {
                required: "Secret Key is Required",
              })}
              autoComplete="off"
            />
          </div>
          <div className={`input-box ${errors.username ? "invalid" : ""}`}>
            <input
              type="text"
              placeholder="Enter Username"
              {...register("username", { required: "Username is Required" })}
              autoComplete="off"
            />
            {errors.username && (
              <p className="error-message">{errors.username.message}</p>
            )}
          </div>
          <div className={`input-box ${errors.password ? "invalid" : ""}`}>
            <input
              type="password"
              placeholder="Enter Password"
              {...register("password", { required: "Password is Required" })}
              autoComplete="off"
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>
          <div
            className={`input-box ${errors.confirmPassword ? "invalid" : ""}`}
          >
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Please re-enter your Password",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
              autoComplete="off"
            />
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword.message}</p>
            )}
          </div>
          <button className="btn" type="submit" disabled={isSubmitting}>
            Register
          </button>
          <Link to="/admin/login" className="nav-link">
            Login
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

export default Register;
