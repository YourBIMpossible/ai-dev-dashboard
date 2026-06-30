# Mission Control — Phase 1: Dashboard-Wide UX Diagnosis & Design System
**Date:** 2026-06-28  
**Scope:** Full dashboard audit — system-level failures, direction selection, design system definition, redesign wave plan  
**Source:** Visual audit (Overview + Audit tab screenshots) + full index.html CSS/HTML analysis  

---

## 1. DIAGNOSIS — System-Level Failures

These are structural failures that affect every panel, not panel-specific bugs.

### F1 · Type Scale Chaos
**Severity: Critical**

The codebase uses 14+ distinct font sizes with no rhythm:
`9px / 9.5px / 10px / 10.5px / 11px / 11.5px / 12px / 12.5px / 13px / 13.5px / 17px / 19px / 21px / 22px`

- `9px` labels (`.grp-lbl`, `.k` in sevpip, `.wl`) are physically unreadable on 96dpi displays and fail WCAG AA
- The gap between `.card h3` (10.5px uppercase) and `h2.page` (21px) is a cliff with nothing in the middle
- Body copy switches between 12px, 12.5px, 13px, and 13.5px at the same semantic level across panels
- Sora and Inter both used for "numbers" with no consistent rule about which wins

**System effect:** Every panel looks like it was built independently. No typographic language carries across tabs.

---

### F2 · Fragmented Status Color System
**Severity: Critical**

The same "ok / warn / error" semantic is expressed through **five parallel, non-interchangeable systems**:

| System | Classes | Used in |
|--------|---------|---------|
| Stat tiles | `.ok` `.warn` `.bad` `.info` | Overview hero stats |
| Pills | `.p-active` `.p-gated` `.p-paused` `.p-dormant` | Phase status |
| Badges | `.badge.ok` `.badge.warn` `.badge.bad` `.badge.info` | Activity, git |
| Severity | `.sev-critical` `.sev-high` `.sev-medium` `.sev-low` | Audit findings |
| Card accents | `.ca-blue` `.ca-green` `.ca-amber` `.ca-red` `.ca-purple` | Impact, notes |

**System effect:** A user cannot build a mental model of "amber = warning" because amber appears as `.p-gated` (pill), `.badge.warn`, `.stat.warn`, `.ca-amber`, and direct `var(--amber)` inline — each with different background opacities, border colors, and font treatments. Status loses meaning.

---

### F3 · Fixed-Column Grid with One Breakpoint
**Severity: High**

```css
.g2{grid-template-columns:1fr 1fr;}
.g3{grid-template-columns:1fr 1fr 1fr;}
.g4{grid-template-columns:1fr 1fr 1fr 1fr;}
@media(max-width:1200px){.g4{grid-template-columns:1fr 1fr;}}
```

- No `auto-fit` / `minmax()` — columns break at one threshold only
- No breakpoint at 768px, 900px, or 1400px
- `.g3` never collapses — will clip on narrow viewports
- Sidebar is 252px fixed with `min-width:0` on main — at 900px viewport the sidebar eats 28% of space

**System effect:** The dashboard degrades silently on laptops under 1400px wide. No panel knows it's clipping.

---

### F4 · Nav Information Architecture — 13 Flat Items
**Severity: High**

The sidebar lists 13 navigation items in a flat list. The visual grouping (`.grp-lbl`) uses 9.5px/dim text that disappears into the background. The two label groups ("" and "Personal") are barely visible.

- No progressive disclosure — "Laundry Gig" and "BIMpossible Platform" are the same visual weight
- No item count on most items (BIMpossible Platform has `84%` but Toolkit, Roadmap, Strategy show raw numbers like `367`, `$15K` — different units, no units label)
- 13 nav items at 8px+1px gap = ~125px of items with the sidebar needing to scroll on small heights

**System effect:** First-time and return users cannot orient themselves in under 2 seconds. Priority is invisible.

---

