# THE COMMONS IDE: BLUEPRINT FOR A SHARED WORKSHOP


## 0. ORIGIN & PROBLEM STATEMENT

In early 2026, a teacher in Pemberton, BC posted a question to a community forum: *Trinket is shutting down in June — what replaces it?* The question resonated widely because Trinket had solved a genuinely hard problem: a beginner could open a browser, write Python, and see a Turtle graphic running in under a minute, with no install, no account, and no cost.

No drop-in replacement exists. The Commons IDE is the attempt to build one — community-owned, hosted inside the school's own Google infrastructure, and ready before the June 2026 deadline.

### Acceptance Criteria (derived from Trinket's bar)

| Requirement | Criterion |
|---|---|
| **Zero barrier to start** | A new student opens the IDE and runs their first line of code in under 60 seconds — no install, no account creation, no tutorial required. |
| **Fast boot & run** | The IDE loads and is ready in under 5 seconds on a typical school Chromebook. Turtle/Pygame graphics appear in under 3 seconds. |
| **Large graphics window** | The output panel occupies at least 50% of the viewport on a 1280×800 screen. Turtle and Pygame visuals render at full color without clipping. |
| **Online save & share** | A student generates a shareable link in ≤ 2 clicks. A recipient runs the project with no login. |
| **No per-student cost** | No subscription or per-user fee. Any recurring costs are absorbed by existing Google Workspace for Education infrastructure. |

> **Deadline: June 2026.** See [motivation.md](motivation.md) for the origin email and full rationale.


## 1. VISION AND GOALS

The Commons IDE is a community-owned, zero-cost, browser-native space for learning. It belongs to the teachers and students who use it, shifting the work to the student's own computer and the storage to the school's existing digital shelves.


### Core Directives:



* **Truly Free:** No per-user fees, no subscriptions, and no hidden costs for running code.
* **No Corporate Footprint:** The IDE has no database of its own. Student work lives in the school's Google Drive — not on a third-party server that can be sold, breached, or shut down. The Apps Script project and Drive files do persist, but they persist *inside the school's own domain*, under the school's own data governance policies.
* **Community Roots:** Student work stays within the school's digital boundary (the "FERPA Playground").
* **Self-Sustaining:** The system runs on infrastructure the school already owns. The only optional external dependency is the Gemini API for AI feedback — and the IDE is fully functional without it.


## 2. STAKEHOLDERS & THEIR REQUIREMENTS

The Commons IDE serves more people than just the student and teacher. Adoption decisions are made by IT administrators and principals; trust is granted (or withheld) by parents. These audiences have distinct, non-negotiable requirements that must be satisfied for The Commons to be deployed at all.

### IT Administrator Requirements

| Requirement | How The Commons Satisfies It |
|---|---|
| No new servers to manage | Runs entirely on Google Apps Script — infrastructure the school already operates |
| School firewall remains effective | Code executes in the student's browser; all outbound traffic is visible to the school's existing filters |
| No CIPA bypass risk | The IDE creates no server-side proxy or tunnel; there is no mechanism to anonymize student traffic |
| Student data stays in-domain | No student data (name, email, code, reflections) is stored outside the school's Google Workspace domain |
| FERPA compliance | All data governance is inherited from the school's existing Google Workspace for Education agreement |

### Parent Requirements

| Requirement | How The Commons Satisfies It |
|---|---|
| No data harvesting | Student work is stored in the student's own Drive folder; it is not used to train any model or shared with third parties |
| Work persists after class ends | Projects live in the student's Google Drive indefinitely — they are not deleted when a class ends or a subscription lapses |
| No premium tiers | Every student in a class has identical access; there is no "free vs. paid" feature split |

> See [user-stories.md](user-stories.md) for the full set of stakeholder stories, including substitute teachers, alumni, and curriculum developers.


## 3. PARALLEL PATHWAYS

To serve the entire teaching community, The Commons recognizes two ways to connect to the classroom. While they share the same "Engine," they plug into your class differently.


### Path A: The Integrated Google Track (Current Focus)

Designed for K-12 and schools using Google Workspace. It uses **Google Apps Script** to host the tool inside the teacher's own account.


### Path B: The Universal Connection (Future Development)

Designed for Community Colleges and Universities using Canvas or Schoology. It uses the **LTI 1.3** standard and a tiny receptionist (broker) to handle the security handshake.


## 4. PARTS OF THE WORKSHOP (GOOGLE TRACK)



* **The Workshop (Interface):** A Google Apps Script that serves the code editor to the student's screen.
* **The Local Engine:** Tools (WebAssembly) that run the code right on the student's computer.
* **The Reflection Layer:** A sidebar where students explain their thinking and map their work to learning goals.
* **The AI Assistant (Gemini):** A helper that provides feedback based on the class's shared standards (rubrics).
* **The Exhibition (Gallery):** A shared view where students can "publish" their work for peers to see.
* **The Locker (Storage):** Direct connection to the student's Google Drive.


