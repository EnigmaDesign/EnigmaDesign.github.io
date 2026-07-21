const pptxgen = require("pptxgenjs");
const path = require("path");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3 x 7.5 in
pres.author = "Luca Buonocore";
pres.title = "100flows — Interviste ai PM · Insight";

const C = {
  dark: "0C0F1E", darker: "080B16", cardDark: "131728", cardDark2: "1B2138",
  purple: "7C5BDB", blue: "4F8EF7", teal: "38BDF8", purpleLt: "A78BFA",
  orange: "F0883E",
  text: "0D0D1A", muted: "6B7A99", cardBg: "F8F9FC", white: "FFFFFF",
  whiteMuted: "AEB7CF", whiteFaint: "7E88A6", borderLt: "E7E9F1",
};
const HEAD = "Century Gothic";
const BODY = "Segoe UI";
const A = [C.purple, C.blue, C.teal];

const BG = { dark: path.join(__dirname, "bg_dark.png"), plain: path.join(__dirname, "bg_dark_plain.png"), grad: path.join(__dirname, "bg_gradient.png") };
const LOGO = path.join(__dirname, "..", "img", "100flows", "logo.png");
const LG = (n) => path.join(__dirname, "logos_png", n + ".png");
const FBK = path.join(__dirname, "..", "img", "logos", "fbk.png");

const PW = 13.3, PH = 7.5, ML = 0.7;
const softShadow = () => ({ type: "outer", color: "1A2240", blur: 9, offset: 3, angle: 90, opacity: 0.18 });
const cardShadow = () => ({ type: "outer", color: "000000", blur: 12, offset: 4, angle: 90, opacity: 0.10 });

function bg(s, k) { s.background = { path: BG[k] }; }
function logoTile(s, x, y, sz = 0.9) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: sz, h: sz, rectRadius: 0.16, fill: { color: C.purple, transparency: 84 }, line: { color: C.purpleLt, width: 1, transparency: 40 } });
  const li = sz * 0.58; s.addImage({ path: LOGO, x: x + (sz - li) / 2, y: y + (sz - li) / 2, w: li, h: li });
}
function kicker(s, x, y, t, color = C.purpleLt) { s.addText(t.toUpperCase(), { x, y, w: 9, h: 0.3, margin: 0, fontFace: BODY, fontSize: 11, bold: true, color, charSpacing: 3 }); }
function iconTile(s, x, y, e, accent, sz = 0.6, onDark = false) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: sz, h: sz, rectRadius: 0.12, fill: { color: accent, transparency: onDark ? 78 : 86 }, line: { color: accent, width: 1, transparency: onDark ? 55 : 60 } });
  s.addText(e, { x, y, w: sz, h: sz, margin: 0, align: "center", valign: "middle", fontFace: BODY, fontSize: 16 });
}
function footer(s, onDark, page) {
  s.addText("100flows · Ricerca primaria — Interviste ai Product Manager", { x: ML, y: PH - 0.42, w: 8, h: 0.3, margin: 0, fontFace: BODY, fontSize: 8.5, color: onDark ? C.whiteFaint : C.muted });
  if (page) s.addText(String(page), { x: PW - 1.1, y: PH - 0.42, w: 0.4, h: 0.3, margin: 0, align: "right", fontFace: BODY, fontSize: 8.5, color: onDark ? C.whiteFaint : C.muted });
}

