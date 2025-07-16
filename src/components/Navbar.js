// components/NavBar.js
import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <header
      style={{
        backgroundColor: "#000",
        color: "#fff",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      }}
    >
      <Link to="/" style={{ ...linkStyle, fontWeight: "bold", fontSize: "1.5rem" }}>
        🐾 Catcap Lab
      </Link>
      <nav style={{ display: "flex", gap: "1.5rem", fontSize: "1.125rem" }}>
        <Link to="/customize" style={linkStyle}>
          Customize
        </Link>
        <Link to="/order" style={linkStyle}>
          Order
        </Link>
      </nav>
    </header>
  );
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  transition: "color 0.3s",
};
