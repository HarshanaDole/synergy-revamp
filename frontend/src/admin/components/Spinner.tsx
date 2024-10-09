import React from "react";
import styles from "../css/spinner.module.css";

interface SpinnerProps {
  size?: number;
  color?: string;
  fullPage?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 36,
  color = "#09f",
  fullPage = false,
}) => {
  const spinnerStyle = {
    width: size,
    height: size,
    borderColor: `rgba(0, 0, 0, 0.1)`,
    borderLeftColor: color,
  };

  return (
    <div className={fullPage ? styles["spinner-container"] : ""}>
      <div className={styles.spinner} style={spinnerStyle}></div>
    </div>
  );
};

export default Spinner;
