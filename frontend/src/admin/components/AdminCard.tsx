import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/adminCard.css";

interface AdminCardProps {
  admin: {
    id: string | undefined;
    username: string;
  };
  loggedInAdminId: string | undefined;
}

const AdminCard: React.FC<AdminCardProps> = ({ admin, loggedInAdminId }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate("/admin/profile");
  };

  return (
    <div className="admin-card">
      <img
        src="/img/User-Profile-PNG-High-Quality-Image.png"
        alt={admin.username}
        className="admin-profile-pic"
      />
      <h2>{admin.username}</h2>
      {admin.id === loggedInAdminId && (
        <div className="button-group">
          <button onClick={handleViewProfile}>View Profile</button>
        </div>
      )}
    </div>
  );
};

export default AdminCard;