// =============== PAGE 1 — COVER ===============
(function () {
  const s = pres.addSlide(); bg(s, "dark");
  logoTile(s, ML, 0.8, 0.95);
  s.addText("100flows", { x: ML + 1.15, y: 0.8, w: 5, h: 0.95, margin: 0, valign: "middle", fontFace: HEAD, fontSize: 26, bold: true, color: C.white });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: ML, y: 2.5, w: 2.7, h: 0.42, rectRadius: 0.21, fill: { color: C.purple, transparency: 80 }, line: { color: C.purpleLt, width: 1, transparency: 45 } });
  s.addText("RICERCA PRIMARIA", { x: ML + 0.25, y: 2.5, w: 2.4, h: 0.42, margin: 0, valign: "middle", fontFace: BODY, fontSize: 9.5, bold: true, color: C.purpleLt, charSpacing: 2 });
  s.addText([
    { text: "Interviste ai", options: { color: C.white, breakLine: true } },
    { text: "Product Manager", options: { color: C.teal } },
  ], { x: ML, y: 3.0, w: 11.5, h: 1.9, margin: 0, fontFace: HEAD, fontSize: 46, bold: true, lineSpacingMultiple: 1.0 });
  s.addText("Sintesi degli insight raccolti da 8 Product Manager su come l'intelligenza artificiale sta trasformando il project management — a supporto della tesi 100flows.", { x: ML, y: 5.05, w: 9.6, h: 1.0, margin: 0, fontFace: BODY, fontSize: 15, color: C.whiteMuted, lineSpacingMultiple: 1.2 });
  s.addText([{ text: "Luca Buonocore", options: { bold: true, color: C.white } }, { text: "   ·   Documento di ricerca · 2025", options: { color: C.whiteFaint } }], { x: ML, y: 6.6, w: 11, h: 0.4, margin: 0, fontFace: BODY, fontSize: 11.5 });
})();

// =============== PAGE 2 — OVERVIEW + LOGHI ===============
(function () {
  const s = pres.addSlide(); s.background = { color: C.white };
  kicker(s, ML, 0.55, "Il campione", C.purple);
  s.addText("8 conversazioni, 6 organizzazioni", { x: ML, y: 0.87, w: 11.5, h: 0.8, margin: 0, fontFace: HEAD, fontSize: 30, bold: true, color: C.text });
  s.addText("Interviste in profondità con Product Manager di aziende enterprise e centri di ricerca, per capire dove l'AI crea già valore nel loro lavoro quotidiano e dove invece mostra ancora dei limiti.", { x: ML, y: 1.75, w: 11.4, h: 0.8, margin: 0, fontFace: BODY, fontSize: 13.5, color: C.muted, lineSpacingMultiple: 1.2 });

  const stats = [["8", "PM intervistati"], ["6", "Organizzazioni"], ["8", "Use-case ricorrenti"], ["8", "Preoccupazioni emerse"]];
  const cw = 2.85, gap = 0.32, y = 2.85, h = 1.7;
  stats.forEach((st, i) => {
    const x = ML + i * (cw + gap), accent = A[i % 3];
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: cw, h, rectRadius: 0.12, fill: { color: C.cardBg }, line: { color: C.borderLt, width: 1 }, shadow: cardShadow() });
    s.addText(st[0], { x: x + 0.2, y: y + 0.28, w: cw - 0.4, h: 0.8, margin: 0, align: "center", fontFace: HEAD, fontSize: 36, bold: true, color: accent });
    s.addText(st[1].toUpperCase(), { x: x + 0.2, y: y + 1.12, w: cw - 0.4, h: 0.45, margin: 0, align: "center", fontFace: BODY, fontSize: 10.5, bold: true, color: C.muted, charSpacing: 1 });
  });

  // logos row
  s.addText("LE ORGANIZZAZIONI COINVOLTE", { x: ML, y: 5.0, w: 8, h: 0.35, margin: 0, fontFace: BODY, fontSize: 10, bold: true, color: C.muted, charSpacing: 2 });
  const logos = [["amazon", false], ["microsoft", false], ["fbk", true], ["workday", false], ["yahoo", false], ["salesforce", false]];
  const lw = 1.83, lgap = 0.18, ly = 5.45, lh = 0.95;
  logos.forEach((lg, i) => {
    const x = ML + i * (lw + lgap);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: ly, w: lw, h: lh, rectRadius: 0.1, fill: { color: C.white }, line: { color: C.borderLt, width: 1 }, shadow: cardShadow() });
    const p = lg[0] === "fbk" ? FBK : LG(lg[0]);
    const ih = lg[1] ? 0.62 : 0.32;                 // fbk taller (stacked)
    const iw = lg[1] ? ih * (636 / 545) : ih * 4.2; // approx aspect for wordmarks
    s.addImage({ path: p, x: x + (lw - iw) / 2, y: ly + (lh - ih) / 2, w: iw, h: ih });
  });
  footer(s, false, 2);
})();