## 5. SHARING AND THE EXHIBITION GALLERY

Sharing in The Commons is like putting a project on a "Common Table." It uses the school's existing permissions to keep things safe.


### How Students Share:



1. **Peer-to-Peer:** A student can generate a "Sharing Link." The IDE uses Google's native "view-only" permissions to let a classmate see the code and run it, but not change it.
2. **The Remix:** Students can "Make a Copy" of a shared project, allowing them to build on each other's ideas (with proper credit built into the Reflection Layer).


### Hosting a Gallery Walk (The Exhibition):

The teacher can activate "Exhibition Mode" within the Apps Script.



* **Publishing:** Students click "Post to Gallery." This adds their project link and a short "artist statement" (from their reflections) to a shared list.
* **The Walk:** Students enter the "Exhibition Hall" in the IDE. They can browse through peer projects, run the Pygame or Turtle visuals, and leave "Peer Reflections" based on the classroom rubric.


## 6. THE FEEDBACK & REFLECTION LOOP

The code is only half the story. The other half is the student's narrative.



* **Student Annotations:** Students select a piece of code and attach a note explaining *why* they wrote it that way.
* **The Living Rubric:** Teachers define standards in the script. Gemini looks at both the code and the reflections to give the student a "Pulse Check" on how they are doing before they turn it in.


## 7. NETWORK SAFETY & FILTER INTEGRITY

A common issue with company-run tools is that they can bypass school filters. The Commons respects your firewall.



* **No Hiding:** Because the code runs locally, if a student's code tries to go somewhere restricted, the school's existing filter sees it and blocks it.
* **Transparent:** The IDE doesn't create a "tunnel" to the outside world.


## 8. HOW THE DATA FLOWS



1. **The Handshake:** Google Classroom opens the IDE and confirms who the student is.
2. **Opening the Workshop:** The script sends the editor and the rubric to the browser.
3. **The Creative Process:** Student writes code, adds reflections, and tests their work.
4. **The Exhibition:** (Optional) Student posts their work to the shared Gallery for a peer walk.
5. **Submission:** Student turns in a "Bundle" containing their code, their reflections, and any peer feedback they received.


## 9. DEPENDENCIES, COSTS & LIMITS

This section is an honest accounting of everything The Commons IDE depends on, what it costs, and where it breaks. The previous summary ("zero cost, unlimited scale") was directionally true but glossed over real constraints that teachers and IT administrators need to understand.

### 8.1 Dependency Map

| Component | Provided By | Cost | School Requirement |
|---|---|---|---|
| IDE host & auth | Google Apps Script | Free (quota-limited) | Google Workspace for Education |
| Code execution | Pyodide (WebAssembly) | Free (runs on student device) | Modern browser (Chrome 90+, Firefox 89+) |
| File storage | Google Drive API | Free (within school storage quota) | Google Workspace for Education |
| Assignment flow | Google Classroom API | Free | Google Workspace for Education |
| AI feedback (Pulse Check) | Gemini API | **See § 8.2** | Teacher must hold an API key |
| Gallery / Exhibition | Google Sheets + Apps Script | Free (quota-limited) | Google Workspace for Education |
| Python packages (stdlib) | Pyodide bundle | Free (loaded from CDN or self-hosted) | Student internet access |

### 8.2 The Gemini API Cost Problem

This is the one genuine cost risk. Gemini is **not free at scale** under all conditions.

| Scenario | Cost |
|---|---|
| Gemini 1.5 Flash, free tier | 15 requests/minute, 1M tokens/day — likely sufficient for a single classroom |
| Multiple classes, same teacher | May exceed free tier daily limits during simultaneous Pulse Checks |
| District-wide rollout | Requires a paid API key; cost depends on token usage per Pulse Check |

**Mitigations under consideration:**
- Rate-limit Pulse Checks to once per save (not real-time).
- Allow teachers to disable Pulse Check entirely — the IDE must be fully functional without it.
- Investigate Gemini for Google Workspace (education pricing tier).
- Design the Pulse Check prompt to be as token-efficient as possible.

> **Current status: Pulse Check is an optional feature. The core IDE — edit, run, save, share — has zero API cost.**

### 8.3 Google Apps Script Quotas

Apps Script is free but hard-capped by Google. Relevant limits for this project:

| Quota | Free Limit | Risk |
|---|---|---|
| Script execution time | 6 min/execution | Low — IDE serving is fast |
| Daily execution time (total) | 90 min/day (consumer) / 6 hrs/day (Workspace) | Low for Workspace accounts |
| URL Fetch calls | 20,000/day | Low — most execution is local |
| Drive read/write | No hard cap, but rate-limited | Medium — simultaneous class saves could queue |
| HTML Service (page serves) | No documented cap | Low |

**Workspace for Education accounts get significantly higher quotas than consumer accounts.** The IDE should only be deployed from a Workspace account — this must be clearly documented in the setup guide.

### 8.4 Failure Modes & Degradation

