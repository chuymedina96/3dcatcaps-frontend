import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const linkHoverStyle = {
    color: "#ffdddd",
    textShadow: "0 0 4px #fff",
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    transition: "all 0.3s ease-in-out",
  };

  return (
    <header
      style={{
        backgroundColor: "#b30000",
        color: "#fff",
        padding: isMobile ? "0.6rem 1rem" : "0.75rem 2rem",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "center",
        justifyContent: "space-between",
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
          const span = e.currentTarget.querySelector("span");
          span.style.color = linkHoverStyle.color;
          span.style.textShadow = linkHoverStyle.textShadow;
        }}
        onMouseLeave={(e) => {
          const span = e.currentTarget.querySelector("span");
          span.style.color = "#fff";
          span.style.textShadow = "none";
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
            fontWeight: "bold",
            fontSize: isMobile ? "1.25rem" : "1.75rem",
            transition: "all 0.3s",
          }}
        >
          3D Catcap Lab
        </span>
      </Link>

      <nav
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          gap: isMobile ? "0.75rem" : "1.5rem",
          marginTop: isMobile ? "0.75rem" : 0,
          width: isMobile ? "100%" : "auto",
        }}
      >
        {[
          { path: "/customize", label: "Customize" },
          { path: "/order", label: "Order" },
        ].map(({ path, label }) => (
          <Link
            key={path}
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
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
