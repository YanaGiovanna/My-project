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

## v5.5 Final Presentation Polish
- Added a reload-safe 60-second newsroom pitch timer.
- Final Challenge stays locked until the pitch is completed.
- The On Air screen uses compact Pitch Notes instead of the full newspaper feature.
- Both pitch and 20-second huddle timers update only their timer elements, avoiding full-page rerenders.
- Added a clear LIVE presentation state and improved mobile layout.

## Release Candidate — full developer/methodology polish
- Case-specific scaffolding for Hypothesis and Solution Desk.
- Scaffolds guide thinking without giving ready-made answers.
- Live field feedback updates immediately.
- Case 3 is explicitly group-focused; Case 5 is now The Friend Group.
- Real Revision Desk: Story, Recommendations, Reasoning, or Big Idea can be revised.
- Changing the speaker resets pitch/challenge state.
- Removed Finish Pitch Early; the 60-second pitch now runs to completion.
- Added New Team control for shared classroom devices.
- State version bumped to isolate the release candidate from stale browser data.

## Release Candidate v2 — final feature UX
- OUR TAKE now clearly explains what to write and why the button is locked.
- Live helper text changes to ✓ Final message added.
- Added lightweight duplicate/similarity checks for recommendations and reasons.
- Draft PDF/print was removed; Print / Save as PDF is available after publication only.
- State version bumped to prevent stale browser data after the update.

## RC3 — final bug-fix pass
- Added a complete final validation pass after Revision.
- Final approval is blocked if Story, any Recommendation, any Reason, or Big Idea is empty.
- Duplicate/similarity checks are rerun after Revision.
- Revision screen shows explicit live Editor’s final-check feedback.
- Print / Save as PDF now prints the actual final Teen Voices newspaper feature, not the Mission Accomplished screen.
- Added aria-live status regions for key dynamic validation feedback.
- State version bumped to avoid stale browser state.

## RC4 — Peer Review UX fix
- Rebuilt Editor’s Desk Check so students no longer have to tick all four criteria.
- Added `reviewTouched` state to distinguish “reviewed but needs work” from “not reviewed yet”.
- Students must discuss all four criteria, but may leave criteria unticked when they genuinely need revision.
- Added explicit instructions, per-criterion status, progress (0/4–4/4), and live completion feedback.
- Strength and suggestion prompts now require specific product-focused feedback with sentence starters.
- Unchecked criteria automatically appear in Revision Desk as “Criteria marked Needs work”.
- State version bumped to prevent stale browser state.

## FINAL CLASS EDITION architecture
- Removed cross-team peer review from the app.
- Added Final Editor's Check as the team's own self-assessment before going live.
- Revision now loops back to the team's self-check.
- Replaced random Surprise Question with a real Questions from the Newsroom workflow.
- Audience teams ask the question; the presenting team gets a 20-second huddle before the reporter answers.
- Each team publishes a designed magazine page for the shared Teen Voices Class Edition.
- Final page is print/PDF ready; teacher can combine team pages into one class magazine.

## Teacher Desk + Class Magazine Builder
- Added optional Newsroom Name to each student team.
- Published teams can download a compact `.team` page file for the Class Edition.
- Added Teacher Desk in the app header.
- Teacher Desk imports multiple `.team` files locally; no server/database/account is required.
- Builds a magazine cover, contents page, all newsroom pages, and a back cover automatically.
- Full Class Edition can be printed/saved as one PDF from the browser.
- Imported Class Edition pages are stored locally in the teacher’s browser and can be removed/replaced.
- Removed obsolete peer-review/surprise-question state and updated step labels.

## Mobile UX polish
- Replaced the oversized CASE FILE placeholder with a compact editorial dossier header.
- Reworked automated recommendation feedback into 1–2 actionable coaching points instead of a long diagnostic list.
- Added a concrete Do / Why example and a direct Revise Recommendations action.
- Made similarity detection conservative so normal student answers are not blocked by superficial word overlap.
- Added a mobile hamburger menu so New Team and Teacher Desk remain accessible on narrow iPhone screens.
- Improved mobile typography and vertical density on the Case Profile screen.

## FINAL 1.0 technical freeze pass
- Switching to a new case now clears all case-specific work while preserving team setup.
- Editor coaching examples are case-specific.
- Removed duplicate print function.
- Audience-question typing is optional; the 20-second huddle can start immediately after a live question.
- Teacher Desk exports standard `.json` team-page files for better Safari/Finder compatibility and still accepts legacy `.team` files.
- Print CSS targets A4 and avoids splitting recommendation/evidence blocks where possible.
- State version bumped to isolate the final build from stale browser state.

## FINAL 1.1 UI/methodology polish
- Removed the oversized CASE FILE placeholder from every case profile.
- Subject and Story Brief now move up into a cleaner editorial layout.
- Editor feedback is prioritised and limited to concise actionable guidance.
- Similar recommendations now produce one combined message instead of pair-by-pair repetition.
- Revision CTA is explicit: `← Revise Recommendations`.
- Case-specific model examples are retained.
- State version bumped to v16 to avoid stale browser state after deployment.

## FINAL 1.2 — Teacher Desk submission flow
- Student final flow now says `Submit to Teacher Desk` and honestly explains that this downloads one `.json` page file for the teacher.
- Added a post-download `TEAM PAGE READY` confirmation with clear handoff instructions.
- Teacher Desk copy now uses `Import Team Page Files` and shows stories received.
- Clarified OUR TAKE as the team’s main advice, not a fourth recommendation.
- Added the visible mission route `CASE → SOLUTIONS → PITCH → PUBLISH` on the opening screen.

## FINAL 1.3 — production freeze micro-fixes
- Renamed the obsolete `Reveal Final Challenge` CTA to `Questions from the Newsroom`.
- Entering Revision now clears the four self-check boxes; teams must revise, re-check, then approve.
- Added a stable unique `teamId` to exported Teacher Desk page files.
- Teacher Desk now replaces only a newer file from the same newsroom, even when two teams use the same case or same display name.
- Submission wording now accurately says `Export Page for Teacher Desk`.
- Updated team-page schema to v2 while retaining import compatibility for legacy v1 files.
- Removed several dead CSS rules left from earlier peer-review / CASE FILE iterations.
- State and Teacher Desk storage versions bumped for a clean deployment.

## FINAL 1.4 — student export UX
- Replaced ambiguous send/submission wording with `Export Team Page`.
- Added a student-facing three-step iPhone/Safari-friendly export guide.
- Clarified that the downloaded team file must be given/sent to the teacher.
- Removed wording that could imply automatic network transfer into Teacher Desk.
- Kept the Teacher Desk workflow unchanged: teacher imports team files and builds the class magazine.

## FINAL 1.5 — methodology polish
- Added three distinct solution lenses for every case so Recommendations 1–3 prompt different kinds of thinking.
- Mia now uses Listening / Sharing Responsibility / Supporting Quieter Voices.
- Alex, Sam, Team Delta and the Friend Group also have three case-specific solution directions.
- Rewrote optional perspective prompts to guide thinking without suggesting the answer.
- Renamed the optional badge to `Editor’s Challenge • Optional`.
- Updated the Editorial Rule to make the purpose of three recommendations explicit.
- State version bumped to v20.
