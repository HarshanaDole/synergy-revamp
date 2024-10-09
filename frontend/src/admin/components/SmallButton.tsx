import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";

interface SmallButtonProps {
  to: string;
  className?: string;
  iconClassName?: string;
}

const SmallButton: React.FC<SmallButtonProps> = ({
  to,
  className = "small-btn",
  iconClassName = "small-btn-icon",
}) => {
  return (
    <Link to={to} className={className}>
      <MdAdd className={iconClassName} />
    </Link>
  );
};

export default SmallButton;