// =============== PAGE 3 — USE-CASE ===============
(function () {
  const s = pres.addSlide(); s.background = { color: C.cardBg };
  kicker(s, ML, 0.55, "Insight · 1", C.purple);
  s.addText("Dove i PM applicano l'AI oggi", { x: ML, y: 0.87, w: 11.5, h: 0.7, margin: 0, fontFace: HEAD, fontSize: 30, bold: true, color: C.text });

  const uc = [
    ["✍️", "Document & mail drafting", "Qualità e lessico migliori, forte risparmio di tempo su documenti, report ed email.", "Forte consenso", C.purple],
    ["🤝", "Stakeholder management", "Tradurre requisiti e sintetizzare KPI; NotebookLM ~4h/settimana risparmiate.", "Forte consenso", C.blue],
    ["💬", "Sentiment analysis", "Affidabile perché è analisi di testo (Copilot, Cursor), con vincoli di compliance.", "Affidabile", C.teal],
    ["📊", "Data querying & analysis", "Mining di grandi dataset per fix del codice, gap analysis e trend dei clienti.", "Alto valore", C.purple],
    ["⚙️", "Automazione & vibe coding", "Automazioni Python custom con output costante e pipeline di logging.", "Risparmio tempo", C.blue],
    ["🎨", "Mockup & A/B testing", "Prototipi più rapidi e mentalità experimentation-first con feedback veloci.", "Delivery più veloce", C.teal],
    ["⚠️", "Risk & predictive analytics", "Anticipare colli di bottiglia e sforamenti dai dati storici — ancora sottoutilizzato.", "Sottoutilizzato", C.orange],
    ["🤖", "Agentic AI & agenti custom", "I PM costruiscono i propri agenti (es. CSV → bidding, ~30 min risparmiati).", "Emergente", C.purple],
  ];
  const cw = 5.7, gap = 0.35, ch = 1.02, x0 = ML, y0 = 1.95;
  uc.forEach((c, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = x0 + col * (cw + gap), y = y0 + row * (ch + 0.18);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: cw, h: ch, rectRadius: 0.1, fill: { color: C.white }, line: { color: C.borderLt, width: 1 }, shadow: cardShadow() });
    iconTile(s, x + 0.28, y + 0.2, c[0], c[4], 0.6);
    s.addText(c[1], { x: x + 1.05, y: y + 0.13, w: cw - 2.4, h: 0.34, margin: 0, fontFace: HEAD, fontSize: 12.5, bold: true, color: C.text });
    s.addText(c[2], { x: x + 1.05, y: y + 0.46, w: cw - 1.3, h: 0.5, margin: 0, fontFace: BODY, fontSize: 10, color: C.muted, lineSpacingMultiple: 1.05 });
    // tag top-right
    s.addText(c[3].toUpperCase(), { x: x + cw - 1.55, y: y + 0.15, w: 1.4, h: 0.3, margin: 0, align: "right", fontFace: BODY, fontSize: 7.5, bold: true, color: c[4], charSpacing: 1 });
  });
  footer(s, false, 3);
})();

