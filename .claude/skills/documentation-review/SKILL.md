---
name: documentation-review
description: Review documentation and educational content for ELI5 clarity, structural consistency, accuracy, and contributor onboarding quality
user-invocable: true
---

# Documentation Review

## Task

Review project documentation and algorithm educational content for clarity, accuracy, structural consistency, and contributor accessibility.

## Instructions

1. Identify the target: specific algorithm educational content, README, docs/ file, or full audit
2. Check against each area below
3. Provide specific rewrites for any failing sections

## Review Areas

### Educational Content (per algorithm)

Verify all 7 sections are present and complete:

1. **overview**: 2-3 sentences explaining what the algorithm is and the problem it solves
2. **howItWorks**: Numbered step-by-step with a small worked example
3. **timeAndSpaceComplexity**: Best/average/worst time + space, each with explanation
4. **bestAndWorstCase**: Input conditions that trigger each case
5. **realWorldUses**: 3-5 specific, concrete applications (not generic)
6. **strengthsAndLimitations**: 3-5 bullets each for strengths and limitations
7. **whenToUseIt**: When to choose this algorithm and when to prefer alternatives

### ELI5 Clarity

- No jargon without immediate definition in the same paragraph
- Real-world analogies for abstract concepts (e.g., "like finding the cheapest toll road route")
- Complexity explanations include intuitive reasoning, not just Big-O notation
- Sentences are short and direct — target a CS101 student audience
- Examples use small, concrete inputs (arrays of 5-8 elements, not abstract descriptions)

### Documentation Structure

- README.md follows the structure defined in `.claude/rules/docs.md`
- Algorithms table in README is current (all implemented algorithms listed)
- `docs/` files follow their defined sections (architecture, testing, deployment, contributing)
- Internal links between docs are not broken
- Scripts table in README matches actual `package.json` scripts

### Contributor Onboarding

- `docs/contributing.md` has a complete algorithm addition walkthrough
- A new contributor can add an algorithm by following the guide alone
- Tracker API documented with examples
- Troubleshooting section covers common issues
- Prerequisites and setup steps are current

### Consistency

- Same terminology used across all docs (e.g., "step generator" not "step builder" in one place)
- Same formatting conventions (headings, code blocks, tables)
- No contradictions between docs and `.claude/rules/`

## Rules

- Accuracy trumps readability — never simplify to the point of being wrong
- Verify complexity claims against actual algorithm implementation
- Follow the update trigger table in `.claude/rules/docs.md`

## Output Format

- CLEAR: [section] - meets readability and accuracy standards
- REVISE: [section] - specific issue + suggested rewrite
- MISSING: [section] - required content not present
