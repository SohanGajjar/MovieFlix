import {SetStateAction} from "react";
import React, {useState} from "react";
import {FaBars, FaSearch, FaTimes} from "react-icons/fa";
import "./Navbar.css";

type NavbarProps = {
  isDrawerOpen: boolean,
  setIsDrawerOpen: React.Dispatch<SetStateAction<boolean>>
  setSearchQuery: React.Dispatch<SetStateAction<string>>
}

const Navbar = ({isDrawerOpen, setIsDrawerOpen, setSearchQuery}: NavbarProps) =>
{
  const [searchValue, setSearchValue] = useState("");
  const handleSearchChange = (e: any) =>
  {
    setSearchValue(e.target.value);
    setSearchQuery(e.target.value);
  };

  return (
    <nav className="navbar">

      <div className="nav-brand">
        <button
          className="toggle-button"
          onClick={() => setIsDrawerOpen((prev) => !prev)}
        >
          {isDrawerOpen ? <FaTimes /> : <FaBars />}
        </button>
        <h1 className="brand-title">Movieflix</h1>
      </div>

      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search movies..."
          value={searchValue}
          onChange={handleSearchChange}
          className="search-bar-input"
        />
      </div>

    </nav>
  );
};

export default Navbar;
