import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.scss";

const Header = () => {
  return (
    <div className="header-main">
      <Link to="/" className="header-label">
        Osaamiskartoitus
      </Link>
      <Link to="/analytics" className="header-label">
        Analytiikka
      </Link>
    </div>
  );
};

export default Header;
