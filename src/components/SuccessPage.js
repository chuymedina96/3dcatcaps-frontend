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
            cat_name: item.catName,
            team: item.teamLogo,
            color: item.capColor,
            bust_type: item.bustType,
            bust_color: item.bustType === "bubu" ? item.leBubuColor : null,
            font: item.selectedFont,
            font_color: item.fontColor,
            price: (24.99 + (item.bustType !== "none" ? 4.99 : 0)).toFixed(2),
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
          } 
          if (data.full_name || data.shipping_address) {
            setShippingInfo({
              fullName: data.full_name,
              email: email,
              address: data.shipping_address,
              city: data.city,
              zip: data.zip,
            });
          } else {
            setOrderItems(
              cart.map((item) => ({
                cat_name: item.catName,
                team: item.teamLogo,
                color: item.capColor,
                bust_type: item.bustType,
                bust_color: item.bustType === "bubu" ? item.leBubuColor : null,
                font: item.selectedFont,
                font_color: item.fontColor,
                price: (24.99 + (item.bustType !== "none" ? 4.99 : 0)).toFixed(2),
              }))
            );
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
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="mb-3">🎉 Payment Successful!</h2>
        <p>Your Cat Cap order has been received and is now in production.</p>
        {confirmationCode && (
          <h4 className="mt-4">
            Confirmation Code:{" "}
            <span className="text-success">{confirmationCode}</span>
          </h4>
        )}
      </div>

      {shippingInfo.fullName && (
        <div className="mb-4">
          <h5>📦 Shipping Information</h5>
          <p><strong>Name:</strong> {shippingInfo.fullName}</p>
          <p><strong>Email:</strong> {shippingInfo.email}</p>
          <p>
            <strong>Address:</strong> {shippingInfo.address}, {shippingInfo.city},{" "}
            {shippingInfo.zip}
          </p>
        </div>
      )}

      <div>
        <h5>🧢 Order Summary</h5>
        <ul className="list-group">
          {orderItems.map((item, index) => (
            <li key={index} className="list-group-item">
              <strong>{item.cat_name || item.catName}</strong> –{" "}
              {item.team} cap ({item.color})<br />
              Font:{" "}
              <span style={{ color: item.font_color }}>{item.font}</span>
              {item.bust_type !== "none" && (
                <>
                  {" "}+ {item.bust_type} bust
                  {item.bust_color && ` (${item.bust_color})`}
                </>
              )}
              <span className="float-end">${item.price}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5">
        <h6 className="text-center text-muted">
          We'll be reaching out to <strong>{shippingInfo.email}</strong> with updates and tracking info as soon as your CatCap ships.
        </h6>
      </div>

      <div className="text-center mt-4">
        <button
          onClick={downloadReceipt}
          className="btn btn-outline-secondary me-3"
        >
          📄 Download Receipt
        </button>
        <button onClick={() => navigate("/")} className="btn btn-dark">
          Back to Home
        </button>
      </div>
    </div>
  );
}
