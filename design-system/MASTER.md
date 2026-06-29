# Mission Control — Design System MASTER
**Last updated:** 2026-06-28 (post Wave 6 + cleanup)  
**Status:** Waves 1–6 shipped. Compatibility aliases stripped. Baseline locked.

---

## Identity

| Property | Value |
|----------|-------|
| Pattern | Real-Time / Operations Dashboard |
| Mode | Dark Only (OLED) |
| Heading font | Sora |
| Body font | Inter |
| Code/mono | Fira Code (data labels, file paths) |
| Base | `#07080d` background, `#e2e6f3` text |

---

## Type Scale

```css
:root {
  --ts-xs:   10px;    /* labels, badges, uppercase meta — MINIMUM */
  --ts-sm:   12px;    /* secondary content, card body */
  --ts-base: 13.5px;  /* primary body */
  --ts-md:   16px;    /* section headings (.sh) */
  --ts-lg:   21px;    /* page titles (h2.page) */
  --ts-xl:   28px;    /* hero numbers */
}
```

**Rule:** Only these 6 sizes exist. No 9px–12.5px free-floating values.

---

## Spacing

```css
:root {
  --sp-1: 4px;   --sp-2: 8px;  --sp-3: 12px; --sp-4: 16px;
  --sp-5: 24px;  --sp-6: 36px; --sp-7: 48px;
}
```

---

## Status System (Single Source of Truth)

```css
:root {
  --status-ok:     #34d399;
  --status-warn:   #fbbf24;
  --status-danger: #f87171;
  --status-info:   #6ea8ff;
  --status-dim:    #5d6880;
}
```

**Modifier classes** (`.st-*`) — apply to any shape class (`.pill`, `.badge`, `.stat`):

```css
.st-ok     { color: var(--status-ok);     border-color: rgba(52,211,153,.30);    background: rgba(52,211,153,.06); }
.st-warn   { color: var(--status-warn);   border-color: rgba(251,191,36,.28);    background: rgba(251,191,36,.05); }
.st-danger { color: var(--status-danger); border-color: rgba(248,113,113,.28);   background: rgba(248,113,113,.05); }
.st-info   { color: var(--status-info);   border-color: rgba(110,168,255,.28);   background: rgba(110,168,255,.06); }
.st-dim    { color: var(--status-dim);    border-color: rgba(93,104,128,.25);    background: rgba(93,104,128,.06); }
```

**Shape classes require `border: 1px solid transparent` as their base** so `.st-*` `border-color` takes effect.

---

## Composition Pattern

```
shape class  +  color modifier
.pill.st-ok        → green pill
.badge.st-warn     → amber badge
.stat.st-danger    → red stat tile
```

---

## Command Bar Pattern (`.ov-cmd`)

The single most important surface-level pattern. Used on Overview, Audit, Codebase, Strategy.

```html
<div class="ov-cmd [clear|warn|danger]">
  <div class="ov-cmd-dot"></div>
  <div class="ov-cmd-items">
    <span class="badge st-danger">3 critical</span>
    <span class="badge st-warn">5 warnings</span>
  </div>
  <span class="ov-cmd-meta">42 total · 7 closed</span>
</div>
```

**Hierarchy rule:** command bar is always the first content after the `<h2>`. Never below fold on first view.

**State logic:**
- `danger` → any P1 or hot audit item
- `warn` → pending decisions, blind spots, stale data
- `clear` → nothing urgent

---

## Left-Accent Cards (`.ca-*`)

Risk/gap grouping by semantic color. Used for scanning: danger > amber > green > grey.

```css
.ca-red   { border-left: 4px solid var(--status-danger); background: rgba(248,113,113,.04); padding-left: 18px; }
.ca-amber { border-left: 4px solid var(--status-warn);   background: rgba(251,191,36,.03);  padding-left: 18px; }
.ca-green { border-left: 4px solid var(--status-ok);     background: rgba(52,211,153,.04);  padding-left: 18px; }
.ca-grey  { border-left: 4px solid var(--border);        background: transparent;           padding-left: 18px; }
```

