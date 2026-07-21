const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  TableOfContents, PageBreak, Header, Footer, PageNumber, BorderStyle,
  ImageRun, LevelFormat, convertInchesToTwip,
} = require("docx");

// ---- brand ----
const PURPLE = "7C5BDB", BLUE = "4F8EF7", TEAL = "1E86B0", INK = "16161F", SLATE = "3A4358", MUTED = "6B7A99";
const BODY_FONT = "Georgia";
const SANS = "Segoe UI";

const LOGO = path.join(__dirname, "..", "img", "100flows", "logo.png");

// ---- helpers ----
const P = (text, opts = {}) => new Paragraph({
  alignment: AlignmentType.JUSTIFIED,
  spacing: { line: 300, after: 160 },
  children: [new TextRun({ text, font: BODY_FONT, size: 22, color: "1B1B24" })],
  ...opts,
});

// paragraph from an array of runs (for inline emphasis)
const PR = (runs, opts = {}) => new Paragraph({
  alignment: AlignmentType.JUSTIFIED,
  spacing: { line: 300, after: 160 },
  children: runs,
  ...opts,
});
const run = (text, o = {}) => new TextRun({ text, font: BODY_FONT, size: 22, color: "1B1B24", ...o });
const b = (text, o = {}) => run(text, { bold: true, ...o });

const H1 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text })] });
const H2 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text })] });

const QUOTE = (runs) => new Paragraph({
  spacing: { line: 300, before: 80, after: 200 },
  indent: { left: convertInchesToTwip(0.4) },
  border: { left: { style: BorderStyle.SINGLE, size: 18, color: PURPLE, space: 14 } },
  children: runs,
});

const bullet = (text) => new Paragraph({
  numbering: { reference: "dash", level: 0 },
  alignment: AlignmentType.JUSTIFIED,
  spacing: { line: 290, after: 90 },
  children: [new TextRun({ text, font: BODY_FONT, size: 22, color: "1B1B24" })],
});

// ================= TITLE PAGE =================
const logoData = fs.readFileSync(LOGO);
const titlePage = [
  new Paragraph({ spacing: { before: 1600, after: 0 }, children: [
    new ImageRun({ type: "png", data: logoData, transformation: { width: 74, height: 74 } }),
  ]}),
  new Paragraph({ spacing: { before: 120, after: 60 }, children: [
    new TextRun({ text: "100flows", font: SANS, size: 30, bold: true, color: INK }),
  ]}),
  new Paragraph({
    spacing: { before: 40, after: 40 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 20, color: PURPLE, space: 8 } },
    children: [new TextRun({ text: "RICERCA PRIMARIA", font: SANS, size: 17, bold: true, color: PURPLE, characterSpacing: 60 })],
  }),
  new Paragraph({ spacing: { before: 260, after: 60 }, children: [
    new TextRun({ text: "L’intelligenza artificiale nel project management", font: SANS, size: 46, bold: true, color: INK }),
  ]}),
  new Paragraph({ spacing: { after: 40 }, children: [
    new TextRun({ text: "Evidenze da otto interviste a Product Manager", font: SANS, size: 26, color: SLATE }),
  ]}),
  new Paragraph({ spacing: { before: 40, after: 900 }, children: [
    new TextRun({ text: "Documento di ricerca a supporto del progetto di tesi 100flows", font: BODY_FONT, size: 22, italics: true, color: MUTED }),
  ]}),
  new Paragraph({ spacing: { after: 20 }, children: [
    new TextRun({ text: "Luca Buonocore", font: SANS, size: 22, bold: true, color: INK }),
  ]}),
  new Paragraph({ children: [
    new TextRun({ text: "2025", font: SANS, size: 20, color: MUTED }),
  ]}),
  new Paragraph({ children: [new PageBreak()] }),
];

// ================= BODY =================
const body = [];

// --- Sommario ---
body.push(new Paragraph({ spacing: { after: 160 }, children: [
  new TextRun({ text: "Sommario", font: SANS, size: 30, bold: true, color: PURPLE }),
]}));
body.push(new TableOfContents("Sommario", { hyperlink: true, headingStyleRange: "1-2" }));
body.push(new Paragraph({ children: [new PageBreak()] }));

