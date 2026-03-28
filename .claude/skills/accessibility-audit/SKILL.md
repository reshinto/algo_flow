---
name: accessibility-audit
description: Audit UI components for WCAG 2.1 AA compliance, Framer Motion reduced-motion support, and Tailwind design token consistency
user-invocable: true
---

# Accessibility Audit

## Task

Audit the specified component(s) or the entire UI for WCAG 2.1 AA compliance, animation accessibility, and design token usage.

## Instructions

1. Identify the target: specific component path or full `src/components/` scan
2. Run through each checklist area below
3. Report findings using the output format

## Checklist

### Color Contrast

- Text on backgrounds meets 4.5:1 ratio (normal text) or 3:1 (large text)
- UI components (buttons, inputs, focus rings) meet 3:1 contrast ratio
- Visualization states are distinguishable without relying solely on color
- All colors come from CSS custom properties in `src/styles/tokens.css` — no raw hex values

### Keyboard Navigation

- All interactive elements reachable via Tab key
- Focus order follows visual layout
- Focus indicators are visible (not `outline: none` without replacement)
- Keyboard shortcuts documented in ARIA labels or tooltips
- Escape key closes drawers and modals

### Screen Reader Support

- ARIA labels on all interactive elements (buttons, controls, tabs)
- `aria-live` regions for dynamic content (step changes, algorithm status)
- Semantic HTML landmarks (`main`, `nav`, `aside`, `section`)
- Algorithm visualization states announced to assistive technology

### Framer Motion

- All animations wrapped with `reduced-motion` media query check
- `AnimatePresence` exit transitions don't trap focus
- Layout animations don't cause content reflow that loses keyboard focus
- Stagger animations respect `prefers-reduced-motion: reduce`

### Tailwind Design Tokens

- Colors use CSS custom properties (e.g., `var(--color-emerald-500)`), not raw Tailwind classes with hardcoded values
- Spacing follows Tailwind scale consistently
- Responsive breakpoints use project-standard values (1024px, 768px, 375px)
- Typography uses design token font families

## Output Format

- PASS: [area] - meets WCAG 2.1 AA standard
- WARN: [area] - minor concern, not a blocker
- FAIL: [area] - violation + specific fix required
