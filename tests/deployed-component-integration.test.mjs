import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(resolve(root, path), "utf8");
const html = read("index.html");
const script = read("script.js");
const css = read("styles.css");
const onboardingData = read("onboarding-data.js");
const onboardingPage = read("onboarding-page.js");
const morningPrayerPage = read("onboarding/morning-prayer-team.html");

test("deployed hero and schedule board remain unchanged", () => {
  assert.match(html, /class="vfc-hero"[\s\S]*class="vfc-schedule-board"/);
  assert.doesNotMatch(html, /schedule-workspace/);
  assert.doesNotMatch(html, /vfc-hero-intro/);
  assert.match(script, /top-practice-heading/);
});

test("music preparation keeps both playlists and the sharing card", () => {
  assert.match(html, /PLl9hj6fNvw1Fi4PGkWwMiS6gyCDs3udoj/);
  assert.match(html, /PLl9hj6fNvw1G7-RC3SlAN1_Q0cqBYavot/);
  assert.match(html, /playlist-link-sunday/);
  assert.match(html, /playlist-link-friday/);
  assert.match(html, /악보 공유 안내/);
});

test("music cards use the approved responsive layout", () => {
  assert.match(css, /\.music-prep-grid/);
  assert.match(css, /\.playlist-link-sunday/);
  assert.match(css, /\.playlist-link-friday/);
  assert.match(css, /\.music-prep-grid \.songbook-notes/);
  assert.match(css, /@media \(max-width: 760px\)/);
});

test("onboarding stays above music resources at every viewport", () => {
  assert.ok(html.indexOf('id="onboarding"') < html.indexOf('id="songbook"'));
  assert.match(
    css,
    /\.quick-panels\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0,\s*1fr\);/
  );
  assert.doesNotMatch(css, /\.quick-panels\s*\{[\s\S]*?0\.48fr/);
});

test("keyboard onboarding uses current equipment photos and models", () => {
  assert.match(onboardingData, /equipment: "Nord Piano 5"/);
  assert.match(onboardingData, /equipment: "Yamaha MODX8"/);
  assert.doesNotMatch(onboardingData, /Nord Piano 4|Yamaha S90 ES/);
  assert.match(onboardingPage, /renderReferenceGallery/);
  assert.match(css, /\.equipment-gallery/);

  [
    "assets/nord-piano-5-overview.webp",
    "assets/nord-piano-5-controls.webp",
    "assets/yamaha-modx8-overview.webp",
    "assets/yamaha-modx8-controls.webp"
  ].forEach((asset) => assert.ok(existsSync(resolve(root, asset)), `${asset} should exist`));
});

test("morning prayer instrument team has its own Powerplay onboarding page", () => {
  assert.match(onboardingData, /slug: "morning-prayer-team"/);
  assert.match(onboardingData, /tag: "새벽기도 악기팀"/);
  assert.match(onboardingData, /equipment: "Behringer Powerplay 16"/);
  assert.match(onboardingData, /label: "별관 새벽기도"/);
  assert.match(onboardingData, /title: "Behringer Powerplay 16"/);
  assert.match(onboardingData, /VOLUME으로 음량을, PAN\/BAL로 좌우 위치를 조절합니다/);
  assert.match(script, /"aviom",\s*"morning-prayer-team",\s*"main-keys"/);
  assert.match(onboardingPage, /"aviom",\s*"morning-prayer-team",\s*"main-keys"/);
  assert.match(morningPrayerPage, /data-role="morning-prayer-team"/);
  assert.match(onboardingPage, /equipment-gallery.*is-single/);
  assert.ok(existsSync(resolve(root, "assets/behringer-powerplay-16.png")));
});

test("bass onboarding includes the Markbass front-panel reference", () => {
  assert.match(onboardingData, /title: "베이스 앰프 컨트롤"/);
  assert.match(onboardingData, /src: "assets\/markbass-little-mark-iii\.png"/);
  assert.match(onboardingData, /CLIP 표시를 확인하며 입력 레벨을 맞춥니다/);
  assert.ok(existsSync(resolve(root, "assets/markbass-little-mark-iii.png")));
});

test("drum onboarding identifies and shows the DW Collector's Series kit", () => {
  assert.match(onboardingData, /equipment: "DW Collector's Series"/);
  assert.match(onboardingData, /title: "메인 드럼 키트"/);
  assert.match(onboardingData, /src: "assets\/dw-collectors-series\.webp"/);
  assert.ok(existsSync(resolve(root, "assets/dw-collectors-series.webp")));
});
