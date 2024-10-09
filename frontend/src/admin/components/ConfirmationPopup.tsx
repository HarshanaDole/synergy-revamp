import React from "react";
import "../css/confirmationPopup.css";

interface ConfirmationPopupProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: "warning" | "danger" | "info";
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  message,
  onConfirm,
  onCancel,
  type,
}) => {
  return (
    <div className="confirmation-popup">
      <div className={`popup-content ${type}`}>
        <p>{message}</p>
        <div className="button-group">
          <button className="confirm-btn" onClick={onConfirm}>
            Confirm
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
