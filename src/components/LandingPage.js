import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const styles = {
    videoBg: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: -1,
    },
    overlay: {
      padding: "3rem",
      borderRadius: "12px",
      background: "rgba(0, 0, 0, 0.5)",
      maxWidth: "700px",
      margin: "2rem",
      boxShadow: "0 4px 25px rgba(0,0,0,0.4)",
      backdropFilter: "blur(4px)",
    },
    page: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      color: "#fff",
      fontFamily: "'Helvetica Neue', sans-serif",
      position: "relative",
      overflow: "hidden",
    },
    title: {
      fontSize: "3rem",
      fontWeight: "bold",
      marginBottom: "1rem",
    },
    subtitle: {
      fontSize: "1.25rem",
      marginBottom: "2rem",
    },
    button: {
      padding: "0.75rem 1.5rem",
      fontSize: "1rem",
      fontWeight: "bold",
      borderRadius: "8px",
      backgroundColor: "#b30000",
      color: "#fff",
      textDecoration: "none",
      border: "none",
      transition: "background-color 0.3s, transform 0.2s",
    },
    logo: {
      height: "100px",
      marginBottom: "1rem",
      marginRight: "-15px",
      borderRadius: "8px",
    },
  };

  return (
    <div style={styles.page}>
      {/* 🎥 Background video */}
      <video autoPlay muted loop playsInline style={styles.videoBg}>
        <source src="/IMG_9493.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div style={styles.overlay}>
        <img src="/main-logo.png" alt="Catcap Lab Logo" style={styles.logo} />
        <h1 style={styles.title}>Welcome to 3D Catcap Lab</h1>
        <p style={styles.subtitle}>
          Custom cat caps, crafted in-house.
          Designed by real humans. Manufactured with precision 3D printing.
          Choose team colors, styles, and order with ease.
        </p>
        <Link
          to="/customize"
          style={styles.button}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#990000";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#b30000";
            e.target.style.transform = "scale(1)";
          }}
        >
          Start Customizing
        </Link>
      </div>
    </div>
  );
}
