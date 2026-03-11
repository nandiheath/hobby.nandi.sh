### Visual Inspection Skill (Agent-Ready)
**Description:** Captures high-resolution screenshots and a DOM snapshot of all application routes to allow for visual auditing and element inspection.

**When an agent should use this:**
- After any UI-related code changes to verify layout and responsiveness.
- To "see" the application's current state and identify specific CSS selectors or DOM structures.
- To compare the visual implementation between Traditional Chinese and English locales.

**Instruction for Agent:**
1. Execute the `npm run screenshot` command.
2. The implementation script is located at `scripts/visual_inspection.js`.
3. Review the captured PNG files in the `screenshots/` directory (mapped from URLs like `/`, `/en`, `/portfolio`, etc.).
4. Inspect `screenshots/dom_snapshot.html` for deep structural analysis of elements, classes, and IDs.

**Execution Command:**
```bash
npm run screenshot
```

**Outcome:**
- High-resolution full-page screenshots for all key routes in `screenshots/*.png`.
- A full DOM dump in `screenshots/dom_snapshot.html`.
