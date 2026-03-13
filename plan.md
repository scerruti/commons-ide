# THE COMMONS IDE: PLAN TO SPRINT 1

**Status:** Pre-development. Documentation phase complete. Building starts here.
**Hard deadline:** June 2026 (~13 weeks from March 13, 2026)
**Goal of this document:** Define what we know, what we still need to decide, and what the first sprint builds.

---

## 1. WHERE WE STAND

### Documentation Complete ✅
| Document | Purpose |
|---|---|
| [README.md](README.md) | Public-facing project introduction for GitHub |
| [blueprint.md](blueprint.md) | Full vision, stakeholders, architecture, costs, failure modes |
| [user-stories.md](user-stories.md) | Stories across 9 personas |
| [motivation.md](motivation.md) | Origin email and Trinket context |
| [LICENSE](LICENSE) | MIT |

### What the Docs Give Us
- Five concrete **acceptance criteria** (the Trinket bar)
- Honest **dependency and cost analysis**
- Clear **MVP scope signal**: the core loop is edit → run → output, with save/share as the minimum viable product. Reflection, Gemini, and Gallery are enhancements.
- Identified **one critical open risk**: Pyodide + Pygame rendering in a browser sandbox — this has never been validated in our specific deployment context (Apps Script HTML Service).

### What the Docs Don't Give Us
- No technical decisions made (editor library, file format, folder structure)
- No UI layout or wireframe
- No repo structure
- No test plan against the acceptance criteria
- No confirmation that the core technical bets (Pyodide in Apps Script, Turtle/Pygame in a sandboxed iframe) actually work

---

## 2. MVP SCOPE

The MVP is the minimum that **passes all five acceptance criteria** and can be handed to a classroom on June 1, 2026. Everything else is an enhancement.

### In MVP
| Feature | Acceptance Criterion it satisfies |
|---|---|
| Apps Script serves the IDE page | Fast boot (< 5s) |
| Code editor in browser | Zero barrier to start |
| Pyodide executes Python locally | Fast run; no server cost |
| Turtle and Pygame graphics render | Large graphics window |
| Auto-save to Google Drive | Online save |
| Shareable view-only link | Online share |
| Google Classroom assignment integration | Zero barrier to start |
| Browser compatibility check on load | Failure mode mitigation |
| localStorage auto-save buffer (30s) | Failure mode mitigation |

### Not In MVP (Post-June)
- Reflection Layer / student annotations
- Gemini Pulse Check
- Gallery / Exhibition Mode
- Peer Reflections
- Bundle submission format
- LTI 1.3 / Path B

### Borderline (decide in Sprint 0)
- Teacher rubric definition — a simple rubric display may be low-effort and high-value for teachers evaluating the tool
- Submission to Google Classroom — required for classroom use but may be deliverable as v1.1 if time-constrained

### In MVP Window but Post-Sprint 1 (Sprint 2–3)
- **Instructions Panel** — collapsible left pane rendering teacher-authored markdown alongside the editor. Default-closed; opens automatically when a Starter Project includes instructions. See [wireframe.md](wireframe.md) for layout and spec.
- **`@ANCHOR` system** — plain Python comments (`# @ANCHOR: step-name`) that instructions can hyperlink to. Clicking scrolls the editor to that line with a brief highlight. Degrades gracefully if anchor is deleted by student. See [wireframe.md](wireframe.md) for full design rules.
- **Starter Projects** — teacher-authored project templates bundling starter code, an instructions markdown file, and optionally a rubric. Distributed as a shareable link; student opens it and gets a pre-populated editor with the instructions panel open.

---

## 3. OPEN DECISIONS (MUST RESOLVE BEFORE SPRINT 1)

These are not preferences — they are blockers. Sprint 1 cannot start until each has an answer.

### Decision 1: Code Editor Library
The editor is what students look at all day. It must feel professional, load fast, and work in a sandboxed iframe served by Apps Script HTML Service.

