import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const styles = {
    videoBg: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: -1,
      pointerEvents: "none",
    },
    page: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: isMobile ? "flex-start" : "center",
      paddingTop: isMobile ? "10vh" : "0",
      paddingLeft: "1rem",
      paddingRight: "1rem",
      fontFamily: "'Helvetica Neue', sans-serif",
      color: "#fff",
      overflow: "hidden",
      position: "relative",
      textAlign: "center",
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.5)",
      borderRadius: "12px",
      backdropFilter: "blur(4px)",
      padding: isMobile ? "1.5rem 1rem" : "3rem",
      maxWidth: isMobile ? "95vw" : "700px",
      width: "100%",
      boxShadow: "0 4px 25px rgba(0,0,0,0.4)",
      marginTop: isMobile ? "0" : 0,
    },
    logo: {
      height: isMobile ? "60px" : "100px",
      marginBottom: isMobile ? "0.75rem" : "1rem",
      borderRadius: "8px",
    },
    title: {
      fontSize: isMobile ? "1.8rem" : "3rem",
      fontWeight: "bold",
      marginBottom: isMobile ? "0.6rem" : "1rem",
    },
    subtitle: {
      fontSize: isMobile ? "1rem" : "1.25rem",
      marginBottom: isMobile ? "1.5rem" : "2rem",
      lineHeight: isMobile ? "1.5rem" : "1.75rem",
    },
    button: {
      padding: isMobile ? "0.65rem 1.3rem" : "0.75rem 1.5rem",
      fontSize: isMobile ? "1rem" : "1.05rem",
      fontWeight: "bold",
      borderRadius: "8px",
      backgroundColor: "#b30000",
      color: "#fff",
      textDecoration: "none",
      border: "none",
      display: "inline-block",
      transition: "background-color 0.3s, transform 0.2s",
    },
  };

  return (
    <div style={styles.page}>
      <video autoPlay muted loop playsInline style={styles.videoBg}>
        <source src="/IMG_9493.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div style={styles.overlay}>
        <img src="/main-logo.png" alt="Catcap Lab Logo" style={styles.logo} />
        <h1 style={styles.title}>Welcome to 3D Catcap Lab</h1>
        <p style={styles.subtitle}>
          Custom cat caps, crafted in-house. <br />
          Designed by real humans. <br />
          Made with state-of-the-art 3D printing.
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
