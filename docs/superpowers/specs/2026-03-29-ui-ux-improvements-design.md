# AlgoFlow UI/UX Improvements Design Spec

## Context

AlgoFlow is an algorithm visualization web app for a mixed audience (CS students + intermediate developers). Three specialized agents (UI/UX Designer, Product Strategist, Tech Lead Architect) reviewed the current implementation and identified gaps across responsive design, accessibility, learner engagement, and visual polish. The tablet experience (768-1023px) currently falls back to a phone UI, educational content is hidden behind a button, and several WCAG accessibility requirements are unmet. A light theme was also requested.

This spec uses a **Foundation First** phasing strategy: fix critical infrastructure and accessibility gaps first, then enhance the learning experience, then polish.

---

## Phase 1: Foundation — Tablet Layout, Light Theme, Accessibility

### 1.1 Tablet Layout (768-1023px)

**Problem:** iPad and tablet users see the mobile single-panel tab layout, wasting screen space.

**Design:** Side-by-side 2-panel layout:

- Left: Visualization panel (60% default, min 40%)
- Right: Explanation/Code panel (40% default, min 25%) with tab toggle in panel header ("Steps" | "Code")
- Uses `react-resizable-panels` (already a dependency) with a draggable separator

**Architecture changes:**

- `src/hooks/useResponsiveLayout.ts` — return type changes from `boolean` to `LayoutTier = "mobile" | "tablet" | "desktop"`. Uses two `matchMedia` queries with `useSyncExternalStore`.
- `src/components/layout/AppShell.tsx` — three-way branch: `MobileLayout` | `TabletLayout` | `DesktopLayout`
- New file: `src/components/layout/TabletLayout.tsx` — 2-panel layout with Steps/Code tab switcher in right panel header
- `src/components/layout/PanelLayout.tsx` — rename to `DesktopLayout.tsx` for clarity (single consumer: AppShell)
- `src/utils/constants.ts` — `BREAKPOINTS` values remain unchanged (mobile: 768, tablet: 1024)

### 1.2 Light/Dark Theme System

**Design:** Class-based theme switching using `data-theme="light"` on `<html>`.

**Token architecture (two-layer):**

- `@theme` block in `src/index.css` declares semantic token names with `initial` values
- `@layer base` block sets actual values per theme class

**Light theme surface tokens:**

| Token                       | Dark      | Light                |
| --------------------------- | --------- | -------------------- |
| `--color-surface-primary`   | `#09090b` | `#f4f4f5` (zinc-100) |
| `--color-surface-secondary` | `#18181b` | `#ffffff`            |
| `--color-surface-tertiary`  | `#27272a` | `#e4e4e7` (zinc-200) |
| `--color-surface-elevated`  | `#3f3f46` | `#d4d4d8` (zinc-300) |
| `--color-border-default`    | `#3f3f46` | `#d4d4d8`            |
| `--color-border-subtle`     | `#27272a` | `#e4e4e7`            |
| `--color-text-primary`      | `#fafafa` | `#09090b`            |
| `--color-text-secondary`    | `#a1a1aa` | `#52525b`            |
| `--color-text-muted`        | `#71717a` | `#71717a` (same)     |

**Visualization accent tokens (`--color-viz-*`) stay identical in both themes** — learners build a mental model around these colors that must not change.

**Key implementation notes:**

- Theme toggle: `IconButton` with `FiSun`/`FiMoon` in Header, between algorithm selector and educational drawer toggle
- State: add `theme: "dark" | "light" | "system"` to `src/store/ui-slice.ts`
- Persistence: `localStorage.getItem("algoflow-theme")` — read on store init, write on change. Not Zustand persist middleware.
- Monaco sync: call `monaco.editor.setTheme()` (vs-dark / vs-light) when theme changes
- Monaco highlighted-line: add `[data-theme="light"] .highlighted-line { background: rgba(34, 211, 238, 0.20) }` (0.12 is invisible on white)
- Default bar color fix: bump `--color-viz-default` from `#52525b` to `#71717a` (dark), `#a1a1aa` (light) — current value fails 3:1 contrast

**Files to modify:**

- `src/index.css` — restructure `@theme` to two-layer, add light theme values, update highlighted-line
- `src/store/ui-slice.ts` — add `theme`, `setTheme()`, `toggleTheme()` actions
- `src/components/layout/Header.tsx` — add theme toggle button
- `src/components/code-panel/CodePanel.tsx` — sync Monaco theme on `theme` state change

### 1.3 Accessibility Fixes

