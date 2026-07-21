const pptxgen = require("pptxgenjs");
const path = require("path");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3 x 7.5 in
pres.author = "Luca Buonocore";
pres.title = "100flows — Template Tesi";

// ---- Brand palette ----
const C = {
  dark: "0C0F1E", darker: "080B16", cardDark: "131728", cardDark2: "1B2138",
  purple: "7C5BDB", blue: "4F8EF7", teal: "38BDF8", purpleLt: "A78BFA",
  text: "0D0D1A", muted: "6B7A99", cardBg: "F8F9FC", white: "FFFFFF",
  whiteMuted: "AEB7CF", whiteFaint: "7E88A6", borderLt: "E7E9F1",
};
const HEAD = "Century Gothic";
const BODY = "Segoe UI";
const ACCENTS = [C.purple, C.blue, C.teal];

const BG = {
  dark: path.join(__dirname, "bg_dark.png"),
  plain: path.join(__dirname, "bg_dark_plain.png"),
  grad: path.join(__dirname, "bg_gradient.png"),
};
const LOGO = path.join(__dirname, "..", "img", "100flows", "logo.png");
const KANBAN = path.join(__dirname, "..", "img", "100flows", "Kanban_board_page.png");

const PW = 13.3, PH = 7.5, ML = 0.7;
const softShadow = () => ({ type: "outer", color: "1A2240", blur: 9, offset: 3, angle: 90, opacity: 0.18 });
const cardShadow = () => ({ type: "outer", color: "000000", blur: 12, offset: 4, angle: 90, opacity: 0.10 });

// ---------- helpers ----------
function bg(slide, kind) { slide.background = { path: BG[kind] }; }

function logoTile(slide, x, y, s = 0.95) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w: s, h: s, rectRadius: 0.16,
    fill: { color: C.purple, transparency: 84 },
    line: { color: C.purpleLt, width: 1, transparency: 40 },
  });
  const li = s * 0.58;
  slide.addImage({ path: LOGO, x: x + (s - li) / 2, y: y + (s - li) / 2, w: li, h: li });
}

function badge(slide, x, y, text, w = 3.4) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h: 0.42, rectRadius: 0.21,
    fill: { color: C.purple, transparency: 80 },
    line: { color: C.purpleLt, width: 1, transparency: 45 },
  });
  slide.addShape(pres.shapes.OVAL, { x: x + 0.2, y: y + 0.17, w: 0.09, h: 0.09, fill: { color: C.purpleLt } });
  slide.addText(text.toUpperCase(), {
    x: x + 0.38, y, w: w - 0.5, h: 0.42, margin: 0, valign: "middle",
    fontFace: BODY, fontSize: 9.5, bold: true, color: C.purpleLt, charSpacing: 2,
  });
}

function kicker(slide, x, y, text, color = C.purpleLt) {
  slide.addText(text.toUpperCase(), {
    x, y, w: 8, h: 0.3, margin: 0,
    fontFace: BODY, fontSize: 11, bold: true, color, charSpacing: 3,
  });
}

function footer(slide, onDark = true) {
  const col = onDark ? C.whiteFaint : C.muted;
  slide.addText("100flows · Template presentazione tesi", {
    x: ML, y: PH - 0.42, w: 6, h: 0.3, margin: 0,
    fontFace: BODY, fontSize: 8.5, color: col,
  });
}

function iconTile(slide, x, y, emoji, accent, s = 0.62, onDark = false) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w: s, h: s, rectRadius: 0.12,
    fill: { color: accent, transparency: onDark ? 78 : 86 },
    line: { color: accent, width: 1, transparency: onDark ? 55 : 60 },
  });
  slide.addText(emoji, { x, y, w: s, h: s, margin: 0, align: "center", valign: "middle", fontFace: BODY, fontSize: 18 });
}

