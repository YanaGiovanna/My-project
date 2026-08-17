# Teen Voices Studio — Final Mission v5

Production-pass GitHub Pages version.

## v5 improvements
- Clean Newsroom Edition CSS/JS refactor
- Versioned localStorage (`tv_final_state_v5`)
- Reload-safe 20-second Team Huddle timer
- Full newspaper-style Teen Voices final feature
- Solutions + reasoning included in the final feature
- Real Editor's Check → Revision → Final Edition flow
- Safe speaker selection by index
- One random challenge with no question swapping
- Mobile-first compact layout
- Print / Save as PDF layout
- Custom Edition Published completion screen (no browser alert)

## GitHub Pages
Replace the existing repository files with:
- `index.html`
- `style.css`
- `app.js`

Keep the same repository and GitHub Pages URL.


## v5.1 UX fix
- Removed hidden minimum-character requirements from the Hypothesis stage.
- The first two fields are clearly marked **Required**.
- The third field is marked **Optional challenge**.
- One meaningful sentence is enough.
- Added visible guidance and examples so students understand why the Continue button is inactive.

## v5.2 UX validation pass
- Solution Desk no longer uses hidden minimum-character thresholds.
- All six required fields are explicitly marked Required.
- Added examples and plain-language guidance.
- Build Feature unlocks when all six meaningful response fields contain text.

## v5.3 Full learner UX audit
- Inclusive singular `they` is used in learner-facing questions about one teen (e.g. “What should they do?”).
- Removed hidden minimum-character gates from core free-response fields; meaningful non-empty responses are accepted.
- Added clearer completion guidance where appropriate.
- Solution Desk retains explicit Required labels and examples.
- State storage version bumped to avoid stale browser state after the update.

## v5.4 Personalized case language
- Individual cases now use case-specific pronouns where the character's gender is established: Alex → he/him/his; Mia → she/her; Max → he/him/his.
- Team cases retain plural they/them/their.
- Sam remains name-based because the case text does not establish Sam's gender; the app does not guess it.
- Solution Desk prompts and examples adapt dynamically to the selected case.