// =============== PAGE 4 — PREOCCUPAZIONI ===============
(function () {
  const s = pres.addSlide(); bg(s, "plain");
  kicker(s, ML, 0.55, "Insight · 2", C.teal);
  s.addText("Preoccupazioni e domande aperte", { x: ML, y: 0.87, w: 11.5, h: 0.7, margin: 0, fontFace: HEAD, fontSize: 30, bold: true, color: C.white });
  s.addText("Accanto agli entusiasmi, i PM hanno segnalato limiti e rischi concreti dell'adozione dell'AI.", { x: ML, y: 1.62, w: 11, h: 0.5, margin: 0, fontFace: BODY, fontSize: 13, color: C.whiteMuted });

  const con = [
    ["Incertezza sui costi", "Non è ancora chiaro se l'AI sia davvero più economica del lavoro umano su larga scala."],
    ["Sicurezza dei dati aziendali", "Gli input possono essere riusati per il training; solo ~10% delle aziende vede benefici reali."],
    ["Maturità embrionale", "Promettente ma acerba: servono dati strutturati e di alta qualità per output affidabili."],
    ["Domini ad alto rischio", "Selezione del personale e decisioni di compliance sono applicazioni particolarmente rischiose."],
    ["Gap normativo UE", "L'Europa è vista come in ritardo sia sulla tecnologia sia sulla legislazione."],
    ["Human in the loop", "L'AI è un assistente, non un sostituto: la decisione finale resta al PM."],
    ["Limiti di contesto", "Fatica senza contesto ricco; citato il PMBOK 7ª ed. come posizione ufficiale del PMI."],
    ["Prospettiva futura", "L'agentic AI è già arrivata, ma l'impatto è difficile da prevedere oltre i ~3 mesi."],
  ];
  const colW = 5.7, gap = 0.35, x0 = ML, y0 = 2.3, rh = 1.02;
  con.forEach((c, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = x0 + col * (colW + gap), y = y0 + row * rh;
    s.addShape(pres.shapes.OVAL, { x, y: y + 0.06, w: 0.12, h: 0.12, fill: { color: C.purpleLt } });
    s.addText(c[0], { x: x + 0.28, y: y - 0.05, w: colW - 0.28, h: 0.32, margin: 0, fontFace: HEAD, fontSize: 12.5, bold: true, color: C.white });
    s.addText(c[1], { x: x + 0.28, y: y + 0.27, w: colW - 0.3, h: 0.62, margin: 0, fontFace: BODY, fontSize: 10.5, color: C.whiteMuted, lineSpacingMultiple: 1.08 });
  });
  footer(s, true, 4);
})();