// =====================================================================
// 1) COPERTINA
// =====================================================================
(function cover() {
  const s = pres.addSlide();
  bg(s, "dark");
  logoTile(s, ML, 0.8, 0.95);
  s.addText("100flows", { x: ML + 1.15, y: 0.8, w: 5, h: 0.95, margin: 0, valign: "middle", fontFace: HEAD, fontSize: 26, bold: true, color: C.white });

  badge(s, ML, 2.55, "Tesi di Laurea · 2025", 3.1);
  s.addText([
    { text: "Titolo della tua", options: { color: C.white, breakLine: true } },
    { text: "presentazione di tesi", options: { color: C.teal } },
  ], { x: ML, y: 3.05, w: 11.5, h: 1.9, margin: 0, fontFace: HEAD, fontSize: 46, bold: true, lineSpacingMultiple: 1.0 });

  s.addText("Sottotitolo o claim del progetto in una riga — sostituisci con la tua frase.", {
    x: ML, y: 5.05, w: 9.3, h: 0.6, margin: 0, fontFace: BODY, fontSize: 15, color: C.whiteMuted,
  });

  s.addText([
    { text: "Luca Buonocore", options: { color: C.white, bold: true } },
    { text: "   ·   Relatore: Prof. Nome Cognome   ·   Corso di Laurea / Università", options: { color: C.whiteFaint } },
  ], { x: ML, y: 6.55, w: 11.5, h: 0.4, margin: 0, fontFace: BODY, fontSize: 11.5 });

  s.addNotes("COPERTINA — Sostituisci titolo, sottotitolo e dati del relatore. Layout da usare come prima slide.");
})();

// =====================================================================
// 2) INDICE / AGENDA
// =====================================================================
(function agenda() {
  const s = pres.addSlide();
  s.background = { color: C.white };
  kicker(s, ML, 0.6, "Indice", C.purple);
  s.addText("Struttura della presentazione", { x: ML, y: 0.92, w: 11, h: 0.8, margin: 0, fontFace: HEAD, fontSize: 32, bold: true, color: C.text });

  const items = [
    "Contesto e problema",
    "Domanda di ricerca e metodo",
    "Stato dell'arte / ricerca",
    "Risultati e analisi",
    "La soluzione proposta",
    "Conclusioni e sviluppi futuri",
  ];
  const colW = 5.6, rowH = 1.05, x0 = ML, y0 = 2.0, gap = 0.35;
  items.forEach((it, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = x0 + col * (colW + gap), y = y0 + row * (rowH + 0.25);
    const accent = ACCENTS[i % 3];
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: colW, h: rowH, rectRadius: 0.1, fill: { color: C.cardBg }, line: { color: C.borderLt, width: 1 }, shadow: cardShadow() });
    s.addShape(pres.shapes.OVAL, { x: x + 0.28, y: y + (rowH - 0.62) / 2, w: 0.62, h: 0.62, fill: { color: accent, transparency: 85 }, line: { color: accent, width: 1, transparency: 55 } });
    s.addText(String(i + 1).padStart(2, "0"), { x: x + 0.28, y: y + (rowH - 0.62) / 2, w: 0.62, h: 0.62, margin: 0, align: "center", valign: "middle", fontFace: HEAD, fontSize: 16, bold: true, color: accent });
    s.addText(it, { x: x + 1.1, y, w: colW - 1.3, h: rowH, margin: 0, valign: "middle", fontFace: BODY, fontSize: 14.5, bold: true, color: C.text });
  });
  footer(s, false);
  s.addNotes("INDICE — Rinomina le voci in base ai capitoli della tua tesi.");
})();

// =====================================================================
// 3) DIVISORE DI SEZIONE
// =====================================================================
(function divider() {
  const s = pres.addSlide();
  bg(s, "plain");
  s.addText("01", { x: ML, y: 2.0, w: 3, h: 1.8, margin: 0, fontFace: HEAD, fontSize: 96, bold: true, color: C.purple, transparency: 0 });
  kicker(s, ML + 0.05, 3.85, "Sezione", C.teal);
  s.addText("Titolo della sezione", { x: ML, y: 4.15, w: 11, h: 1.0, margin: 0, fontFace: HEAD, fontSize: 40, bold: true, color: C.white });
  s.addText("Una riga di contesto che introduce ciò di cui parlerai in questa parte.", { x: ML, y: 5.25, w: 9.5, h: 0.6, margin: 0, fontFace: BODY, fontSize: 14, color: C.whiteMuted });
  logoTile(s, PW - 1.75, PH - 1.75, 0.85);
  s.addNotes("DIVISORE DI SEZIONE — Duplica questa slide tra un capitolo e l'altro. Cambia numero e titolo.");
})();

