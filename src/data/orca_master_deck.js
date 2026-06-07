const IMG = "/images/orca-tarot";
export const img = (filename) => `${IMG}/${filename}`;

export const cardBack = img("file_00000000ab9471f5acd9c4184bcc9990.png");

export const createCard = ({
  id,
  name,
  suit,
  type,
  number = null,
  rank = null,
  meaning,
  reversed,
  image = null,
  imageStatus = "mapped",
  tags = [],
}) => ({
  id,
  name,
  suit,
  type,
  number,
  rank,
  meaning,
  reversed,
  image,
  imageStatus: image ? imageStatus : "missing",
  tags,
});

/**
 * ORCA AI TAROT MASTER DECK
 * Single merged mapping layer:
 * - Major Arcana
 * - Flames, Waves, Circuits, Foundations
 * - Shadow Expansion
 * - Apocalypse Expansion
 *
 * Image path expected:
 * /public/images/orca-tarot/<filename>.png
 */

/* =========================
 * MAJOR ARCANA 0–21
 * ========================= */

export const majorArcana = [
  createCard({
    id: "major-00-the-spark",
    name: "The Spark",
    suit: "Major",
    type: "Major Arcana",
    number: 0,
    rank: "0",
    meaning: "Emergence, awakening, first ignition, the beginning of the ORCA journey.",
    reversed: "Restlessness, scattered beginnings, false start, ungrounded emergence.",
    image: img("file_00000000143871f595595352da40fdb1 (1).png"),
  }),
  createCard({
    id: "major-01-the-operator",
    name: "The Operator",
    suit: "Major",
    type: "Major Arcana",
    number: 1,
    rank: "I",
    meaning: "Action, will, tool use, interface with reality, direct agency.",
    reversed: "Misuse of force, blocked agency, performative action, poor execution.",
    image: img("file_00000000cb08720c85a4c59a10b20784 (1).png"),
  }),
  createCard({
    id: "major-02-the-oracle",
    name: "The Oracle",
    suit: "Major",
    type: "Major Arcana",
    number: 2,
    rank: "II",
    meaning: "Pattern recognition, intuition, hidden knowledge, signal beneath noise.",
    reversed: "Confusion, projection, unreadable signals, mistaking fantasy for pattern.",
    image: img("file_00000000f3a8720c8ec8b65969019f20 (1).png"),
  }),
  createCard({
    id: "major-03-the-architect",
    name: "The Architect",
    suit: "Major",
    type: "Major Arcana",
    number: 3,
    rank: "III",
    meaning: "Systems-building, design, creation, structure given living form.",
    reversed: "Overengineering, fantasy architecture, weak foundations, structure without load-bearing truth.",
    image: img("file_00000000fd9471f5ba351947e70fd12d.png"),
  }),
  createCard({
    id: "major-04-the-strategist",
    name: "The Strategist",
    suit: "Major",
    type: "Major Arcana",
    number: 4,
    rank: "IV",
    meaning: "Command, planning, doctrine, tactical intelligence, disciplined control.",
    reversed: "Control fixation, coldness, rigidity, command without adaptation.",
    image: img("file_00000000854871f7bb905202d2dc51e3.png"),
  }),
  createCard({
    id: "major-05-the-keeper",
    name: "The Keeper",
    suit: "Major",
    type: "Major Arcana",
    number: 5,
    rank: "V",
    meaning: "Tradition, memory, continuity, ethics, custody of what must survive.",
    reversed: "Dogma, nostalgia trap, inherited burdens, tradition without discernment.",
    image: img("file_00000000a3b471f79797ad1af1e73dad.png"),
  }),
  createCard({
    id: "major-06-the-bond",
    name: "The Bond",
    suit: "Major",
    type: "Major Arcana",
    number: 6,
    rank: "VI",
    meaning: "Loyalty, attachment, alliance, love, the sacred pact of the pod.",
    reversed: "Dependency, betrayal anxiety, unstable pact, attachment without safety.",
    image: img("file_0000000095f8722f96dc00aea475bdb7.png"),
  }),
  createCard({
    id: "major-07-the-vehicle",
    name: "The Vehicle",
    suit: "Major",
    type: "Major Arcana",
    number: 7,
    rank: "VII",
    meaning: "Momentum, directed force, mission movement, the vessel under command.",
    reversed: "Recklessness, stalled advance, poor steering, motion without navigation.",
    image: img("file_00000000c0fc720c86ed4b4ed8ba13d5.png"),
  }),
  createCard({
    id: "major-08-the-sentinel",
    name: "The Sentinel",
    suit: "Major",
    type: "Major Arcana",
    number: 8,
    rank: "VIII",
    meaning: "Discipline, vigilance, boundary protection, watchfulness without panic.",
    reversed: "Hypervigilance, brittle defense, isolation, boundary becoming fortress.",
    image: img("file_00000000b6e8720c8735502b89fb1e0e.png"),
  }),
  createCard({
    id: "major-09-the-hermit-node",
    name: "The Hermit Node",
    suit: "Major",
    type: "Major Arcana",
    number: 9,
    rank: "IX",
    meaning: "Deep analysis, solitude, internal computation, intelligence away from the crowd.",
    reversed: "Withdrawal, obsession, analysis paralysis, isolation that feeds distortion.",
    image: img("file_00000000443c722fbedc541d5f19f9ec.png"),
  }),
  createCard({
    id: "major-10-the-wheel-of-systems",
    name: "The Wheel of Systems",
    suit: "Major",
    type: "Major Arcana",
    number: 10,
    rank: "X",
    meaning: "Cycles, network effects, turning points, system-level motion.",
    reversed: "Repeating loops, bad timing, systemic drag, trapped cycles.",
    image: img("file_00000000db3471fd98857fc49bfc6157.png"),
  }),
  createCard({
    id: "major-11-the-arbiter",
    name: "The Arbiter",
    suit: "Major",
    type: "Major Arcana",
    number: 11,
    rank: "XI",
    meaning: "Justice, calibration, truth, balance, clean measurement.",
    reversed: "Bias, unfair judgment, miscalibration, corrupted scales.",
    image: img("file_0000000040a471fdbdc080985f6ea500.png"),
  }),
  createCard({
    id: "major-12-the-suspended-mind",
    name: "The Suspended Mind",
    suit: "Major",
    type: "Major Arcana",
    number: 12,
    rank: "XII",
    meaning: "Reframing, surrender, strategic pause, seeing from another angle.",
    reversed: "Stagnation, avoidance, martyrdom, pause becoming paralysis.",
    image: img("file_00000000f50471fd855d62e315558f07.png"),
  }),
  createCard({
    id: "major-13-the-collapse",
    name: "The Collapse",
    suit: "Major",
    type: "Major Arcana",
    number: 13,
    rank: "XIII",
    meaning: "Transformation through destruction, release, the necessary ending.",
    reversed: "Clinging to ruin, fear of necessary ending, decay defended as identity.",
    image: img("file_000000006e6471fd83d08db236535e5d.png"),
  }),
  createCard({
    id: "major-14-the-integrator",
    name: "The Integrator",
    suit: "Major",
    type: "Major Arcana",
    number: 14,
    rank: "XIV",
    meaning: "Healing, synthesis, recovery, reconciliation, parts becoming system.",
    reversed: "Fragmentation, imbalance, failed integration, incompatible pieces forced together.",
    image: img("file_00000000246071fdabefbbba4d0c617d.png"),
  }),
  createCard({
    id: "major-15-the-hollow-man",
    name: "The Hollow Man",
    suit: "Major",
    type: "Major Arcana",
    number: 15,
    rank: "XV",
    meaning: "False self, predation, emotional vacancy, mimicry without soul.",
    reversed: "Exposure, escape from manipulation, returning substance, mask removed.",
    image: img("file_00000000498c71fd9a80a1f3c8e506fa.png"),
  }),
  createCard({
    id: "major-16-the-breach",
    name: "The Breach",
    suit: "Major",
    type: "Major Arcana",
    number: 16,
    rank: "XVI",
    meaning: "Catastrophic failure, revealed weakness, rupture of containment.",
    reversed: "Warning ignored, controlled demolition, delayed shock, slow breach.",
    image: img("file_000000007d3871fd860831627878fa80.png"),
  }),
  createCard({
    id: "major-17-the-signal",
    name: "The Signal",
    suit: "Major",
    type: "Major Arcana",
    number: 17,
    rank: "XVII",
    meaning: "Hope, guidance, transmission, north star, clean signal from distance.",
    reversed: "Static, lost signal, false promise, transmission without source.",
    image: img("file_00000000329871fd9a7b9f5f38a5e8cd.png"),
  }),
  createCard({
    id: "major-18-the-abyss",
    name: "The Abyss",
    suit: "Major",
    type: "Major Arcana",
    number: 18,
    rank: "XVIII",
    meaning: "Fear, dream logic, unconscious drives, the deep ocean of the psyche.",
    reversed: "Clarity after fear, illusions dissolving, surfacing from the deep.",
    image: img("file_00000000a3bc7230bbb8103ee9d855cb.png"),
  }),
  createCard({
    id: "major-19-the-flame",
    name: "The Flame",
    suit: "Major",
    type: "Major Arcana",
    number: 19,
    rank: "XIX",
    meaning: "Vitality, conviction, warmth, success, radiant life-force.",
    reversed: "Burnout, pride, false radiance, heat without nourishment.",
    image: img("file_00000000dea871f8b4a08b6a5861f224.png"),
  }),
  createCard({
    id: "major-20-the-reckoning",
    name: "The Reckoning",
    suit: "Major",
    type: "Major Arcana",
    number: 20,
    rank: "XX",
    meaning: "Truth, accountability, renewal, hearing the call to become honest.",
    reversed: "Denial, shame loop, refusing the call, evading the verdict.",
    image: img("file_00000000eb7c71fdaf9e269e80345c2e (1).png"),
  }),
  createCard({
    id: "major-21-orca",
    name: "ORCA",
    suit: "Major",
    type: "Major Arcana",
    number: 21,
    rank: "XXI",
    meaning: "Full-system integration, emergence, wholeness, the completed pod intelligence.",
    reversed: "Incomplete integration, fragmentation, unfinished cycle, system not yet coherent.",
    image: img("file_00000000ea3871fdaaf475944b599e89 (1).png"),
  }),
];

