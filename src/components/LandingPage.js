// src/components/LandingPage.js
import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const styles = {
    page: {
      backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/zoe-gayah-jonker-13ky5Ycf0ts-unsplash.jpg")`, // Replace with your filename
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      color: "#fff",
      fontFamily: "'Helvetica Neue', sans-serif",
    },
    overlay: {
      padding: "3rem",
      borderRadius: "12px",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      maxWidth: "700px",
      margin: "2rem",
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
    buttonGroup: {
      display: "flex",
      justifyContent: "center",
      gap: "1rem",
      flexWrap: "wrap",
    },
    buttonPrimary: {
      padding: "0.75rem 1.5rem",
      fontSize: "1rem",
      fontWeight: "bold",
      borderRadius: "8px",
      backgroundColor: "#fff",
      color: "#000",
      textDecoration: "none",
      border: "none",
    },
    buttonSecondary: {
      padding: "0.75rem 1.5rem",
      fontSize: "1rem",
      fontWeight: "bold",
      borderRadius: "8px",
      backgroundColor: "transparent",
      color: "#fff",
      textDecoration: "none",
      border: "2px solid #fff",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <h1 style={styles.title}>🐾 Welcome to Catcap Lab</h1>
        <p style={styles.subtitle}>
          Personalize the <strong>purr-fect</strong> 3D-printed cap for your cat.
          <br />
          Choose team colors, styles, and order with ease.
        </p>
        <div style={styles.buttonGroup}>
          <Link to="/customize" style={styles.buttonPrimary}>
            Start Customizing
          </Link>
          <Link to="/order" style={styles.buttonSecondary}>
            Place an Order
          </Link>
        </div>
      </div>
    </div>
  );
}