| Failure | User Impact | Mitigation |
|---|---|---|
| Student loses internet mid-session | Code in editor is lost if unsaved | Auto-save to localStorage every 30 seconds as a local buffer |
| Drive API rate limit hit during class save | Save fails silently | Retry with exponential backoff; show explicit save status indicator |
| Gemini API unavailable | Pulse Check unavailable | IDE continues normally; Pulse Check button shows "unavailable" state |
| Apps Script daily quota exhausted | IDE fails to load for late users | Alert teacher dashboard; quota resets at midnight PT |
| Pyodide CDN unreachable | Code execution unavailable | Option to self-host Pyodide bundle within school domain |
| Student on unsupported browser | WebAssembly fails to load | Browser compatibility check on load with clear error message |

### 8.5 What "Free" Actually Means

The Commons IDE is free for **schools already on Google Workspace for Education**. That covers the vast majority of K-12 schools in North America. However:

- A school on consumer Google accounts (not Workspace) will hit lower quotas and should upgrade before deploying.
- The Gemini Pulse Check feature may incur API costs at scale. It is opt-in and the IDE is fully functional without it.
- Storage costs are whatever the school currently pays for Google Workspace — The Commons adds no incremental storage beyond student Drive files.

## 10. LONGEVITY: BUILT TO LAST

The community "owns" the tool because the code is open (MIT licensed) and lives within their own school Google account. Any teacher can fork the GitHub repo, deploy their own copy to Apps Script, and be running in under an hour. There is no central server to go offline, no subscription to lapse, and no company whose shutdown can strand a classroom.

**The Trinket lesson:** Trinket's shutdown stranded thousands of classrooms with weeks of notice. The Commons is designed so that its "shutdown" is impossible — each school runs their own copy. The only external dependencies are Google's infrastructure and (optionally) the Gemini API, both of which have documented migration paths.


## APPENDIX A: GLOSSARY

| Term | Definition |
|---|---|
| **The Commons IDE** | The full system: a browser-based code editor delivered via Google Apps Script, with local execution, reflection tools, and a shared gallery. No part of the system lives on a third-party server outside of Google's infrastructure. |
| **The Workshop** | The code editor interface itself — the screen a student sees when they open the IDE. Served as an HTML/JS page by Google Apps Script. |
| **The Local Engine** | A WebAssembly (WASM) runtime loaded in the student's browser tab (e.g., Pyodide for Python). Code executes on the student's own machine; no remote compute server is involved. |
| **The Reflection Layer** | A sidebar panel inside the IDE where students write annotations explaining their code choices and map their work to the teacher's rubric criteria. |
| **The Living Rubric** | A set of assessment criteria defined by the teacher inside the Apps Script project. It is "living" in that the teacher can update it at any time and all students immediately see the new version. |
| **Pulse Check** | A formative feedback response generated by the Gemini API. It compares a student's code and reflections against the Living Rubric and returns plain-language guidance — not a grade. |
| **The Bundle** | The submission artifact: a structured file (e.g., JSON) containing the student's code, their Reflection Layer notes, and any Peer Reflections received. This is what gets turned in to Google Classroom. |
| **The Locker** | The student's Google Drive folder where in-progress work is saved. The IDE reads from and writes to this folder directly via the Drive API. Work in The Locker is not shared unless the student explicitly chooses to share it. |
| **The Exhibition / Gallery** | A shared Apps Script web app that displays published student projects. Each entry shows the project title, a brief artist statement drawn from the student's reflections, and a view-only link to the code. |
| **Exhibition Mode** | A teacher-activated state that unlocks the "Post to Gallery" button in students' IDEs and opens the Exhibition Hall view. |
| **The Exhibition Hall** | The student-facing view of the Gallery. Students browse peer projects, run visuals in a sandboxed frame, and submit Peer Reflections. |
| **Peer Reflection** | A structured comment left by one student on another's Gallery submission, guided by the Living Rubric criteria. Peer Reflections are appended to the recipient's Bundle at submission time. |
| **The Remix** | The act of making a personal copy of a shared project. The IDE records the original project's author in the Bundle metadata to preserve attribution. |
| **The Sharing Link** | A view-only URL generated by the IDE that uses Google's native file-sharing permissions. The recipient can see and run the code but cannot edit the source. |
| **FERPA Playground** | Informal shorthand for the school's Google Workspace domain. All student data (Drive files, Classroom submissions, Gallery entries) stays within this domain boundary and is subject to the school's own data governance policies. |
| **The Handshake** | The authentication step when a student opens the IDE from Google Classroom. Apps Script confirms the user's identity via their Google session; no separate login is required. |
| **Path A (Google Track)** | The deployment path using Google Apps Script, Drive, Classroom, and Gemini. Intended for K-12 schools on Google Workspace for Education. |
| **Path B (Universal Connection)** | A planned future deployment path using the LTI 1.3 standard to integrate with Canvas, Schoology, or other LMS platforms. Not yet implemented. |