// =============== PAGE 5 — CASO YAHOO / AGENTIC AI ===============
(function () {
  const s = pres.addSlide(); bg(s, "dark");
  kicker(s, ML, 0.55, "Caso di studio · Ad-Tech & Agentic AI", C.teal);
  s.addText("L'intervista con il PM di Yahoo!", { x: ML, y: 0.87, w: 11.5, h: 0.7, margin: 0, fontFace: HEAD, fontSize: 30, bold: true, color: C.white });

  // left column: context bullets
  const lx = ML, lw = 6.7;
  const pts = [
    ["Advertising & targeting", "Nuovi modi di creare conversioni, targeting on/offline e tracciamento di chi vede l'annuncio; partnership con condivisione continua dei dati."],
    ["Modelli personalizzati vs contestuali", "In A/B test le performance erano simili: un sistema a pesi favoriva il modello contestuale."],
    ["Budget pacing", "Il budget è definito dall'utente e la piattaforma lo distribuisce in modo proporzionale sull'intero periodo."],
    ["Lavoro col team di data science", "Creazione e pulizia dei modelli; i problemi emergono solo in produzione, quando il prodotto non performa."],
  ];
  let y = 1.95;
  pts.forEach((p) => {
    s.addShape(pres.shapes.OVAL, { x: lx, y: y + 0.05, w: 0.12, h: 0.12, fill: { color: C.teal } });
    s.addText(p[0], { x: lx + 0.28, y: y - 0.05, w: lw - 0.3, h: 0.32, margin: 0, fontFace: HEAD, fontSize: 13, bold: true, color: C.white });
    s.addText(p[1], { x: lx + 0.28, y: y + 0.28, w: lw - 0.3, h: 0.72, margin: 0, fontFace: BODY, fontSize: 10.5, color: C.whiteMuted, lineSpacingMultiple: 1.1 });
    y += 1.18;
  });

  // right column: quote card + stat
  const rx = lx + lw + 0.5, rw = PW - ML - rx;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rx, y: 1.95, w: rw, h: 2.35, rectRadius: 0.14, fill: { color: C.cardDark }, line: { color: C.purple, width: 1, transparency: 40 }, shadow: softShadow() });
  s.addText("“", { x: rx + 0.2, y: 1.95, w: 1, h: 0.9, margin: 0, fontFace: HEAD, fontSize: 54, bold: true, color: C.purpleLt });
  s.addText([
    { text: "Usa l'AI ", options: { color: C.white } },
    { text: "sopra l'idea", options: { color: C.teal } },
    { text: ", non per creare l'idea. Dev'essere ", options: { color: C.white } },
    { text: "human-thinking, not replying", options: { color: C.teal } },
    { text: ".", options: { color: C.white } },
  ], { x: rx + 0.4, y: 2.6, w: rw - 0.8, h: 1.6, margin: 0, fontFace: HEAD, fontSize: 15.5, bold: true, lineSpacingMultiple: 1.15 });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rx, y: 4.5, w: rw, h: 1.55, rectRadius: 0.14, fill: { color: C.cardDark }, line: { color: "2A3354", width: 1 }, shadow: softShadow() });
  iconTile(s, rx + 0.35, 4.8, "🤖", C.teal, 0.6, true);
  s.addText("~30 min risparmiati", { x: rx + 1.1, y: 4.78, w: rw - 1.3, h: 0.4, margin: 0, fontFace: HEAD, fontSize: 15, bold: true, color: C.white });
  s.addText("Un agente AI che prende un CSV e genera bidding custom, tracciando dati e performance (forte con SQL ed Excel).", { x: rx + 0.35, y: 5.25, w: rw - 0.7, h: 0.7, margin: 0, fontFace: BODY, fontSize: 10.5, color: C.whiteMuted, lineSpacingMultiple: 1.1 });

  s.addText("Applicazioni AI citate: analisi conversioni e rischi · tracking cross-device · presentazione dei findings agli stakeholder · validazione del prodotto e mockup.", { x: ML, y: 6.55, w: 11.9, h: 0.5, margin: 0, fontFace: BODY, fontSize: 10.5, italic: true, color: C.whiteFaint });
  footer(s, true, 5);
})();

// =============== PAGE 6 — PROFILI PM ===============
(function () {
  const s = pres.addSlide(); s.background = { color: C.white };
  kicker(s, ML, 0.55, "Insight · 3", C.purple);
  s.addText("I profili degli intervistati", { x: ML, y: 0.87, w: 11.5, h: 0.7, margin: 0, fontFace: HEAD, fontSize: 30, bold: true, color: C.text });

  const pm = [
    ["P1", "Enterprise · Costi & Rischio", ["Copilot per report, gap analysis e sentiment su grandi dataset", "Predictive analytics sui rischi dai dati storici", "Dubbio: l'AI è davvero più economica dell'umano?"]],
    ["P2", "Stakeholder & Documenti", ["Doc e traduzione requisiti via NotebookLM (~4h/sett.)", "Sentiment analysis con Cursor per code review", "Le decisioni restano guidate da cliente e business"]],
    ["P3", "Compliance & Governance", ["Segnala il rischio di riuso dei dati per il training", "Sentiment & stakeholder mgmt affidabili ma vincolati", "Solo ~10% vede benefici; HR = alto rischio"]],
    ["P4", "Sperimentazione & Tooling", ["A/B testing ed experimentation-first", "Automazione report con un solo comando", "Attenzione a non perdere il tocco umano"]],
    ["P5", "Automazione & Comunicazione", ["Forte impatto su drafting di documenti e mail", "Vibe coding: automazioni Python riproducibili", "Impossibile prevedere oltre i 3 mesi"]],
    ["P6", "Yahoo! · Ad-Tech & Agentic AI", ["Agente AI: CSV → bidding custom (~30 min/run)", "AI per conversioni, rischi e tracking cross-device", "\"Usa l'AI sopra l'idea, non per crearla\""]],
  ];
  const cw = 3.83, gap = 0.4, ch = 2.35, x0 = ML, y0 = 1.9;
  pm.forEach((p, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = x0 + col * (cw + gap), y = y0 + row * (ch + 0.3), accent = A[i % 3];
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: cw, h: ch, rectRadius: 0.12, fill: { color: C.cardBg }, line: { color: C.borderLt, width: 1 }, shadow: cardShadow() });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + 0.3, y: y + 0.3, w: 0.62, h: 0.62, rectRadius: 0.1, fill: { color: accent } });
    s.addText(p[0], { x: x + 0.3, y: y + 0.3, w: 0.62, h: 0.62, margin: 0, align: "center", valign: "middle", fontFace: HEAD, fontSize: 15, bold: true, color: C.white });
    s.addText(p[1], { x: x + 1.05, y: y + 0.36, w: cw - 1.25, h: 0.55, margin: 0, valign: "middle", fontFace: HEAD, fontSize: 11, bold: true, color: C.text });
    const bullets = p[2].map((b, j) => ({ text: b, options: { bullet: { code: "2022", indent: 12 }, color: C.muted, breakLine: true, paraSpaceAfter: 5, fontSize: 9.5 } }));
    s.addText(bullets, { x: x + 0.35, y: y + 1.08, w: cw - 0.65, h: ch - 1.25, margin: 0, fontFace: BODY, color: C.muted, lineSpacingMultiple: 1.02 });
  });
  footer(s, false, 6);
})();

