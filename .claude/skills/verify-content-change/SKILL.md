---
name: verify-content-change
description: Verify a pluribusdigital-com content or template change: run the Jekyll site locally, confirm the affected page renders correctly, and publish a screenshot gallery at mobile/medium/full breakpoints. Propose a checkpoint commit at each verified step and wait for the user to confirm before committing. Before making the final commit that gets a branch ready to push, ask the user whether they're ready — only then regenerate the purged CSS build if styles changed, spell-check and accessibility-check the new content, surface anything the checks find, and commit. Use this proactively — as the default follow-through, not only when asked — after any edit to a `_content/*.md`, `content/*.md`, `_includes/*.html`, `_layouts/*.html`, or `css/*.css` file in this repo, and before telling the user a site change is done. Trigger on requests like "add a link to the contact page," "update the homepage copy," "change this button style," or "tweak the CSS" — anything that changes what a visitor sees on pluribusdigital-com.
---

# Verify a pluribusdigital-com content change

CLAUDE.md already says to "run locally before trusting a change, especially anything
touching HTML/CSS/JS." This skill is the concrete version of that: after editing rendered
site output, run the steps below — verify, screenshot, check, then commit — before
reporting the task as finished. Don't wait to be asked — this is the normal close-out for
a content change on this repo, the same way running a test suite is normal close-out for
application code.

