---
name: algorithm-learning-content
description: Generate learner-friendly educational content for algorithms following the project's EducationalContent type structure
user-invocable: true
---

# Algorithm Learning Content

## Task

Create educational content for an algorithm that covers all required sections.

## Instructions

1. Write content targeting CS students and self-taught developers
2. Use clear, jargon-free language where possible
3. Include concrete examples and analogies
4. All 7 sections must be filled

## Required Sections

### overview

What the algorithm is in 2-3 sentences. Include the problem it solves.

### howItWorks

Step-by-step explanation with a small worked example. Use numbered steps.

### timeAndSpaceComplexity

- Best case time + explanation
- Average case time + explanation (where relevant)
- Worst case time + explanation
- Space complexity + explanation

### bestAndWorstCase

Describe the input conditions that lead to best and worst performance.

### realWorldUses

3-5 concrete real-world applications. Be specific (not just "sorting data").

### strengthsAndLimitations

- strengths: 3-5 bullet points
- limitations: 3-5 bullet points

### whenToUseIt

When this algorithm is the right choice, and when to prefer alternatives.

## Output Format

Export as a TypeScript `EducationalContent` object in the algorithm's `educational.ts` file.