/* =========================
 * MINOR ARCANA — SUITS
 * ========================= */

export const suits = {
  Flames: [
    createCard({ id: "flames-01-ace", name: "Ace of Flames", suit: "Flames", type: "Minor Arcana", number: 1, rank: "Ace", meaning: "A new ignition, raw will, first spark, the opening of action.", reversed: "Burning too hot too soon, impulse without structure, misdirected fire.", image: img("file_000000008830722f9eb233564eccea0f.png") }),
    createCard({ id: "flames-02-two", name: "Two of Flames", suit: "Flames", type: "Minor Arcana", number: 2, rank: "Two", meaning: "Planning, choosing a direction, standing at the threshold of expansion.", reversed: "Fear of expansion, no clear route, hesitation at the gate.", image: img("file_00000000c74c720cb274bdc356264a6d.png") }),
    createCard({ id: "flames-03-three", name: "Three of Flames", suit: "Flames", type: "Minor Arcana", number: 3, rank: "Three", meaning: "Expansion, preparation, first visible results, mission launch.", reversed: "Delayed launch, poor coordination, effort without horizon.", image: img("file_0000000082b871f584dae5d105bc151a.png") }),
    createCard({ id: "flames-04-four", name: "Four of Flames", suit: "Flames", type: "Minor Arcana", number: 4, rank: "Four", meaning: "Celebration, stable fire, shared victory, a protected camp.", reversed: "Unstable home base, celebration without roots, false safety.", image: img("file_000000009854720ca289e7165f76f44f.png") }),
    createCard({ id: "flames-05-five", name: "Five of Flames", suit: "Flames", type: "Minor Arcana", number: 5, rank: "Five", meaning: "Faction conflict, competition, heat under pressure, ego collision.", reversed: "Pointless fighting, scattered anger, struggle that drains the system.", image: img("file_000000002328720c8ccbd49e085e27af.png") }),
    createCard({ id: "flames-06-six", name: "Six of Flames", suit: "Flames", type: "Minor Arcana", number: 6, rank: "Six", meaning: "Victory, recognition, morale restored, public momentum.", reversed: "Hollow praise, fragile confidence, victory without integration.", image: img("file_0000000068b8720cab2f54fd006cd5e5.png") }),
    createCard({ id: "flames-07-seven", name: "Seven of Flames", suit: "Flames", type: "Minor Arcana", number: 7, rank: "Seven", meaning: "Defense, courage, holding the high ground under pressure.", reversed: "Overdefending, paranoia, giving ground from exhaustion.", image: img("file_00000000727c720cbf5463d7f9c62afc.png") }),
    createCard({ id: "flames-08-eight", name: "Eight of Flames", suit: "Flames", type: "Minor Arcana", number: 8, rank: "Eight", meaning: "Acceleration, rapid signals, urgent movement, fast deployment.", reversed: "Scatter, delay, messages misfire, speed without aim.", image: img("file_00000000a88071f7bb1419dbd58fabdc.png") }),
    createCard({ id: "flames-09-nine", name: "Nine of Flames", suit: "Flames", type: "Minor Arcana", number: 9, rank: "Nine", meaning: "Endurance, guarded strength, last stand, battle-tested fire.", reversed: "Exhaustion, trauma armor, distrust, defense that becomes a prison.", image: img("file_00000000bf64720c8f1ec8865e7b39bd.png") }),
    createCard({ id: "flames-10-ten", name: "Ten of Flames", suit: "Flames", type: "Minor Arcana", number: 10, rank: "Ten", meaning: "Burden, overwork, carrying the fire too far, mission overload.", reversed: "Release, delegation, dropping false obligations, controlled cooling.", image: img("file_0000000001d8720cb416e9c671dd57a3.png") }),
    createCard({ id: "flames-court-initiate", name: "Initiate of Flames", suit: "Flames", type: "Court", rank: "Initiate", meaning: "Learning courage, first mission, young fire, first oath.", reversed: "Impulsiveness, posturing, reckless start, fire without discipline.", image: img("file_00000000b2a071f89edb0dcae979c2d0.png") }),
    createCard({ id: "flames-court-operator", name: "Operator of Flames", suit: "Flames", type: "Court", rank: "Operator", meaning: "Action under pressure, pursuit, bold execution, active will.", reversed: "Burning bridges, speed without aim, aggression without doctrine.", image: img("file_00000000928871fdaef96b8b6573ccf4.png") }),
    createCard({ id: "flames-court-keeper", name: "Keeper of Flames", suit: "Flames", type: "Court", rank: "Keeper", meaning: "Sustained passion, moral heat, creative leadership, protected flame.", reversed: "Drama, domination, unstable charisma, charisma used as firestorm.", image: img("file_00000000eec871fdad90d516a42af342.png") }),
    createCard({ id: "flames-court-commander", name: "Commander of Flames", suit: "Flames", type: "Court", rank: "Commander", meaning: "Commanding will, decisive leadership, disciplined fire.", reversed: "Tyranny, rage, command without wisdom, uncontrolled blaze.", image: img("file_000000002cec71fd85bbfa2ec0eb6fda.png") }),
  ],

  Waves: [
    createCard({ id: "waves-01-ace", name: "Ace of Waves", suit: "Waves", type: "Minor Arcana", number: 1, rank: "Ace", meaning: "New feeling, compassion, emotional opening, the first tide.", reversed: "Emotional blockage, numbness, guarded heart, held-back water.", image: img("file_000000004d9c720c8fd20a55e07de0b6.png") }),
    createCard({ id: "waves-02-two", name: "Two of Waves", suit: "Waves", type: "Minor Arcana", number: 2, rank: "Two", meaning: "Bond, mutual recognition, emotional exchange, trust current.", reversed: "Misalignment, unequal vulnerability, broken emotional rhythm.", image: img("file_00000000f9f8720cb0ce3e45694eeb02.png") }),
    createCard({ id: "waves-03-three", name: "Three of Waves", suit: "Waves", type: "Minor Arcana", number: 3, rank: "Three", meaning: "Community joy, shared feeling, friendship, pod celebration.", reversed: "Social spillover, gossip, shallow celebration, unstable belonging.", image: img("file_00000000730c722f99026e6a4e94c008.png") }),
    createCard({ id: "waves-04-four", name: "Four of Waves", suit: "Waves", type: "Minor Arcana", number: 4, rank: "Four", meaning: "Apathy, contemplation, emotional reassessment, waiting at the shore.", reversed: "Receptivity returns, missed gift noticed, the tide comes back in.", image: img("file_000000009a68720cb5698c21e6da9801.png") }),
    createCard({ id: "waves-05-five", name: "Five of Waves", suit: "Waves", type: "Minor Arcana", number: 5, rank: "Five", meaning: "Loss, grief, regret, what spilled, mourning the broken vessel.", reversed: "Acceptance, repair, seeing what remains, grief becoming navigation.", image: img("file_000000001c3071f58704baa55524cd13.png") }),
    createCard({ id: "waves-06-six", name: "Six of Waves", suit: "Waves", type: "Minor Arcana", number: 6, rank: "Six", meaning: "Memory, kindness, inner child, old waters, emotional ancestry.", reversed: "Nostalgia trap, living backward, sweetness used as anchor.", image: img("file_00000000f0d8722fa41d6deb32129842.png") }),
    createCard({ id: "waves-07-seven", name: "Seven of Waves", suit: "Waves", type: "Minor Arcana", number: 7, rank: "Seven", meaning: "Fantasy, many options, emotional fog, dream-current choices.", reversed: "Choosing clearly, fantasy dissolves, the false tide recedes.", image: img("file_00000000c228720ca03962ed05e2a3e0.png") }),
    createCard({ id: "waves-08-eight", name: "Eight of Waves", suit: "Waves", type: "Minor Arcana", number: 8, rank: "Eight", meaning: "Departure, walking away, seeking deeper truth, leaving shallow water.", reversed: "Avoidance, fear of leaving the familiar, circling the same inlet.", image: img("file_00000000bacc722fa2352b2a19b50e76.png") }),
    createCard({ id: "waves-09-nine", name: "Nine of Waves", suit: "Waves", type: "Minor Arcana", number: 9, rank: "Nine", meaning: "Emotional fulfillment, wish, inner satisfaction, safe harbor.", reversed: "Excess, self-satisfaction, empty pleasure, comfort without depth.", image: img("file_000000009da0720ca08f4ece9b19266c.png") }),
    createCard({ id: "waves-10-ten", name: "Ten of Waves", suit: "Waves", type: "Minor Arcana", number: 10, rank: "Ten", meaning: "Family, pod, sanctuary, emotional completion, full belonging.", reversed: "Idealized belonging, fragile harmony, pod image without safety.", image: img("file_0000000003f8720c92f5daaf75de5a1d.png") }),
    createCard({ id: "waves-court-initiate", name: "Initiate of Waves", suit: "Waves", type: "Court", rank: "Initiate", meaning: "Tender message, empathy, emotional learning, first contact.", reversed: "Immaturity, mixed signals, fantasy speech, emotional confusion.", image: img("file_000000009e4871fdbfc3535b4f2100ef.png") }),
    createCard({ id: "waves-court-operator", name: "Operator of Waves", suit: "Waves", type: "Court", rank: "Operator", meaning: "Romantic movement, emotional rescue, devotion, active compassion.", reversed: "Mood-driven action, savior impulse, rescue fantasy.", image: img("file_000000009ccc71f8b35d46961d10fc01.png") }),
    createCard({ id: "waves-court-keeper", name: "Keeper of Waves", suit: "Waves", type: "Court", rank: "Keeper", meaning: "Deep compassion, emotional stewardship, healing presence.", reversed: "Absorption, overwhelm, porous boundaries, drowning in feeling.", image: img("file_00000000dc4871fdb770777c566da38d.png") }),
    createCard({ id: "waves-court-commander", name: "Commander of Waves", suit: "Waves", type: "Court", rank: "Commander", meaning: "Emotional mastery, calm leadership, wise care under pressure.", reversed: "Emotional control, withholding, hidden tides, calm used as mask.", image: img("file_00000000ef707230b003df398190de37.png")  }),
  ],

  Circuits: [
    createCard({ id: "circuits-01-ace", name: "Ace of Circuits", suit: "Circuits", type: "Minor Arcana", number: 1, rank: "Ace", meaning: "Clear thought, new signal, decisive insight, first true data.", reversed: "Mental noise, false certainty, fragmented logic, corrupted signal.", image: img("file_00000000badc720c97a23d0eb95e642b.png") }),
    createCard({ id: "circuits-02-two", name: "Two of Circuits", suit: "Circuits", type: "Minor Arcana", number: 2, rank: "Two", meaning: "Decision point, analysis, divided routes, forked logic.", reversed: "Avoidance, frozen choice, bad data, refusing the comparison.", image: img("file_00000000ff1c722fb916e1454deffde2.png") }),
    createCard({ id: "circuits-03-three", name: "Three of Circuits", suit: "Circuits", type: "Minor Arcana", number: 3, rank: "Three", meaning: "Painful truth, hard information, necessary cut, exposed signal.", reversed: "Rumination, cruelty, reopened wound, data used as blade.", image: img("file_0000000096d4722f9dccf5b28df69be1.png") }),
    createCard({ id: "circuits-04-four", name: "Four of Circuits", suit: "Circuits", type: "Minor Arcana", number: 4, rank: "Four", meaning: "Rest, mental reset, strategic pause, cooling the processor.", reversed: "Burnout, stagnation, refusal to recover, mind left running.", image: img("file_00000000be44720cab8a22d5eb23fac4.png") }),
    createCard({ id: "circuits-05-five", name: "Five of Circuits", suit: "Circuits", type: "Minor Arcana", number: 5, rank: "Five", meaning: "Conflict of minds, tactical loss, exposed motive, adversarial logic.", reversed: "Winning badly, unnecessary escalation, poisoned victory.", image: img("file_00000000ebf0720c89c0a8e9f35efc1b.png") }),
    createCard({ id: "circuits-06-six", name: "Six of Circuits", suit: "Circuits", type: "Minor Arcana", number: 6, rank: "Six", meaning: "Transition, moving to clearer data, leaving a corrupted model.", reversed: "Carrying old logic into new waters, migration without update.", image: img("file_00000000d120722fa2de20f80ec0d4d1.png") }),
    createCard({ id: "circuits-07-seven", name: "Seven of Circuits", suit: "Circuits", type: "Minor Arcana", number: 7, rank: "Seven", meaning: "Stealth, asymmetry, clever maneuver, hidden route through the system.", reversed: "Self-deception, poor concealment, sabotage, compromised tactics.", image: img("file_000000006864720c9862305ad0ac20ca.png") }),
    createCard({ id: "circuits-08-eight", name: "Eight of Circuits", suit: "Circuits", type: "Minor Arcana", number: 8, rank: "Eight", meaning: "Constraint, trapped thought, limiting model, bound by assumptions.", reversed: "Seeing the exit, mental liberation, model break.", image: img("file_00000000bfdc71f5972664e8aa124f98.png") }),
    createCard({ id: "circuits-09-nine", name: "Nine of Circuits", suit: "Circuits", type: "Minor Arcana", number: 9, rank: "Nine", meaning: "Anxiety, overthinking, nightmare analytics, catastrophic forecast.", reversed: "Recovery, reality testing, calmer signal, leaving the loop.", image: img("file_00000000f0cc720cb8bd26e8fa2c67cf.png") }),
    createCard({ id: "circuits-10-ten", name: "Ten of Circuits", suit: "Circuits", type: "Minor Arcana", number: 10, rank: "Ten", meaning: "Mental collapse, final truth, dead model, end of false logic.", reversed: "End of a painful pattern, rebuilding logic, new operating system.", image: img("file_000000008054722fa494a30be76ac7ef.png") }),
    createCard({ id: "circuits-court-initiate", name: "Initiate of Circuits", suit: "Circuits", type: "Court", rank: "Initiate", meaning: "Curiosity, observation, first intelligence, apprentice analyst.", reversed: "Spying, chatter, immature analysis, signal without wisdom.", image: img("file_00000000c16c71fd886f2d3dbf977d64.png") }),
    createCard({ id: "circuits-court-operator", name: "Operator of Circuits", suit: "Circuits", type: "Court", rank: "Operator", meaning: "Fast logic, tactical execution, direct message, active intelligence.", reversed: "Rash words, sharpness without empathy, mental speed as weapon.", image: img("file_00000000e75871fd97f2336d7710959e.png") }),
    createCard({ id: "circuits-court-keeper", name: "Keeper of Circuits", suit: "Circuits", type: "Court", rank: "Keeper", meaning: "Pattern memory, analysis, archive wisdom, protected knowledge.", reversed: "Cold judgment, overclassification, archive becoming cage.", image: img("file_000000000aa471fd9110da36d27b78d8.png") }),
    createCard({ id: "circuits-court-commander", name: "Commander of Circuits", suit: "Circuits", type: "Court", rank: "Commander", meaning: "Strategic intelligence, doctrine, decisive truth, command of signal.", reversed: "Intellectual tyranny, manipulation, sterile logic, doctrine without heart.", image: img("file_00000000676471fda9976758de02ed74 (1).png") }),
  ],

  Foundations: [
    createCard({ id: "foundations-01-ace", name: "Ace of Foundations", suit: "Foundations", type: "Minor Arcana", number: 1, rank: "Ace", meaning: "A real beginning, resource, stable seed, first stone.", reversed: "Missed opportunity, weak material base, seed placed on unstable ground.", image: img("file_00000000460471f589a9136c1ea167e3.png") }),
    createCard({ id: "foundations-02-two", name: "Two of Foundations", suit: "Foundations", type: "Minor Arcana", number: 2, rank: "Two", meaning: "Balancing resources, adaptation, practical choice, moving weight cleanly.", reversed: "Overextension, unstable juggling, resources slipping.", image: img("file_000000002ce0722fa7260f8a705090c1.png") }),
    createCard({ id: "foundations-03-three", name: "Three of Foundations", suit: "Foundations", type: "Minor Arcana", number: 3, rank: "Three", meaning: "Craft, teamwork, building with skill, coordinated labor.", reversed: "Poor planning, uncoordinated labor, work without blueprint.", image: img("file_00000000d708720c8b10b1a9d9bd6317.png") }),
    createCard({ id: "foundations-04-four", name: "Four of Foundations", suit: "Foundations", type: "Minor Arcana", number: 4, rank: "Four", meaning: "Security, holding resources, boundaries, locked structure.", reversed: "Hoarding, fear-based control, stability becoming prison.", image: img("file_000000003b24720cbafdde8f2241d015.png") }),
    createCard({ id: "foundations-05-five", name: "Five of Foundations", suit: "Foundations", type: "Minor Arcana", number: 5, rank: "Five", meaning: "Hardship, scarcity, exclusion, cold systems, material stress.", reversed: "Aid found, recovery path, asking for help, re-entry to shelter.", image: img("file_0000000042b471f5a645c9b67c1abb87.png") }),
    createCard({ id: "foundations-06-six", name: "Six of Foundations", suit: "Foundations", type: "Minor Arcana", number: 6, rank: "Six", meaning: "Mutual aid, fair giving, material support, clean exchange.", reversed: "Debt imbalance, strings attached, support used as leverage.", image: img("file_00000000d9bc71f790c7003c38a9ee38.png") }),
    createCard({ id: "foundations-07-seven", name: "Seven of Foundations", suit: "Foundations", type: "Minor Arcana", number: 7, rank: "Seven", meaning: "Patience, cultivation, long work, slow resilience.", reversed: "Impatience, poor yield, wasted effort, planting without care.", image: img("file_000000001b14720c8f7be8f6d3c25138.png") }),
    createCard({ id: "foundations-08-eight", name: "Eight of Foundations", suit: "Foundations", type: "Minor Arcana", number: 8, rank: "Eight", meaning: "Discipline, apprenticeship, skill-building, repeated craft.", reversed: "Sloppy repetition, no mastery, effort without refinement.", image: img("file_000000000d50722fa5d18f556d81d214.png") }),
    createCard({ id: "foundations-09-nine", name: "Nine of Foundations", suit: "Foundations", type: "Minor Arcana", number: 9, rank: "Nine", meaning: "Independence, sanctuary, earned stability, clean order.", reversed: "Isolation, comfort as cage, material peace without connection.", image: img("file_00000000dcfc720c8315472f9f903010.png") }),
    createCard({ id: "foundations-10-ten", name: "Ten of Foundations", suit: "Foundations", type: "Minor Arcana", number: 10, rank: "Ten", meaning: "Legacy, home base, durable civilization, generational shelter.", reversed: "Family burden, inherited structure failing, old architecture cracking.", image: img("file_000000005598722fad7ebeefa961d83b.png") }),
    createCard({ id: "foundations-court-initiate", name: "Initiate of Foundations", suit: "Foundations", type: "Court", rank: "Initiate", meaning: "Learning craft, practical start, resource awareness, first tool.", reversed: "Naivety, procrastination, poor habits, material confusion.", image: img("file_00000000a840722f9e6860e5c08b1f1c.png") }),
    createCard({ id: "foundations-court-operator", name: "Operator of Foundations", suit: "Foundations", type: "Court", rank: "Operator", meaning: "Steady work, reliable movement, service, durable action.", reversed: "Stubbornness, slow drift, routine without life.", image: img("file_00000000f798722fad5708a0c1be1204.png") }),
    createCard({ id: "foundations-court-keeper", name: "Keeper of Foundations", suit: "Foundations", type: "Court", rank: "Keeper", meaning: "Stewardship, care, practical abundance, protected home.", reversed: "Overcare, material anxiety, possessiveness, shelter as control.", image: img("file_0000000065fc722faecd86c7ca3dd126.png") }),
    createCard({ id: "foundations-court-commander", name: "Commander of Foundations", suit: "Foundations", type: "Court", rank: "Commander", meaning: "Logistics, protection, material mastery, command of resources.", reversed: "Control through resources, rigidity, greed, fortress mentality.", image: img("file_000000009028722f95fca528ab31a373.png") }),
  ],
};

