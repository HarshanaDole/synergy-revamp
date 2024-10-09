import { ChangeEvent } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  query: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onSearchChange,
  placeholder,
}) => {
  return (
    <div className="search-container">
      <FiSearch className="search-icon" />
      <input
        type="search"
        value={query}
        onChange={onSearchChange}
        className="search-bar"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