// =============== PAGE 7 — SINTESI PER 100FLOWS ===============
(function () {
  const s = pres.addSlide(); bg(s, "dark");
  logoTile(s, ML, 0.8, 0.85);
  s.addText("100flows", { x: ML + 1.05, y: 0.8, w: 5, h: 0.85, margin: 0, valign: "middle", fontFace: HEAD, fontSize: 22, bold: true, color: C.white });
  kicker(s, ML, 2.0, "Cosa significa per 100flows", C.teal);
  s.addText([
    { text: "L'AI non sostituisce il PM. ", options: { color: C.white } },
    { text: "Lo potenzia.", options: { color: C.teal } },
  ], { x: ML, y: 2.35, w: 11.5, h: 1.0, margin: 0, fontFace: HEAD, fontSize: 32, bold: true });

  const take = [
    ["✅", "Valore già reale", "Drafting, stakeholder mgmt e analisi dati sono usi maturi: 100flows li integra come funzioni native."],
    ["🧭", "Human in the loop", "L'AI assiste, il PM decide. Ogni funzione mantiene il controllo umano sulle scelte critiche."],
    ["⚠️", "Colmare i gap", "Risk analytics e agentic AI sono sottoutilizzati: è qui che 100flows può differenziarsi."],
  ];
  const cw = 3.83, gap = 0.4, y = 3.7, h = 2.2, x0 = ML;
  take.forEach((t, i) => {
    const x = x0 + i * (cw + gap);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: cw, h, rectRadius: 0.12, fill: { color: C.cardDark }, line: { color: "2A3354", width: 1 }, shadow: softShadow() });
    iconTile(s, x + 0.35, y + 0.32, t[0], A[i], 0.6, true);
    s.addText(t[1], { x: x + 0.35, y: y + 1.05, w: cw - 0.7, h: 0.4, margin: 0, fontFace: HEAD, fontSize: 14, bold: true, color: C.white });
    s.addText(t[2], { x: x + 0.35, y: y + 1.45, w: cw - 0.7, h: 0.7, margin: 0, fontFace: BODY, fontSize: 10.5, color: C.whiteMuted, lineSpacingMultiple: 1.1 });
  });
  footer(s, true, 7);
})();

pres.writeFile({ fileName: path.join(__dirname, "100flows_Interviste_PM.pptx") })
  .then(f => console.log("written:", f)).catch(e => { console.error(e); process.exit(1); });
