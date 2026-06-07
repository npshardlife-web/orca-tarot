import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ChevronDown,
  Copy,
  Eye,
  Flame,
  RotateCcw,
  Scissors,
  Shield,
  Shuffle,
  Sparkles,
  Waves,
} from "lucide-react";
import {
  buildDeck,
  cardBack,
  getDeckStats,
  shuffleDeck,
} from "./data/orca_master_deck.js";
import {
  SPREADS,
  attachPositions,
  getPositionStyle,
  validateSpreadDeck,
} from "./data/spread_engine.js";
import { generateInterpretation } from "./data/interpretation_engine.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const RITUAL_SPEED = 620;

const romanOrNumber = (card) => card.rank || card.number || "";

function drawFromOrderedDeck(deck, spread, allowReversals) {
  return attachPositions(
    deck.slice(0, spread.positions.length).map((card, index) => ({
      ...card,
      drawIndex: index,
      reversedDraw: allowReversals && Math.random() < 0.32,
    })),
    spread
  );
}

function CardBackFace({ small = false }) {
  return (
    <div className={small ? "animated-card-back small" : "animated-card-back"}>
      <div className="back-sigil">ORCA</div>
      <div className="back-orca">◖●◗</div>
      <div className="back-lines" />
    </div>
  );
}

function RitualDeck({ stage, nonce, cutIndex, deckSize }) {
  const cards = Array.from({ length: 14 }, (_, index) => index);
  const isCutting = stage === "cutting";
  const isShuffling = stage === "shuffling";
  const isDrawing = stage === "drawing";

  return (
    <div className={`ritual-deck ${stage}`} aria-live="polite">
      <div className="ritual-glow" />
      <div className="deck-platform">
        {cards.map((index) => {
          const side = index % 2 === 0 ? 1 : -1;
          const depth = cards.length - index;
          const cutHalf = index < 7;
          return (
            <motion.div
              key={`${nonce}-${stage}-${index}`}
              className="deck-motion-card"
              initial={{ x: 0, y: index * -1.2, rotate: index * 0.2, opacity: 0.96 }}
              animate={
                isShuffling
                  ? {
                      x: [0, side * (72 + index * 3), side * -34, 0],
                      y: [index * -1.2, -24 - index, 18, index * -1.2],
                      rotate: [index * 0.2, side * (10 + index * 0.4), side * -7, index * 0.2],
                      opacity: 1,
                    }
                  : isCutting
                    ? {
                        x: cutHalf ? -116 : 116,
                        y: cutHalf ? -16 + index * -1 : 16 + (index - 7) * -1,
                        rotate: cutHalf ? -8 : 8,
                        opacity: 1,
                      }
                    : isDrawing
                      ? {
                          x: index < 5 ? -160 + index * 80 : 0,
                          y: index < 5 ? -32 : index * -1.2,
                          rotate: index < 5 ? -14 + index * 7 : index * 0.2,
                          opacity: index < 5 ? 0.9 : 0.95,
                        }
                      : { x: 0, y: index * -1.2, rotate: index * 0.2, opacity: 0.96 }
              }
              transition={{ duration: RITUAL_SPEED / 1000, ease: "easeInOut", delay: index * 0.015 }}
              style={{ zIndex: depth }}
            >
              <CardBackFace small />
            </motion.div>
          );
        })}
      </div>
      {isCutting && (
        <motion.div
          className="cut-line"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          exit={{ scaleY: 0, opacity: 0 }}
        >
          <Scissors size={20} />
          <span>Cut {Math.max(1, Math.min(deckSize - 1, cutIndex))}</span>
        </motion.div>
      )}
    </div>
  );
}

function CardArt({ card, compact = false }) {
  const [broken, setBroken] = useState(false);
  useEffect(() => setBroken(false), [card?.image]);

  if (!card?.image || broken) {
    return (
      <div className="fallback-art">
        <span className="fallback-glyph">{card?.suit === "Flames" ? "🔥" : card?.suit === "Waves" ? "〰" : card?.suit === "Circuits" ? "⌬" : card?.suit === "Foundations" ? "▣" : "◈"}</span>
        <strong>{card?.name}</strong>
        <small>{card?.suit} · {card?.type}</small>
      </div>
    );
  }

  return (
    <img
      className={`card-image ${card.reversedDraw ? "reversed-img" : ""} ${compact ? "compact-img" : ""}`}
      src={card.image}
      alt={card.name}
      onError={() => setBroken(true)}
    />
  );
}

