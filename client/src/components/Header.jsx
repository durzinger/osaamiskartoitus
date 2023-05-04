import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import menu from "../assets/menuicon-50x50.png";
import "../styles/Header.scss";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef();

  useEffect(() => {
    const closeDropdown = (e) => {
      if (e.target !== menuRef.current) {
        setMenuOpen(false);
      }
    };
    document.body.addEventListener("click", closeDropdown);
    return () => document.body.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <div className="header-main">
      <Link to="/" className="header-label">
        Osaamiskartoitus
      </Link>
      <div>
        <img src={menu} alt="" ref={menuRef} onClick={() => setMenuOpen(!menuOpen)} />
        <div className="dropdown">{menuOpen && <div className="dropdown-content">Analytiikka</div>}</div>
      </div>
    </div>
  );
};

export default Header;
