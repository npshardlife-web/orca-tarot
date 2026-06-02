import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shuffle,
  RotateCcw,
  Sparkles,
  Layers,
  Eye,
  AlertTriangle,
  BookOpen,
  ImageOff,
  Moon,
  Sun,
  Download,
} from "lucide-react";

import {
  buildDeck,
  getDeckStats,
  getMissingImages,
  drawCards,
  cardBack,
} from "./data/orca_master_deck.js";

const LAYOUTS = {
  "Single Card": {
    description: "One clear signal.",
    positions: ["Signal"],
  },
  "Past / Present / Future": {
    description: "Classic three-card time spread.",
    positions: ["Past", "Present", "Future"],
  },
  "Situation / Action / Outcome": {
    description: "Decision and movement spread.",
    positions: ["Situation", "Action", "Outcome"],
  },
  "Mind / Body / Spirit": {
    description: "Personal state diagnostic.",
    positions: ["Mind", "Body", "Spirit"],
  },
  "Relationship Mirror": {
    description: "Bond, wound, and repair spread.",
    positions: ["You", "Them", "The Bond", "The Wound", "The Repair", "Likely Direction"],
  },
  "Horseshoe": {
    description: "Seven-card problem and outcome spread.",
    positions: ["Past", "Present", "Hidden Influence", "Obstacle", "Environment", "Best Action", "Likely Outcome"],
  },
  "Celtic Cross": {
    description: "Full ten-card systems reading.",
    positions: ["Present", "Challenge", "Foundation", "Recent Past", "Crowning Thought", "Near Future", "Self", "Environment", "Hopes / Fears", "Outcome"],
    special: "celtic",
  },
  "Year Ahead": {
    description: "Twelve-card month-by-month spread.",
    positions: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  },
  "ORCA Systems Diagnostic": {
    description: "Custom systems-health reading.",
    positions: ["Signal", "Threat", "Resource", "Emotional System", "Material System", "Information System", "Action System", "Hidden Loop", "Stabilizer", "Next Doctrine"],
    special: "orca",
  },
};

function safeMeaning(card) {
  return card?.reversedDraw ? card.reversed : card?.meaning;
}

function buildInterpretation(cards, positions, question) {
  if (!cards.length) return "Draw cards to generate an ORCA interpretation.";

  const majorCount = cards.filter((c) => c.suit === "Major").length;
  const reversedCount = cards.filter((c) => c.reversedDraw).length;
  const suits = [...new Set(cards.map((c) => c.suit))];
  const first = cards[0];
  const outcome = cards[cards.length - 1];

  const lines = [
    question?.trim() ? `Question: ${question.trim()}` : "Question: What does the system need to reveal?",
    "",
    `System signature: ${cards.length} cards, ${majorCount} Major Arcana, ${reversedCount} reversed, active suits: ${suits.join(", ")}.`,
    "",
    `Opening signal — ${positions[0]} / ${first.name}: ${safeMeaning(first)}`,
  ];

  if (cards.length > 2) {
    const midIndex = Math.floor(cards.length / 2);
    const middle = cards[midIndex];
    lines.push(`Central pressure — ${positions[midIndex]} / ${middle.name}: ${safeMeaning(middle)}`);
  }

  lines.push(`Outcome vector — ${positions[cards.length - 1]} / ${outcome.name}: ${safeMeaning(outcome)}`);
  lines.push("");
  lines.push("ORCA directive: name the signal, reduce noise, stabilize the environment, and choose the next clean move.");

  return lines.join("\n");
}