### F5 · Heading Hierarchy Collapse
**Severity: High**

Within a panel:
- `h2.page` = 21px Sora — the page title  
- `.card h3` = 10.5px Inter uppercase — card section labels  
- Content text = 12-13px  

There is no h3-equivalent heading between "page title" and "card section label." Long panels like Audit and Overview require the user to visually re-anchor after every scroll because all mid-level structure is compressed into 10.5px uppercase labels that fight with muted text.

**System effect:** Scanning a panel requires reading, not skimming. Information hierarchy can't be extracted at a glance.

---

### F6 · No Defined Empty / Loading / Error States
**Severity: Medium**

The only state definition in the CSS is `.empty` (italic, dim, 12.5px text). There are:
- No skeleton loaders (the `doReload()` button shows a spinner on the sidebar but nothing in the content area)
- No error state components
- No "data unavailable" treatment for when a Python generator fails (currently panels just disappear silently, since scripts use `onerror="void 0"`)

**System effect:** When the Refresh pipeline partially fails, users see empty panels with no explanation. The `onerror` is a resilience feature without a UX complement.

---

### F7 · Implicit Spacing — No Rhythm
**Severity: Medium**

Spacing values found in the CSS: `1px 2px 3px 4px 5px 6px 7px 8px 9px 10px 11px 12px 13px 14px 15px 16px 17px 18px 19px 20px 22px 24px 26px 30px 34px 60px`. No scale. Every element negotiates its own margins.

- `main` padding is `26px 34px 60px` — asymmetric and arbitrary
- Cards use `18px 20px` padding; stats use `13px 15px`; nav items use `8px 11px`
- Section gaps vary: `14px`, `22px`, `20px`, `12px` with no rule

**System effect:** The page looks "almost right" everywhere but never quite settles. Users feel slight visual unease without knowing why.

---

### F8 · Glow Animations Create Visual Noise
**Severity: Low**

`.card.glow` and `.card.pglow` pulse via CSS keyframes on a 3.5s loop. On the Overview tab, multiple cards can glow simultaneously. The glow communicates urgency but fires even on clean/stable states when the "Focus Now" card happens to be the active one.

**System effect:** Animation without semantic intent degrades signal value. If everything glows, nothing is urgent.

---

## 2. THREE DIRECTIONS

### Direction A — MISSION CONTROL (Systematic Refinement)
**Philosophy:** Keep the dark aesthetic and information density. Impose a design system on top of what's already there. No layout surgery — fix the language, not the bones.

- Unified 5-step type scale replaces the 14-step scatter
- One status color system (3 roles: ok/warn/danger) collapses all 5 parallel systems
- Spacing rhythm based on 4px base unit
- Section headers get a proper mid-level h3 (14px Sora, not uppercase)
- Nav gets group collapsibility and a consistent badge format (number, %, or status dot — not mixed)
- Fixes all F1–F7 without redesigning any panel's information architecture

**Tradeoff:** Conservative. Won't change how the dashboard feels, only how consistent it looks. Still OLED dark / Sora / Inter.

---

### Direction B — OPS BRIDGE (Architecture Reset)
**Philosophy:** Treat the sidebar as a command surface, not a link list. Collapse 13 items to 5 primary + expandable secondary. Add a command bar at top for quick-jump.

- Sidebar becomes two-tier: icons-only at 48px + fly-out labels on hover
- Command bar (`Cmd+K`) as primary navigation
- Panels get a "compact / expanded" toggle per section for density control
- Status system consolidated to 3 traffic-light roles with named tokens
- Requires re-architecting the `show()` render system slightly

**Tradeoff:** Higher rebuild cost. The sidebar refactor touches every panel's layout. Powerful end-state but 3× the wave count.

---

### Direction C — TERMINAL DISPATCH (Radical Mono)
**Philosophy:** Lean into the codebase-tool identity. Monospace throughout, terminal-style information display, drop all card backgrounds in favor of bordered sections.