// --- 1. Introduzione ---
body.push(H1("1. Introduzione"));
body.push(P(`Gli strumenti tradizionali del project management — diagrammi di Gantt, PERT, CPM, livellamento manuale delle risorse — sono nati per progetti lineari e prevedibili. I team che sviluppano software oggi, al contrario, lavorano in contesti tutt’altro che lineari: più team in parallelo, priorità che cambiano di settimana in settimana, una quantità di dati che nessun foglio di calcolo riesce più a contenere. Ne deriva un divario crescente tra la complessità reale dei progetti e la capacità degli strumenti di governarla. È in questo spazio che l’intelligenza artificiale si propone come leva di cambiamento.`));
body.push(P(`La letteratura accademica documenta ampiamente il potenziale dell’AI applicata al project management. La letteratura, però, dimostra che un problema esiste: non che le persone lo vivano davvero, ogni giorno, sul lavoro. Per colmare questa distanza ho affiancato allo studio bibliografico una ricerca primaria — otto interviste in profondità con Product Manager che utilizzano quotidianamente strumenti di AI. L’obiettivo non era misurare, ma comprendere: dove l’AI crea già valore concreto, con quali strumenti, e soprattutto dove mostra ancora limiti, rischi e resistenze.`));
body.push(P(`Questo documento raccoglie e discute gli esiti di quelle conversazioni. Non è un elenco di funzionalità desiderate, ma una fotografia di come professionisti esperti stanno realmente integrando l’AI nel proprio flusso di lavoro. Le evidenze qui riportate hanno guidato in modo diretto le scelte di prodotto di 100flows: ogni funzione della piattaforma nasce da un bisogno osservato sul campo, non da un’ipotesi teorica.`));

// --- 2. Metodo e campione ---
body.push(H1("2. Metodo e campione"));
body.push(P(`Le interviste hanno coinvolto otto Product Manager appartenenti a sei organizzazioni diverse, tra grandi aziende tecnologiche e centri di ricerca: Amazon, Microsoft, Fondazione Bruno Kessler (FBK), Workday, Yahoo! e Salesforce. La scelta di un campione eterogeneo — realtà enterprise e di ricerca, prodotti consumer e piattaforme B2B — risponde all’esigenza di osservare l’adozione dell’AI in contesti con vincoli, maturità tecnologica e culture del dato molto diversi tra loro. Ciò che vale in una piattaforma pubblicitaria che tratta enormi volumi di dati consumer non vale necessariamente in un centro di ricerca vincolato da requisiti di conformità, e viceversa.`));
body.push(P(`Ho adottato un formato semi-strutturato: una traccia comune di domande su come e dove impiegano l’AI, con quali strumenti, quali benefici percepiscono e quali preoccupazioni nutrono, lasciando però a ciascun intervistato lo spazio per approfondire i temi più rilevanti per il proprio ruolo. Le risposte sono state poi analizzate e codificate, individuando da un lato gli use-case ricorrenti — gli ambiti in cui più persone, indipendentemente, riconoscono valore — e dall’altro le preoccupazioni trasversali. Sono queste due dimensioni a costituire l’ossatura del documento.`));

// --- 3. Dove l'AI crea valore ---
body.push(H1("3. Dove l’intelligenza artificiale crea già valore"));
body.push(P(`Dalle interviste emergono otto ambiti applicativi ricorrenti. Non tutti hanno lo stesso grado di maturità: alcuni sono ormai parte stabile del lavoro quotidiano, altri sono percepiti come promettenti ma ancora poco sfruttati. Li presento raggruppati per aree di valore, dalla più consolidata alla più emergente.`));

