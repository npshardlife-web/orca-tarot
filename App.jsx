import React, { useState } from "react";

const IMG = "/images/orca-tarot";

const sampleCards = [
  { name: "The Strategist", image: IMG + "/file_00000000854871f7bb905202d2dc51e3.png" },
  { name: "The Flame", image: IMG + "/file_00000000dea871f8b4a08b6a5861f224.png" },
  { name: "The Signal", image: IMG + "/file_00000000329871fd9a7b9f5f38a5e8cd.png" }
];

export default function App() {
  const [cards, setCards] = useState([]);

  const draw = () => {
    const shuffled = [...sampleCards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  };

  return (
    <div style={{ padding: 20, background: "#0b0f14", minHeight: "100vh", color: "white" }}>
      <h1>ORCA Tarot</h1>
      <button onClick={draw} style={{ padding: 10, marginBottom: 20 }}>
        Draw Cards
      </button>

      <div style={{ display: "flex", gap: 20 }}>
        {cards.map((card, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <img
              src={card.image}
              alt={card.name}
              style={{ width: 200, height: 300, objectFit: "cover", borderRadius: 10 }}
              onError={(e) => (e.target.style.display = "none")}
            />
            <div>{card.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