// =====================================================================
// 4) CONTENUTO: TESTO + ELENCO PUNTATO (due colonne)
// =====================================================================
(function bulletsLayout() {
  const s = pres.addSlide();
  s.background = { color: C.white };
  kicker(s, ML, 0.6, "Sezione", C.purple);
  s.addText("Titolo della slide di contenuto", { x: ML, y: 0.92, w: 8, h: 0.8, margin: 0, fontFace: HEAD, fontSize: 28, bold: true, color: C.text });

  s.addText([
    { text: "Primo punto chiave del tuo discorso, sintetico e diretto.", options: { bullet: { code: "2022", indent: 18 }, color: C.text, breakLine: true, paraSpaceAfter: 14 } },
    { text: "Secondo punto: spiega un concetto o un dato a supporto.", options: { bullet: { code: "2022", indent: 18 }, color: C.text, breakLine: true, paraSpaceAfter: 14 } },
    { text: "Terzo punto: collega l'argomento alla tua tesi.", options: { bullet: { code: "2022", indent: 18 }, color: C.text, breakLine: true, paraSpaceAfter: 14 } },
    { text: "Quarto punto: chiudi con un'implicazione o conseguenza.", options: { bullet: { code: "2022", indent: 18 }, color: C.text } },
  ], { x: ML, y: 2.0, w: 6.6, h: 4.0, margin: 0, fontFace: BODY, fontSize: 15.5, color: C.text, lineSpacingMultiple: 1.1 });

  // side accent panel
  const px = 8.0, pw = 4.6;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: px, y: 2.0, w: pw, h: 4.3, rectRadius: 0.12, fill: { color: C.cardBg }, line: { color: C.borderLt, width: 1 }, shadow: cardShadow() });
  iconTile(s, px + 0.4, 2.4, "💡", C.purple, 0.7);
  s.addText("Box di approfondimento", { x: px + 0.4, y: 3.25, w: pw - 0.8, h: 0.4, margin: 0, fontFace: HEAD, fontSize: 15, bold: true, color: C.text });
  s.addText("Usa questo riquadro per una citazione, una definizione o un dato che vuoi mettere in risalto durante l'esposizione.", { x: px + 0.4, y: 3.7, w: pw - 0.8, h: 2.2, margin: 0, fontFace: BODY, fontSize: 12.5, color: C.muted, lineSpacingMultiple: 1.15 });
  footer(s, false);
  s.addNotes("LAYOUT TESTO + ELENCO — Per slide discorsive. Il box a destra è opzionale: rimuovilo se non serve.");
})();

// =====================================================================
// 5) GRIGLIA DI 3 CARD
// =====================================================================
(function cardsLayout() {
  const s = pres.addSlide();
  s.background = { color: C.white };
  kicker(s, ML, 0.6, "Sezione", C.purple);
  s.addText("Tre concetti affiancati", { x: ML, y: 0.92, w: 11, h: 0.8, margin: 0, fontFace: HEAD, fontSize: 28, bold: true, color: C.text });

  const cards = [
    { e: "🎯", t: "Primo concetto", d: "Descrizione breve del primo punto. Una o due frasi che spiegano l'idea." },
    { e: "⚡", t: "Secondo concetto", d: "Descrizione breve del secondo punto. Mantieni il testo conciso e leggibile." },
    { e: "🔗", t: "Terzo concetto", d: "Descrizione breve del terzo punto. Coerente con gli altri due per ritmo." },
  ];
  const cw = 3.83, gap = 0.4, y = 2.1, h = 3.7, x0 = ML;
  cards.forEach((c, i) => {
    const x = x0 + i * (cw + gap), accent = ACCENTS[i];
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: cw, h, rectRadius: 0.12, fill: { color: C.white }, line: { color: C.borderLt, width: 1 }, shadow: cardShadow() });
    iconTile(s, x + 0.45, y + 0.45, c.e, accent, 0.72);
    s.addText(c.t, { x: x + 0.45, y: y + 1.45, w: cw - 0.9, h: 0.5, margin: 0, fontFace: HEAD, fontSize: 17, bold: true, color: C.text });
    s.addText(c.d, { x: x + 0.45, y: y + 2.0, w: cw - 0.9, h: 1.5, margin: 0, fontFace: BODY, fontSize: 13, color: C.muted, lineSpacingMultiple: 1.15 });
  });
  footer(s, false);
  s.addNotes("GRIGLIA 3 CARD — Per confronti o elenchi di concetti. Duplica una card per farne 4 (riduci la larghezza).");
})();

