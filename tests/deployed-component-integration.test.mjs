import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(resolve(root, path), "utf8");
const html = read("index.html");
const script = read("script.js");
const css = read("styles.css");

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
