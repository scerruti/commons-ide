# THE COMMONS IDE: UI WIREFRAME

This wireframe defines the target layout for the MVP. It is the visual contract that Sprint 1 builds toward. Every element here maps to a Sprint 1 story or an acceptance criterion.

---

## Main Layout (1280×800 — Chromebook target)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  THE COMMONS IDE                                                        │
├─────────────────────────────────────────────────────────────────────────┤
│  📄 Untitled Project      [▶ Run]      [💾 Save]      [🔗 Share Link]   │  ← Toolbar
├──────────────────────────────────────┬──────────────────────────────────┤
│  CODE EDITOR  (50%)                  │  OUTPUT PANEL  (50%)             │
│  ─────────────────────────────────   │  ────────────────────────────    │
│   1  import turtle                   │  🟩  Canvas                      │
│   2  t = turtle.Turtle()             │  (Turtle / Pygame graphics)      │
│   3  t.forward(100)                  │                                  │
│   4  t.right(90)                     │  ────────────────────────────    │
│   5  t.forward(100)                  │  📋  Console                     │
│                                      │  print() output · errors         │
│                                      │                                  │
├──────────────────────────────────────┴──────────────────────────────────┤
│  ● Saved to Drive 2s ago        ⚡ Pyodide Ready        Chrome 120 ✓   │  ← Status Bar
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Instructions Panel Layout (Sprint 2–3)