// =====================================================================
// 6) STATISTICHE CHIAVE (4 callout)
// =====================================================================
(function statsLayout() {
  const s = pres.addSlide();
  s.background = { color: C.cardBg };
  kicker(s, ML, 0.6, "Risultati", C.purple);
  s.addText("I numeri chiave del progetto", { x: ML, y: 0.92, w: 11, h: 0.8, margin: 0, fontFace: HEAD, fontSize: 28, bold: true, color: C.text });

  const stats = [
    { n: "00%", l: "Descrizione del primo dato" },
    { n: "0,0×", l: "Descrizione del secondo dato" },
    { n: "000+", l: "Descrizione del terzo dato" },
    { n: "−00%", l: "Descrizione del quarto dato" },
  ];
  const cw = 2.85, gap = 0.32, y = 2.4, h = 2.7, x0 = ML;
  stats.forEach((st, i) => {
    const x = x0 + i * (cw + gap), accent = ACCENTS[i % 3];
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: cw, h, rectRadius: 0.12, fill: { color: C.white }, line: { color: C.borderLt, width: 1 }, shadow: cardShadow() });
    s.addText(st.n, { x: x + 0.2, y: y + 0.45, w: cw - 0.4, h: 1.1, margin: 0, align: "center", fontFace: HEAD, fontSize: 40, bold: true, color: accent });
    s.addText(st.l.toUpperCase(), { x: x + 0.25, y: y + 1.65, w: cw - 0.5, h: 0.8, margin: 0, align: "center", fontFace: BODY, fontSize: 10.5, bold: true, color: C.muted, charSpacing: 1, lineSpacingMultiple: 1.1 });
  });
  footer(s, false);
  s.addNotes("STATISTICHE — Sostituisci numeri ed etichette con i tuoi risultati. Ideale dopo l'analisi dei dati.");
})();

// =====================================================================
// 7) CONFRONTO PRIMA -> DOPO
// =====================================================================
(function compareLayout() {
  const s = pres.addSlide();
  bg(s, "plain");
  kicker(s, ML, 0.6, "Confronto", C.teal);
  s.addText("Prima e dopo", { x: ML, y: 0.92, w: 11, h: 0.8, margin: 0, fontFace: HEAD, fontSize: 28, bold: true, color: C.white });

  const colW = 5.25, y = 2.1, h = 4.0;
  const cols = [
    { x: ML, head: "Approccio attuale", accent: C.whiteFaint, items: ["Limite o problema uno", "Limite o problema due", "Limite o problema tre", "Limite o problema quattro"], dim: true },
    { x: PW - ML - colW, head: "Proposta della tesi", accent: C.purpleLt, items: ["Miglioramento uno", "Miglioramento due", "Miglioramento tre", "Miglioramento quattro"], dim: false },
  ];
  cols.forEach((c) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: c.x, y, w: colW, h, rectRadius: 0.12, fill: { color: C.cardDark }, line: { color: c.dim ? "2A3354" : C.purple, width: 1, transparency: c.dim ? 0 : 35 }, shadow: softShadow() });
    s.addText(c.head.toUpperCase(), { x: c.x + 0.4, y: y + 0.35, w: colW - 0.8, h: 0.4, margin: 0, fontFace: BODY, fontSize: 12, bold: true, color: c.accent, charSpacing: 1.5 });
    s.addShape(pres.shapes.LINE, { x: c.x + 0.4, y: y + 0.85, w: colW - 0.8, h: 0, line: { color: "2A3354", width: 1 } });
    c.items.forEach((it, i) => {
      const iy = y + 1.15 + i * 0.66;
      s.addShape(pres.shapes.OVAL, { x: c.x + 0.42, y: iy + 0.08, w: 0.1, h: 0.1, fill: { color: c.dim ? C.whiteFaint : C.purpleLt } });
      s.addText(it, { x: c.x + 0.68, y: iy - 0.05, w: colW - 1.1, h: 0.55, margin: 0, valign: "middle", fontFace: BODY, fontSize: 13, color: c.dim ? C.whiteMuted : C.white });
    });
  });
  // arrow
  s.addText("→", { x: PW / 2 - 0.35, y: y + h / 2 - 0.45, w: 0.7, h: 0.9, margin: 0, align: "center", valign: "middle", fontFace: BODY, fontSize: 30, bold: true, color: C.purpleLt });
  footer(s, true);
  s.addNotes("CONFRONTO PRIMA→DOPO — Per contrapporre lo stato dell'arte alla tua soluzione.");
})();