function downloadReading({ question, layoutName, cards, positions, interpretation }) {
  const body = [
    "ORCA AI Tarot Reading",
    "=====================",
    "",
    `Layout: ${layoutName}`,
    `Question: ${question || "Not specified"}`,
    "",
    "Cards:",
    ...cards.map((card, i) => `${i + 1}. ${positions[i]} — ${card.name} (${card.reversedDraw ? "Reversed" : "Upright"}) — ${safeMeaning(card)}`),
    "",
    "Interpretation:",
    interpretation,
  ].join("\n");

  const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `orca-tarot-reading-${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

function CardImage({ card }) {
  const [failed, setFailed] = useState(false);

  if (!card.image || failed) {
    return (
      <div className="fallback-art">
        <ImageOff size={34} />
        <div className="fallback-glyph">
          {card.suit === "Major" ? "◈" : card.suit === "Flames" ? "♨" : card.suit === "Waves" ? "≋" : card.suit === "Circuits" ? "⌘" : card.suit === "Foundations" ? "▣" : card.suit === "Shadow" ? "◉" : "⚠"}
        </div>
        <span>Image pending</span>
      </div>
    );
  }

  return (
    <img
      src={card.image}
      alt={card.name}
      className={`card-image ${card.reversedDraw ? "reversed-img" : ""}`}
      onError={() => setFailed(true)}
      draggable={false}
    />
  );
}

function TarotCard({ card, position, index, compact = false, selected = false, onClick }) {
  return (
    <motion.button
      type="button"
      className={`tarot-card ${compact ? "compact" : ""} ${selected ? "selected" : ""}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 18, rotateY: 180 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.04, 0.35) }}
      whileHover={{ y: -4 }}
    >
      <div className="card-topline">
        <span>{position}</span>
        <span>{card.reversedDraw ? "Reversed" : "Upright"}</span>
      </div>
      <div className="card-art-wrap">
        <CardImage card={card} />
      </div>
      <div className="card-title">{card.name}</div>
      <div className="card-subtitle">{card.type} · {card.suit}</div>
    </motion.button>
  );
}

