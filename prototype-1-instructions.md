# INSTRUCTIONS FOR COPILOT AGENT: PROTOTYPE 1 — THE RUNTIME SPIKE

**Project:** The Commons IDE
**Your task:** Build Prototype 1 only. Nothing else.
**Done when:** All four runtime steps below pass.
**Deadline:** End of Sprint 0 (March 20, 2026)

---

## CONTEXT (READ THIS FIRST)

The Commons IDE is a browser-based Python IDE for K-12 classrooms. It runs entirely inside Google Apps Script — no external servers. Code execution happens locally in the student's browser using Pyodide (Python via WebAssembly).

The highest-risk unknown is whether Pyodide can load and run Python — including Turtle graphics and Pygame — inside an HTML page served by Google Apps Script's HTML Service. That is the only question Prototype 1 answers.

Do not build the production IDE. Do not choose an editor library. Do not build Drive integration. This prototype is a throwaway spike. Its only purpose is to confirm the runtime works.

Reference documents:
- [blueprint.md](blueprint.md) — full architecture and dependency details
- [plan.md](plan.md) — sprint plan and prototype definitions
- [wireframe.md](wireframe.md) — UI target (for context only, not for this prototype)

---

## WHAT YOU ARE BUILDING

A minimal Google Apps Script web app with:
- A `<textarea>` for code input (no editor library)
- A **Run** button
- An output `<div>` for console output
- A `<canvas>` element for graphics output

That's it. No styling beyond functional layout. No authentication. No Drive. No editor library.

---

## FILE STRUCTURE TO CREATE

Create files at these exact paths:

```
prototypes/
└── 1-runtime/
    ├── Code.gs       ← Apps Script server-side (just serves the page)
    └── index.html    ← All client-side code goes here
```

---

## THE FOUR RUNTIME STEPS (build in order, stop if one fails)

### Step 1: Apps Script serves a page
`Code.gs` serves `index.html` as a web app. When deployed as a web app, visiting the URL shows the page. The textarea, Run button, canvas, and output div are all present and visible.

**Done when:** URL loads in a browser. Page is not blank.

---

### Step 2: Pyodide loads and runs `print()`
Load Pyodide from the CDN in `index.html`. When the page loads, initialize Pyodide automatically. When the user types `print("hello")` in the textarea and clicks Run, the text `hello` appears in the output div.

**Done when:** `print("hello world")` → `hello world` appears in output.

Use the official Pyodide CDN:
```html
<script src="https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.js"></script>
```

Show a loading indicator while Pyodide initializes. The Run button must be **disabled** until Pyodide is ready. When ready, enable the button and show "Ready" in the status area.

Capture both `stdout` and `stderr` and display them in the output div. A runtime error should show the error message, not crash the page.

---

### Step 3: Turtle renders on the canvas
After Step 2 works, test Turtle graphics.

Pyodide ships a partial `turtle` module. The approach:
1. Use `pyodide-turtle` or Pyodide's built-in turtle which renders to a canvas element via `turtle.Screen()`.
2. The canvas element must be in the DOM before the turtle script runs.

Test code:
```python
import turtle
t = turtle.Turtle()
t.forward(100)
t.right(90)
t.forward(100)
t.right(90)
t.forward(100)
t.right(90)
t.forward(100)
turtle.done()
```

**Done when:** A square (or partial square) is visibly drawn on the canvas.

**If Pyodide's built-in turtle does not render to the canvas:** Try `mobilecturtle` or a canvas-based turtle shim. Document what you tried and what happened. Do not spend more than 2 hours on this before escalating.

---

### Step 4: Pygame renders via `pygame-ce`
After Step 3 works (or in parallel if Step 3 is blocked), test Pygame.

Install `pygame-ce` via Pyodide's micropip:
```python
import micropip
await micropip.install("pygame-ce")
import pygame
```

Pygame in Pyodide requires the SDL backend to target a canvas element. Use `pygame.display.set_mode()` with the `pygame.SCALED` flag or the Pyodide-specific canvas target if available.

Test code:
```python
import pygame
pygame.init()
screen = pygame.display.set_mode((400, 300))
screen.fill((30, 30, 200))
pygame.display.flip()
```

**Done when:** A solid blue rectangle appears on the canvas.

