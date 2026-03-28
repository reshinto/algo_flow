[← Back to README](../README.md)

# Design System

AlgoFlow's visual language: colors, typography, spacing, layout breakpoints, and component patterns. This guide helps designers and developers build UI elements that feel consistent with the rest of the application.

> **Prerequisites:** None for designers; [Architecture](architecture.md) for developers wanting code context.

## Contents

- [Color Palette](#color-palette)
- [Visualization State Colors](#visualization-state-colors)
- [Typography](#typography)
- [Breakpoints & Layout](#breakpoints--layout)
- [Component Patterns](#component-patterns)
- [Accessibility Guidelines](#accessibility-guidelines)

---

## Color Palette

### Surfaces

| Token                       | Value                | Usage                       |
| --------------------------- | -------------------- | --------------------------- |
| `--color-surface-primary`   | `#09090b` (zinc-950) | Page background             |
| `--color-surface-secondary` | `#18181b` (zinc-900) | Panel backgrounds           |
| `--color-surface-tertiary`  | `#27272a` (zinc-800) | Hover states, card fills    |
| `--color-surface-elevated`  | `#3f3f46` (zinc-700) | Elevated elements, tooltips |

### Borders

| Token                    | Value     | Usage             |
| ------------------------ | --------- | ----------------- |
| `--color-border-default` | `#3f3f46` | Standard borders  |
| `--color-border-subtle`  | `#27272a` | Subtle separators |

### Text

| Token                    | Value     | Usage                          |
| ------------------------ | --------- | ------------------------------ |
| `--color-text-primary`   | `#fafafa` | Body text, headings            |
| `--color-text-secondary` | `#a1a1aa` | Secondary labels, descriptions |
| `--color-text-muted`     | `#71717a` | Disabled text, placeholders    |

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
| **Tablet**  | 768 – 1023px | Tab-based single-panel switcher: "Visualize", "Code", "Details"                    |
| **Mobile**  | < 768px      | Tab-based single-panel switcher with compact controls                              |

Breakpoint values are defined in `BREAKPOINTS` (`src/utils/constants.ts`). Layout switching uses `useResponsiveLayout` hook.

---

## Component Patterns

### Shared Primitives (`src/components/shared/`)

- **Button** — Variant/size props, forwarded `ButtonHTMLAttributes`
- **Badge** — Status indicators with color variants
- **IconButton** — Icon-only button with `aria-label` required
- **Select** — Dropdown selection with consistent styling

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
- **Focus management** for drawers and modals (focus trap, restore on close)
- **Reduced motion** — `@media (prefers-reduced-motion: reduce)` in `src/index.css` disables all animations

### Monaco Editor

- Line highlighting uses a subtle cyan background (`rgba(34, 211, 238, 0.12)`) with a 3px cyan gutter indicator
- Read-only mode by default prevents accidental edits

---

## See Also

- [Architecture](architecture.md) — tech stack, responsive design, component structure
- [Contributing](contributing.md) — coding standards, quality gate
- [Glossary](glossary.md) — key terms and type definitions