- Single font: JetBrains Mono or Fira Code (already in MASTER.md) throughout — headings and body
- No card shadows or backdrop-blur — only hairline borders
- Status expressed purely as color on text, not background fills
- Dense but ruthlessly consistent (single spacing unit: 8px)
- Very fast to read for developers but alienating for non-technical stakeholders

**Tradeoff:** High-conviction aesthetic that won't suit the full audience (investors/stakeholders may see "Roadmap"). Loses the warm project-tracker feel.

---

## 3. CHOSEN DIRECTION: A — MISSION CONTROL

**Justification:**

Direction A is correct because:
1. The dashboard's information architecture is **already good** — Overview→Project→Phase→Wave→Task drill-down works. We're not fixing the wrong thing.
2. The failures (F1–F8) are all **language failures**, not structural failures. A design system fixes them without touching panel logic.
3. Direction B's command bar requires JS changes to a 2400-line HTML file; the ROI is lower for a single-operator tool.
4. Direction C's terminal mono aesthetic loses the project-management readability the Roadmap and Strategy tabs need.

**The single sentence:** *Stop redesigning panels and start enforcing the language.*

---

## 4. DESIGN SYSTEM DEFINITION

### 4.1 Type Scale (5 steps, no exceptions)

| Step | Size | Weight | Family | Use |
|------|------|--------|--------|-----|
| `--ts-xs` | 10px | 600 | Inter | Labels, badges, pill text, uppercase meta |
| `--ts-sm` | 12px | 400/500 | Inter | Secondary content, card body, run history |
| `--ts-base` | 13.5px | 400 | Inter | Primary body text, nav items |
| `--ts-md` | 16px | 600 | Sora | Section headings (replaces missing mid-level) |
| `--ts-lg` | 21px | 700 | Sora | Page titles (h2.page) |
| `--ts-xl` | 28px | 700 | Sora | Hero numbers (stat .v) |

**Rule:** If text doesn't fit one of these 6 steps, it doesn't exist. `9px`, `9.5px`, `10.5px`, `11px`, `11.5px`, `12.5px`, `17px`, `19px`, `22px` are all abolished.

**Minimum size:** `--ts-xs` (10px) is the floor. Nothing below this renders in the UI.

---

### 4.2 Spacing Rhythm (4px base)

| Token | Value | Use |
|-------|-------|-----|
| `--sp-1` | 4px | Icon gaps, tight inline spacing |
| `--sp-2` | 8px | Nav item padding, badge padding |
| `--sp-3` | 12px | Card inner sections, form rows |
| `--sp-4` | 16px | Card padding, list gaps |
| `--sp-5` | 24px | Between sections within a panel |
| `--sp-6` | 36px | Between major content blocks |
| `--sp-7` | 48px | Page-level vertical rhythm (main padding-top) |

**`main` padding:** `var(--sp-7) var(--sp-6) 80px` (replaces `26px 34px 60px`).  
**Card padding:** `var(--sp-4) var(--sp-5)` (replaces `18px 20px`).  
**Between cards:** `var(--sp-3)` (matches existing `gap:13px` ≈ 12px).

---

### 4.3 Unified Status Color System (3 roles, one system)

All five parallel systems collapse to these tokens:

| Token | Hex | Meaning | Replaces |
|-------|-----|---------|---------|
| `--status-ok` | `#34d399` | Healthy, done, passing | `.ok`, `.p-active`, `.badge.ok`, `.clean`, `.trend.improving` |
| `--status-warn` | `#fbbf24` | In-flight, gated, degraded | `.warn`, `.p-gated`, `.badge.warn`, `.trend.flat` (demoted) |
| `--status-danger` | `#f87171` | Critical, blocked, failing | `.bad`, `.badge.bad`, `.sev-critical`, `.sev-high`, `.trend.worsening` |
| `--status-info` | `#6ea8ff` | Informational, neutral-active | `.info`, `.badge.info`, `.p-paused` |
| `--status-dim` | `#5d6880` | Inactive, historical, not-started | `.p-dormant`, `.rem`, `--dim` |

