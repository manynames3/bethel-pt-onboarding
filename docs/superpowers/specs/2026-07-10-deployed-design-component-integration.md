# Deployed Design Component Integration

## Objective

Keep the visual language, layout system, navigation, and role pages from the currently deployed `v2` site. Add only the schedule-card layout and music-resource cards shown in the approved references.

## Source Of Truth

- Use `origin/v2` commit `36f1327` as the baseline for all tracked site files.
- Remove the uncommitted field-guide redesign and its `experience.css` stylesheet.
- Preserve this specification and any later focused integration changes.
- Do not change content, URLs, onboarding instructions, admin behavior, or score-viewer behavior unless required by the two approved component groups.

## Homepage Layout

### Hero

Retain the deployed header, brand treatment, typography, colors, Korean copy, and architectural spacing. Remove the schedule board from inside the hero. Rebalance the hero as an editorial two-column composition: the existing large worship-preparation heading on the left and the existing subtitle, rule, and dawn-service note on the right.

### Schedule Band

Place a full-width schedule workspace immediately below the hero and before the existing site metadata row.

- The Saturday panel uses approximately two-thirds of the desktop width.
- The Sunday panel uses approximately one-third of the desktop width.
- The Saturday panel contains separate current-month and next-month cards.
- The current month receives the restrained coral emphasis shown in the reference.
- The Sunday panel receives the restrained teal emphasis shown in the reference.
- Calendar and clock icons remain proper CSS icons, not emoji.
- Existing rotating-month calculations in `practice-schedule.js` remain the sole schedule source.
- Existing Korean time labels and all three teams remain unchanged.

### Music Resource Strip

Replace the deployed playlist presentation with a full-width three-card strip in the existing `#songbook` area.

- Sunday playlist: dark charcoal card with gold circular play icon.
- Friday playlist: muted deep green card with gold circular play icon.
- Weekly score-sharing note: pale warm card with restrained gold border and the existing KakaoTalk sharing copy.
- Preserve both existing YouTube playlist URLs, external-link behavior, accessible labels, and score-viewer placement.

## Responsive Behavior

- Desktop: Saturday and Sunday schedule panels appear side by side; music resources appear as three columns.
- Tablet: schedule panels stack when their content would become cramped; the sharing note may span below the two playlist cards.
- Mobile: all schedule panels, month cards, and music-resource cards stack in reading order with no horizontal overflow.
- Typography stays within the deployed site's current scale and does not adopt the field-guide redesign's hero or navigation system.

## Functional Boundaries

The following must remain unchanged:

- Rotating current-month and next-month Saturday schedule behavior.
- Sunday practice times for `1부`, `2부`, and `3부`.
- Role ordering, role links, and all onboarding subpages.
- Admin drawer controls and local persistence.
- PDF/JPG score selection and preview behavior.
- Existing images, playlist destinations, and score-sharing copy.

## Implementation Scope

- Restore the field-guide-modified tracked files from `origin/v2`.
- Delete the untracked `experience.css` file.
- Modify only `index.html`, `script.js`, and `styles.css` for the approved integration unless verification identifies a narrowly related requirement.
- Add a dependency-free Node contract test for the required DOM structure, preserved URLs, and schedule-rendering hooks.
- Do not add production dependencies.

## Verification

- Run JavaScript syntax checks for modified scripts.
- Run the new Node contract test and confirm its pre-implementation failure and post-implementation pass.
- Confirm homepage, stylesheet, script, and representative onboarding pages return HTTP `200`.
- Verify current-month and December-to-January schedule rollover output.
- Check desktop, tablet, and mobile screenshots for overflow, balanced spacing, legible times, and correct card stacking.
- Exercise playlist links, role navigation, score selection, and admin drawer opening.
- Do not push or deploy unless the user requests it.
