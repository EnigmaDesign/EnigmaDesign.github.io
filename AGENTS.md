# Portfolio — Project Memory

> **Source of truth = the résumé (`Luca_Buonocore_Resume.pdf`) + LinkedIn, both current as of Jul 2026.** The site copy (case-study HTML) is OUTDATED and lags behind them — when they conflict, the résumé/LinkedIn win. Portfolio pages still cover only 3 case studies; the résumé now has more (see "Full résumé timeline").

Personal portfolio of **Luca Buonocore**, aspiring **Product Manager — AI × Product** (résumé title: *Associate Product Manager | AI × Product*).
Static site, **vanilla HTML/CSS/JS** (no framework, no build step).
Repo: `luca-buonocore/luca-buonocore.github.io` — **GitHub Pages, deploys directly from `master`**.

## Files
- `index.html` — homepage (nav, hero+typewriter, Introduction & Experience, Projects slider, Education, Skills grid, Languages, Certifications, footer)
- `groove.html`, `skillforge.html`, `100flows.html` — case studies (each self-contained: own `<style>`, own tiny inline `<script>` where needed)
- `style.css` — homepage styles only; `script.js` — homepage only (typewriter, cert slider, lang switcher, fade-up observer)
- `img/` — assets; `Luca_Buonocore_Resume.pdf` — linked from hero "View my Resumé" button