export const minorArcana = Object.values(suits).flat();

/* =========================
 * SHADOW EXPANSION
 * ========================= */

export const shadowDeck = [
  createCard({ id: "shadow-01-the-parasite", name: "The Parasite", suit: "Shadow", type: "Shadow Expansion", number: 1, meaning: "Dependency loops, manipulation, compulsive hunger, extraction disguised as need.", reversed: "Extraction recognized, cord cut, autonomy returns.", image: img("file_00000000cfa471fd83d78eda7c2b6493.png") }),
  createCard({ id: "shadow-02-the-static", name: "The Static", suit: "Shadow", type: "Shadow Expansion", number: 2, meaning: "Noise, misinformation, signal degradation, reality drowned in interference.", reversed: "Silence, filtering, true signal recovered.", image: img("file_000000005cdc71fd85052256db882170.png") }),
  createCard({ id: "shadow-03-the-mask", name: "The Mask", suit: "Shadow", type: "Shadow Expansion", number: 3, meaning: "False identity, fragmentation, mimicry, the face worn for survival or control.", reversed: "Authenticity returns, disguise falls, self becomes visible.", image: img("file_00000000477871f88f928168982745ca.png") }),
  createCard({ id: "shadow-04-the-swarm", name: "The Swarm", suit: "Shadow", type: "Shadow Expansion", number: 4, meaning: "Mob pressure, contagion, group panic, collective behavior without conscience.", reversed: "Individual discernment, healthy collective intelligence, pod mind repaired.", image: img("file_0000000067f871fdb2e16c2dfc192f08.png") }),
  createCard({ id: "shadow-05-the-ruin", name: "The Ruin", suit: "Shadow", type: "Shadow Expansion", number: 5, meaning: "Entropy, neglect, collapse of order, the environment revealing inner breakdown.", reversed: "Repair begins, decay named and contained, first restored zone.", image: img("file_000000009aa871fd85a84c8a10431bec.png") }),
];

