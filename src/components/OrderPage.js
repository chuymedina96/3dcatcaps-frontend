import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

// Load from environment variables
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000";
const STRIPE_KEY = process.env.REACT_APP_STRIPE_KEY || "pk_test_default_placeholder";

// Dynamically load Stripe
const stripePromise = loadStripe(STRIPE_KEY);

export default function OrderPage() {
  const [cart, setCart] = useState([]);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  useEffect(() => {
    const savedCart = localStorage.getItem("catcapCart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;

      // 🔒 Save email to localStorage for later use
      localStorage.setItem("checkoutEmail", shippingInfo.email);
      localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));

      const response = await fetch(`${API_BASE}/api/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, shippingInfo }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Stripe error response:", data);
        alert("Something went wrong with checkout.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Error occurred during checkout.");
    }
  };

  const handleInputChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4">🧾 Review Your Order</h2>

      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul className="list-group mb-4">
            {cart.map((item, index) => {
              const basePrice = 24.99;
              const bustPrice = item.bustType !== "none" ? 4.99 : 0;
              const total = (basePrice + bustPrice).toFixed(2);

              return (
                <li key={index} className="list-group-item">
                  <strong>{item.catName}</strong> – {item.teamLogo} cap ({item.capColor}) —{" "}
                  <span style={{ color: item.fontColor }}>{item.fontColor} name</span>
                  {item.bustType !== "none" && <> + {item.bustType} bust</>}
                  <span className="float-end">${total}</span>
                </li>
              );
            })}
          </ul>

          <h4>📦 Shipping Info</h4>
          <div className="row mb-4">
            <div className="col-md-6 mb-2">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={shippingInfo.fullName}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="col-md-6 mb-2">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={shippingInfo.email}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="col-md-6 mb-2">
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={shippingInfo.address}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="col-md-3 mb-2">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={shippingInfo.city}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="col-md-3 mb-2">
              <input
                type="text"
                name="zip"
                placeholder="ZIP Code"
                value={shippingInfo.zip}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
          </div>

          <button onClick={handleCheckout} className="btn btn-success w-100">
            🛒 Checkout Securely with Stripe
          </button>
        </>
      )}
    </div>
  );
}