// =====================================================================
// 8) CITAZIONE / CONCETTO CHIAVE
// =====================================================================
(function quoteLayout() {
  const s = pres.addSlide();
  bg(s, "dark");
  logoTile(s, ML, 0.8, 0.8);
  kicker(s, ML, 2.0, "Concetto chiave", C.teal);
  s.addText([
    { text: "La frase che riassume ", options: { color: C.white } },
    { text: "l'idea centrale", options: { color: C.teal } },
    { text: " della tua tesi.", options: { color: C.white } },
  ], { x: ML, y: 2.5, w: 11.2, h: 2.4, margin: 0, fontFace: HEAD, fontSize: 38, bold: true, lineSpacingMultiple: 1.12 });
  s.addText("Sotto la citazione puoi aggiungere una riga di spiegazione o attribuzione.", { x: ML, y: 5.4, w: 9.5, h: 0.6, margin: 0, fontFace: BODY, fontSize: 14, italic: true, color: C.whiteMuted });
  footer(s, true);
  s.addNotes("CITAZIONE — Per un'affermazione forte o la tesi centrale. Evidenzia 1-2 parole con il colore accento.");
})();

// =====================================================================
// 9) SHOWCASE UI / IMMAGINE
// =====================================================================
(function showcaseLayout() {
  const s = pres.addSlide();
  bg(s, "plain");
  kicker(s, ML, 0.6, "Prodotto", C.teal);
  s.addText("Mostra l'interfaccia / un'immagine", { x: ML, y: 0.92, w: 11, h: 0.8, margin: 0, fontFace: HEAD, fontSize: 28, bold: true, color: C.white });

  // framed example screenshot (left), notes (right)
  const fx = ML, fy = 2.05, fw = 8.2;
  // compute height for 1268x720-ish ratio of the kanban shot (approx 16:9.5)
  const ratio = 720 / 1268; // h/w
  const fh = fw * ratio;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: fx - 0.08, y: fy - 0.08, w: fw + 0.16, h: fh + 0.16, rectRadius: 0.1, fill: { color: C.cardDark }, line: { color: "2A3354", width: 1 }, shadow: softShadow() });
  s.addImage({ path: KANBAN, x: fx, y: fy, w: fw, h: fh });
  s.addText("Didascalia dell'immagine — sostituisci con il tuo screenshot.", { x: fx, y: fy + fh + 0.18, w: fw, h: 0.4, margin: 0, fontFace: BODY, fontSize: 11, color: C.whiteFaint });

  const nx = fx + fw + 0.5, nw = PW - ML - nx;
  const notes = [
    ["✨", "Punto di forza uno"],
    ["⚙️", "Punto di forza due"],
    ["📈", "Punto di forza tre"],
  ];
  notes.forEach((n, i) => {
    const ny = fy + 0.1 + i * 1.35;
    iconTile(s, nx, ny, n[0], ACCENTS[i], 0.6, true);
    s.addText(n[1], { x: nx + 0.78, y: ny - 0.02, w: nw - 0.78, h: 0.4, margin: 0, fontFace: HEAD, fontSize: 14, bold: true, color: C.white });
    s.addText("Breve descrizione del dettaglio mostrato.", { x: nx + 0.78, y: ny + 0.38, w: nw - 0.78, h: 0.8, margin: 0, fontFace: BODY, fontSize: 11.5, color: C.whiteMuted, lineSpacingMultiple: 1.1 });
  });
  footer(s, true);
  s.addNotes("SHOWCASE UI — Sostituisci lo screenshot di esempio con un'immagine del tuo lavoro. I punti a destra evidenziano i dettagli.");
})();