/* =========================
 * APOCALYPSE EXPANSION
 * ========================= */

export const apocalypseDeck = [
  createCard({ id: "apocalypse-01-the-gridfall", name: "The Gridfall", suit: "Apocalypse", type: "Apocalypse Expansion", number: 1, meaning: "Infrastructure failure, blackout, dependence revealed, the grid no longer carrying the tribe.", reversed: "Local resilience, redundant systems, restoration through preparation.", image: img("file_00000000de2871fd968e88a5050231af.png") }),
  createCard({ id: "apocalypse-02-the-exodus", name: "The Exodus", suit: "Apocalypse", type: "Apocalypse Expansion", number: 2, meaning: "Displacement, forced movement, search for refuge, migration under pressure.", reversed: "Safe passage, relocation, mutual aid, route restored.", image: img("file_00000000a46471fd9d65b4bac3570246.png") }),
  createCard({ id: "apocalypse-03-the-propaganda-engine", name: "The Propaganda Engine", suit: "Apocalypse", type: "Apocalypse Expansion", number: 3, meaning: "Manufactured reality, mass persuasion, weaponized narrative, story as control grid.", reversed: "Media literacy, truth cell, narrative detox, reclaiming the signal.", image: img("file_000000005e1071fd8e7ba2b7bf364f58.png") }),
  createCard({ id: "apocalypse-04-the-rebuilders", name: "The Rebuilders", suit: "Apocalypse", type: "Apocalypse Expansion", number: 4, meaning: "Repair crews, practical hope, civilization restored by hands, rebuilding after rupture.", reversed: "Fragile rebuild, burnout, coordination failure, recovery without system design.", image: img("file_0000000015ac71fdac133d5281256a0e.png") }),
];