| Fix                                                             | File(s)                                                                                                        | WCAG Ref |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------- |
| Framer Motion `useReducedMotion()` on all `motion.*` components | `EducationalDrawer.tsx`, `AlgorithmSelectorModal.tsx`, all visualizers using `motion.*`                        | 2.3.3    |
| Focus trap in `AlgorithmSelectorModal`                          | `AlgorithmSelectorModal.tsx` — use `focus-trap-react` (new dep) or manual keydown handler                      | 2.1.2    |
| ARIA roles on `MobileLayout` tabs                               | `MobileLayout.tsx` — add `role="tablist"`, `role="tab"`, `aria-selected`, `role="tabpanel"`, `aria-labelledby` | 4.1.2    |
| `EducationalDrawer` focus management                            | `EducationalDrawer.tsx` — move focus to drawer on open, return to trigger on close                             | 2.4.3    |
| `AlgorithmSelectorModal` `aria-labelledby`                      | `AlgorithmSelectorModal.tsx` — add heading id + `aria-labelledby` to dialog                                    | 4.1.2    |
| Header `aria-haspopup` + `aria-expanded`                        | `Header.tsx` — add to algorithm selector button                                                                | 4.1.2    |
| `--color-viz-default` contrast                                  | `src/index.css` — bump from `#52525b` to `#71717a`                                                             | 1.4.11   |

---

## Phase 2: Learner Engagement

### 2.1 Educational Content in Main Flow

**Problem:** Educational content (overview, complexity, real-world uses) is locked behind the EducationalDrawer toggle. A learner watching the animation gets no answer to "why does this matter?"

**Design:** Add a collapsed overview strip to the top of `ExplanationPanel`:

- Shows `definition.meta.description` (one-sentence summary)
- Shows time/space complexity cards (reuse existing `HighlightCard` pattern from drawer)
- Always visible — no toggle needed
- Full deep-dive content stays in the EducationalDrawer

**Files:** `src/components/explanation-panel/ExplanationPanel.tsx`

### 2.2 First-Run Onboarding Nudge

**Problem:** First-time visitors see a static visualization at step 0 with no indication they should press Play.

**Design:** Single contextual tooltip overlaid on the Play button:

- Text: "Press Play to see Bubble Sort in action"
- Appears only on first visit (check `localStorage.getItem("algoflow-onboarding-complete")`)
- Disappears on first user interaction (play, step, keyboard shortcut)
- Implemented as a Framer Motion tooltip component in `AppShell.tsx`
- Not a tour/wizard — just one nudge

**Files:** `src/components/layout/AppShell.tsx`, `src/store/ui-slice.ts` (add `onboardingCompleted` state)

### 2.3 Algorithm Difficulty Labels

**Problem:** 15+ algorithms listed with no indication of difficulty. Learners can't self-sort by challenge level.

**Design:**

- Add `difficulty: "beginner" | "intermediate" | "advanced"` to `AlgorithmMeta` type
- Show colored badge in `AlgorithmSelectorModal` next to each algorithm name
- Show `timeComplexity.average` as secondary text
- Sort algorithms within each category group from beginner → advanced

**Files:** `src/types/algorithm.ts`, `src/components/layout/AlgorithmSelectorModal.tsx`, all algorithm `index.ts` files (add difficulty)

### 2.4 Cross-Algorithm Linking

**Problem:** Educational content mentions related algorithms (e.g., Bubble Sort mentions Merge Sort) but they're plain text, not navigable.

**Design:** In the EducationalDrawer, match algorithm names from the registry (via `registry.getAll()`) against the markdown text in "When to Use It" and "Strengths & Limitations" sections. Replace matched names with clickable links that call `selectAlgorithm(matchedId)` and close the drawer. Use a custom `react-markdown` component override for text nodes to perform the matching.

**Files:** `src/components/educational/EducationalDrawer.tsx`

### 2.5 Keyboard Shortcut Discoverability

**Problem:** Powerful shortcuts (Space, arrows, R, 1-5, L) exist but no in-app reference.

**Design:**

- Add `?` keyboard shortcut that opens a cheat sheet modal
- Add `title` attributes to all `IconButton` instances (tooltips on hover)
- Add `kbd`-styled hint ("Space") on the Play button tooltip

**Files:** `src/hooks/useKeyboardShortcuts.ts`, new `KeyboardShortcutsModal` component, `src/components/shared/IconButton.tsx`

### 2.6 Mobile Tab Rename

Rename "Details" → "Steps" in `MobileLayout.tsx` for clarity.

### 2.7 Step Type Badge Coloring

Map badge colors to viz state semantics: compare=cyan, swap=amber, sorted=emerald, visiting=blue, visited=violet.

**Files:** `src/components/explanation-panel/ExplanationPanel.tsx`, `src/components/shared/Badge.tsx`

---

## Phase 3: Polish & Micro-interactions