// =====================================================================
// 10) TIMELINE / ROADMAP
// =====================================================================
(function timelineLayout() {
  const s = pres.addSlide();
  s.background = { color: C.white };
  kicker(s, ML, 0.6, "Percorso", C.purple);
  s.addText("Fasi del progetto / roadmap", { x: ML, y: 0.92, w: 11, h: 0.8, margin: 0, fontFace: HEAD, fontSize: 28, bold: true, color: C.text });

  const steps = [
    ["✓", "Fase completata", "Descrivi che cosa è stato fatto in questa fase del lavoro."],
    ["✓", "Fase completata", "Un'altra fase conclusa: metodo, raccolta dati o sviluppo."],
    ["→", "Fase in corso", "Che cosa stai facendo adesso e qual è l'obiettivo."],
    ["→", "Fase futura", "Sviluppi successivi previsti dopo la tesi."],
  ];
  const x = ML, y0 = 2.15, rh = 1.05;
  // vertical guide line
  s.addShape(pres.shapes.LINE, { x: x + 0.31, y: y0 + 0.3, w: 0, h: rh * (steps.length - 1), line: { color: C.borderLt, width: 2 } });
  steps.forEach((st, i) => {
    const y = y0 + i * rh, done = st[0] === "✓", accent = done ? C.purple : C.teal;
    s.addShape(pres.shapes.OVAL, { x, y, w: 0.62, h: 0.62, fill: { color: accent, transparency: 82 }, line: { color: accent, width: 1.5, transparency: 30 } });
    s.addText(st[0], { x, y, w: 0.62, h: 0.62, margin: 0, align: "center", valign: "middle", fontFace: BODY, fontSize: 16, bold: true, color: accent });
    s.addText(st[1], { x: x + 0.95, y: y - 0.02, w: 10.5, h: 0.4, margin: 0, fontFace: HEAD, fontSize: 15, bold: true, color: C.text });
    s.addText(st[2], { x: x + 0.95, y: y + 0.36, w: 10.8, h: 0.5, margin: 0, fontFace: BODY, fontSize: 12.5, color: C.muted });
  });
  footer(s, false);
  s.addNotes("TIMELINE / ROADMAP — ✓ per fasi concluse, → per fasi in corso o future.");
})();

// =====================================================================
// 11) CHIUSURA / GRAZIE
// =====================================================================
(function closing() {
  const s = pres.addSlide();
  bg(s, "grad");
  logoTile(s, ML, 0.8, 0.95);
  s.addText("100flows", { x: ML + 1.15, y: 0.8, w: 5, h: 0.95, margin: 0, valign: "middle", fontFace: HEAD, fontSize: 26, bold: true, color: C.white });

  s.addText("Grazie.", { x: ML, y: 3.0, w: 11, h: 1.4, margin: 0, fontFace: HEAD, fontSize: 64, bold: true, color: C.white });
  s.addText("Spazio per domande — sostituisci con la tua frase di chiusura.", { x: ML, y: 4.55, w: 10, h: 0.6, margin: 0, fontFace: BODY, fontSize: 16, color: "EAF0FF" });

  s.addText([
    { text: "Luca Buonocore", options: { bold: true, color: C.white } },
    { text: "   ·   email@dominio.it   ·   linkedin.com/in/...", options: { color: "EAF0FF" } },
  ], { x: ML, y: 6.5, w: 11.5, h: 0.4, margin: 0, fontFace: BODY, fontSize: 12 });
  s.addNotes("CHIUSURA — Slide finale con ringraziamento e contatti. Sfondo gradiente brand.");
})();

pres.writeFile({ fileName: path.join(__dirname, "..", "100flows_Template_Tesi.pptx") })
  .then(f => console.log("written:", f))
  .catch(e => { console.error(e); process.exit(1); });
