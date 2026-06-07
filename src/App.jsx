import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ChevronDown,
  Copy,
  Eye,
  Flame,
  Headphones,
  Mic2,
  Radio,
  RotateCcw,
  Scissors,
  Shield,
  Shuffle,
  Sparkles,
  Volume2,
  VolumeX,
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


function createRitualAudioEngine() {
  if (typeof window === "undefined") return null;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;

  const ctx = new AudioContextClass();
  const master = ctx.createGain();
  master.gain.value = 0.34;
  master.connect(ctx.destination);

  const atmosphereGain = ctx.createGain();
  atmosphereGain.gain.value = 0;
  atmosphereGain.connect(master);

  let atmosphereParts = [];

  const resume = async () => {
    if (ctx.state === "suspended") await ctx.resume();
  };

  const makeNoiseBuffer = (duration = 1.2) => {
    const length = Math.max(1, Math.floor(ctx.sampleRate * duration));
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * 0.8;
    }
    return buffer;
  };

  const addAtmospherePart = (source, nodes = []) => {
    atmosphereParts.push({ source, nodes });
  };

  const startAtmosphere = async (volume = 0.28) => {
    await resume();
    if (atmosphereParts.length) {
      atmosphereGain.gain.setTargetAtTime(volume, ctx.currentTime, 0.8);
      return;
    }

    const droneFrequencies = [43.65, 65.41, 98.0, 130.81];
    droneFrequencies.forEach((frequency, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      osc.type = index % 2 ? "triangle" : "sine";
      osc.frequency.value = frequency;
      osc.detune.value = index % 2 ? -7 : 5;
      filter.type = "lowpass";
      filter.frequency.value = 420 + index * 120;
      gain.gain.value = 0.018 + index * 0.004;
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(atmosphereGain);
      osc.start();
      addAtmospherePart(osc, [filter, gain]);
    });

    const sea = ctx.createBufferSource();
    const seaFilter = ctx.createBiquadFilter();
    const seaGain = ctx.createGain();
    sea.buffer = makeNoiseBuffer(2.4);
    sea.loop = true;
    seaFilter.type = "lowpass";
    seaFilter.frequency.value = 760;
    seaFilter.Q.value = 0.7;
    seaGain.gain.value = 0.045;
    sea.connect(seaFilter);
    seaFilter.connect(seaGain);
    seaGain.connect(atmosphereGain);
    sea.start();
    addAtmospherePart(sea, [seaFilter, seaGain]);

    const pulse = ctx.createOscillator();
    const pulseGain = ctx.createGain();
    const pulseFilter = ctx.createBiquadFilter();
    pulse.type = "sine";
    pulse.frequency.value = 174.61;
    pulseFilter.type = "bandpass";
    pulseFilter.frequency.value = 260;
    pulseFilter.Q.value = 5;
    pulseGain.gain.value = 0.012;
    pulse.connect(pulseFilter);
    pulseFilter.connect(pulseGain);
    pulseGain.connect(atmosphereGain);
    pulse.start();
    addAtmospherePart(pulse, [pulseFilter, pulseGain]);

    atmosphereGain.gain.setTargetAtTime(volume, ctx.currentTime, 0.8);
  };

  const stopAtmosphere = () => {
    atmosphereGain.gain.setTargetAtTime(0, ctx.currentTime, 0.55);
    window.setTimeout(() => {
      atmosphereParts.forEach(({ source, nodes }) => {
        try { source.stop(); } catch {}
        try { source.disconnect(); } catch {}
        nodes.forEach((node) => {
          try { node.disconnect(); } catch {}
        });
      });
      atmosphereParts = [];
    }, 720);
  };

  const setMasterVolume = (volume) => {
    master.gain.setTargetAtTime(volume, ctx.currentTime, 0.1);
  };

  const setAtmosphereVolume = (volume) => {
    atmosphereGain.gain.setTargetAtTime(volume, ctx.currentTime, 0.25);
  };

  const playTone = async ({ frequency = 440, endFrequency = null, duration = 0.16, type = "sine", delay = 0, volume = 0.09 }) => {
    await resume();
    const start = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, start);
    if (endFrequency) osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFrequency), start + duration);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.connect(gain);
    gain.connect(master);
    osc.start(start);
    osc.stop(start + duration + 0.04);
  };

  const playNoise = async ({ duration = 0.12, delay = 0, volume = 0.06, frequency = 900, q = 1.8 }) => {
    await resume();
    const start = ctx.currentTime + delay;
    const source = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    source.buffer = makeNoiseBuffer(duration + 0.05);
    filter.type = "bandpass";
    filter.frequency.value = frequency;
    filter.Q.value = q;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    source.start(start);
    source.stop(start + duration + 0.05);
  };

  const pulse = async (kind) => {
    if (kind === "shuffle") {
      for (let i = 0; i < 7; i += 1) {
        playNoise({ duration: 0.065, delay: i * 0.055, volume: 0.055, frequency: 650 + i * 85, q: 2.2 });
      }
      playTone({ frequency: 174.61, endFrequency: 220, duration: 0.42, type: "triangle", volume: 0.035 });
    } else if (kind === "cut") {
      playTone({ frequency: 880, endFrequency: 196, duration: 0.26, type: "sawtooth", volume: 0.055 });
      playNoise({ duration: 0.08, delay: 0.05, volume: 0.075, frequency: 1500, q: 4 });
      playTone({ frequency: 261.63, duration: 0.12, delay: 0.28, type: "square", volume: 0.035 });
    } else if (kind === "draw") {
      [261.63, 329.63, 392, 523.25].forEach((frequency, index) => {
        playTone({ frequency, duration: 0.22, delay: index * 0.08, type: "sine", volume: 0.045 });
      });
    } else if (kind === "select") {
      playTone({ frequency: 392, endFrequency: 523.25, duration: 0.14, type: "sine", volume: 0.035 });
    }
  };

  const dispose = () => {
    stopAtmosphere();
    window.setTimeout(() => {
      try { ctx.close(); } catch {}
    }, 900);
  };

  return { resume, startAtmosphere, stopAtmosphere, setMasterVolume, setAtmosphereVolume, pulse, dispose };
}