body.push(H2("3.1 Comunicazione e documentazione"));
body.push(P(`Il caso d’uso su cui esiste il consenso più netto è la produzione di testi: documenti, report ed email. Quasi tutti gli intervistati indicano la scrittura assistita come l’ambito a più alto impatto immediato, e non solo per il risparmio di tempo. Il beneficio percepito è anche qualitativo: un lessico più ricco, una struttura più chiara, una maggiore coerenza nelle comunicazioni rivolte agli stakeholder. In un ruolo dove buona parte della giornata si consuma in aggiornamenti di stato e riepiloghi, questo si traduce in ore concrete restituite al lavoro strategico.`));
body.push(P(`Strettamente collegata è la gestione degli stakeholder. Più di un intervistato usa l’AI per tradurre requisiti tecnici in un linguaggio comprensibile a chiunque e per sintetizzare KPI in comunicazioni pronte per la decisione. Uno di loro cita l’uso di NotebookLM per la stesura di user story e documentazione, stimando un risparmio dell’ordine di quattro ore alla settimana. È un dato indicativo di come, in questo ambito, l’AI non sostituisca il giudizio del PM ma ne amplifichi la capacità comunicativa.`));

body.push(H2("3.2 Analisi e comprensione dei dati"));
body.push(P(`Un secondo blocco di valore riguarda la lettura dei dati. La sentiment analysis è considerata affidabile proprio perché, in fondo, è analisi di testo — un compito su cui i modelli linguistici eccellono. Strumenti come Copilot e Cursor vengono impiegati per interpretare segnali provenienti dal team e dal codice, con la consapevolezza, però, che negli ambienti regolati permangono vincoli di conformità da rispettare.`));
body.push(P(`Più in generale, l’interrogazione e l’analisi dei dati è percepita come un ambito ad alto ritorno. Diversi PM raccontano di usare l’AI per esplorare grandi dataset — correggere codice, individuare bug, condurre gap analysis, far emergere tendenze dei clienti — in una frazione del tempo che richiederebbe l’analisi manuale. È soprattutto sui progetti a forte densità di dati che questo beneficio si fa evidente.`));

body.push(H2("3.3 Automazione e prototipazione"));
body.push(P(`Il terzo blocco riguarda l’automazione delle attività ripetitive. È qui che compare l’espressione “vibe coding”: la costruzione, spesso in Python, di piccole automazioni su misura con output costante e riproducibile, che liberano il PM da compiti meccanici. Un dettaglio ricorrente e interessante è il ruolo del logging: registrare in modo sistematico ciò che accade fornisce al modello un contesto più ricco, migliorando progressivamente la qualità delle risposte.`));
body.push(P(`Sul fronte della prototipazione, l’AI accelera la preparazione dei mockup e rende più chiare le spiegazioni verso gli ingegneri. Emerge una mentalità “experimentation-first”: cicli di A/B testing più rapidi, feedback qualitativi ottenuti prima, iterazioni più frequenti. La velocità con cui si passa dall’idea alla verifica è, per più di un intervistato, uno dei guadagni più tangibili.`));

body.push(H2("3.4 Previsione e gestione del rischio"));
body.push(P(`Un caso a sé è quello dell’analisi predittiva applicata al rischio. Sulla carta è uno degli usi più promettenti: sfruttare i dati storici per anticipare colli di bottiglia e sforamenti di budget prima che diventino problemi. Nella pratica, però, gli stessi intervistati che ne riconoscono il valore ammettono che resta ancora poco sfruttato. È un paradosso significativo: l’ambito in cui l’AI potrebbe fare la differenza più grande — spostare il project management da reattivo a proattivo — è anche quello meno presidiato. Proprio in questo scarto tra potenziale e adozione si colloca una delle opportunità più chiare per 100flows.`));

body.push(H2("3.5 L’ascesa dell’agentic AI"));
body.push(P(`L’ottavo ambito è anche il più recente: l’agentic AI. Non si tratta più di uno scenario futuro. Alcuni PM stanno già costruendo i propri agenti — sistemi che non si limitano a rispondere, ma eseguono compiti in autonomia. L’esempio più compiuto emerso dalle interviste è quello di un Product Manager di Yahoo!, a cui è dedicato l’approfondimento del capitolo successivo. È il segnale che la frontiera si sta spostando dall’AI come assistente conversazionale all’AI come collaboratore operativo.`));

// --- 4. Limiti e preoccupazioni ---
body.push(H1("4. I limiti e le preoccupazioni"));
body.push(P(`Accanto agli entusiasmi, le interviste restituiscono un quadro maturo e consapevole dei limiti. Nessuno degli intervistati descrive l’AI come una soluzione risolutiva; tutti, al contrario, ne segnalano rischi concreti. Ho raggruppato le otto preoccupazioni ricorrenti in quattro temi.`));

