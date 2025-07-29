// src/components/CustomizeForm.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const fonts = ["Arial", "Courier New", "Georgia", "Verdana", "Impact", "Lucida Console", "Comic Sans MS", "Bebas Neue", "Oswald"];
const fontColors = ["white", "red", "blue", "pink"];
const capColors = ["black", "blue"];
const bustCost = 4.99;
const basePrice = 24.99;

export default function CustomizeForm() {
  const [cat_name, setCatName] = useState("");
  const [font, setFont] = useState(fonts[0]);
  const [font_color, setFontColor] = useState(fontColors[0]);
  const [color, setCapColor] = useState("black");
  const [team, setTeamLogo] = useState("sox");
  const [bust_type, setBustType] = useState("none");
  const [bust_color, setBustColor] = useState("white");
  const [cart, setCart] = useState([]);
  const [pinkInterest, setPinkInterest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem("catcapCart");
    if (savedCart) setCart(JSON.parse(savedCart));
    const interest = localStorage.getItem("pinkInterest");
    if (interest) setPinkInterest(interest === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("catcapCart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    setCapColor(team === "sox" ? "black" : "blue");
  }, [team]);

  const getTotalPrice = () =>
    cart.reduce((acc, item) => acc + basePrice + (item.bust_type !== "none" ? bustCost : 0), 0).toFixed(2);

  const handleAddToCart = () => {
    const item = {
      cat_name,
      font,
      font_color,
      color,
      team,
      bust_type,
      bust_color,
      price: (basePrice + (bust_type !== "none" ? bustCost : 0)).toFixed(2),
    };

    setCart([...cart, item]);
    setCatName("");
  };

  const handleDelete = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  };

  const submitInterest = (interest) => {
    localStorage.setItem("pinkInterest", interest.toString());
    setPinkInterest(interest);
  };

  const renderBustLabel = (type) =>
    type === "bubu" ? "LaBubu" : type === "pope" ? "Leo Bust" : "None";

  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", padding: "2rem", color: "#222", fontFamily: "'Helvetica Neue', sans-serif", justifyContent: "center" }}>
      <form style={{ flex: 1, minWidth: "300px", marginRight: "2rem", maxWidth: "500px" }}>
        <h2 style={{ color: "#b30000" }}>🎨 Customize Your Cat Cap</h2>

        <label>Cat's Name</label>
        <input
          type="text"
          value={cat_name}
          onChange={(e) => setCatName(e.target.value)}
          className="form-control mb-3"
          style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "0.5rem" }}
        />

        <label>Font Style</label>
        <select value={font} onChange={(e) => setFont(e.target.value)} className="form-select mb-3">
          {fonts.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>

        <label>Font Color</label>
        <select value={font_color} onChange={(e) => setFontColor(e.target.value)} className="form-select mb-3">
          {fontColors.map((color) => <option key={color} value={color}>{color}</option>)}
        </select>

        <label>Team</label>
        <select value={team} onChange={(e) => setTeamLogo(e.target.value)} className="form-select mb-3">
          <option value="sox">White Sox</option>
          <option value="cubs">Cubs</option>
        </select>

        <label>Optional Bust:</label>
        <select value={bust_type} onChange={(e) => setBustType(e.target.value)} className="form-select mb-3">
          <option value="none">None</option>
          <option value="pope">Bless it up Leo style Bust</option>
          <option value="bubu">LaBubu Bust</option>
        </select>

        {(bust_type === "pope" || bust_type === "bubu") && (
          <div className="mb-3">
            <label>
              {bust_type === "pope" ? "Pope Bust Color (white recommended)" : "LaBubu Color"}
            </label>
            <select value={bust_color} onChange={(e) => setBustColor(e.target.value)} className="form-select">
              {fontColors.map((color) => <option key={color} value={color}>{color}</option>)}
            </select>
          </div>
        )}

        <button
          type="button"
          onClick={handleAddToCart}
          className="btn w-100 mt-3"
          style={{ backgroundColor: "#b30000", color: "#fff", fontWeight: "bold", borderRadius: "6px", padding: "0.6rem", border: "none" }}
        >
          ➕ Add to Cart
        </button>
      </form>

      <div style={{ flex: 1, minWidth: "300px", maxWidth: "500px" }}>
        <h3 style={{ color: "#b30000" }}>🔍 Preview</h3>
        <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px", backgroundColor: "#fff7f7" }}>
          <p style={{ fontFamily: font, color: font_color, fontSize: "2.4rem", backgroundColor: "#222", padding: "0.4rem 1rem", borderRadius: "8px" }}>
            {cat_name || "Your Cat's Name"}
          </p>
          <p><strong>Cap Color:</strong> {capitalize(color)}</p>
          <p><strong>Team:</strong> {team === "sox" ? "White Sox" : "Cubs"}</p>
          <p><strong>Bust:</strong> {renderBustLabel(bust_type)}</p>
          {(bust_type !== "none") && (
            <p><strong>{renderBustLabel(bust_type)} Color:</strong> {capitalize(bust_color)}</p>
          )}
        </div>

        <h4 className="mt-4">🛒 Cart ({cart.length} items)</h4>
        <ul>
          {cart.map((item, i) => (
            <li key={i}>
              {item.cat_name} — {item.team} {item.bust_type !== "none" ? `+${renderBustLabel(item.bust_type)}` : ""}
              <button onClick={() => handleDelete(i)} style={{ marginLeft: "1rem", color: "red", background: "none", border: "none", cursor: "pointer" }}>✖</button>
            </li>
          ))}
        </ul>

        <p className="mt-3"><strong>Total:</strong> ${getTotalPrice()}</p>
        <button className="btn btn-dark mt-2" style={{ backgroundColor: "#b30000", color: "#fff", fontWeight: "bold", border: "none" }} onClick={() => navigate("/order")}>
          🧾 Proceed to Checkout
        </button>

        {!pinkInterest && (
          <div style={{ padding: "1rem", border: "2px dashed #ffb6c1", borderRadius: "10px", marginTop: "2rem", backgroundColor: "#fff0f6" }}>
            <h4 style={{ marginBottom: "0.5rem" }}>🎀 Limited Pink Edition Coming Soon!</h4>
            <p style={{ marginBottom: "1rem" }}>Would you be interested in a full pink cap version for your cat?</p>
            <button style={buttonStyle} onClick={() => submitInterest(true)}>Yes, I’d love that!</button>
            <button style={{ ...buttonStyle, backgroundColor: "#eee", color: "#333", marginLeft: "1rem" }} onClick={() => submitInterest(false)}>
              Not interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: "0.5rem 1.2rem",
  backgroundColor: "#ff69b4",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
};