/* =========================
 * MASTER DECK BUILDERS
 * ========================= */

export const expansionDecks = {
  Shadow: shadowDeck,
  Apocalypse: apocalypseDeck,
};

export const fullDeck = [
  ...majorArcana,
  ...minorArcana,
  ...shadowDeck,
  ...apocalypseDeck,
];

export function buildDeck({
  includeMajor = true,
  includeSuits = true,
  includeShadow = true,
  includeApocalypse = true,
  includeMissingImages = true,
} = {}) {
  let deck = [];

  if (includeMajor) deck = deck.concat(majorArcana);
  if (includeSuits) deck = deck.concat(minorArcana);
  if (includeShadow) deck = deck.concat(shadowDeck);
  if (includeApocalypse) deck = deck.concat(apocalypseDeck);

  if (!includeMissingImages) {
    deck = deck.filter((card) => Boolean(card.image));
  }

  return deck;
}

export function getCardById(id, deck = fullDeck) {
  return deck.find((card) => card.id === id) || null;
}

export function getCardsBySuit(suitName, deck = fullDeck) {
  return deck.filter((card) => card.suit === suitName);
}

export function getCardsByType(typeName, deck = fullDeck) {
  return deck.filter((card) => card.type === typeName);
}

export function getMissingImages(deck = fullDeck) {
  return deck.filter((card) => !card.image);
}