body.push(H2("4.1 Economia e maturità"));
body.push(P(`La prima incertezza è economica: non è ancora chiaro se l’AI sia davvero più conveniente del lavoro umano su larga scala. A questa si lega la percezione di una maturità ancora embrionale della tecnologia: promettente, ma acerba, e soprattutto dipendente dalla qualità dei dati — senza dati strutturati e affidabili, gli output perdono valore. Non stupisce che, secondo alcuni intervistati, solo una minoranza delle aziende — nell’ordine del dieci per cento — stia oggi ottenendo benefici realmente misurabili.`));

body.push(H2("4.2 Sicurezza, contesto e ambiti ad alto rischio"));
body.push(P(`Il secondo tema è la sicurezza dei dati aziendali: il timore che gli input forniti ai modelli possano essere riutilizzati per l’addestramento rappresenta un freno concreto all’adozione, in particolare negli ambienti regolati. Vi si aggiunge il problema del contesto — l’AI fatica quando non dispone di informazioni sufficienti a inquadrare il compito — e la delicatezza di alcuni ambiti applicativi. La selezione del personale e le decisioni di compliance vengono citate come casi in cui l’uso dell’AI è particolarmente rischioso. Non a caso, un intervistato richiama il PMBOK nella sua settima edizione come riferimento della posizione ufficiale del Project Management Institute sul tema.`));

body.push(H2("4.3 Il quadro normativo"));
body.push(P(`Sul piano regolatorio emerge la percezione di un’Europa in ritardo, vista come più lenta sia sul fronte dell’adozione tecnologica sia su quello della legislazione. È un elemento di contesto rilevante per una tesi sviluppata in ambito europeo: l’incertezza normativa influenza le scelte di adozione tanto quanto la maturità tecnica.`));

body.push(H2("4.4 Il ruolo umano e la prospettiva futura"));
body.push(P(`Il tema più trasversale è il ruolo dell’essere umano. Su questo gli intervistati sono concordi: l’AI è un assistente, non un sostituto, e la decisione finale deve restare al Product Manager. È il principio del “human in the loop”, che ricorre in quasi tutte le conversazioni. Quanto al futuro, prevale una cauta consapevolezza: l’agentic AI è ormai una realtà, ma prevederne l’impatto oltre un orizzonte di pochi mesi è considerato semplicemente impossibile. L’unica certezza condivisa è che l’influenza dell’AI sul lavoro dei knowledge worker continuerà a crescere.`));

