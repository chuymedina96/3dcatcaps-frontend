// components/NavBar.js
import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <header
      style={{
        backgroundColor: "#b30000", // Red theme
        color: "#fff",
        padding: "0.75rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          textDecoration: "none",
        }}
      >
        <img
          src="/main-logo.png" // adjust if using a different name
          alt="Catcap Lab Logo"
          style={{ height: "60px", width: "auto", objectFit: "contain" }}
        />
        <span style={{ ...linkStyle, fontWeight: "bold", fontSize: "1.75rem" }}>
          3D Catcap Lab
        </span>
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