| Enhancement                      | Description                                                          | File(s)                                 |
| -------------------------------- | -------------------------------------------------------------------- | --------------------------------------- |
| Algorithm switch cross-fade      | 100ms opacity transition via `AnimatePresence` keyed to `selectedId` | `VisualizationPanel.tsx`                |
| Panel mount fade-in              | `motion.div` with `opacity: 0 -> 1` over 150ms on panel content      | `DesktopLayout.tsx`, `TabletLayout.tsx` |
| Progress bar scrub tooltip       | Floating "Step N" div while range input is active                    | `PlaybackControls.tsx`                  |
| Arrow-key nav in algorithm modal | `ArrowDown/Up` to cycle results, `Enter` to select                   | `AlgorithmSelectorModal.tsx`            |
| Speed selector consistency       | Replace native `<select>` with shared `Select` component             | `PlaybackControls.tsx`                  |
| Empty metric filtering           | Only show metrics where `value > 0`                                  | `ExplanationPanel.tsx`                  |
| Educational drawer tab shift     | Reduce `y: 10` to `y: 4` for subtler content swap                    | `EducationalDrawer.tsx`                 |
| Educational drawer active state  | Cyan ring/fill on `FiBookOpen` when drawer is open                   | `Header.tsx`                            |
| ExplanationPanel min size        | Raise from `minSize={15}` to `minSize={18}`                          | `DesktopLayout.tsx`                     |
| Mobile step counter              | Move step counter above button row, always visible                   | `PlaybackControls.tsx`                  |
| Mobile viz padding               | Reduce `p-4` to `p-2` on mobile for arrays with many elements        | `ArrayVisualizer.tsx`                   |

---

## Rejected

| Proposal                               | Reason                                                                                                                 |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Gamification / progress tracking       | Optimizes engagement metrics, not learning. Risks badge-collecting without understanding.                              |
| Animated theme transition              | CSS custom property cascade invalidation across entire DOM causes noticeable style recalc. Instant switch is standard. |
| Light/dark `prefers-color-scheme` only | Users need explicit toggle for agency. Media query is the fallback for "system" mode.                                  |

---

## Verification

### Phase 1

- [ ] Open app at 900px width — see 2-panel tablet layout (viz + explanation), not mobile tabs
- [ ] Toggle theme — all surface tokens switch, viz accent colors stay identical
- [ ] Monaco editor switches between vs-dark and vs-light themes
- [ ] Theme preference persists across page reload
- [ ] Enable `prefers-reduced-motion` in OS — all Framer Motion animations disabled
- [ ] Tab through AlgorithmSelectorModal — focus stays trapped inside
- [ ] Open EducationalDrawer with keyboard — focus moves to drawer, returns on close
- [ ] Screen reader announces MobileLayout tabs with proper roles
- [ ] `--color-viz-default` passes 3:1 contrast ratio check

### Phase 2

- [ ] ExplanationPanel shows overview strip with description + complexity on load
- [ ] First visit shows Play button nudge tooltip, dismisses on interaction
- [ ] Algorithm selector shows difficulty badges and complexity info
- [ ] Algorithm names in educational content are clickable links
- [ ] `?` key opens keyboard shortcuts modal
- [ ] Mobile tabs show "Steps" instead of "Details"

### Phase 3

- [ ] Algorithm switch shows brief cross-fade transition
- [ ] Progress bar shows "Step N" tooltip while scrubbing
- [ ] Arrow keys navigate algorithm selector results
- [ ] Only non-zero metrics show in ExplanationPanel

---

## Key Files Summary

**New files:**

- `src/components/layout/TabletLayout.tsx`
- `src/components/shared/KeyboardShortcutsModal.tsx`

**Renamed:**

- `src/components/layout/PanelLayout.tsx` → `src/components/layout/DesktopLayout.tsx`

**Major modifications:**

- `src/index.css` — two-layer theme tokens, light theme values
- `src/hooks/useResponsiveLayout.ts` — `boolean` → `LayoutTier`
- `src/store/ui-slice.ts` — theme, onboarding state
- `src/components/layout/AppShell.tsx` — 3-way layout branch, onboarding nudge
- `src/components/layout/Header.tsx` — theme toggle, ARIA attributes
- `src/components/layout/AlgorithmSelectorModal.tsx` — focus trap, ARIA, keyboard nav, difficulty badges
- `src/components/layout/MobileLayout.tsx` — ARIA roles, tab rename
- `src/components/educational/EducationalDrawer.tsx` — focus management, reduced-motion, cross-algorithm links
- `src/components/explanation-panel/ExplanationPanel.tsx` — overview strip, badge colors, metric filtering
- `src/components/playback/PlaybackControls.tsx` — scrub tooltip, step counter, speed selector
- `src/components/code-panel/CodePanel.tsx` — Monaco theme sync
- `src/types/algorithm.ts` — `difficulty` field on AlgorithmMeta