When a Starter Project is opened, a collapsible instructions panel slides in from the left. When closed, the layout returns to the standard 50/50 split.

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [📋 ◀ Instructions]  📄 Draw a Square   [▶ Run]  [💾 Save]  [🔗 Share] │  ← Toolbar
├───────────────────────┬───────────────────────┬─────────────────────────┤
│  INSTRUCTIONS  (25%)  │  CODE EDITOR  (37%)   │  OUTPUT PANEL  (37%)    │
│  ─────────────────    │  ─────────────────     │  ────────────────────   │
│  Step 1: Make the     │   1  # @ANCHOR:        │  🟩  Canvas             │
│  turtle go forward    │      move-step         │                         │
│  100 steps.           │   2  t.forward(100)    │                         │
│                       │   3                    │  ────────────────────   │
│  [➜ move step]        │   4  # @ANCHOR:        │  📋  Console            │
│                       │      turn-step         │                         │
│  Step 2: Turn the     │   5  t.right(90)       │                         │
│  turtle right 90°.    │                        │                         │
│  [➜ turn step]        │                        │                         │
│                       │                        │                         │
│  Step 3: Repeat       │                        │                         │
│  steps 1 & 2 x4.      │                        │                         │
├───────────────────────┴───────────────────────┴─────────────────────────┤
│  ● Saved                        ⚡ Pyodide Ready          Chrome 120 ✓  │
└─────────────────────────────────────────────────────────────────────────┘
```

The `[📋 ◀ Instructions]` toggle button collapses the panel entirely, restoring the standard 50/50 split. Button becomes `[📋 ▶ Instructions]` when closed.

---

## Design Decisions Embedded in This Layout

| Element | Decision | Rationale |
|---|---|---|
| **50/50 split** | Editor and output are equal width | Trinket bar: graphics window must be large. No compromising the canvas for the editor. |
| **Output panel: Canvas on top, Console below** | Canvas is the primary output | For Turtle/Pygame students, the visual is what matters. Console is secondary. |
| **Starter code in editor** | Editor is pre-populated, never empty | An empty editor is more intimidating than it looks. A working Turtle stub removes the blank-page problem. |
| **Run button in toolbar, not floating** | Predictable, always visible | Beginners should never have to hunt for the Run button. |
| **Status bar: save + runtime + browser** | Three persistent signals | Addresses three of the five failure modes: saves failing silently, Pyodide not ready, unsupported browser. |
| **Share Link in toolbar** | 2-click share is an acceptance criterion | It must always be visible, not buried in a menu. |
| **No menu bar** | MVP has no menus | Every menu item is a decision a beginner shouldn't have to make yet. Add menus in v1.1. |

---

## Loading State

Before Pyodide is ready, the IDE must not look broken. The status bar carries this signal:

```
┌─────────────────────────────────────────────────────────────────────────┐
│  📄 Untitled Project      [▶ Run]  (disabled)    [💾 Save]  [🔗 Share]  │  ← Toolbar
├──────────────────────────────────────┬──────────────────────────────────┤
│                                      │                                  │
│  CODE EDITOR                         │  Graphics will appear here       │
│  (accepts typing during load)        │  when you run your code.         │
│                                      │                                  │
│   1  import turtle                   │                                  │
│   2  t = turtle.Turtle()             │  ────────────────────────────    │
│   3  ...                             │  📋  Console                     │
│                                      │                                  │
├──────────────────────────────────────┴──────────────────────────────────┤
│  ● Not saved            ⏳ Loading Python runtime...      Chrome 120 ✓  │
└─────────────────────────────────────────────────────────────────────────┘
```

- The editor is visible and accepts typing during load.
- The **Run button is disabled** (greyed out) until Pyodide signals ready.
- The canvas shows a subtle placeholder: *"Graphics will appear here when you run your code."*
- If load exceeds 10 seconds, the status bar shows: *"⚠️ Runtime loading slowly — check your connection."*

---

## Error State

Runtime errors should feel informative, not frightening.

```
┌──────────────────────────────────────┬──────────────────────────────────┐
│                                      │  🟦  Canvas  (no output)         │
│  CODE EDITOR                         │                                  │
│  ─────────────────────────────────   │  ────────────────────────────    │
│   1  result = 10 / 0          ◄──┐   │  🔴  Error on line 1             │
│   2  print(result)            ───┘   │                                  │
│      (line highlighted in red)       │  ZeroDivisionError               │
│                                      │  → Your code tried to divide     │
│                                      │    by zero.                      │
│                                      │  Tip: Check that your divisor    │
│                                      │    is not 0.                     │
└──────────────────────────────────────┴──────────────────────────────────┘
```

- Raw Python tracebacks are **never shown to beginners** — they are translated to plain English.
- Line number is highlighted in the editor.
- A plain-language tip is appended where possible.

---

## The `@ANCHOR` System

`@ANCHOR` comments are the link between instructions and code. They are plain Python comments — they do not affect execution.

**In the code:**
```python
# @ANCHOR: move-step
t.forward(100)
```

**In the instructions markdown:**
```markdown
[➜ go to this step](#move-step)
```

**What happens when a student clicks the link:**
1. The IDE scans the code for `# @ANCHOR: move-step`
2. The editor scrolls to that line and briefly highlights it (yellow flash, ~1 second)
3. Focus moves to the editor so the student can start typing immediately

**Design rules for `@ANCHOR`:**
- Anchors are set by the teacher in the Starter Project template, not by the student
- Anchor names must be lowercase with hyphens only (`move-step`, not `Move Step`)
- A project may have any number of anchors
- If an anchor name in the instructions has no matching comment in the code, the link degrades to plain text with a warning icon: `➜ move-step ⚠️ anchor not found`
- Students may delete anchor comments without breaking the IDE — degradation is graceful

---

## Instructions Panel Design Decisions

| Element | Decision | Rationale |
|---|---|---|
| **Collapsible, not permanent** | Hidden by default for freeform projects | Preserves the MVP 50/50 layout. Instructions only appear when a Starter Project includes them. |
| **25% width when open** | Narrower than editor/output | Instructions are read once then referred back to. They don't need to dominate. |
| **Markdown rendering** | Instructions authored in markdown | Teachers already know markdown; it supports headers, bold, lists, images, and links. |
| **`@ANCHOR` over line numbers** | Named anchors, not line references | Line numbers shift as code is edited. Named anchors are stable for the lifetime of the project. |
| **`@ANCHOR` over `# TODO`** | Custom prefix | `TODO` has existing meaning in most editors (flagged as a task). `@ANCHOR` is unambiguous and signals IDE structure. |
| **Graceful degradation** | Missing anchors warn, not error | Students may accidentally delete anchor comments. The IDE must never break because of it. |

---

## What This Wireframe Does NOT Show (Post-MVP)

- Reflection Layer sidebar
- Rubric panel
- Gemini Pulse Check button
- Gallery / Post to Exhibition button
- File manager / multiple projects
- Settings or preferences