**Component token pattern** (every status component reads from these, never raw hex):
```css
/* badge — replaces .badge.ok/.warn/.bad/.info */
.st-ok    { color: var(--status-ok);     border-color: color-mix(in srgb, var(--status-ok) 30%, transparent);     background: color-mix(in srgb, var(--status-ok) 6%, transparent); }
.st-warn  { color: var(--status-warn);   border-color: color-mix(in srgb, var(--status-warn) 28%, transparent);   background: color-mix(in srgb, var(--status-warn) 5%, transparent); }
.st-danger{ color: var(--status-danger); border-color: color-mix(in srgb, var(--status-danger) 28%, transparent); background: color-mix(in srgb, var(--status-danger) 5%, transparent); }
.st-info  { color: var(--status-info);   border-color: color-mix(in srgb, var(--status-info) 28%, transparent);   background: color-mix(in srgb, var(--status-info) 5%, transparent); }
.st-dim   { color: var(--status-dim);    border-color: color-mix(in srgb, var(--status-dim) 25%, transparent);    background: color-mix(in srgb, var(--status-dim) 6%, transparent); }
```

**Severity still has 5 levels** (CRITICAL / HIGH / MEDIUM / LOW / INFO) but maps:
- CRITICAL → `--status-danger` filled background, white text (keeps current `.sev-critical`)
- HIGH → `--status-danger` + border only (no filled background — currently amber, which collides with warn)
- MEDIUM → `--status-warn`
- LOW → `--status-info` muted
- INFO → `--status-dim`

---

### 4.4 Card & Container Patterns

**One card class.** The current six card variants (`.card`, `.proj-hero`, `.proj-hero-p`, `.ov-hero`, `.ca-*`) reduce to:

```css
/* Base card — the only card class */
.card {
  background: rgba(18, 26, 48, 0.94);
  border: 1px solid var(--border);          /* rgba(255,255,255,.11) */
  border-radius: var(--r);                  /* 14px */
  padding: var(--sp-4) var(--sp-5);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.07), 0 2px 8px rgba(0,0,0,.4);
}

/* Accent variant — status-signaling card (replaces all .ca-* and proj-hero variants) */
.card[data-accent="ok"]     { border-left: 3px solid var(--status-ok);     background: color-mix(in srgb, var(--status-ok) 4%, rgba(18,26,48,.94)); }
.card[data-accent="warn"]   { border-left: 3px solid var(--status-warn);   background: color-mix(in srgb, var(--status-warn) 3%, rgba(18,26,48,.94)); }
.card[data-accent="danger"] { border-left: 3px solid var(--status-danger); background: color-mix(in srgb, var(--status-danger) 4%, rgba(18,26,48,.94)); }
.card[data-accent="focus"]  { border-color: rgba(110,168,255,.36); animation: wglow 3.5s ease-in-out infinite; }
```

**Rule:** `data-accent` is set by JS when the card's content has semantic status. Not applied manually per-panel.

---

### 4.5 Section Header Pattern

Replace current `.sec-hd .t` (gradient clip + 11px uppercase) with:

```css
/* Mid-level section heading — the missing hierarchy step */
.sh {
  font-family: Sora, sans-serif;
  font-size: var(--ts-md);   /* 16px */
  font-weight: 600;
  color: var(--text);
  margin: var(--sp-5) 0 var(--sp-3);
}
.sh small {
  font-size: var(--ts-xs);    /* 10px */
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .10em;
  color: var(--muted);
  margin-left: 8px;
}
```

Uppercase `SECTION_LABEL` labels (current `.sec-hd`) remain for **sub-section dividers only** (not primary section titles).

---

### 4.6 Navigation Badge Format

