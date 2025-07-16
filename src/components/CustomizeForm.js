import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const fonts = [
  "Arial", "Courier New", "Georgia", "Verdana", "Impact",
  "Lucida Console", "Comic Sans MS", "Bebas Neue", "Oswald",
];

const fontColors = ["white", "red", "blue", "pink"];
const capColors = ["black", "blue"];
const bustCost = 4.99;
const basePrice = 24.99;

export default function CustomizeForm() {
  const [catName, setCatName] = useState("");
  const [selectedFont, setSelectedFont] = useState(fonts[0]);
  const [fontColor, setFontColor] = useState(fontColors[0]);
  const [capColor, setCapColor] = useState("black");
  const [teamLogo, setTeamLogo] = useState("sox");
  const [bustType, setBustType] = useState("none");
  const [leBubuColor, setLeBubuColor] = useState("white");
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
    // auto sync capColor to team
    setCapColor(teamLogo === "sox" ? "black" : "blue");
  }, [teamLogo]);

  const getTotalPrice = () => {
    return cart.reduce((acc, item) => {
      const extra = item.bustType !== "none" ? bustCost : 0;
      return acc + basePrice + extra;
    }, 0).toFixed(2);
  };

  const handleAddToCart = () => {
    const item = {
      catName,
      selectedFont,
      fontColor,
      capColor,
      teamLogo,
      bustType,
      leBubuColor,
    };
    setCart([...cart, item]);
    setCatName("");
  };

  const handleDelete = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  };

  const submitInterest = async (interest) => {
  localStorage.setItem("pinkInterest", interest.toString());
  setPinkInterest(interest);
};


  return (
    <div style={{ display: "flex", flexWrap: "wrap", padding: "2rem" }}>
      <form style={{ flex: 1, minWidth: "300px", marginRight: "2rem" }}>
        <h2>🎨 Customize Your Cat Cap</h2>

        <label>Cat's Name</label>
        <input
          type="text"
          value={catName}
          onChange={(e) => setCatName(e.target.value)}
          className="form-control mb-3"
        />

        <label>Font Style</label>
        <select
          value={selectedFont}
          onChange={(e) => setSelectedFont(e.target.value)}
          className="form-select mb-3"
        >
          {fonts.map((font) => (
            <option key={font} value={font}>{font}</option>
          ))}
        </select>

        <label>Font Color</label>
        <select
          value={fontColor}
          onChange={(e) => setFontColor(e.target.value)}
          className="form-select mb-3"
        >
          {fontColors.map((color) => (
            <option key={color} value={color}>{color}</option>
          ))}
        </select>

        <label>Team Logo</label>
        <select
          value={teamLogo}
          onChange={(e) => setTeamLogo(e.target.value)}
          className="form-select mb-3"
        >
          <option value="sox">White Sox</option>
          <option value="cubs">Cubs</option>
        </select>

        <label>Bust Option</label>
        <select
          value={bustType}
          onChange={(e) => setBustType(e.target.value)}
          className="form-select mb-3"
        >
          <option value="none">None</option>
          <option value="pope">Pope Leo</option>
          <option value="bubu">Le Bubu</option>
        </select>

        {bustType === "bubu" && (
          <div className="mb-3">
            <label>Le Bubu Color</label>
            <select
              value={leBubuColor}
              onChange={(e) => setLeBubuColor(e.target.value)}
              className="form-select"
            >
              {fontColors.map((color) => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>
        )}

        <button
          type="button"
          onClick={handleAddToCart}
          className="btn btn-dark w-100 mt-3"
        >
          ➕ Add to Cart
        </button>
      </form>

      <div style={{ flex: 1, minWidth: "300px" }}>
        <h3>🔍 Preview</h3>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <p
            style={{
              fontFamily: selectedFont,
              color: fontColor,
              fontSize: "2.4rem",
              backgroundColor: "#222",
              padding: "0.4rem 1rem",
              borderRadius: "8px",
              color: fontColor,
            }}
          >
            {catName || "Your Cat's Name"}
          </p>
          <p><strong>Cap Color:</strong> {capColor}</p>
          <p><strong>Team:</strong> {teamLogo === "sox" ? "White Sox" : "Cubs"}</p>
          <p><strong>Bust:</strong> {bustType}</p>
          {bustType === "bubu" && <p><strong>Bubu Color:</strong> {leBubuColor}</p>}
        </div>

        <h4 className="mt-4">🛒 Cart ({cart.length} items)</h4>
        <ul>
          {cart.map((item, i) => (
            <li key={i}>
              {item.catName} — {item.teamLogo} {item.bustType !== "none" ? "+Bust" : ""}{" "}
              <button onClick={() => handleDelete(i)} style={{ marginLeft: "1rem", color: "red", background: "none", border: "none", cursor: "pointer" }}>✖</button>
            </li>
          ))}
        </ul>

        <p className="mt-3"><strong>Total:</strong> ${getTotalPrice()}</p>

        <button
          className="btn btn-success mt-2"
          onClick={() => navigate("/order")}
        >
          🧾 Proceed to Checkout
        </button>

        {/* Pink Survey */}
        {!pinkInterest && (
          <div
            style={{
              padding: "1rem",
              border: "2px dashed #ffb6c1",
              borderRadius: "10px",
              marginTop: "2rem",
              backgroundColor: "#fff0f6",
            }}
          >
            <h4 style={{ marginBottom: "0.5rem" }}>
              🎀 Limited Pink Edition Coming Soon!
            </h4>
            <p style={{ marginBottom: "1rem" }}>
              Would you be interested in a full pink cap version for your cat?
            </p>
            <button style={buttonStyle} onClick={() => submitInterest(true)}>
              Yes, I’d love that!
            </button>
            <button
              style={{
                ...buttonStyle,
                backgroundColor: "#eee",
                color: "#333",
                marginLeft: "1rem",
              }}
              onClick={() => submitInterest(false)}
            >
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
