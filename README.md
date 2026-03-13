# The Commons IDE

> **A community-built, zero-cost, browser-native Python IDE for K-12 classrooms.**
> Built to replace Trinket before its June 2026 shutdown.

---

## Why This Exists

Trinket is shutting down in June 2026. For thousands of CS teachers, it was the best beginner coding tool available — no install, no account, instant Turtle and Pygame graphics, free. Nothing on the market fills that gap cleanly.

The Commons IDE is the community's answer. It runs entirely inside a school's existing Google Workspace infrastructure — no new servers, no per-student fees, no corporate middleman.

---

## What It Does

- **Runs Python in the browser** — using WebAssembly (Pyodide), code executes on the student's own machine. No cloud compute costs, ever.
- **Full Turtle and Pygame support** — large graphics output window, fast render, instant run.
- **Shareable links** — students generate a view-only link to their project in two clicks. Recipients can run it with no login.
- **Saves to Google Drive** — work lives in the student's own Drive folder within the school domain.
- **Reflection & rubric tools** — students annotate their code and map it to teacher-defined learning goals.
- **AI feedback via Gemini** — formative "Pulse Checks" against the rubric before submission, not grades.
- **Gallery / Exhibition mode** — teachers can host a gallery walk where students browse, run, and comment on each other's work.
- **Works inside Google Classroom** — opens as an assignment, submits as a Bundle (code + reflections + peer feedback).

---

## Acceptance Criteria

The bar is Trinket. We're not done until all five of these pass on a typical school Chromebook:

| # | Criterion |
|---|---|
| 1 | A new student opens the IDE and runs their first line of code in **under 60 seconds** — no install, no account, no tutorial. |
| 2 | The IDE loads and is ready in **under 5 seconds**. Turtle/Pygame graphics appear in **under 3 seconds**. |
| 3 | The graphics output panel occupies **at least 50% of the viewport** on a 1280×800 screen. Visuals render at full color without clipping. |
| 4 | A student generates a shareable link in **≤ 2 clicks**. The recipient runs it with **no login**. |
| 5 | **No per-student fee.** No subscription. All recurring costs absorbed by existing Google Workspace for Education. |

---

## Architecture Overview

The Commons runs entirely on infrastructure schools already have.

| Component | Technology | Who Pays |
|---|---|---|
| IDE host & auth | Google Apps Script | Google (free tier) |
| Code execution | Pyodide (WebAssembly) in browser | Student's own device |
| File storage | Google Drive | School's existing storage |
| Assignment flow | Google Classroom API | School's existing license |
| AI feedback | Gemini API | TBD — see open questions |
| Gallery | Shared Google Sheet + Apps Script | School's existing license |

> **Path A (current focus):** K-12 schools on Google Workspace for Education.
> **Path B (planned):** LTI 1.3 integration for Canvas/Schoology at community colleges and universities.

---

## Project Status

| Area | Status |
|---|---|
| Blueprint & acceptance criteria | ✅ Draft complete |
| Glossary | ✅ Draft complete |
| Google Apps Script shell | 🔲 Not started |
| Pyodide integration | 🔲 Not started |
| Turtle / Pygame rendering | 🔲 Not started |
| Google Drive save/load | 🔲 Not started |
| Sharing links | 🔲 Not started |
| Reflection Layer UI | 🔲 Not started |
| Gemini Pulse Check | 🔲 Not started |
| Gallery / Exhibition mode | 🔲 Not started |
| LTI 1.3 broker (Path B) | 🔲 Not started |

---

## Open Questions (Help Wanted)

These are the hardest unsolved problems. If you have expertise in any of these areas, please open an issue or start a discussion.

- **Gemini API cost at scale** — Is the free tier sufficient for a class of 30 running Pulse Checks? What's the fallback if it isn't?
- **Pyodide + Pygame rendering** — What's the current state of Pygame in Pyodide? Are there canvas/framebuffer limitations we need to work around?
- **Apps Script quotas** — At what classroom scale do we hit execution time or URL Fetch limits? What's the graceful degradation story?
- **Offline resilience** — What should the IDE do when a student loses internet mid-session?
- **Path B LTI broker** — Who has experience standing up an LTI 1.3 broker for Canvas/Schoology?

---

## How to Contribute

This project is in its early blueprint phase. The most valuable contributions right now are:

1. **Answering the open questions above** — open a GitHub Discussion.
2. **Prototyping** — spike any component from the status table above and share what you learn.
3. **Testing the acceptance criteria** — if you have a Chromebook classroom, we need testers.
4. **Documenting alternatives** — if you've evaluated other Trinket replacements, document what they got right and wrong.

To contribute code, fork the repo and open a pull request. There's no formal contribution guide yet — that's also a welcome contribution.

---

## Documents

- [plan.md](plan.md) — Development plan: MVP scope, open decisions, Sprint 0 & Sprint 1
- [wireframe.md](wireframe.md) — UI wireframe and design decisions
- [blueprint.md](blueprint.md) — Full technical and product blueprint
- [user-stories.md](user-stories.md) — User stories across all stakeholder personas
- [motivation.md](motivation.md) — The origin email and problem background

## For Contributors

- [prototype-1-instructions.md](prototype-1-instructions.md) — Detailed instructions for building Prototype 1 (the runtime spike). **Start here if you want to write code.**

---

## License

[MIT License](LICENSE) — free to use, modify, and distribute. See `LICENSE` for details.

---

*Built by and for the teaching community. If you're a teacher who lost Trinket, this is your project too.*