Standardise all sidebar item badges to one of three formats:
- **Status dot only** — `●` in ok/warn/danger color — for items with a live health signal
- **Number badge** — `367` — raw count (for commit counts, wave counts)
- **Percent badge** — `84%` — for completion

No mixing formats on the same item. Choose one per item and stick to it. Items with no computable badge show nothing.

---

### 4.7 Grid System

```css
/* Responsive columns — replaces .g2/.g3/.g4 */
.g2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--sp-3); }
.g3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--sp-3); }
.g4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: var(--sp-3); }
```

`auto-fit + minmax` means the layout degrades gracefully at any viewport — no breakpoints needed for column reflow.

---

### 4.8 Empty / Loading / Error States

```css
/* Skeleton loader — matches card shape */
.skel { background: linear-gradient(90deg, rgba(255,255,255,.03) 25%, rgba(255,255,255,.07) 50%, rgba(255,255,255,.03) 75%); background-size: 200% 100%; animation: skel-shimmer 1.4s ease infinite; border-radius: 6px; }
@keyframes skel-shimmer { to { background-position: -200% 0; } }

/* Error state */
.state-error { color: var(--status-danger); font-size: var(--ts-sm); display: flex; align-items: center; gap: 6px; padding: var(--sp-3) 0; }

/* Empty state */
.state-empty { color: var(--muted); font-size: var(--ts-sm); font-style: italic; padding: var(--sp-4) 0; }

/* Data unavailable (generator failed) */
.state-unavail { color: var(--status-dim); font-size: var(--ts-xs); letter-spacing: .04em; text-transform: uppercase; padding: var(--sp-3) 0; }
```

Every panel that reads from an `onerror`-guarded script must render `.state-unavail` when the global is undefined.

---

### 4.9 Animation Policy

- **`.card.glow`**: Fire only when the panel's data indicates an active alert or "Focus Now" state. Not decorative.
- **`.fade`**: Keep for all panel renders — it's subtle and confirms content loaded.
- **Glow cap**: At most one glow card visible at a time. If multiple qualify, rank by severity.
- **Reduce-motion**: Already respected — no changes needed.

---

### 4.10 Anti-Pattern List

| Anti-pattern | Current occurrence | Correct pattern |
|-------------|-------------------|-----------------|
| Font size below 10px | 9px, 9.5px across many labels | `--ts-xs` (10px) minimum |
| Parallel status systems | 5 systems for same 3 meanings | Single `st-ok/warn/danger/info/dim` |
| Raw rgba() in component CSS | Hundreds of inline rgba values | CSS variables (`--status-*`, `--sp-*`) |
| Fixed grid columns without auto-fit | `.g2/.g3/.g4` | `auto-fit + minmax` |
| Glow on non-urgent cards | Multiple cards glow simultaneously | Semantic glow only (one at a time) |
| No empty/error state components | Silent `void 0` on script failure | `.state-unavail` / `.state-error` |
| Mixed badge formats in nav | `84%` vs `367` vs `$15K` vs dot | Pick one format per item |
| 14+ font sizes | Scattered from 9px to 22px | 5-step scale only |
| Missing mid-level heading | 21px → 10.5px heading cliff | Add `.sh` at 16px Sora |
| `color-mix()` inline per-component | Per-class rgba opacity math | `color-mix()` via CSS variable |

---

## 5. REDESIGN WAVE PLAN

Ordered by value delivered per effort. Each wave is self-contained — the dashboard remains functional after each.

### Wave 1 — CSS Token Layer (no HTML changes)
**Effort:** ~2hr | **Impact:** Visual consistency across entire dashboard immediately

1. Add `--ts-*`, `--sp-*`, `--status-*` tokens to `:root`  
2. Replace all explicit font-sizes with `--ts-*` tokens throughout  
3. Replace card padding/margin scatter with `--sp-*` tokens  
4. Add `st-ok/warn/danger/info/dim` component classes  
5. Add skeleton, empty, error, unavail state CSS  