function TarotCard({ card, selected, onClick, compact = false }) {
  return (
    <motion.button
      type="button"
      className={`tarot-card ${selected ? "selected" : ""} ${compact ? "compact" : ""}`}
      onClick={() => onClick?.(card)}
      layout
      initial={{ opacity: 0, y: 28, rotateY: -80, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
      whileHover={{ y: -6, rotate: card.reversedDraw ? 1.5 : -1.5 }}
      transition={{ duration: 0.42, ease: "easeOut", delay: (card.drawIndex || 0) * 0.065 }}
    >
      <div className="card-topline">
        <span>{card.positionLabel || card.suit}</span>
        <span>{romanOrNumber(card)} {card.reversedDraw ? "REV" : "UP"}</span>
      </div>
      <div className="card-art-wrap">
        <CardArt card={card} compact={compact} />
      </div>
      <div className="card-title">{card.name}</div>
      <div className="card-subtitle">{card.positionRole || `${card.suit} · ${card.type}`}</div>
    </motion.button>
  );
}

function ReadingBoard({ spread, cards, selectedId, setSelectedId }) {
  if (!cards.length) {
    return (
      <div className="empty-board">
        <div className="card-back-circle">
          {cardBack ? <img src={cardBack} alt="ORCA card back" onError={(event) => { event.currentTarget.style.display = "none"; }} /> : null}
          <Shield size={38} />
        </div>
        <h3>No cards drawn yet.</h3>
        <p>Shuffle, cut, and draw to open the spread.</p>
      </div>
    );
  }

  return (
    <div className={`spread-board ${spread.layoutClass || ""}`}>
      <AnimatePresence>
        {cards.map((card, index) => {
          const position = spread.positions[index] || {};
          return (
            <motion.div
              key={`${card.id}-${index}`}
              className={`spread-slot slot-${index + 1}`}
              style={getPositionStyle(position)}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.075 }}
            >
              <TarotCard
                card={card}
                compact={cards.length > 6}
                selected={selectedId === card.id}
                onClick={(next) => setSelectedId(next.id)}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

function DetailPanel({ card }) {
  if (!card) return null;
  const meaning = card.reversedDraw ? card.reversed : card.meaning;

  return (
    <div className="detail-grid">
      <TarotCard card={card} selected compact={false} />
      <section className="detail-panel">
        <div className="eyebrow">{card.suit} · {card.type} · {card.reversedDraw ? "REVERSED" : "UPRIGHT"}</div>
        <h2>{card.name}</h2>
        <p className="muted">Position: {card.positionLabel} — {card.positionRole}</p>
        <div className="meaning-grid">
          <div>
            <h3><Eye size={17} /> Signal</h3>
            <p>{meaning}</p>
          </div>
          <div>
            <h3><Sparkles size={17} /> Prompt</h3>
            <p>{card.spreadPosition?.prompt}</p>
          </div>
        </div>
        <div className="interpretation-box">
          <h3><BookOpen size={17} /> Directive</h3>
          <p className="directive">Read the card through the position first, then the suit. The position gives the job. The suit gives the system layer. The orientation shows whether the signal is open or blocked.</p>
        </div>
        <code className="path-line">{card.image || "Image missing — fallback art active."}</code>
      </section>
    </div>
  );
}

export default function App() {
  const [question, setQuestion] = useState("");
  const [spreadId, setSpreadId] = useState("three_timeline");
  const [allowReversals, setAllowReversals] = useState(true);
  const [includeShadow, setIncludeShadow] = useState(true);
  const [includeApocalypse, setIncludeApocalypse] = useState(false);
  const [includeMissingImages, setIncludeMissingImages] = useState(true);
  const [orderedDeck, setOrderedDeck] = useState([]);
  const [drawnCards, setDrawnCards] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [stage, setStage] = useState("idle");
  const [phaseMessage, setPhaseMessage] = useState("Deck is ready.");
  const [cutIndex, setCutIndex] = useState(0);
  const [nonce, setNonce] = useState(0);
  const [reading, setReading] = useState(null);

  const spread = SPREADS[spreadId] || SPREADS.three_timeline;
  const baseDeck = useMemo(
    () => buildDeck({ includeShadow, includeApocalypse, includeMissingImages }),
    [includeShadow, includeApocalypse, includeMissingImages]
  );
  const stats = useMemo(() => getDeckStats(baseDeck), [baseDeck]);
  const validation = validateSpreadDeck(spread, baseDeck);
  const selectedCard = drawnCards.find((card) => card.id === selectedId) || drawnCards[0] || null;
  const busy = stage !== "idle";

  useEffect(() => {
    setOrderedDeck(baseDeck);
    setDrawnCards([]);
    setSelectedId(null);
    setReading(null);
    setPhaseMessage("Deck is ready.");
  }, [baseDeck, spreadId]);

  async function shuffleOnly() {
    if (busy || !validation.ok) return;
    setNonce((n) => n + 1);
    setStage("shuffling");
    setPhaseMessage("Shuffling the ORCA deck...");
    const seed = `${Date.now()}-${question}-${spreadId}`;
    const shuffled = shuffleDeck(baseDeck, seed);
    await sleep(980);
    setOrderedDeck(shuffled);
    setStage("idle");
    setPhaseMessage("Shuffle complete. Cut the deck or draw.");
  }

  async function cutOnly() {
    if (busy || !validation.ok) return;
    const source = orderedDeck.length ? orderedDeck : baseDeck;
    const safeCut = Math.max(1, Math.min(source.length - 1, Math.floor(source.length * (0.28 + Math.random() * 0.44))));
    setNonce((n) => n + 1);
    setCutIndex(safeCut);
    setStage("cutting");
    setPhaseMessage(`Cutting the deck at card ${safeCut}...`);
    await sleep(900);
    const cutDeck = [...source.slice(safeCut), ...source.slice(0, safeCut)];
    setOrderedDeck(cutDeck);
    setStage("idle");
    setPhaseMessage("Cut complete. The top packet has moved beneath the lower packet.");
  }

  async function drawReading() {
    if (busy || !validation.ok) return;
    setDrawnCards([]);
    setSelectedId(null);
    setReading(null);

    setNonce((n) => n + 1);
    setStage("shuffling");
    setPhaseMessage("Shuffle phase: randomizing the deck...");
    const seed = `${Date.now()}-${question}-${spreadId}-${baseDeck.length}`;
    const shuffled = shuffleDeck(baseDeck, seed);
    await sleep(980);

    const safeCut = Math.max(1, Math.min(shuffled.length - 1, Math.floor(shuffled.length * (0.25 + Math.random() * 0.5))));
    setOrderedDeck(shuffled);
    setCutIndex(safeCut);
    setNonce((n) => n + 1);
    setStage("cutting");
    setPhaseMessage(`Cut phase: splitting at card ${safeCut} and recombining...`);
    await sleep(920);

    const cutDeck = [...shuffled.slice(safeCut), ...shuffled.slice(0, safeCut)];
    setOrderedDeck(cutDeck);
    setNonce((n) => n + 1);
    setStage("drawing");
    setPhaseMessage("Draw phase: laying cards into the spread...");
    await sleep(620);

    const positioned = drawFromOrderedDeck(cutDeck, spread, allowReversals);
    const nextReading = generateInterpretation({ cards: positioned, spread, question });
    setDrawnCards(positioned);
    setSelectedId(positioned[0]?.id || null);
    setReading(nextReading);
    setStage("idle");
    setPhaseMessage("Reading open. Select any card for detail.");
  }

  function resetReading() {
    if (busy) return;
    setDrawnCards([]);
    setSelectedId(null);
    setReading(null);
    setPhaseMessage("Reading cleared. Deck remains in current order.");
  }

  async function copyReading() {
    if (!reading?.exportText) return;
    await navigator.clipboard.writeText(reading.exportText);
    setPhaseMessage("Interpretation copied to clipboard.");
  }

  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <div className="eyebrow"><Waves size={15} /> ORCA AI TAROT READER</div>
          <h1>Shuffle. Cut. Reveal.</h1>
          <p>
            A deployable ORCA tarot reader with animated shuffling, animated deck cutting, spread layout, reversals, and a full interpretation engine.
          </p>
        </div>
        <div className="stats-panel">
          <div><strong>{stats.total}</strong><span>cards</span></div>
          <div><strong>{stats.mapped}</strong><span>mapped art</span></div>
          <div><strong>{spread.positions.length}</strong><span>spread slots</span></div>
        </div>
      </section>

      <section className="main-grid">
        <aside className="control-panel">
          <h2><Flame size={20} /> Reading Controls</h2>

          <label htmlFor="question">Question / Situation</label>
          <textarea
            id="question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="What does the system need to reveal?"
          />

          <label htmlFor="spread">Spread</label>
          <div className="select-wrap">
            <select id="spread" value={spreadId} onChange={(event) => setSpreadId(event.target.value)}>
              {Object.values(SPREADS).map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
            <ChevronDown size={16} />
          </div>
          <p className="layout-help">{spread.description}</p>
          <div className="position-chips">
            {spread.positions.map((position) => <span key={position.id}>{position.label}</span>)}
          </div>

          <div className="toggle-group">
            <button className={`toggle ${allowReversals ? "on" : ""}`} onClick={() => setAllowReversals((v) => !v)} type="button">Reversals</button>
            <button className={`toggle ${includeShadow ? "on" : ""}`} onClick={() => setIncludeShadow((v) => !v)} type="button">Shadow</button>
            <button className={`toggle ${includeApocalypse ? "on" : ""}`} onClick={() => setIncludeApocalypse((v) => !v)} type="button">Apocalypse</button>
            <button className={`toggle ${includeMissingImages ? "on" : ""}`} onClick={() => setIncludeMissingImages((v) => !v)} type="button">Fallback Art</button>
          </div>

          <button className="draw-button" type="button" disabled={busy || !validation.ok} onClick={drawReading}>
            <Sparkles size={18} /> Shuffle + Cut + Draw
          </button>
          <div className="button-row">
            <button type="button" onClick={shuffleOnly} disabled={busy || !validation.ok}><Shuffle size={16} /> Shuffle</button>
            <button type="button" onClick={cutOnly} disabled={busy || !validation.ok}><Scissors size={16} /> Cut</button>
          </div>
          <div className="button-row">
            <button type="button" onClick={resetReading} disabled={busy}><RotateCcw size={16} /> Reset</button>
            <button type="button" onClick={copyReading} disabled={!reading?.exportText}><Copy size={16} /> Copy</button>
          </div>

          {!validation.ok && (
            <div className="missing-box">
              This spread needs {validation.required} cards, but only {validation.available} are available under the current filters.
            </div>
          )}
        </aside>

        <div>
          <section className="board-panel">
            <div className="panel-title">
              <div>
                <h2>{spread.name}</h2>
                <p>{phaseMessage}</p>
              </div>
              <span className={`stage-pill ${stage}`}>{stage}</span>
            </div>

            <RitualDeck stage={stage} nonce={nonce} cutIndex={cutIndex} deckSize={baseDeck.length} />
            <ReadingBoard spread={spread} cards={drawnCards} selectedId={selectedId} setSelectedId={setSelectedId} />
          </section>

          <DetailPanel card={selectedCard} />

          {reading && (
            <section className="reading-output">
              <div className="panel-title compact-title">
                <div>
                  <h2>ORCA Interpretation</h2>
                  <p>{reading.analysis.dominantSuit} dominant · intensity {reading.analysis.intensity}</p>
                </div>
                <button type="button" onClick={copyReading}><Copy size={16} /> Copy Reading</button>
              </div>
              <pre>{reading.exportText}</pre>
            </section>
          )}
        </div>
      </section>

      <div className="footer-note">
        <Shield size={15} /> Animated sequence is built into <code>src/App.jsx</code>: shuffle phase, cut phase, draw phase.
      </div>
    </main>
  );
}
