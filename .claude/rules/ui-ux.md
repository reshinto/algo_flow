---
paths:
  - "src/components/**/*.tsx"
  - "src/components/**/*.css"
---

## UI/UX Rules

### Theme

- Black-first UI: zinc-950 background, zinc-900 panels
- Accent colors defined in CSS custom properties (emerald, cyan, amber, rose, violet, blue)
- Support reduced-motion media query

### Layout

- 3-panel resizable layout: code | visualization | explanation
- Desktop (>=1024px): all 3 panels side by side
- Tablet (768-1023px): code + visualization stacked, explanation collapsible
- Mobile (<768px): single panel with tab switcher via MobileDrawer

### Playback Controls

- Play, pause, step forward, step backward
- Speed selector: 0.25x, 0.5x, 1x, 2x, 4x
- Reset (return to step 0), rerun (recompute + play)
- Progress bar with scrubbing capability

### Code Panel

- Monaco editor in read-only mode (default)
- Language tabs: TypeScript, Python, Java, Rust, C++, Go
- Synchronized line highlighting per current step
- Temporary editable mode (non-persistent)

### Input Editing

- Algorithm-specific input controls
- All edits are temporary - reset on algorithm switch or page reload
- Never persist edited inputs to any storage

### Accessibility

- ARIA labels on all interactive elements
- Keyboard shortcuts for playback (Space, arrows, R, 1-5, Escape, L)
- Focus management for drawers and modals