**Semantic assignment:**
- `.ca-red` — active risk, blocking, live issue
- `.ca-amber` — gap, missing, unknown (NOT low priority — unknown risk is amber)
- `.ca-green` — healthy, clear, resolved
- `.ca-grey` — neutral, historical, contextual

---

## Severity Badges (`.sev-*`)

Used in Audit findings:

```css
.sev-critical { color: #fff;              background: var(--status-danger); ... }
.sev-high     { color: var(--status-danger); background: rgba(248,113,113,.08); ... }
.sev-medium   { color: var(--status-warn);   background: rgba(251,191,36,.08); ... }
.sev-low      { color: var(--status-dim);    background: rgba(93,104,128,.08); ... }
.sev-info     { color: var(--status-info);   background: rgba(110,168,255,.08); ... }
```

---

## Grid

```css
.g2  { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--sp-3); }
.g3  { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--sp-3); }
.g4  { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: var(--sp-3); }
.gmg { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: var(--sp-3); }
```

---

## Section Heading

```css
.sh { font-family: Sora; font-size: var(--ts-md); font-weight: 600; color: var(--text); margin: var(--sp-5) 0 var(--sp-3); }
.sh small { font-size: var(--ts-xs); font-weight: 600; text-transform: uppercase; letter-spacing: .10em; color: var(--muted); margin-left: 8px; }
```

---

## States

```css
.skel        { background: linear-gradient(90deg, rgba(255,255,255,.03) 25%, rgba(255,255,255,.07) 50%, rgba(255,255,255,.03) 75%); background-size: 200% 100%; animation: skel-shimmer 1.4s ease infinite; border-radius: 6px; }
.state-error   { color: var(--status-danger); font-size: var(--ts-sm); }
.state-empty   { color: var(--muted); font-size: var(--ts-sm); font-style: italic; }
.state-unavail { color: var(--status-dim); font-size: var(--ts-xs); text-transform: uppercase; letter-spacing: .04em; }
```

---

## Hierarchy Principle (applies to all surfaces)

Every surface follows the same information hierarchy:

1. **Command bar** (`.ov-cmd`) — state summary, risk count, urgency signal
2. **Primary truth** — the thing that most needs attention, first visible
3. **Compressed secondaries** — supporting detail, collapsed or compact
4. **History / deep detail** — accessible, not default

**Rule:** If the first screenful after the heading doesn't show the most urgent thing, the hierarchy failed. Category counts are secondary to priority/urgency at every level.

---

## Anti-Patterns

- Font size below `--ts-xs` (10px)
- Hardcoded `rgba()` or hex for colors that have a `--status-*` equivalent
- Adding a new pill/badge variant instead of using `.st-*`
- Using the old alias names: `.badge.ok`, `.badge.warn`, `.badge.bad`, `.stat.ok`, `.stat.warn`, `.stat.bad` — **these are stripped; `.st-*` only**
- `.ca-amber` for "low priority" — amber = gap/unknown, not low urgency
- Command bar below the first scroll
- More than one `.card.glow` visible at once

---

## Wave Completion Log

| Wave | What shipped | Commit |
|------|-------------|--------|
| 1 | CSS token layer — type scale, spacing, status semantics, `st-*` classes | `32b35eb` |
| 2 | Status system consolidation — replaced 5 parallel systems with `st-*` | `2931530` |
| 3 | Overview hierarchy — command bar, primary BIMpossible card, compact satellites | `a8fd3ec` |
| 3 cleanup | Plain-language command bar labels | `a3ca2e4` |
| 4 | Audit hierarchy — command bar, risk-first groups, compressed clean list | `2cdad83` |
| 4 cleanup | Audit command bar wording pass | `c2d94f6` |
| 5 | Codebase/Knowledge Graph — single-scroll, risk-first, no tab default | `82d45db` |
| 6 | Strategy command bar + blind-spot ordering; Toolkit ctx as block text | `5f78b66` |
| — | Add 5 missing repos (ai-brain-data, workspace, dashboard-auto, pc-monitor, tests) | `a459230` |
| — | Strategy priority pass — all 36 items assigned P1/P2/P3 | `8dffb54` |
| closeout | Strip dead compat aliases; update stale dashboard-auto nextActions | `0e8573c` |