const romanOrNumber = (card) => card.rank || card.number || "";


function cardNarrationText(card) {
  if (!card) return "No card is selected.";
  const orientation = card.reversedDraw ? "reversed" : "upright";
  const meaning = card.reversedDraw ? card.reversed : card.meaning;
  const position = card.positionLabel ? `${card.positionLabel}. ` : "";
  const role = card.positionRole ? `Role: ${card.positionRole}. ` : "";
  return `${position}${card.name}, ${orientation}. ${role}${meaning}`;
}

function readingNarrationText(reading) {
  if (!reading) return "No reading is open.";
  const positionLines = reading.positionReadings
    .slice(0, 10)
    .map((entry, index) => `Card ${index + 1}. ${entry.positionLabel}. ${entry.cardName}, ${entry.orientation}. ${entry.reading} Directive: ${entry.directive}`)
    .join(" ");
  const patternLines = reading.patterns
    .slice(0, 4)
    .map((pattern) => `${pattern.title}. ${pattern.text}`)
    .join(" ");
  const actionLines = reading.actionPlan
    .map((item) => `${item.step}. ${item.text}`)
    .join(" ");
  return `ORCA interpretation. ${reading.summary} Position readings. ${positionLines} Pattern analysis. ${patternLines} Action plan. ${actionLines}`;
}

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