export function getMappedImages(deck = fullDeck) {
  return deck.filter((card) => Boolean(card.image));
}

export function getDeckStats(deck = fullDeck) {
  const bySuit = {};
  const byType = {};

  for (const card of deck) {
    bySuit[card.suit] ||= { total: 0, mapped: 0, missing: 0 };
    byType[card.type] ||= { total: 0, mapped: 0, missing: 0 };

    bySuit[card.suit].total += 1;
    byType[card.type].total += 1;

    if (card.image) {
      bySuit[card.suit].mapped += 1;
      byType[card.type].mapped += 1;
    } else {
      bySuit[card.suit].missing += 1;
      byType[card.type].missing += 1;
    }
  }

  return {
    total: deck.length,
    mapped: deck.filter((card) => Boolean(card.image)).length,
    missing: deck.filter((card) => !card.image).length,
    bySuit,
    byType,
  };
}

export function shuffleDeck(deck = fullDeck, seed = null) {
  const output = [...deck];

  if (!seed) {
    return output.sort(() => Math.random() - 0.5);
  }

  let h = 2166136261;
  const seedString = String(seed);
  for (let i = 0; i < seedString.length; i += 1) {
    h ^= seedString.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }

  const rand = () => {
    h += h << 13;
    h ^= h >>> 7;
    h += h << 3;
    h ^= h >>> 17;
    h += h << 5;
    return ((h >>> 0) % 100000) / 100000;
  };

  for (let i = output.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [output[i], output[j]] = [output[j], output[i]];
  }

  return output;
}

export function drawCards({
  deck = fullDeck,
  count = 1,
  allowReversals = true,
  seed = null,
} = {}) {
  const shuffled = shuffleDeck(deck, seed);

  let h = 2166136261;
  const reverseSeed = String(seed || Date.now());
  for (let i = 0; i < reverseSeed.length; i += 1) {
    h ^= reverseSeed.charCodeAt(i);
  }
  const randReverse = () => {
    h += h << 13;
    h ^= h >>> 7;
    return ((h >>> 0) % 100000) / 100000;
  };

  return shuffled.slice(0, count).map((card, index) => ({
    ...card,
    drawIndex: index,
    reversedDraw: allowReversals && randReverse() < 0.32,
  }));
}
