---
name: feature-dev
description: Guided feature development following AlgoFlow's 7-step workflow, registry pattern, and phased milestone approach
user-invocable: true
---

# Feature Development

## Task

Guide the development of a new feature or algorithm through AlgoFlow's structured 7-step workflow.

## Workflow

### Step 1: Product Strategist Validation

Evaluate the feature for learner engagement:

- Does it follow the Hook Model (trigger, action, reward, investment)?
- Does it follow AIDA for algorithm presentation (attention, interest, desire, action)?
- Does it serve learning outcomes, not just aesthetics?

### Step 2: UI/UX Designer Consultation

For any visual changes:

- Theme compliance: black-first palette (zinc-950/900/800)
- Responsive layout: desktop (1024px+), tablet (768-1023px), mobile (below 768px)
- Accessibility: WCAG 2.1 AA, keyboard navigation, reduced-motion support

### Step 3: Tech Lead Architecture

For structural changes:

- Follows registry-driven pattern, no algorithm-specific UI logic
- Zustand slice boundaries respected
- Vite build optimization (code splitting, glob imports)
- Security-by-design (no eval, no innerHTML, no unsafe DOM manipulation)

### Step 4: Implementation

For new algorithms, create the directory structure:

```
src/algorithms/<category>/<algorithm>/
├── index.ts                           # registry.register(definition)
├── <algorithm>.ts                     # Pure implementation
├── step-generator.ts                  # generateSteps() using tracker
├── educational.ts                     # All 7 sections
├── <Algorithm>Pipeline.stories.tsx    # Pipeline story
└── sources/
    ├── <algorithm>.ts                 # TypeScript source
    ├── <algorithm>.py                 # Python source
    └── <algorithm>.java               # Java source
```

Import in `src/algorithms/index.ts` barrel.

### Step 5: Senior Engineer Review

Code review checklist:

- Naming: no single-char variables
- Types: no `any`, discriminated unions correct, tuple types for coordinates
- DRY: reused strings in constants
- Architecture: registry pattern followed

### Step 6: QA Validation

- Unit tests: correctness + step generation
- Coverage: 80/75/80/80 thresholds
- E2E: per-category spec files in `e2e/specs/` auto-discover from registry; add to `e2e/specs/input-editors.spec.ts` only if algorithm has a custom input editor
- Security: no unsafe patterns, npm audit clean

### Step 7: Technical Writer Review

- Educational content: all 7 sections complete and accurate
- Documentation: README, docs/ updated per trigger table
- ELI5: explanations accessible to CS101 students