// --- 5. Caso Yahoo ---
body.push(H1("5. Approfondimento: il caso Yahoo! e la frontiera agentica"));
body.push(P(`Tra le otto conversazioni, l’intervista con un Product Manager di Yahoo! attivo nell’ad-tech merita un approfondimento a parte, perché illustra in modo concreto sia l’uso maturo dell’AI sia la sua nuova frontiera agentica.`));
body.push(P(`Il contesto è quello della pubblicità digitale: trovare nuovi modi per generare conversioni, migliorare il targeting sia online sia offline, tracciare chi ha effettivamente visto un annuncio. È un ambito che vive di partnership e di condivisione continua dei dati — comprese realtà con punti vendita fisici — e che richiede un lavoro stretto con il team di data science per costruire e ripulire i modelli.`));
body.push(P(`Un passaggio tecnico illuminante riguarda la scelta del modello. Per obiettivi diversi servono modelli diversi: da un lato un modello personalizzato, tarato sul singolo utente e sul contesto — ad esempio sulle smart TV — dall’altro un modello più generale e contestuale. In un test A/B le due strade mostravano performance simili; a fare la differenza è stato un sistema a pesi, che ha finito per privilegiare il modello contestuale. È un esempio di come la decisione non nasca dal solo dato, ma dall’interpretazione che il PM ne dà. Sul versante della gestione economica, l’intervistato descrive un meccanismo di budget pacing: il budget è definito dall’utente e la piattaforma lo mantiene disponibile distribuendolo in modo proporzionale sull’intero periodo della campagna.`));
body.push(P(`È però sul tema dell’agentic AI che l’intervista offre il contributo più originale. Il PM ha costruito in prima persona un agente capace di prendere in input un file CSV e generare una strategia di bidding personalizzata, tracciando automaticamente dati e performance — un lavoro che si integra bene con SQL ed Excel per tenere traccia dei risultati. Il beneficio stimato è nell’ordine dei trenta minuti risparmiati per esecuzione, con il vantaggio, non secondario, di potersi concentrare sulle cose giuste. La sua sintesi sul modo corretto di usare questi strumenti è tra le più nette raccolte in tutta la ricerca:`));
body.push(QUOTE([
  new TextRun({ text: `“Usa l’AI `, font: BODY_FONT, size: 22, italics: true, color: SLATE }),
  new TextRun({ text: `sopra`, font: BODY_FONT, size: 22, italics: true, bold: true, color: PURPLE }),
  new TextRun({ text: ` l’idea, non per `, font: BODY_FONT, size: 22, italics: true, color: SLATE }),
  new TextRun({ text: `creare`, font: BODY_FONT, size: 22, italics: true, bold: true, color: PURPLE }),
  new TextRun({ text: ` l’idea. Deve essere human-thinking, not replying.”`, font: BODY_FONT, size: 22, italics: true, color: SLATE }),
]));
body.push(P(`L’AI, in altre parole, va posta al di sopra dell’intuizione umana per potenziarla, non al suo posto per generarla. Coerentemente, l’intervistato elenca gli usi analitici che ne fa — analisi di conversioni e rischi, tracciamento delle conversioni cross-device, presentazione dei risultati agli stakeholder, validazione del prodotto e dei mockup — mantenendo sempre il controllo sul giudizio finale. Chiude con un’osservazione che vale come monito: i problemi di un modello tendono a emergere solo in produzione, quando il prodotto non performa. Lavorare a stretto contatto con il team di data science è ciò che permette di accorgersene in tempo.`));

// --- 6. Profili ---
body.push(H1("6. I profili degli intervistati"));
body.push(P(`Per quanto le evidenze più solide nascano dalla lettura trasversale delle interviste, può essere utile richiamare in sintesi la prospettiva di ciascun intervistato, che riflette la specificità del suo ruolo.`));
body.push(PR([b("PM 1 — Enterprise, costi e rischio. "), run(`Usa Copilot per report, gap analysis e sentiment su grandi dataset, e applica l’analisi predittiva per far emergere i rischi dai dati storici. La sua domanda aperta è di natura economica: l’AI è davvero più conveniente del lavoro umano su scala enterprise?`)]));
body.push(PR([b("PM 2 — Stakeholder e documentazione. "), run(`Impiega NotebookLM per documenti e traduzione dei requisiti, con un risparmio stimato di circa quattro ore a settimana, e Cursor per la sentiment analysis in fase di code review. Ricorda però che le decisioni strategiche restano guidate dall’interazione con clienti e business, non dall’AI.`)]));
body.push(PR([b("PM 3 — Compliance e governance. "), run(`Pone l’accento sui rischi: il possibile riuso degli input per l’addestramento, la conformità come vincolo, il fatto che solo una minoranza di aziende ottenga benefici reali. Indica la selezione del personale come ambito ad alto rischio e cita il PMBOK come riferimento.`)]));
body.push(PR([b("PM 4 — Sperimentazione e tooling. "), run(`Adotta una mentalità experimentation-first fondata sull’A/B testing, automatizza la generazione dei report con un singolo comando e velocizza i mockup. Mette in guardia dal rischio di perdere il tocco umano e di sviluppare un’eccessiva dipendenza dallo strumento.`)]));
body.push(PR([b("PM 5 — Automazione e comunicazione. "), run(`Ottiene l’impatto maggiore nella stesura di documenti e email e nel vibe coding, con automazioni Python dall’output costante. Osserva che prevedere l’impatto dell’AI oltre i tre mesi è impossibile, ma che la sua influenza sui knowledge worker è destinata a crescere.`)]));
body.push(PR([b("PM 6 — Yahoo!, ad-tech e agentic AI. "), run(`Ha costruito un agente che genera bidding personalizzato a partire da un CSV, risparmiando tempo e tracciando le performance. È l’autore del principio “usa l’AI sopra l’idea, non per crearla”, e ricorda che i problemi dei modelli emergono solo in produzione.`)]));