*Nothing changes visually yet in a breaking way — token aliases map to same values initially, then tighten.*

---

### Wave 2 — Status System Consolidation
**Effort:** ~3hr | **Impact:** Eliminates cognitive load of 5 parallel systems

1. Audit every use of `.p-active/.p-gated/.p-paused/.p-dormant`, `.badge.ok/warn/bad`, `.stat.ok/warn/bad`, `.ca-*`, `.sev-*` in HTML  
2. Replace pill classes: `p-active → pill st-ok`, `p-gated → pill st-warn`, `p-paused → pill st-info`, `p-dormant → pill st-dim`  
3. Consolidate badge classes to `badge st-*`  
4. Fix HIGH severity: change from amber fill to `st-danger` border-only treatment  
5. Update Impact panel `card()` function to use `data-accent` instead of inline background colors  

---

### Wave 3 — Grid Responsiveness
**Effort:** ~1hr | **Impact:** Fixes layout on all viewport widths

1. Replace `.g2/.g3/.g4` with `auto-fit + minmax` versions  
2. Remove `@media(max-width:1200px)` grid overrides (no longer needed)  
3. Test at 900px, 1200px, 1400px, 1600px viewport widths  

---

### Wave 4 — Type Scale Enforcement
**Effort:** ~2hr | **Impact:** Legibility on all screens, WCAG compliance

1. Find all `font-size:9px`, `9.5px`, `10.5px`, `11px`, `11.5px`, `12.5px`, `17px`, `19px` in index.html  
2. Map each to nearest `--ts-*` step (round up for readability)  
3. Add `.sh` section heading class, apply in Overview and Audit panels  
4. Verify no text is below `--ts-xs` (10px) after changes  

---

### Wave 5 — Navigation Hierarchy
**Effort:** ~2hr | **Impact:** Orientation speed, sidebar usefulness

1. Add group header labels with consistent capitalization and slightly more visual weight  
2. Standardise all sidebar badges to single format per item (see 4.6)  
3. Add `aria-label` and keyboard nav support to `.nav` items  
4. Optional: add collapse toggle on personal project group  

---

### Wave 6 — Empty & Error State Wiring
**Effort:** ~2hr | **Impact:** Operational trust when generators fail

1. Wrap each `window.GLOBAL` consumer in a guard that renders `.state-unavail` if undefined  
2. Wire the `doReload()` function to show `.skel` placeholders in the content area during reload  
3. Apply `.state-error` in audit/run-history panels for 404 or parse failures  

---

### Wave 7 — Glow Semantics
**Effort:** ~1hr | **Impact:** Animation regains meaning

1. Add JS logic to identify the highest-priority card per page render  
2. Apply `.card.glow` only to that card, not decoratively  
3. Remove `.pglow` from personal cards unless there is an actual alert condition  

---

## 6. DELIVERABLE SUMMARY

| Item | Status |
|------|--------|
| Dashboard-wide diagnosis (F1–F8) | ✅ This document |
| Visual audit (Overview + Audit screenshots) | ✅ Captured |
| Design system MASTER.md | ✅ `design-system/MASTER.md` |
| 3 directions proposed | ✅ A / B / C |
| Direction selected with justification | ✅ Direction A |
| Type scale definition | ✅ 5-step `--ts-*` |
| Spacing rhythm | ✅ 7-step `--sp-*` |
| Color roles | ✅ 5-role `--status-*` |
| Card/container patterns | ✅ Single `.card` + `data-accent` |
| Section heading pattern | ✅ `.sh` at `--ts-md` |
| Empty/loading/error states | ✅ 4 state components |
| Grid system | ✅ `auto-fit + minmax` |
| Anti-pattern list | ✅ 10 named patterns |
| Redesign wave plan | ✅ 7 waves, ordered by value |

**Next:** Wave 1 (CSS token layer) on user approval. No HTML changes in Wave 1 — it's a pure CSS token pass that de-risks the entire sequence.
