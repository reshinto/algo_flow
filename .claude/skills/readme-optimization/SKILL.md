---
name: readme-optimization
description: Optimize README and public-facing content for GitHub discoverability, clear presentation flow, and accurate feature positioning
user-invocable: true
---

# README Optimization

## Task

Review and optimize the README.md and repository metadata for discoverability, clear value communication, and accurate feature presentation.

## Instructions

1. Read the current README.md and repository description
2. Evaluate against each area below
3. Suggest specific copy improvements with before/after examples

## Review Areas

### First Impression (Above the Fold)

- Value proposition clear in the first 3 lines: what AlgoFlow is and who it's for
- Demo visual present (screenshot or GIF showing the app in action)
- Key differentiators immediately visible (synchronized code highlighting, multi-language, interactive editing)
- Quick Start commands visible without scrolling on desktop

### GitHub Search Optimization

- Repository description includes key terms: "algorithm", "visualization", "learning"
- Topics include: `algorithm-visualization`, `data-structures`, `learning-tool`, `react`, `typescript`
- README headings match common search queries (e.g., "Algorithm Visualization Tool", "Learn Sorting Algorithms")
- Algorithm names in the table match how learners search for them

### Content Hierarchy

- **Learners first**: Features and algorithms table before technical details
- **Educators second**: Educational content sections, how algorithms are presented
- **Contributors third**: Architecture overview, contributing guide links
- Progressive detail: summary with links to `docs/` for deep dives

### AIDA Presentation Flow

- **Attention**: Visual demo (GIF/screenshot) showing the app
- **Interest**: Feature bullet list highlighting what makes AlgoFlow unique
- **Desire**: Algorithms table showing breadth of coverage
- **Action**: Quick Start with copy-pasteable commands

### Accuracy

- All listed algorithms actually exist in the codebase
- Scripts table matches `package.json` commands
- Keyboard shortcuts match actual implementation
- Technology versions match `package.json`

### Developer Friendliness

- Quick Start works on fresh clone (no hidden prerequisites)
- Docker commands are correct and tested
- Links to detailed docs are not broken
- No marketing language that obscures technical content

## Rules

- No superlatives or hype — let features speak for themselves
- All claims must be verifiable from the codebase
- No references to AI, Claude, or automated generation
- Keep README scannable — prefer tables and bullets over prose

## Output Format

- EFFECTIVE: [area] - what works well and why
- OPTIMIZE: [area] - specific improvement with suggested copy
- GAP: [area] - missing content + draft to fill it