// --- 7. Sintesi per 100flows ---
body.push(H1("7. Sintesi: implicazioni per 100flows"));
body.push(P(`Letta nel suo insieme, la ricerca converge su un principio di fondo che è diventato la tesi di prodotto di 100flows: l’intelligenza artificiale non sostituisce il Product Manager, lo potenzia. È il concetto di Augmented Project Management — l’AI assorbe il carico computazionale, amministrativo e analitico, liberando il PM perché operi a un livello più strategico, empatico e decisionale.`));
body.push(P(`Da questo principio discendono tre implicazioni concrete per la piattaforma. La prima: il valore è già reale. La scrittura assistita, la gestione degli stakeholder e l’analisi dei dati sono usi maturi e ad alto consenso; è corretto che 100flows li integri come funzioni native, non come sperimentazioni. La seconda: l’essere umano resta al centro. Poiché tutti gli intervistati rivendicano il controllo sulla decisione finale, ogni funzione della piattaforma deve preservare il principio del human in the loop, proponendo e non imponendo. La terza: le opportunità più grandi stanno nei gap. L’analisi predittiva del rischio e l’agentic AI sono ambiti riconosciuti come preziosi ma ancora poco sfruttati; è esattamente qui che 100flows può differenziarsi in modo credibile, portando in un prodotto accessibile ciò che oggi solo pochi PM costruiscono artigianalmente per sé.`));

// --- 8. Conclusioni ---
body.push(H1("8. Conclusioni"));
body.push(P(`Le otto interviste confermano che l’adozione dell’AI nel project management non è più una promessa, ma una pratica quotidiana — disomogenea, consapevole dei propri limiti, eppure già capace di restituire tempo e qualità. La ricerca primaria ha aggiunto alla letteratura ciò che le fonti secondarie non potevano offrire: la voce di chi usa questi strumenti ogni giorno, con i suoi entusiasmi e le sue cautele. È su questa voce, più che su qualsiasi ipotesi teorica, che 100flows costruisce la propria proposta: una piattaforma che non promette di sostituire il Product Manager, ma di renderlo capace di non dover mai più tirare a indovinare.`));

// ================= DOCUMENT =================
const doc = new Document({
  creator: "Luca Buonocore",
  title: "L'intelligenza artificiale nel project management — Interviste ai PM",
  styles: {
    default: {
      document: { run: { font: BODY_FONT, size: 22, color: "1B1B24" } },
    },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: SANS, size: 30, bold: true, color: PURPLE },
        paragraph: { spacing: { before: 360, after: 140 }, outlineLevel: 0, keepNext: true } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: SANS, size: 24, bold: true, color: INK },
        paragraph: { spacing: { before: 220, after: 80 }, outlineLevel: 1, keepNext: true } },
    ],
  },
  numbering: {
    config: [{
      reference: "dash", levels: [{
        level: 0, format: LevelFormat.BULLET, text: "–", alignment: AlignmentType.LEFT,
        style: { run: { color: PURPLE }, paragraph: { indent: { left: 360, hanging: 220 } } },
      }],
    }],
  },
  sections: [
    // Title page — no header/footer
    {
      properties: { page: { margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } },
      children: titlePage,
    },
    // Body — header + footer with page numbers
    {
      properties: { page: { margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } },
      headers: { default: new Header({ children: [new Paragraph({
        alignment: AlignmentType.RIGHT,
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "D8DCE8", space: 6 } },
        children: [new TextRun({ text: "100flows · Interviste ai Product Manager", font: SANS, size: 15, color: MUTED })],
      })] }) },
      footers: { default: new Footer({ children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [ new TextRun({ font: SANS, size: 16, color: MUTED, children: [PageNumber.CURRENT] }) ],
      })] }) },
      children: body,
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  const out = path.join(__dirname, "100flows_Interviste_PM_Report.docx");
  fs.writeFileSync(out, buf);
  console.log("written:", out);
});