Only skip this when the change has no rendered effect (e.g. editing a README, a redirect
target that isn't live yet, or `.claude/` config).

## 1. Start the site

```bash
cd <repo-root>
docker compose up -d
```

Docker matches the Ruby/Jekyll version GitHub Pages actually builds with — see CLAUDE.md's
"Running locally" section. Give it a few seconds, then confirm the affected page returns
200 (`curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4000/<path>/`). If a
`_config.yml` change was part of the edit, `docker compose restart` instead of just `up -d`.

If you already have the container running from earlier in the session, `docker compose
restart` is enough to pick up template/include changes — Jekyll's own watcher handles
content file changes without a restart.

## 2. Read the rendered HTML for the specific thing you changed

Before screenshotting, `curl` the page and grep for whatever you added or changed (a new
link, a class, a piece of copy). This catches Liquid/include errors immediately, and it's
much faster to iterate on than a screenshot loop.

## 3. Screenshot the affected page at three breakpoints

This machine's default Node (via `nvm`) is v16, too old for Playwright (needs 20+). Node
v24.14.0 is already installed — switch to it for this step only:

```bash
source ~/.nvm/nvm.sh && nvm use v24.14.0
```

Install Playwright into a scratch directory, never into the repo — it's throwaway tooling
for verification, not a project dependency. Install `axe-core` in the same command even
though it's only needed later in step 6 — `npm install <pkg>` prunes extraneous packages
not listed anywhere, so a second, separate `npm install` in this same scratch dir will
silently delete whatever the first one added:

```bash
cd <scratch-dir>
npm init -y && npm install --no-save playwright axe-core && npx playwright install chromium
```

Then capture full-page screenshots (not viewport-clipped) at these three widths, which
match the breakpoints this site's Bootstrap layout actually shifts at:

| name   | width | notes |
|--------|-------|-------|
| mobile | 390   | phone width |
| medium | 900   | tablet / narrow desktop |
| full   | 1440  | typical desktop |

```js
// screenshot.mjs
import { chromium } from 'playwright';

const breakpoints = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'medium', width: 900, height: 900 },
  { name: 'full', width: 1440, height: 1000 },
];

const browser = await chromium.launch();
for (const bp of breakpoints) {
  const page = await browser.newPage({ viewport: { width: bp.width, height: bp.height } });
  await page.goto('http://localhost:4000/<path>/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: `<scratch-dir>/contact-${bp.name}.png`, fullPage: true });
  await page.close();
}
await browser.close();
```

`fullPage: true` is what makes this a check of the *whole* page, not just what fits above
the fold — that matters most for CLAUDE.md's mobile/narrow/high-zoom requirement.

## 4. Publish a gallery artifact and hand back the link

Don't just describe the screenshots — publish them so the user can look at full-resolution,
real-size renders without you re-describing every pixel.

Build one HTML page (following the Artifact tool's page contract — quickstart it if you
haven't in this session) that:

- Uploads the three PNGs as artifact files and references them by relative path
- Stacks the three screenshots **vertically**, each at its **true pixel width** (390px,
  900px, 1440px) — do not scale them to a common width or lay them side by side. The point
  is to see each breakpoint at the size a real visitor sees it, and squeezing a 1440px
  screenshot into a 400px card is exactly the distortion this step exists to avoid.
- Wraps each screenshot in a horizontally-scrollable container (`overflow-x: auto`) so a
  1440px-wide image doesn't blow out the page on a narrow viewer window — vertical length is
  never clipped (no `max-height` + `overflow-y` on the image container); horizontal
  scrolling is fine since the whole point is to see the real width.
- Labels each screenshot with its breakpoint name and pixel width

Publish it and give the user the artifact link along with a one-line summary of what
changed. If this is a follow-up to something already screenshotted earlier in the
conversation, republish the same artifact (pass its `url`) instead of creating a new one.

## 5. Propose checkpoint commits as you go, ask before preparing to push

Two different kinds of commit happen in this workflow, and they're gated differently:

**Checkpoint commits** happen whenever a meaningful, verified step is complete — e.g. one
page's edit has been confirmed to render correctly in steps 1-2 — but never without asking
first. Show what would be committed (a short `git status`/summary of the files) and a
one-line proposed message, then wait for the user to confirm before running `git commit`.
Keep these lightweight otherwise: `git add` the specific files, commit with a short
message, move on. Don't run the full check suite (steps 6-7) for these — that would make
every small step as slow as finishing the whole task, defeating the point of committing
incrementally. These exist so work isn't lost and history stays readable, not as a quality
gate.

**The commit that prepares to push** — the one meant to become the tip of the branch that
goes into a PR — never happens automatically. Ask first: something like "Are you ready to
push this?" or "Want me to get this ready to push?" Only once the user confirms do you run
the full check suite (steps 6 and 7 below) and surface whatever they find *before* making
that commit. If checks turn up something, report it and let the user decide whether to fix
it, accept it, or hold off — don't silently commit past a real finding just because they
said "ready." This skill still never runs `git push` itself or opens a PR — that stays the
user's call, per CLAUDE.md's workflow — but getting the branch into push-ready shape is
what this final check-and-commit is for.

In practice this usually means: several checkpoint commits accumulate while you iterate on
a change, then the user says something like "let's push this" or "I think we're done" —
that's the cue to ask whether they're ready to push, run the checks, and make the final
commit (or amend/build on the last checkpoint — use your judgment on whether a clean
history wants a squash here, and ask if it's not obvious).

## 6. Regenerate the purged CSS if styles changed

README.md's "Managing CSS" section explains the setup: `_includes/template_meta.html`
points at `/css/build/bootstrap.min.css`, a trimmed-down build produced by `prepcss.sh`
(via `purgecss`) that only keeps the classes actually used somewhere in the site. That
build is generated, not hand-edited, and it goes stale the moment a change introduces a
class that wasn't already used elsewhere — the class exists in your HTML but purgecss
already stripped it out of the shipped CSS, so it works locally against `css/vendor/` but
silently does nothing in production.

Skip this step if the change touched no HTML/CSS (e.g. pure copy edits). Otherwise:

```bash
cd <repo-root>
git diff --stat -- _includes/template_meta.html   # confirm it's pointed at css/build, not css/vendor
bash prepcss.sh
```

Check `git diff css/build/` afterward. If it's unchanged, nothing needed to be added and
you're done. If it changed, that's expected — stage the regenerated build alongside your
content change; it's the mechanism working as intended, not a problem to fix. If
`template_meta.html` was left pointing at `css/vendor/` (a common leftover from iterating
on styles per the README), switch it back to `css/build/` before committing — shipping the
untrimmed vendor CSS to production defeats the point of purgecss.

## 7. Spell-check and accessibility-check new content

Run both checks against whatever you actually changed, not the whole site — that keeps the
signal-to-noise ratio high and keeps this fast enough to run on every change.

**Spelling.** A project dictionary lives at `<repo-root>/cspell.json` with the brand names,
acronyms, and technical terms already known to be correct (Pluribus, GSA, SEWP, purgecss,
etc.) — front-matter author initials and CamelCase tokens are ignored by regex rather than
enumerated. Run it against the files you touched:

```bash
source ~/.nvm/nvm.sh && nvm use v24.14.0
npx --yes cspell --config <repo-root>/cspell.json <changed-content-files>
```

Real typos: fix them. Words that are actually correct but unknown to cspell (a new product
name, a new acronym): add them to the `words` array in `cspell.json` and commit that change
too — the dictionary is meant to grow with the site's vocabulary rather than being rebuilt
from scratch each time. Don't add a word to silence a check without confirming with the
content it's actually correct.

**Accessibility.** Reuse the same Playwright/Chromium install from step 3 (in the same
scratch dir, since `axe-core` was installed alongside `playwright` there) and run the
bundled script against the affected page(s) on the locally-running site:

```bash
node <this-skill's-directory>/scripts/a11y_check.mjs http://localhost:4000/<path>/
```

This uses the real axe-core engine (the same one Chrome DevTools' Lighthouse/axe panel
uses), not a heuristic. Distinguish violations *your change introduced* from ones that
were already there — this site currently has a couple of known pre-existing issues (e.g.
the embedded Google Map iframe lacks a title, and the nav has a landmark-uniqueness
warning) that aren't this step's job to fix unless the user asks. Flag new violations to
the user before committing rather than silently working around them; a `serious` or
`critical` violation on something you just added is worth pausing for, not shipping past.

## 8. Make the push-ready commit

Once the screenshot review, the CSS check, and both content checks are clean (or the user
has explicitly accepted a remaining warning), stage and commit. This is the commit from
step 5's second kind — only reached because the user confirmed they're ready to push.

```bash
git status                     # see exactly what's changed, don't blindly add -A
git add <specific files>       # the content change, plus css/build/ or cspell.json if touched
git commit -m "$(cat <<'EOF'
<short, imperative summary — see `git log` for this repo's style>
EOF
)"
```

This repo's workflow (CLAUDE.md) is branch → commit → PR → merge, `main` is protected, and
commits never get pushed automatically — stop after the local commit and let the user
decide when to push and open the PR. Report the commit hash and a one-line summary of what
was included (e.g. "committed the contact-page link plus the regenerated purgecss build").

## Why this exists

This site has no CI, no automated visual regression testing, and no linting for spelling
or accessibility — Jekyll/Liquid errors, CSS breakage, typos, and a11y regressions are all
easy to miss just by reading a diff. GUIDELINES.md's mobile/narrow/high-zoom requirement in
particular can't be checked by eye on the code alone, and its plain-language/no-jargon and
semantic-HTML requirements are exactly what spelling and a11y checks catch mechanically. A
quick local render, a real screenshot at the breakpoints that matter, and two fast checks
catch most of that before a PR goes up — without needing to stand up a whole CI pipeline
for a small marketing site.
