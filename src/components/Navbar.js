import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const isMobile = window.innerWidth <= 480;

  const linkHoverStyle = {
    color: "#ffdddd",
    textShadow: "0 0 4px #fff",
  };

  return (
    <header
      style={{
        backgroundColor: "#b30000",
        color: "#fff",
        padding: isMobile ? "0.5rem 1rem" : "0.75rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: isMobile ? "0.5rem" : "1rem",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.querySelector("span").style.color = linkHoverStyle.color;
          e.currentTarget.querySelector("span").style.textShadow = linkHoverStyle.textShadow;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.querySelector("span").style.color = "#fff";
          e.currentTarget.querySelector("span").style.textShadow = "none";
        }}
      >
        <img
          src="/main-logo.png"
          alt="Catcap Lab Logo"
          style={{
            height: isMobile ? "40px" : "60px",
            width: "auto",
            objectFit: "contain",
          }}
        />
        <span
          style={{
            ...linkStyle,
            fontWeight: "bold",
            fontSize: isMobile ? "1.1rem" : "1.75rem",
            transition: "all 0.3s",
          }}
        >
          3D Catcap Lab
        </span>
      </Link>

      <nav
        style={{
          display: "flex",
          gap: isMobile ? "1rem" : "1.5rem",
          fontSize: isMobile ? "1rem" : "1.125rem",
          marginTop: isMobile ? "0.5rem" : 0,
          width: isMobile ? "100%" : "auto",
          justifyContent: isMobile ? "center" : "flex-end",
        }}
      >
        {["/customize", "/order"].map((path, i) => (
          <Link
            key={i}
            to={path}
            style={linkStyle}
            onMouseEnter={(e) => {
              e.target.style.color = linkHoverStyle.color;
              e.target.style.textShadow = linkHoverStyle.textShadow;
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "#fff";
              e.target.style.textShadow = "none";
            }}
          >
            {path === "/customize" ? "Customize" : "Order"}
          </Link>
        ))}
      </nav>
    </header>
  );
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  transition: "all 0.3s ease-in-out",
};
