import { useState, useEffect, ReactNode } from "react";
import * as UsersApi from "../../network/users_api";
import { User, UserContext } from "../models/user";
import { useForm } from "react-hook-form";
import ActionPopup from "../components/ActionPopup";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [backendError, setBackendError] = useState<string | undefined>(
    undefined
  );
  const navigate = useNavigate();

  const { setValue } = useForm();

  useEffect(() => {
    async function checkAuthentication() {
      try {
        const user = await UsersApi.getLoggedInUser();
        setUser(user);
      } catch (error) {
        console.error(error);
        setBackendError(
          (error as { message: string }).message ||
            "An error occurred. Please try again."
        );
        navigate("/admin/login");
      } finally {
        setLoading(false);
      }
    }

    checkAuthentication();
  }, [setValue, navigate]);

  if (loading) {
    return (
      <div>
        <Spinner fullPage color="var(--main-color)" />
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
      {backendError && (
        <ActionPopup
          message={backendError || "An error occurred. Please try again."}
          onClose={() => setBackendError(undefined)}
          type="error"
          position="bottom-right"
        />
      )}
    </UserContext.Provider>
  );
};