**If pygame-ce does not render:** Try `pygame` (standard). Document the exact error. Note whether the failure is:
- Import error (package can't load)
- Canvas targeting error (loads but can't draw)
- SDL/WebAssembly backend error

This distinction matters for choosing a fallback strategy.

---

## KNOWN RISKS AND FALLBACKS

| Risk | Fallback |
|---|---|
| Pyodide takes > 15s to load on slow connection | Add a progress indicator; note the actual load time in your report |
| Apps Script CSP blocks CDN scripts | Try adding the CDN to Apps Script's allowlist; or self-host Pyodide (document the bundle size) |
| Turtle doesn't render to canvas | Investigate `xterm-turtle`, a custom canvas Turtle shim, or `ColabTurtle` adapted for browser |
| Pygame-ce won't load | Try standard `pygame`; if both fail, document it as a known blocker and we will scope Pygame out of MVP |
| Apps Script HTML Service sandboxes iframes in a way that blocks WebAssembly | This is a critical failure — document it immediately and we will reassess the entire architecture |

---

## WHAT TO REPORT BACK

When you are done (or blocked), provide a report with:

1. **Step 1 result:** Did the page serve? URL (if deployed)?
2. **Step 2 result:** Did `print("hello")` work? What was the Pyodide load time?
3. **Step 3 result:** Did Turtle render? Screenshot or description of what appeared.
4. **Step 4 result:** Did Pygame render? Screenshot or description. If not, exact error message.
5. **Apps Script CSP issues:** Any Content Security Policy errors in the browser console?
6. **Anything unexpected:** What surprised you?

---

## CONSTRAINTS

- **Do not** install any npm packages. This is pure HTML/CSS/JS + Google Apps Script.
- **Do not** use any framework (React, Vue, etc.). Vanilla JS only.
- **Do not** add authentication or Drive integration.
- **Do not** style this beyond what's needed to see the elements. We are not building the UI.
- **Do not** choose an editor library. The `<textarea>` is intentional.
- **Do not** deploy to production. Use "Test deployments" or share the web app URL as "Anyone".
- **Keep `Code.gs` minimal.** It should only serve the HTML page. All logic goes in `index.html`.

---

## MINIMUM VIABLE `Code.gs`

```javascript
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index.html')
    .setTitle('Commons IDE — Runtime Spike')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
```

---

## MINIMUM VIABLE `index.html` SKELETON

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Commons IDE — Runtime Spike</title>
  <script src="https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.js"></script>
  <style>
    body { font-family: monospace; margin: 20px; }
    #editor { width: 100%; height: 200px; font-family: monospace; font-size: 14px; }
    #canvas { border: 1px solid #ccc; display: block; margin-top: 10px; }
    #output { background: #111; color: #eee; padding: 10px; min-height: 80px; white-space: pre; }
    #status { color: #888; margin: 5px 0; }
  </style>
</head>
<body>
  <h2>Commons IDE — Runtime Spike</h2>
  <p id="status">⏳ Loading Python runtime...</p>
  <textarea id="editor">print("hello world")</textarea>
  <br>
  <button id="run-btn" disabled>▶ Run</button>
  <canvas id="canvas" width="400" height="300"></canvas>
  <div id="output"></div>

  <script>
    // TODO: initialize Pyodide
    // TODO: wire up Run button
    // TODO: redirect stdout/stderr to #output
    // TODO: wire up canvas for Turtle / Pygame
  </script>
</body>
</html>
```

---

## DEPLOYING THE APPS SCRIPT WEB APP

1. Open [script.google.com](https://script.google.com)
2. Create a new project named `commons-ide-prototype-1`
3. Paste `Code.gs` content into the default `Code.gs` file
4. Create a new HTML file named `index` (Apps Script appends `.html` automatically)
5. Paste `index.html` content
6. Click **Deploy → Test deployments → Select type: Web app**
7. Set "Execute as: Me" and "Who has access: Anyone"
8. Click **Deploy** and open the provided URL

For ongoing development, use `clasp` to push changes from VS Code instead of the web editor. Setup instructions: https://developers.google.com/apps-script/guides/clasp

---

## SUCCESS CRITERIA SUMMARY

| Step | Test | Pass |
|---|---|---|
| 1 | Open web app URL | Page loads, all elements visible |
| 2 | Type `print("hello world")`, click Run | `hello world` appears in output div |
| 3 | Run Turtle square code | A square (or lines) appear on the canvas |
| 4 | Run Pygame fill code | A solid colored rectangle appears on the canvas |

All four passing = Prototype 1 complete. Sprint 1 can begin.
Any step failing = document the failure and escalate before spending more than 2 hours on a workaround.
