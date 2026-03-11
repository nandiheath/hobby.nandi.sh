### Translation Management Skill (Agent-Ready)
**Description:** Synchronizes and identifies missing i18n keys between Traditional Chinese (`zh_tw`) and English (`en`).

**When an agent should use this:**
- When the user adds new content to `src/locales/zh_tw/translation.json`.
- Before a final submission, to ensure no translation gaps exist.
- When an agent wants to find untranslated text strings.

**Instruction for Agent:**
1. Execute the `npm run translate` command to generate a report of missing keys.
2. The implementation script is located at `scripts/translation_management.js`.
3. Read the output to identify key names and original Chinese text.
4. For each missing key, generate a high-quality English translation.
5. Update `src/locales/en/translation.json` with the new keys/values using `search_replace` or `multi_edit`.

**Execution Command:**
```bash
npm run translate
```

**Outcome:**
- A console report of all keys in `zh_tw` missing from `en`.
- This provides the agent with a clear roadmap of work to be done.
