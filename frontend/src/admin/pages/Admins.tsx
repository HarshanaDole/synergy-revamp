import { useEffect, useState } from "react";
import AdminCard from "../components/AdminCard";
import "../css/admins.css";
import Header from "../components/Header";
import * as UsersApi from "../../network/users_api";
import { User } from "../models/user";
import Spinner from "../components/Spinner";
import useUser from "../hooks/useUser";
import SmallButton from "../components/SmallButton";

function Admins() {
  const [admins, setAdmins] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLoadingError, setShowLoadingError] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    async function getAdmins() {
      try {
        setShowLoadingError(false);
        setLoading(true);
        const admins = await UsersApi.getAllUsers();
        setAdmins(admins);
      } catch (error) {
        console.error(error);
        setShowLoadingError(true);
      } finally {
        setLoading(false);
      }
    }
    getAdmins();
  }, []);

  return (
    <>
      <Header />
      <div className="admins-container">
        <div className="top-container">
          <h1>Admins</h1>
          <SmallButton to="/admin/register" className="small-btn" />
        </div>

        {loading ? (
          <Spinner fullPage color="var(--main-color)" />
        ) : showLoadingError ? (
          <p style={{ textAlign: "center" }}>
            Something went wrong. Please refresh the page.
          </p>
        ) : (
          <div className="admin-cards">
            {admins.map((admin) => (
              <AdminCard
                key={admin.id}
                admin={admin}
                loggedInAdminId={user?.id}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Admins;