function SpreadBoard({ layout, cards, activeIndex, setActiveIndex }) {
  if (!cards.length) {
    return (
      <div className="empty-board">
        <div className="card-back-circle">
          <img src={cardBack} alt="ORCA card back" onError={(e) => (e.currentTarget.style.display = "none")} />
          <Sparkles />
        </div>
        <h3>No cards drawn yet</h3>
        <p>Choose a spread, set deck modules, then draw the reading.</p>
      </div>
    );
  }

  return (
    <div className={`spread-board ${layout.special === "celtic" ? "celtic-board" : ""} ${layout.special === "orca" ? "orca-board" : ""}`}>
      <AnimatePresence>
        {cards.map((card, i) => (
          <div key={`${card.id}-${i}`} className={`spread-slot slot-${i + 1}`}>
            <TarotCard
              card={card}
              position={layout.positions[i]}
              index={i}
              compact
              selected={activeIndex === i}
              onClick={() => setActiveIndex(i)}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function Toggle({ label, value, setValue }) {
  return (
    <button type="button" className={`toggle ${value ? "on" : ""}`} onClick={() => setValue(!value)}>
      {value ? "✓ " : ""}{label}
    </button>
  );
}

export default function App() {
  const [layoutName, setLayoutName] = useState("Celtic Cross");
  const [question, setQuestion] = useState("What does the system need me to see clearly?");
  const [seed, setSeed] = useState("");
  const [allowReversals, setAllowReversals] = useState(true);
  const [includeMajor, setIncludeMajor] = useState(true);
  const [includeSuits, setIncludeSuits] = useState(true);
  const [includeShadow, setIncludeShadow] = useState(true);
  const [includeApocalypse, setIncludeApocalypse] = useState(true);
  const [includeMissingImages, setIncludeMissingImages] = useState(true);
  const [readingCards, setReadingCards] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const layout = LAYOUTS[layoutName];

  const deck = useMemo(() => buildDeck({
    includeMajor,
    includeSuits,
    includeShadow,
    includeApocalypse,
    includeMissingImages,
  }), [includeMajor, includeSuits, includeShadow, includeApocalypse, includeMissingImages]);

  const stats = useMemo(() => getDeckStats(deck), [deck]);
  const missingImages = useMemo(() => getMissingImages(deck), [deck]);
  const activeCard = readingCards[activeIndex] || null;
  const interpretation = useMemo(() => buildInterpretation(readingCards, layout.positions, question), [readingCards, layout.positions, question]);

  function performDraw() {
    const cards = drawCards({
      deck,
      count: layout.positions.length,
      allowReversals,
      seed: seed.trim() || `${question}-${layoutName}-${Date.now()}`,
    });
    setReadingCards(cards);
    setActiveIndex(0);
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <div className="eyebrow"><Sparkles size={18} /> ORCA AI TAROT</div>
          <h1>Tarot Reader System</h1>
          <p>Full deck mapping, spread layouts, reversals, card art, missing-image diagnostics, and an ORCA interpretation engine.</p>
        </div>
        <div className="stats-panel">
          <div><strong>{stats.total}</strong><span>cards</span></div>
          <div><strong>{stats.mapped}</strong><span>mapped</span></div>
          <div><strong>{stats.missing}</strong><span>missing</span></div>
        </div>
      </header>

      <main className="main-grid">
        <aside className="control-panel">
          <h2><Layers size={18} /> Reading Console</h2>

          <label>Question / intention</label>
          <textarea value={question} onChange={(e) => setQuestion(e.target.value)} />

          <label>Layout</label>
          <select value={layoutName} onChange={(e) => { setLayoutName(e.target.value); setReadingCards([]); setActiveIndex(0); }}>
            {Object.keys(LAYOUTS).map((name) => <option key={name}>{name}</option>)}
          </select>
          <p className="layout-help">{layout.description}</p>

          <div className="position-chips">
            {layout.positions.map((p, i) => <span key={`${p}-${i}`}>{i + 1}. {p}</span>)}
          </div>

          <label>Optional seed</label>
          <input value={seed} onChange={(e) => setSeed(e.target.value)} placeholder="Same seed = repeatable reading" />

          <div className="toggle-group">
            <Toggle label="Major" value={includeMajor} setValue={setIncludeMajor} />
            <Toggle label="Suits" value={includeSuits} setValue={setIncludeSuits} />
            <Toggle label="Shadow" value={includeShadow} setValue={setIncludeShadow} />
            <Toggle label="Apocalypse" value={includeApocalypse} setValue={setIncludeApocalypse} />
            <Toggle label="Missing art" value={includeMissingImages} setValue={setIncludeMissingImages} />
            <Toggle label="Reversals" value={allowReversals} setValue={setAllowReversals} />
          </div>

          <button className="draw-button" onClick={performDraw} disabled={deck.length < layout.positions.length}>
            <Shuffle size={18} /> Draw Reading
          </button>

          <div className="button-row">
            <button onClick={() => { setReadingCards([]); setActiveIndex(0); }}><RotateCcw size={16} /> Clear</button>
            <button onClick={() => setAllowReversals(!allowReversals)}>{allowReversals ? <Moon size={16} /> : <Sun size={16} />} Mode</button>
          </div>

          {!!missingImages.length && (
            <details className="missing-box">
              <summary>{missingImages.length} cards missing art</summary>
              <ul>
                {missingImages.map((card) => <li key={card.id}>{card.name}</li>)}
              </ul>
            </details>
          )}
        </aside>

        <section className="board-panel">
          <div className="panel-title">
            <div>
              <h2>Spread Board</h2>
              <p>{layoutName} · {layout.positions.length} cards</p>
            </div>
            <BookOpen />
          </div>

          <SpreadBoard layout={layout} cards={readingCards} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

          {activeCard && (
            <section className="detail-grid">
              <TarotCard card={activeCard} position={layout.positions[activeIndex]} index={0} />
              <div className="detail-panel">
                <div className="eyebrow">Card {activeIndex + 1}: {layout.positions[activeIndex]}</div>
                <h2>{activeCard.name}</h2>
                <p className="muted">{activeCard.type} · {activeCard.suit} · {activeCard.reversedDraw ? "Reversed" : "Upright"}</p>

                <div className="meaning-grid">
                  <div>
                    <h3>Upright</h3>
                    <p>{activeCard.meaning}</p>
                  </div>
                  <div>
                    <h3>Reversed</h3>
                    <p>{activeCard.reversed}</p>
                  </div>
                </div>

                <div className="interpretation-box">
                  <h3><Eye size={18} /> ORCA Interpretation</h3>
                  <p>{safeMeaning(activeCard)}</p>
                  <p className="directive">Directive: name the signal, stabilize the environment, and choose the next clean move.</p>
                </div>

                <code className="path-line">{activeCard.image || "No mapped image yet"}</code>
              </div>
            </section>
          )}

          <section className="reading-output">
            <div className="panel-title compact-title">
              <h2>AI Interpretation Engine</h2>
              <button onClick={() => downloadReading({ question, layoutName, cards: readingCards, positions: layout.positions, interpretation })} disabled={!readingCards.length}>
                <Download size={16} /> Export Reading
              </button>
            </div>
            <pre>{interpretation}</pre>
          </section>
        </section>
      </main>

      <footer className="footer-note">
        <AlertTriangle size={16} /> Put all PNG assets in <code>/public/images/orca-tarot/</code>. Missing court-card art will fall back to glyphs until mapped.
      </footer>
    </div>
  );
}