## Who Luca is (for copy)
- B.Sc. Computer Science (Engineering), University of Trento, Sep 2022 – **Mar 2027 (expected)**. Coursework: Information Systems, Software Engineering, Computer Networks, Machine Learning.
- Positioning: **1.5+ years of hands-on 0→1 experience**; framing = turning user research into prioritized roadmaps. LinkedIn headline: *"Product Manager | AI × Product | Led team to a €100K-conditional-funded MVP."* Based in **Borgo Virgilio (Mantua province)**, Lombardy.
- LinkedIn writing voice (for reference): punchy, contrarian first-person hooks — *"Everyone else is just building a faster way to be wrong."* Confident, opinionated, uses arrows (▸) and short lines. Useful tone reference, but the site copy stays decision-oriented, not clickbait.
- Certs: Microsoft AI Product Management, PMI Generative AI for PMs, PMI Practical AI for PMs. **CAPM = exam pending / NOT earned yet** — never write "earned the CAPM".
- Based in Mantua, open to relocation (Italy & EU). **EU Citizen (no visa sponsorship required).** Email `lucabuonocore.03@gmail.com`, phone `+39 345 960 3238`, LinkedIn `/in/lucabuonocore`, site `lucabuonocore.github.io`.
- Languages: Italian (native) · English **C1 working proficiency, B2 certified** · French (A2 / basic). Note: the UniTrento English exam caps at **B2** (that's the only formal attestation Luca has), but his actual level is higher (~C1/C2). So framing is settled: résumé/site say **C1** as self-assessed working proficiency, and **B2** is listed as the certificate. Not a contradiction — don't "correct" C1 down to B2.
- Tools/tech: Figma, Jira, Notion, Trello, MS Project, Google Analytics, Office Suite · Python, SQL, ML fundamentals, prompt engineering, ChatGPT, GitHub Copilot, React, Java, JavaScript, HTML/CSS.
- Aggregate track record: **850+ survey respondents · 33+ interviews · 3 ventures · €100K funding offer**.

## Full résumé timeline (source of truth — includes items NOT yet on the site)
- **AI in Product Management — Research | University of Trento** · Dec 2025 – Present. 250-hour research internship; this is the **100flows** work formalized. 60+ papers, 8 PM interviews (Amazon, Microsoft, FBK, Salesforce, **SumUp**, Yahoo!, Workday), 5 PM domains. Built a multi-agent prototype for project-risk analysis, validated with the interviewed PMs.
- **Program Manager Intern | APSS** (Provincial Healthcare Services Agency) · Apr – Aug 2025. **Now a full Work Experience entry on the site** (text-forward, no mockups). Coordinated a multi-vendor IT infrastructure renewal across **17 healthcare facilities** (budget, dependencies, supplier delivery); Gantt + critical-path analysis, weekly stakeholder reporting; introduced Agile ceremonies when static Gantt tracking couldn't absorb shifting priorities, raising security-compliance standards.
- **Co-Founder & Head of Product | Groove** · Feb 2024 – Feb 2025. (case study on site)
- **Product Discovery Lead | SkillForge** · Dec 2023 – Feb 2024. (case study on site)
- **FitGYM44 — Fitness SaaS (University Software Engineering project)** · Sep 2023 – Feb 2024, **final grade 28/30**. **Decision: NOT going on the site** (résumé-only). Project Lead of a 3-person Scrum team (daily stand-ups, sprint planning) across 5 sequential deliverables; 30+ functional requirements, user stories, test scenarios; full UML/OCL spec for a 9-module architecture (135+ pages); contributed to UI/UX.
- Other (LinkedIn only, minor — likely intentionally off the PM résumé): Shop Assistant @ Coop Alleanza 3.0 (Aug 2024, HACCP); High School @ Istituto "Enrico Fermi" Mantova (Computer Science, 2017–2022).
- SkillForge detail from LinkedIn: cross-title research across **League of Legends, Valorant, Rainbow Six**; certs total **6** on LinkedIn (incl. Microsoft AI Product Manager, credential ID X7BW6VG23EQ9).

## The 3 case studies (real facts — don't invent)
- **Groove** (Feb 2024 – Feb 2025) — Co-Founder & Head of Product. 9-person cross-functional team (eng/design/marketing). Discovery platform verticalized on venues (AI nightlife discovery). Survey 500+ (72% pain). Concept → **shipped MVP pitched to investors**. Validated with a **Wizard-of-Oz test, 15 testers** (manual curation ahead of the AI engine), decision time ~30min→~5 (−80%). **€100K conditional offer from private angel investors introduced by a university professor**. Has a Figma animation (not exportable yet — pending screen recording).
- **SkillForge** (Dec 2023 – Feb 2024) — solo product discovery, e-sports coaching marketplace. 350 surveyed, 25 interviews, 64% priced out. Coaching **€150–250/hr** vs. players' willingness to pay. **4× addressable market**; business model built around **retired (vs. active) pro players → +20% estimated content margins** (lower creator-acquisition cost). **Halted before build** after a cost-benefit analysis showed unfavorable unit economics — resource efficiency over sunk-cost momentum.
- **100flows** — solo; now the **250h research internship** (see timeline). Research: **60+ papers, 8 PM interviews** (Amazon, Microsoft, FBK, Salesforce, SumUp, Yahoo!, Workday), 5 PM domains, 10+ platforms analysed. Paradigm = "Augmented PM". **Design/prototype stage — NOT a shipped/working product.** Literature metrics (−50% cycle, −72% overhead, 350h, 3.6×) must be labeled **"what the research says", not product results**. The **multi-agent AI risk-analysis prototype** (reasoning under uncertainty) is built and validated with the interviewed PMs.

## Redesign (Jul 2026) — decisions LOCKED (after 2 wrong turns; read carefully)
- Reference/vibe: Behance gallery by Damla Gokmen — **big BOLD grotesque type**, **numbered case studies** (number on top / project name below, black bold), **mockup-driven**, Overview/Process/Impact per project, one long scroll.
- **SINGLE PAGE. No navbar. No links to other HTML pages** — everything inline in `index.html`. The old `groove.html`/`skillforge.html`/`100flows.html` are now ORPHANED → to be **deleted** once inline copy is finalized. External contact links (email, LinkedIn, WhatsApp, Résumé PDF) are fine.
- **Palette = CONSISTENT LIGHT, do NOT alternate light/dark bands** (Luca explicitly rejected alternation; the reference doesn't alternate). Ground `#f5f6f8`, near-black ink, peach `#e8863f` + blue accents used sparingly. (If Luca ever says "make it dark like the example", flip the whole thing to consistent dark — easy.)
- **Font = Archivo** (weights to 900) — a heavy Helvetica-ish grotesque to match the reference. NOT Sora, NOT the AI-default Inter/Space Grotesk.
- **Structure (résumé-mirrored, single scroll, grey top-border divider between EVERY section)**: hero (light, huge Archivo name + sub with the stats woven into the prose — NO stat-tiles, NO line-art) → About Me (narrative ONLY — no photo, no Skills/Education here) → **Work Experience** (01 Groove · 02 APSS · 03 100flows — strongest-first per the video analysis, NOT reverse-chronological; Groove leads because it's the concrete funded MVP with the gallery) → **Projects** (01 SkillForge) → Details (Skills · Education · Certifications · Languages · Based, stacked full-width) → Contact.
- **Case studies**: only **Groove** carries mockups — a Hi-Fi/Lo-Fi phone slider (fidelity list below). **100flows, APSS and SkillForge are text-forward** (Overview/Process/Impact style). 100flows mockups were **REMOVED** — the dashboard screenshots looked bad shrunk/cropped, Luca said take them out. Copy for 100flows & SkillForge is enriched from the original `100flows.html`/`skillforge.html` (they hold the richer "based on YT videos" content — good source; KEEP those files until Luca confirms, then delete the orphans).
- **No company-logo chips** (Luca called them "horrible") — interviewed companies (Amazon, Microsoft, FBK, Salesforce, SumUp, Yahoo!, Workday) go as TEXT inside the 100flows case study.
- **Copy rules from Luca**: NO bold (`<strong>`) inside body paragraphs; weave key numbers into the prose, not as detached stat-tiles. Stats live woven into the hero description.
- **Groove screen fidelity (for the Hi-Fi/Lo-Fi slider)**: HI-FI (colour) = `Home, Home2, Home3, Home4, Evento, Evento-1, Evento-2, Evento-3` (Home1/Home1-1 are dupes of Home). LO-FI (B&W wireframes) = `Homepage - Search, Mappa, Locale, Gruppo Eventi, Biglietti, Vista Biglietto, Scan, Profilo, Sign-up, Evento_LoFi`. `fantasia.png`/`mockup.png`/`Free_Duct_Tape_Mockup_3.png`/`groove-logo.png` are brand assets, NOT app screens.
- **100flows screenshots** had baked-in whitespace + a cyan glitch (Kanban) and an outer glow (Calendar) → cropped to `img/100flows/kanban-board.png` and `img/100flows/ai-meeting.png` (originals kept). Display filled via `object-fit:cover` in a 16/10 frame.
- **Final "Details" section** = stacked full-width rows (label left / content right): Skills · Education · Certifications · Languages · Based. NOT columns side-by-side, NOT under the About photo.
- Constraint reminder: vanilla HTML/CSS/JS, no build; images kebab-case; honesty labels intact (100flows = research/in-progress, CAPM pending, English C1 self / B2 certified). Verify locally via `python -m http.server` — in-app screenshots time out.

## Design & content conventions (Luca's taste — follow strictly)
- **5-act arc** per case study with numbered section labels: `01 — The Problem` → `02 — Research & Insight` → `03 — Solution & Process` → `04 — Impact` → `05 — Reflection` (adapt when a project was halted / is unfinished).
- **First-person, decision-oriented voice**: "I bet on…", "I decided…", "the trade-off was…". Center Luca, not the product (it's a portfolio, not a product ad) — but keep the entrepreneurial angle.
- **Honesty is non-negotiable**: label research/literature figures as such; say "in progress" not "shipped"; distinguish what Luca did ("I") from team work.
- **Aesthetic NOs**: no walls of identical cards (vary: clean lists w/ dividers, 2-col text w/ vertical rule, tables); no pill/tag rows ("ovalini"); no giant white bordered boxes; no fake `#` links (use plain text); no tool-pill blocks.
- **US English**, consistent. Bold only the few key facts, don't over-bold.
- **Image filenames: kebab-case**, no spaces or `+` (they break on Pages).
- **Dedupe**: never repeat the same stat across many sections; keep numbers in one canonical place.

## Tech environment (Windows + Git Bash)
- Python: `/c/Python311/python.exe` — has `pypdf`, `reportlab`, `PIL`, `pypdfium2`. (`python-docx` NOT installed.)
- **`gh` CLI is NOT installed** → cannot open PRs. This is a Pages repo → **commit + push directly to `master`** (that's the deploy). Commit/push only when asked.
- **In-app browser preview screenshots time out** on these pages → verify via `grep` / `read_page` / `javascript_tool` (computed styles), not screenshots. Serve locally with `python -m http.server` for checks.
- Extract DOCX text via zipfile: regex `<w:t(?: [^>]*)?>(.*?)</w:t>` (note: `<w:t[^>]*>` wrongly matches `<w:tblPr>` etc.). PDF text: `pypdf` with a UTF-8 stdout wrapper.

## Video analysis (ANALIS_1.PDF, Jul 2026) — 7 PM-portfolio videos → applied & pending
- Luca's own PDF analyzing 7 YouTube PM-portfolio videos (I can't watch video; the PDF is the source). Confirmed strengths: Overview→Process→Impact structure, quantified metrics, the SkillForge "conscious stop", honest tone, actionable contact.
- **Applied**: Groove-first ordering; a **"View projects" CTA** (curved bob arrow) under About instead of a navbar (Luca rejected a navbar); an **anonymized interview quote** added to 100flows ("Use AI above the idea, not to create the idea…" — from the Yahoo!/ad-tech PM, kept anonymous); 100flows copy enriched from the thesis interview report.
- **In progress**: UX designer is **exporting a VIDEO of the Figma prototype** (Groove) → to embed as `<video>` in the Groove case study (dynamic artifact, addresses "clickable prototype" weakness). 100flows "Augmented PM" artifact still pending.
- **Product teardowns = DROPPED**: Luca's SumUp PM contacts advised **focusing on case studies over teardowns**, so we're not adding teardowns. Two-gallery Hi-Fi/Lo-Fi split also declined (single toggle kept).
- **SumUp = CONFIRMED interviewed** (7 companies is correct: Amazon, Microsoft, FBK, Salesforce, SumUp, Yahoo!, Workday). The thesis report `100flows_Interviste_PM_Report.pdf` just omitted it. Discrepancy resolved.
- **Source material for 100flows**: `C:\Users\Luca\OneDrive\Documents\Uni\Tesi\` — esp. `100flows_Interviste_PM_Report.pdf` (8 PM interviews, quotes, findings) and thesis chapters.

## Open / pending
- **Google Maps camper teardown** (next case study, in progress): strong research doc exists (market, EU 4.25t B-license tailwind, competitor teardown, "Hierarchy of Trust", solution guidelines). Still needs: primary validation, a **data-sourcing strategy** (where Google gets road dimension data), explicit "why Google", MVP prioritization, success metrics. Distill into the 5-act arc, in English.
- Groove Figma animation → embed as `<video>` (autoplay/muted/loop) once Luca provides the file.
