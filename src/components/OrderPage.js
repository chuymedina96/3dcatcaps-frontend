import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000";
const STRIPE_KEY = process.env.REACT_APP_STRIPE_KEY || "pk_test_default_placeholder";
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
    const { fullName, email, address, city, zip } = shippingInfo;
    if (!fullName || !email || !address || !city || !zip) {
      alert("Please fill out all shipping fields before proceeding to checkout.");
      return;
    }

    try {
      const stripe = await stripePromise;
      localStorage.setItem("checkoutEmail", email);
      localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));

      const response = await fetch(`${API_BASE}/api/create-checkout-session/`, {
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
    <div className="container py-5" style={{ maxWidth: "720px", fontFamily: "'Courier New', Courier, monospace" }}>
      <div className="p-4 border rounded shadow-sm bg-white">
        <h3 className="text-center mb-4">🛒 Ringing You Up...</h3>

        {cart.length === 0 ? (
          <p className="text-center text-muted">Your cart is empty.</p>
        ) : (
          <>
            <div className="mb-4">
              {cart.map((item, index) => {
                const basePrice = 24.99;
                const bustPrice = item.bust_type !== "none" ? 4.99 : 0;
                const total = (basePrice + bustPrice).toFixed(2);
                const capName = item.cat_name || "Unnamed Cat";
                const fontColor = item.font_color || "white";
                const capColor = item.color || "black";
                const team = item.team === "sox" ? "White Sox" : "Cubs";

                return (
                  <div
                    key={index}
                    className="d-flex justify-content-between align-items-start border-bottom py-2"
                  >
                    <div>
                      <div><strong>{capName}</strong></div>
                      <div>{team} cap ({capColor})</div>
                      <div>
                        Font: <span>{item.font}</span>{" "}
                        (<span style={{ color: fontColor }}>{fontColor}</span>)
                      </div>
                      {item.bust_type !== "none" && (
                        <div>
                          + {item.bust_type} bust
                          {item.bust_color && (
                            <>
                              {" "}
                              (<span>{item.bust_color}</span>{" "}
                              <span style={{
                                display: "inline-block",
                                width: "12px",
                                height: "12px",
                                backgroundColor: item.bust_color,
                                border: "1px solid #ccc",
                                borderRadius: "3px",
                                marginLeft: "4px",
                                verticalAlign: "middle"
                              }}></span>)
                            </>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="fw-bold">${total}</div>
                  </div>
                );
              })}
            </div>

            <h5 className="mb-3">📦 Shipping Info</h5>
            <div className="row g-2 mb-4">
              <div className="col-md-6">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={shippingInfo.fullName}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={shippingInfo.email}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="col-12">
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={shippingInfo.city}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
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

            <button onClick={handleCheckout} className="btn btn-dark w-100">
              💳 Checkout Securely with Stripe
            </button>
          </>
        )}
      </div>
    </div>
  );
}
