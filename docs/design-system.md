[← Back to README](../README.md)

# Design System

AlgoFlow's visual language: colors, typography, spacing, layout breakpoints, and component patterns. This guide helps designers and developers build UI elements that feel consistent with the rest of the application.

> **Prerequisites:** None for designers; [Architecture](architecture.md) for developers wanting code context.

## Contents

- [Color Palette](#color-palette)
- [Visualization State Colors](#visualization-state-colors)
- [Category Accent Map](#category-accent-map)
- [Typography](#typography)
- [Breakpoints & Layout](#breakpoints--layout)
- [Component Patterns](#component-patterns)
- [Accessibility Guidelines](#accessibility-guidelines)

---

## Color Palette

### Surfaces

Token names are declared in `@theme` and values are set per theme in `@layer base`. Dark theme is the default (`:root`); light theme activates via `:root[data-theme="light"]`.

| Token                       | Dark Theme (Default) | Light Theme          | Usage                       |
| --------------------------- | -------------------- | -------------------- | --------------------------- |
| `--color-surface-primary`   | `#09090b` (zinc-950) | `#f4f4f5` (zinc-100) | Page background             |
| `--color-surface-secondary` | `#18181b` (zinc-900) | `#ffffff` (white)    | Panel backgrounds           |
| `--color-surface-tertiary`  | `#27272a` (zinc-800) | `#e4e4e7` (zinc-200) | Hover states, card fills    |
| `--color-surface-elevated`  | `#3f3f46` (zinc-700) | `#d4d4d8` (zinc-300) | Elevated elements, tooltips |

### Borders

| Token                    | Dark Theme (Default) | Light Theme          | Usage             |
| ------------------------ | -------------------- | -------------------- | ----------------- |
| `--color-border-default` | `#3f3f46` (zinc-700) | `#d4d4d8` (zinc-300) | Standard borders  |
| `--color-border-subtle`  | `#27272a` (zinc-800) | `#e4e4e7` (zinc-200) | Subtle separators |

### Text

| Token                    | Dark Theme (Default) | Light Theme          | Usage                          |
| ------------------------ | -------------------- | -------------------- | ------------------------------ |
| `--color-text-primary`   | `#fafafa` (zinc-50)  | `#09090b` (zinc-950) | Body text, headings            |
| `--color-text-secondary` | `#a1a1aa` (zinc-400) | `#52525b` (zinc-600) | Secondary labels, descriptions |
| `--color-text-muted`     | `#71717a` (zinc-500) | `#71717a` (zinc-500) | Disabled text, placeholders    |

### Accent Colors

| Token                    | Value     | Semantic Use                      |
| ------------------------ | --------- | --------------------------------- |
| `--color-accent-emerald` | `#34d399` | Success, sorted, completed        |
| `--color-accent-cyan`    | `#22d3ee` | Active, comparing, line highlight |
| `--color-accent-amber`   | `#fbbf24` | Warning, swapping, path           |
| `--color-accent-rose`    | `#fb7185` | Error, current node               |
| `--color-accent-violet`  | `#a78bfa` | Visited nodes                     |
| `--color-accent-blue`    | `#60a5fa` | Visiting, info states             |

---

## Visualization State Colors

These tokens map directly to algorithm visualization states. When building a new visualizer, use these tokens to ensure consistent meaning across all algorithms.

| Token                    | Color              | Hex                       | Algorithm State                |
| ------------------------ | ------------------ | ------------------------- | ------------------------------ |
| `--color-viz-comparing`  | Cyan               | `#22d3ee`                 | Elements being compared        |
| `--color-viz-swapping`   | Amber              | `#fbbf24`                 | Elements being swapped         |
| `--color-viz-sorted`     | Emerald            | `#34d399`                 | Elements in final position     |
| `--color-viz-found`      | Emerald            | `#34d399`                 | Target element found           |
| `--color-viz-eliminated` | Gray               | `#71717a`                 | Elements ruled out             |
| `--color-viz-visiting`   | Blue               | `#60a5fa`                 | Node currently being processed |
| `--color-viz-visited`    | Violet             | `#a78bfa`                 | Node already processed         |
| `--color-viz-path`       | Amber              | `#fbbf24`                 | Path reconstruction highlight  |
| `--color-viz-wall`       | Gray               | `#3f3f46`                 | Grid wall cells                |
| `--color-viz-current`    | Rose               | `#fb7185`                 | Currently active element       |
| `--color-viz-window`     | Cyan (30% opacity) | `rgba(34, 211, 238, 0.3)` | Sliding window range           |
| `--color-viz-default`    | Gray               | `#52525b`                 | Unprocessed/default state      |

All defined in `src/index.css` under the `@theme` block.

---

## Category Accent Map

`CATEGORY_ACCENT_MAP` in `src/utils/constants.ts` maps each algorithm category to one of the 6 accent CSS custom properties. This drives the color-coded dot in the header search bar and the accent left border on category headers in the algorithm selector modal.

| Category              | Accent Token             | Color   |
| --------------------- | ------------------------ | ------- |
| `sorting`             | `--color-accent-cyan`    | Cyan    |
| `searching`           | `--color-accent-emerald` | Emerald |
| `graph`               | `--color-accent-violet`  | Violet  |
| `pathfinding`         | `--color-accent-amber`   | Amber   |
| `dynamic-programming` | `--color-accent-rose`    | Rose    |
| `arrays`              | `--color-accent-blue`    | Blue    |
| `trees`               | `--color-accent-emerald` | Emerald |
| `linked-lists`        | `--color-accent-cyan`    | Cyan    |
| `heaps`               | `--color-accent-amber`   | Amber   |
| `stacks-queues`       | `--color-accent-rose`    | Rose    |
| `hash-maps`           | `--color-accent-violet`  | Violet  |
| `strings`             | `--color-accent-blue`    | Blue    |
| `matrices`            | `--color-accent-cyan`    | Cyan    |
| `sets`                | `--color-accent-emerald` | Emerald |

When adding a new category, add an entry to `CATEGORY_ACCENT_MAP` to assign its accent color.

---

## Typography

| Token         | Value                                                        | Usage                             |
| ------------- | ------------------------------------------------------------ | --------------------------------- |
| `--font-sans` | `"Inter", system-ui, -apple-system, sans-serif`              | UI text, labels, descriptions     |
| `--font-mono` | `"JetBrains Mono", ui-monospace, "Cascadia Code", monospace` | Code editor (Monaco), code blocks |

## Spacing

| Token                 | Value | Usage                        |
| --------------------- | ----- | ---------------------------- |
| `--spacing-panel-gap` | `4px` | Gap between resizable panels |

---

## Breakpoints & Layout

| Tier        | Breakpoint   | Layout                                                                             |
| ----------- | ------------ | ---------------------------------------------------------------------------------- |
| **Desktop** | >= 1024px    | 3-panel resizable layout: code (left), visualization (center), explanation (right) |
| **Tablet**  | 768 – 1023px | 2-panel resizable layout (visualization + Steps/Code tab switcher)                 |
| **Mobile**  | < 768px      | Tab-based single-panel switcher with compact controls                              |

Breakpoint values are defined in `BREAKPOINTS` (`src/utils/constants.ts`). Layout switching uses `useResponsiveLayout` hook which returns a `LayoutTier` (`"mobile" | "tablet" | "desktop"`).

---

## Component Patterns

### Shared Primitives (`src/components/shared/`)

- **Button** — Variant/size props, forwarded `ButtonHTMLAttributes`
- **Badge** — Status indicators with color variants
- **IconButton** — Icon-only button with `aria-label` required
- **Select** — Dropdown selection with consistent styling
- **CategoryPill** — Horizontally scrollable filter pill used in the algorithm selector modal. Renders one pill per category plus an "All" pill. Active pill uses the category's accent color from `CATEGORY_ACCENT_MAP`; inactive pills use `surface-tertiary`. Accepts `category`, `isActive`, and `onClick` props. The pill row also supports **mouse wheel horizontal scrolling** — a `wheel` event listener translates vertical scroll delta to horizontal scroll on the container, enabling trackpad and mouse-wheel navigation without requiring a horizontal scrollbar.

### Header Search Bar

The header algorithm selector trigger is a two-line layout:

1. **Accent dot** — A small filled circle colored via the active algorithm's `CATEGORY_ACCENT_MAP` entry (`var(--color-accent-*)`)
2. **Breadcrumb** — Category › Technique rendered at `text-xs font-normal text-secondary`
3. **Algorithm name** — Rendered at `text-sm font-semibold text-primary`

### Algorithm Selector Modal

The modal uses a two-level group hierarchy:

- **Category pill filter row** — horizontally scrollable (`overflow-x-auto scrollbar-none`) row of `CategoryPill` components above the algorithm list; filters the list to the selected category. Supports mouse wheel horizontal scrolling via a `wheel` event listener on the container.
- **Category headers** — bold label with an accent-colored left border (`border-l-2`, color from `CATEGORY_ACCENT_MAP`)
- **Technique sub-headers** — indented, rendered in `text-secondary` beneath their category header

### CSS Utilities

| Class             | Definition                                                        | Usage                                                      |
| ----------------- | ----------------------------------------------------------------- | ---------------------------------------------------------- |
| `.scrollbar-none` | `scrollbar-width: none` + `::-webkit-scrollbar { display: none }` | Hides scrollbar on pill filter row and overflow containers |

Defined in `src/index.css`.

### Design Rules

- Always use CSS custom properties (`var(--color-*)`) — never raw hex values in components
- Use Tailwind classes referencing the custom properties
- All interactive elements must have `aria-label` attributes
- Framer Motion animations must be paired with `useReducedMotion` checks

---

## Accessibility Guidelines

AlgoFlow targets **WCAG 2.1 AA** compliance.

### Requirements

- **ARIA labels** on all interactive elements (buttons, inputs, controls)
- **Keyboard navigation** for all features (see keyboard shortcuts in README)
- **Focus management** for drawers and modals (focus traps in `AlgorithmSelectorModal`, focus restoration on close in `EducationalDrawer`)
- **Reduced motion** — All Framer Motion animations must pair with `useReducedMotion()` hook. Additionally, `@media (prefers-reduced-motion: reduce)` in `src/index.css` disables CSS animations
- **ARIA roles** — Mobile and tablet tab-based navigation uses `role="tablist"`, `role="tab"`, `role="tabpanel"` with proper `aria-labelledby` associations

### Theme Support

- **Theme toggle** in Header cycles: dark → light → system preference
- Theme persists to `localStorage` under `algoflow-theme`
- **Monaco editor theme sync** — editor switches between `vs-dark` and `vs` automatically

### Monaco Editor

- Line highlighting uses a subtle cyan background (`rgba(34, 211, 238, 0.12)` dark / `rgba(34, 211, 238, 0.2)` light) with a 3px cyan gutter indicator
- Read-only mode by default prevents accidental edits

---

## See Also

- [Architecture](architecture.md) — tech stack, responsive design, component structure
- [Contributing](contributing.md) — coding standards, quality gate
- [Glossary](glossary.md) — key terms and type definitions