function DetailPanel({ card, onNarrateCard, onStopVoice, speechAvailable }) {
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
        <div className="voice-actions">
          <button type="button" onClick={() => onNarrateCard?.(card)} disabled={!speechAvailable}>
            <Mic2 size={16} /> Narrate Card
          </button>
          <button type="button" onClick={onStopVoice} disabled={!speechAvailable}>
            <VolumeX size={16} /> Stop Voice
          </button>
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
  const audioEngineRef = useRef(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [atmosphereOn, setAtmosphereOn] = useState(false);
  const [atmosphereLevel, setAtmosphereLevel] = useState(0.28);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [autoNarrateCards, setAutoNarrateCards] = useState(false);
  const [autoNarrateReading, setAutoNarrateReading] = useState(false);
  const [voiceRate, setVoiceRate] = useState(0.88);

  const spread = SPREADS[spreadId] || SPREADS.three_timeline;
  const baseDeck = useMemo(
    () => buildDeck({ includeShadow, includeApocalypse, includeMissingImages }),
    [includeShadow, includeApocalypse, includeMissingImages]
  );
  const stats = useMemo(() => getDeckStats(baseDeck), [baseDeck]);
  const validation = validateSpreadDeck(spread, baseDeck);
  const selectedCard = drawnCards.find((card) => card.id === selectedId) || drawnCards[0] || null;
  const busy = stage !== "idle";
  const speechAvailable = typeof window !== "undefined" && "speechSynthesis" in window;

  function ensureAudioEngine() {
    if (!audioEngineRef.current) audioEngineRef.current = createRitualAudioEngine();
    const engine = audioEngineRef.current;
    if (!engine) {
      setPhaseMessage("This browser does not support Web Audio.");
      return null;
    }
    engine.resume?.();
    return engine;
  }

  function playAudioCue(kind) {
    if (!audioEnabled) return;
    const engine = ensureAudioEngine();
    engine?.pulse(kind);
  }

  function toggleAudio() {
    if (audioEnabled) {
      audioEngineRef.current?.stopAtmosphere?.();
      setAtmosphereOn(false);
      setAudioEnabled(false);
      setPhaseMessage("Audio disabled.");
      return;
    }
    const engine = ensureAudioEngine();
    if (!engine) return;
    engine.setMasterVolume?.(0.34);
    setAudioEnabled(true);
    setPhaseMessage("Audio enabled. Atmosphere, ritual cues, and voice controls are ready.");
  }

  function toggleAtmosphere() {
    const engine = ensureAudioEngine();
    if (!engine) return;
    setAudioEnabled(true);
    if (atmosphereOn) {
      engine.stopAtmosphere();
      setAtmosphereOn(false);
      setPhaseMessage("Atmospheric background sound paused.");
    } else {
      engine.startAtmosphere(atmosphereLevel);
      setAtmosphereOn(true);
      setPhaseMessage("Atmospheric background sound engaged.");
    }
  }

  function updateAtmosphereLevel(value) {
    const next = Number(value);
    setAtmosphereLevel(next);
    audioEngineRef.current?.setAtmosphereVolume?.(atmosphereOn ? next : 0);
  }

  function speakText(text, interrupt = true) {
    if (!voiceEnabled || !speechAvailable || !text) return;
    if (interrupt) window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices?.() || [];
    utterance.voice = voices.find((voice) => /^en/i.test(voice.lang || "") && /male|david|daniel|george|guy|mark|ryan/i.test(voice.name || "")) || voices.find((voice) => /^en/i.test(voice.lang || "")) || null;
    utterance.rate = voiceRate;
    utterance.pitch = 0.86;
    utterance.volume = 0.92;
    window.speechSynthesis.speak(utterance);
  }

  function stopVoice() {
    if (speechAvailable) window.speechSynthesis.cancel();
  }

  function narrateCard(card = selectedCard) {
    speakText(cardNarrationText(card));
    playAudioCue("select");
  }

  function narrateReading(nextReading = reading) {
    speakText(readingNarrationText(nextReading));
  }

  useEffect(() => {
    return () => {
      audioEngineRef.current?.dispose?.();
      if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

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
    playAudioCue("shuffle");
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
    playAudioCue("cut");
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
    playAudioCue("shuffle");
    const seed = `${Date.now()}-${question}-${spreadId}-${baseDeck.length}`;
    const shuffled = shuffleDeck(baseDeck, seed);
    await sleep(980);

    const safeCut = Math.max(1, Math.min(shuffled.length - 1, Math.floor(shuffled.length * (0.25 + Math.random() * 0.5))));
    setOrderedDeck(shuffled);
    setCutIndex(safeCut);
    setNonce((n) => n + 1);
    setStage("cutting");
    setPhaseMessage(`Cut phase: splitting at card ${safeCut} and recombining...`);
    playAudioCue("cut");
    await sleep(920);

    const cutDeck = [...shuffled.slice(safeCut), ...shuffled.slice(0, safeCut)];
    setOrderedDeck(cutDeck);
    setNonce((n) => n + 1);
    setStage("drawing");
    setPhaseMessage("Draw phase: laying cards into the spread...");
    playAudioCue("draw");
    await sleep(620);

    const positioned = drawFromOrderedDeck(cutDeck, spread, allowReversals);
    const nextReading = generateInterpretation({ cards: positioned, spread, question });
    setDrawnCards(positioned);
    setSelectedId(positioned[0]?.id || null);
    setReading(nextReading);
    setStage("idle");
    setPhaseMessage("Reading open. Select any card for detail.");
    if (autoNarrateReading) {
      narrateReading(nextReading);
    } else if (autoNarrateCards) {
      speakText(positioned.map((card) => cardNarrationText(card)).join(" "));
    }
  }

  function resetReading() {
    if (busy) return;
    setDrawnCards([]);
    setSelectedId(null);
    setReading(null);
    stopVoice();
    setPhaseMessage("Reading cleared. Deck remains in current order.");
  }

  async function copyReading() {
    if (!reading?.exportText) return;
    await navigator.clipboard.writeText(reading.exportText);
    setPhaseMessage("Interpretation copied to clipboard.");
  }

  function renderAudioControls(compact = false) {
    return (
      <div className={compact ? "audio-panel top-audio-panel" : "audio-panel"}>
        <div className="audio-title"><Headphones size={17} /> Audio Controls</div>
        <div className="toggle-group audio-toggles">
          <button className={`toggle ${audioEnabled ? "on" : ""}`} onClick={toggleAudio} type="button">
            {audioEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />} {audioEnabled ? "Audio On" : "Enable Audio"}
          </button>
          <button className={`toggle ${atmosphereOn ? "on" : ""}`} onClick={toggleAtmosphere} type="button"><Radio size={15} /> Atmosphere</button>
          <button className={`toggle ${voiceEnabled ? "on" : ""}`} onClick={() => setVoiceEnabled((v) => !v)} type="button"><Mic2 size={15} /> Voice</button>
          <button className={`toggle ${autoNarrateCards ? "on" : ""}`} onClick={() => setAutoNarrateCards((v) => !v)} type="button">Auto Cards</button>
          <button className={`toggle ${autoNarrateReading ? "on" : ""}`} onClick={() => setAutoNarrateReading((v) => !v)} type="button">Auto Reading</button>
        </div>
        <div className="audio-slider-grid">
          <div className="audio-slider">
            <span>Atmosphere</span>
            <input
              aria-label="Atmosphere volume"
              type="range"
              min="0"
              max="0.55"
              step="0.01"
              value={atmosphereLevel}
              onChange={(event) => updateAtmosphereLevel(event.target.value)}
              disabled={!audioEnabled}
            />
          </div>
          <div className="audio-slider">
            <span>Voice Rate</span>
            <input
              aria-label="Voice narration speed"
              type="range"
              min="0.65"
              max="1.15"
              step="0.01"
              value={voiceRate}
              onChange={(event) => setVoiceRate(Number(event.target.value))}
              disabled={!speechAvailable}
            />
          </div>
        </div>
        <p className="audio-note">
          Use Enable Audio first. Atmosphere and ritual cues are local Web Audio. Narration uses the browser speech voice.
          {!speechAvailable ? " Browser voice narration is not available here." : ""}
        </p>
      </div>
    );
  }

  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <div className="eyebrow"><Waves size={15} /> ORCA AI TAROT READER</div>
          <h1>Shuffle. Cut. Reveal.</h1>
          <p>
            A deployable ORCA tarot reader with animated shuffling, animated deck cutting, atmospheric audio, ritual cues, spoken card narration, and vocal interpretation.
          </p>
        </div>
        <div className="stats-panel">
          <div><strong>{stats.total}</strong><span>cards</span></div>
          <div><strong>{stats.mapped}</strong><span>mapped art</span></div>
          <div><strong>{spread.positions.length}</strong><span>spread slots</span></div>
        </div>
      </section>

      {renderAudioControls(true)}

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

          {renderAudioControls()}

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

          <DetailPanel card={selectedCard} onNarrateCard={narrateCard} onStopVoice={stopVoice} speechAvailable={speechAvailable && voiceEnabled} />

          {reading && (
            <section className="reading-output">
              <div className="panel-title compact-title">
                <div>
                  <h2>ORCA Interpretation</h2>
                  <p>{reading.analysis.dominantSuit} dominant · intensity {reading.analysis.intensity}</p>
                </div>
                <div className="reading-actions">
                  <button type="button" onClick={() => narrateReading(reading)} disabled={!speechAvailable || !voiceEnabled}><Mic2 size={16} /> Narrate</button>
                  <button type="button" onClick={stopVoice} disabled={!speechAvailable}><VolumeX size={16} /> Stop</button>
                  <button type="button" onClick={copyReading}><Copy size={16} /> Copy Reading</button>
                </div>
              </div>
              <pre>{reading.exportText}</pre>
            </section>
          )}
        </div>
      </section>

      <div className="footer-note">
        <Shield size={15} /> Ritual engine lives in <code>src/App.jsx</code>: shuffle, cut, draw, atmosphere, card narration, and vocal interpretation.
      </div>
    </main>
  );
}
