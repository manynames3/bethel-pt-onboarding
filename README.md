# Atlanta Bethel Church Praise Team Onboarding

A static onboarding site for Atlanta Bethel Church praise team members. It centralizes rehearsal times, sheet music, audio links, and role-specific onboarding material for worship preparation.

Live site: https://bethel-pt-onboarding.pages.dev/

## Features

- Sunday worship and Saturday rehearsal schedules
- Sheet music previews for offering songs, blessing songs, and special numbers
- YouTube playlist links for Sunday worship and Friday worship
- Role-specific onboarding pages for main keys, second keys, acoustic guitar, electric guitar, bass, drums, singers, Aviom, and the annex morning-prayer instrument team
- Equipment photo references for the keyboards, bass amp, drum kit, and personal monitor stations
- Browser-based admin panel for editing song titles, uploading PDFs, and updating rehearsal notes
- v2 editorial layout designed for both desktop and mobile

## Admin

Admin code: `bethel`

Admin edits are stored in the current browser. Text settings are saved in `localStorage`, and uploaded PDFs are saved in IndexedDB. Because this is a static site with no login server or CMS, edits made in one browser are not automatically shared with other users.

## Local Development

The site runs as static files.

```bash
python3 -m http.server 4175 --bind 127.0.0.1
```

Open `http://127.0.0.1:4175/` in a browser.

## File Structure

- `index.html`: home page, rehearsal schedule, score viewer, and admin panel
- `styles.css`: shared v2 design system and responsive layout
- `script.js`: home page rendering, score resources, and admin storage logic
- `onboarding/`: role-specific onboarding pages
- `onboarding-data.js`: role-specific onboarding data
- `onboarding-page.js`: renderer for role-specific pages
- `practice-schedule.js`: rotating monthly Saturday rehearsal schedule logic
- `assets/`: logo, worship space images, and score PDF/JPG resources

## Deployment

Cloudflare Pages project: `bethel-pt-onboarding`

This project is deployed with Cloudflare Pages direct upload, not Git integration.

```bash
wrangler pages deploy . --project-name=bethel-pt-onboarding --branch=main
```

Current v2 working branch: `v2`
