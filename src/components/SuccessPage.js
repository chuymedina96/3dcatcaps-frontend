// src/pages/SuccessPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000";

export default function SuccessPage() {
  const [confirmationCode, setConfirmationCode] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [shippingInfo, setShippingInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("catcapCart")) || [];
    const email = localStorage.getItem("checkoutEmail") || "";
    const pinkInterestRaw = localStorage.getItem("pinkInterest");
    const pinkInterest =
      pinkInterestRaw === "true"
        ? true
        : pinkInterestRaw === "false"
        ? false
        : null;
    const shipping = JSON.parse(localStorage.getItem("shippingInfo")) || {};

    if (cart.length && email) {
      setShippingInfo({ ...shipping, email });

      fetch(`${API_BASE}/api/create-order/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: cart.map((item) => ({
            cat_name: item.cat_name,
            team: item.team,
            color: item.color,
            bust_type: item.bust_type,
            bust_color: item.bust_type !== "none" ? item.bust_color : null,
            font: item.font,
            font_color: item.font_color,
            price: (24.99 + (item.bust_type !== "none" ? 4.99 : 0)).toFixed(2),
          })),
          shippingInfo: {
            ...shipping,
            email,
          },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.confirmation_code) {
            setConfirmationCode(data.confirmation_code);
          }
          if (data.items?.length > 0) {
            setOrderItems(data.items);
          } else {
            // fallback to local cart if backend fails to return items
            setOrderItems(
              cart.map((item) => ({
                cat_name: item.cat_name,
                team: item.team,
                color: item.color,
                bust_type: item.bust_type,
                bust_color: item.bust_type !== "none" ? item.bust_color : null,
                font: item.font,
                font_color: item.font_color,
                price: (24.99 + (item.bust_type !== "none" ? 4.99 : 0)).toFixed(2),
              }))
            );
          }
          if (data.full_name || data.shipping_address) {
            setShippingInfo({
              fullName: data.full_name,
              email: email,
              address: data.shipping_address,
              city: data.city,
              zip: data.zip,
            });
          }

          if (pinkInterest !== null && email) {
            fetch(`${API_BASE}/api/pink-interest/`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ interested: pinkInterest, email }),
            });
          }

          localStorage.removeItem("catcapCart");
          localStorage.removeItem("checkoutEmail");
          localStorage.removeItem("pinkInterest");
          localStorage.removeItem("shippingInfo");
        })
        .catch(() => {
          // fallback only if error occurs
          setOrderItems(
            cart.map((item) => ({
              cat_name: item.cat_name,
              team: item.team,
              color: item.color,
              bust_type: item.bust_type,
              bust_color: item.bust_type !== "none" ? item.bust_color : null,
              font: item.font,
              font_color: item.font_color,
              price: (24.99 + (item.bust_type !== "none" ? 4.99 : 0)).toFixed(2),
            }))
          );
          localStorage.removeItem("catcapCart");
          localStorage.removeItem("checkoutEmail");
          localStorage.removeItem("pinkInterest");
          localStorage.removeItem("shippingInfo");
        });
    }
  }, []);

  const downloadReceipt = () => {
    window.print();
  };

  return (
    <div className="container py-5" style={{ maxWidth: "700px", fontFamily: "'Courier New', monospace" }}>
      <div className="border p-4 shadow-sm rounded" style={{ background: "#fff" }}>
        <div className="text-center mb-4">
          <h2 className="mb-2">🧾 CatCap Receipt</h2>
          <p className="text-muted mb-0">Thanks for your order!</p>
          {confirmationCode && (
            <p className="mt-2">
              <strong>Confirmation:</strong>{" "}
              <span className="text-success">{confirmationCode}</span>
            </p>
          )}
        </div>

        <hr />

        {shippingInfo.fullName && (
          <div className="mb-4">
            <h5>📦 Shipping To</h5>
            <p><strong>{shippingInfo.fullName}</strong></p>
            <p>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.zip}</p>
            <p>{shippingInfo.email}</p>
          </div>
        )}

        <hr />

        <div className="mb-4">
          <h5>🧢 Order Details</h5>
          {orderItems.map((item, index) => (
            <div key={index} className="border-bottom py-2">
              <div>
                <strong>{item.cat_name}</strong> – {item.team} cap ({item.color})
              </div>
              <div>
                Font: <span style={{ color: item.font_color }}>{item.font}</span>
              </div>
              {item.bust_type !== "none" && (
                <div>
                  Bust: {item.bust_type}
                  {item.bust_color && (
                    <span> ({item.bust_color})</span>
                  )}
                </div>
              )}
              <div className="text-end">
                <strong>${item.price}</strong>
              </div>
            </div>
          ))}
        </div>

        <hr />

        <div className="text-center mb-3 text-muted" style={{ fontSize: "0.9rem" }}>
          We'll contact you at <strong>{shippingInfo.email}</strong> with shipping updates.
        </div>

        <div className="text-center">
          <button onClick={downloadReceipt} className="btn btn-outline-secondary me-3">
            🖨️ Print Receipt
          </button>
          <button onClick={() => navigate("/")} className="btn btn-dark">
            ⬅️ Back Home
          </button>
        </div>
      </div>
    </div>
  );
}