| Option | Pros | Cons |
|---|---|---|
| **Monaco** (VS Code's editor) | Industry standard; syntax highlighting, autocomplete, great UX | Large bundle (~5MB); may conflict with CSP in Apps Script |
| **CodeMirror 6** | Lightweight, modular, MIT licensed, widely used in education tools | Less "VS Code feel" |
| **Ace Editor** | Mature, lightweight, used in many online IDEs | Older codebase; less active development |

**Recommended:** CodeMirror 6 — best balance of load time, license, and educational track record. But this needs a spike to confirm it works inside Apps Script's iframe sandbox.

### Decision 2: Pyodide + Pygame Rendering Approach
This is the highest-risk technical bet in the entire project. Pygame in Pyodide requires a canvas element and a patched SDL backend (`pygame-ce` or similar). It works in theory but must be validated in our exact deployment context.

| Approach | Status | Risk |
|---|---|---|
| Pyodide + `pygame-ce` (community edition) | Exists, maintained | Must test in Apps Script iframe |
| Pyodide + Turtle via `tkinter` emulation | Pyodide ships a partial tkinter | Canvas rendering quality unknown |
| Custom canvas-based Turtle implementation | Full control | Build effort; may miss edge cases |

**Action required:** A spike this week. See Sprint 0.

### Decision 3: Bundle / Save File Format
What does a saved project look like on disk in Google Drive?

**Proposal:** A single JSON file per project.
```json
{
  "version": "1.0",
  "title": "My Turtle Project",
  "author": "student@school.edu",
  "created": "2026-03-13T10:00:00Z",
  "modified": "2026-03-13T10:00:00Z",
  "code": "import turtle\nt = turtle.Turtle()\nt.forward(100)",
  "reflections": [],
  "rubric_id": null,
  "peer_feedback": []
}
```
This format is human-readable, version-controlled, and portable. A student can open their project file years later without any special software.

**Decision needed:** Confirm this format before any Drive save/load code is written.

### Decision 4: Google Classroom Integration Model

This is a higher-stakes decision than it first appears. There are two fundamentally different ways The Commons can integrate with Google Classroom, with very different complexity, timeline, and approval requirements.

| | **Option A: Web App Link** | **Option B: Classroom Add-on** |
|---|---|---|
| **How it works** | Teacher pastes the Apps Script web app URL as an assignment link. Student clicks it, opens a new tab. | The IDE opens in an iframe *inside* the Classroom assignment UI. |
| **Auth** | Uses the student's existing Google session in the browser — no extra OAuth | Requires OAuth 2.0 scopes and a verified Workspace domain |
| **Google review** | None required | Add-on must be submitted to and approved by Google (timeline unknown) |
| **Teacher setup** | Paste a link | Install the add-on from Google Workspace Marketplace |
| **Student experience** | New tab opens | Stays inside Classroom |
| **Prototype time** | Hours | Days to weeks |
| **Production approval** | None | Potentially months |

**Recommendation:** Option A for MVP. It is shippable before June without any Google approval process. Option B is the right long-term experience but carries an approval timeline risk that is incompatible with June 2026.

**Action for Sprint 0:** Build a minimal Option B prototype in parallel with Option A to find out how far we get and whether approval could realistically land before June. If not, Option B becomes a v1.1 target.

---

## 4. SPRINT 0: PROTOTYPES & SETUP
**Duration:** 1 week (March 13–20, 2026)
**Goal:** Three prototypes that eliminate technical unknowns and enable human evaluation of key decisions. No production code — only learning.

---

### Prototype 1: The Runtime Spike 🔴 Highest Priority
**Question it answers:** Can Pyodide run Python — including Turtle and Pygame — inside an Apps Script HTML Service page?

This is the single highest-risk unknown. Everything else depends on it. Build the simplest possible Apps Script web app: no editor library, just a `<textarea>` and a Run button. Layer in complexity one step at a time.

| Step | Done When |
|---|---|
| Apps Script serves an HTML page | Page loads at the web app URL |
| Pyodide loads in the page | `print("hello")` outputs `hello` |
| Turtle renders | `turtle.forward(100)` draws a line on a canvas |
| Pygame renders via `pygame-ce` | A simple Pygame animation runs without crashing |

**If Turtle works but Pygame fails:** Escalate immediately. Pygame is an acceptance criterion. Fallback: custom canvas-based Turtle implementation covering the Pygame use cases teachers actually need. Investigate what Trinket's Pygame actually supported in practice — it may be a smaller surface area than "full Pygame."

---

### Prototype 2: The Editor Shootout 🟡 UX Decision
**Question it answers:** Which editor library should we use? This is a question non-technical people can help answer.

Once Prototype 1 confirms the runtime works, wrap it with three editor variants — each as a separate Apps Script web app URL. Share all three with 3–5 teachers and ask: *which one feels right for a beginner?*

| Variant | Library | URL |
|---|---|---|
| Editor A | Monaco (VS Code) | TBD |
| Editor B | CodeMirror 6 | TBD |
| Editor C | Ace Editor | TBD |

**Evaluation criteria for teachers:**
- Does it feel approachable for a complete beginner?
- Does syntax highlighting help or distract?
- Does it feel fast?

**Default if no clear winner:** CodeMirror 6 — best balance of load time, license, and educational track record.

---

### Prototype 3: The Classroom Integration Spike 🟢 Parallel Track
**Question it answers:** Is a Classroom Add-on (Option B) feasible before June, or do we ship Option A (web app link) as MVP?

Run in parallel with Prototypes 1 & 2. Two sub-tasks:

| Task | Owner | Done When |
|---|---|---|
| Build Option A (web app link) | TBD | Teacher can add the URL to a Classroom assignment; student opens it and sees the IDE |
| Investigate Option B (add-on) approval process | TBD | Report: what is the actual Google review timeline? What OAuth scopes are required? Is June realistic? |

**Decision gate:** By end of Sprint 0, commit to Option A or Option B for MVP. If Option B approval cannot be confirmed by March 20, Option A is the MVP path and Option B moves to v1.1.

---

### Sprint 0 Setup Tasks

| Task | Owner | Done When |
|---|---|---|
| Initialize GitHub repo, commit all docs | TBD | Repo is public; README renders correctly |
| Set up `clasp` for local development | TBD | Developer can push Apps Script changes from VS Code |
| Confirm Bundle JSON schema | TBD | Schema agreed; documented in blueprint |

**Sprint 0 is done when:** All three prototypes have a result (pass, fail, or decision made), the repo is live, and Sprint 1 can start with no open unknowns.

---

## 5. SPRINT 1: THE BARE LOOP
**Duration:** 2 weeks (March 20 – April 3, 2026)
**Goal:** A student can open a URL, write Python, run it, and see output. Nothing else. This is the foundation everything else builds on.

### Sprint 1 Stories

| # | Story | Acceptance Test |
|---|---|---|
| S1-01 | Apps Script serves the IDE as an HTML page | Page loads in < 5s on a Chromebook on school WiFi |
| S1-02 | CodeMirror editor loads with Python syntax highlighting | Editor is visible, accepts keystrokes, highlights keywords |
| S1-03 | Student clicks Run; Pyodide executes the code | `print("hello")` outputs `hello` in the output panel |
| S1-04 | Runtime errors display clearly | `1/0` shows a readable error message, not a raw traceback |
| S1-05 | Turtle draws on a canvas element | `import turtle; t=turtle.Turtle(); t.forward(100)` draws a line |
| S1-06 | Output panel occupies ≥ 50% of viewport on 1280×800 | Measured on a physical Chromebook |
| S1-07 | Browser compatibility check on load | Unsupported browser shows a clear, friendly error before the editor loads |
| S1-08 | localStorage auto-save every 30 seconds | Kill the tab and reopen — code is recovered |

### Sprint 1 Explicitly Does NOT Include
- Google authentication
- Drive save/load
- Sharing links
- Rubric or Reflection Layer
- Gemini
- Gallery

### Sprint 1 Definition of Done
A developer (or teacher) can open the Apps Script web app URL in Chrome on a Chromebook, type a Turtle program, click Run, and watch it draw — in under 60 seconds from first load, with no login required.

---

## 6. ROUGH TIMELINE TO JUNE 2026

| Week | Sprint | Milestone | Decision Gate |
|---|---|---|---|
| Mar 13–20 | Sprint 0 | 3 prototypes complete; repo live | Commit to editor library; commit to Option A or B for Classroom |
| Mar 20 – Apr 3 | Sprint 1 | Bare loop: edit → run → Turtle output | Confirm Pygame approach (or fallback) |
| Apr 3–17 | Sprint 2 | Pygame rendering + graphics panel sizing | Confirm graphics acceptance criterion passes |
| Apr 17 – May 1 | Sprint 3 | Google auth + Drive save/load | — |
| May 1–15 | Sprint 4 | Shareable links + Classroom integration (Option A) | If Option B approval confirmed, begin Option B |
| May 15–29 | Sprint 5 | Polish, performance, Chromebook testing, bug fixes | — |
| Jun 1 | **MVP Release** | Classroom-ready; all 5 acceptance criteria pass | — |
| Jun+ | Post-MVP | Reflection Layer, Gemini Pulse Check, Gallery, Option B | — |

> **13 weeks, no buffer.** Sprint 5 is the only slack. If the Pygame prototype fails in Sprint 0 and no fallback is identified within 48 hours, the timeline must be renegotiated.

---

## 7. REPO STRUCTURE (PROPOSED)

```
commons-ide/
├── README.md
├── LICENSE
├── blueprint.md
├── motivation.md
├── user-stories.md
├── plan.md
├── docs/
│   └── setup-guide.md              # How a teacher deploys their copy
├── prototypes/
│   ├── 1-runtime/                  # Prototype 1: bare textarea + Pyodide + Turtle + Pygame
│   │   ├── Code.gs
│   │   └── index.html
│   ├── 2-editor-shootout/          # Prototype 2: three editor variants
│   │   ├── monaco/
│   │   ├── codemirror/
│   │   └── ace/
│   └── 3-classroom-integration/    # Prototype 3: Option A web app + Option B add-on exploration
│       ├── option-a/
│       └── option-b/
├── src/                            # Production code — starts in Sprint 1
│   ├── Code.gs                     # Apps Script server-side (routing, auth, Drive API)
│   ├── index.html                  # Main IDE shell
│   ├── editor.js                   # Chosen editor library setup
│   ├── runner.js                   # Pyodide load + execution
│   ├── graphics.js                 # Canvas/Turtle/Pygame rendering
│   ├── storage.js                  # Drive save/load + localStorage buffer
│   └── style.css
├── tests/
│   └── acceptance/                 # Manual test scripts against the 5 criteria
└── .clasp.json                     # clasp config for local development
```

---

## 8. IMMEDIATE NEXT STEPS

In priority order:

1. **Initialize the GitHub repo** and commit all existing documents. The repo going public is also the signal to potential contributors that the project is real.
2. **Set up `clasp`** so development can happen in VS Code and changes push directly to Apps Script.
3. **Start Prototype 1** — create `prototypes/1-runtime/` and get `print("hello")` running via Pyodide. Do not touch the editor library yet.
4. **In parallel:** investigate the Google Classroom Add-on approval process (Prototype 3 Option B sub-task). This is research, not building — it just needs someone to read the docs and report back.
5. **Once Prototype 1 runtime works:** build the three editor variants (Prototype 2) and share with teachers for feedback.
6. **Confirm the Bundle JSON schema** — this is a 30-minute conversation, not a build task.
7. **Hold a Sprint 0 retrospective on March 20** — review all three prototype results, make the two committed decisions (editor library, Classroom integration model), and kick off Sprint 1.
