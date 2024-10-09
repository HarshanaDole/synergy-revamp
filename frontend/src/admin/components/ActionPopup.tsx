import React, { useEffect, useState } from "react";
import "../css/actionPopup.css";

interface ActionPopupProps {
  message: string;
  duration?: number; // duration in milliseconds, optional
  onClose: () => void;
  type?: "success" | "error" | "info"; // Different types of messages
  showTimerBar?: boolean; // Whether to show the timer bar
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const ActionPopup: React.FC<ActionPopupProps> = ({
  message,
  duration = 3000, // default duration to 3 seconds
  onClose,
  type,
  showTimerBar = true, // default to show timer bar
  position,
}) => {
  const [visible, setVisible] = useState(true);
  const [timerWidth, setTimerWidth] = useState(100);

  useEffect(() => {
    if (showTimerBar) {
      const interval = setInterval(() => {
        setTimerWidth((prev) => Math.max(0, prev - 100 / (duration / 100)));
      }, 100);

      const timeout = setTimeout(() => {
        setVisible(false);
        onClose();
      }, duration);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    } else {
      const timeout = setTimeout(() => {
        setVisible(false);
        onClose();
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [duration, onClose, showTimerBar]);

  if (!visible) return null;

  return (
    <div className={`action-popup ${type} ${position}`}>
      <div className="action-popup-content">
        <span>{message}</span>
      </div>
      {showTimerBar && (
        <div className="timer-bar" style={{ width: `${timerWidth}%` }} />
      )}
    </div>
  );
};

export default ActionPopup;
