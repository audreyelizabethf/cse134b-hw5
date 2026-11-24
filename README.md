# CSE 134B HW5: Audrey's Studio

   
   | Field | Value |
   |---|---|
   | Repository URL | https://github.com/audreyelizabethf/cse134b-hw5 |
   | Part 2 Deployed URL | https://audreys-studio-hw5.netlify.app/ |

## SSG exercise
- Folder: `ssg-exercise/`
- Pages to preview: `about.html` and `ceramics.html`
- Install, build, and preview commands are in `ssg-exercise/README.md`.

## Design note: `<fact-panel>`
**Visitor goal:** a visitor to my portfolio wants a quick, fun "useless fact" to read
while browsing, and can switch to a compact view that hides the source line.

**Tracing one action, "Next fact":**
1. The visitor activates the **Next fact** button inside `<fact-panel>` (click or keyboard).
2. Its click listener calls `loadFact()`, which marks the button `aria-disabled`
   and sets the status (`role="status"`) to "Loading a new fact…".
3. `loadFact()` sends a GET request with `fetch()` to
   `https://uselessfacts.jsph.pl/api/v2/facts/random?language=en`.
4. It checks `response.ok`, parses the JSON, and checks that `text` and `source`
   are strings.
5. On success, it puts the fact and source into the page with `textContent`
   (so remote text can't run as HTML), and the status says "New fact loaded."

**What the visitor sees:**
- **While waiting:** "Loading a new fact…" in the status area; the previous fact stays visible.
- **On success:** the new fact and its source, plus a status update.
- **On failure** (offline, a bad status, or bad data): the previous fact stays,
  the status explains the problem, and the button changes to **Try again**.
  Retrying without reloading loads a new fact and clears the error.

**Other details:** the **Compact View** button outside the component toggles the
observed `compact` attribute, and the choice is saved in `localStorage`
(`hw5-fact-panel-mode`). Without JavaScript, a `<noscript>` message explains the widget needs it.