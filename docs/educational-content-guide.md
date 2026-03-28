[← Back to README](../README.md)

# Educational Content Guide

How to write clear, engaging educational content for AlgoFlow's algorithm learning drawer. Every algorithm includes a slide-over panel with 7 sections of learning material — this guide explains what each section needs and how to write it well.

> **Prerequisites:** See the [Glossary](glossary.md) for the `EducationalContent` type definition.

## Contents

- [The 7 Sections](#the-7-sections)
- [Quality Criteria](#quality-criteria)
- [Writing Tips](#writing-tips)
- [Markdown Features](#markdown-features)
- [Example](#example)

---

## The 7 Sections

The `EducationalContent` interface (`src/types/educational.ts`) requires these 7 fields:

### 1. `overview` (string)

**Purpose:** What the algorithm is and why it matters.

**Length:** 2-4 sentences.

**Tip:** Start with what the algorithm does in plain language, then mention its significance.

---

### 2. `howItWorks` (string)

**Purpose:** Step-by-step walkthrough of the algorithm's logic.

**Length:** 1-3 paragraphs. Use Mermaid diagrams for visual flow.

**Tip:** Walk through a small concrete example (e.g., sorting [5, 3, 8, 1]). Use bold for key operations. Tables work well for showing pass-by-pass comparisons.

---

### 3. `timeAndSpaceComplexity` (string)

**Purpose:** Big-O analysis for time and space.

**Length:** 1-2 paragraphs.

**Tip:** Don't just state "O(n log n)" — explain _why_. "Each level of recursion halves the array (log n levels), and each level does O(n) work merging."

---

### 4. `bestAndWorstCase` (string)

**Purpose:** When the algorithm performs best and worst.

**Length:** 1-2 paragraphs.

**Tip:** Give concrete input examples. "Best case: already sorted [1, 2, 3] — only one pass with zero swaps. Worst case: reverse sorted [3, 2, 1] — maximum swaps every pass."

---

### 5. `realWorldUses` (string[])

**Purpose:** Practical applications.

**Length:** 3-6 items.

**Tip:** Be specific. Instead of "used in databases," say "Database query engines use merge sort for external sorting when data doesn't fit in memory."

---

### 6. `strengthsAndLimitations` ({ strengths: string[], limitations: string[] })

**Purpose:** Pros and cons compared to alternatives.

**Length:** 2-4 items each.

**Tip:** Frame limitations constructively — "Works best for small inputs (n < 1000); for larger datasets, consider merge sort or quicksort."

---

### 7. `whenToUseIt` (string)

**Purpose:** Decision guide for choosing this algorithm.

**Length:** 1-2 paragraphs.

**Tip:** Compare against alternatives. "Choose bubble sort when simplicity matters more than performance, such as teaching or prototyping. For production sorting, use the language's built-in sort."

---

## Quality Criteria

Good educational content follows these principles:

1. **Write for someone who has never seen the algorithm** — no assumed knowledge beyond basic programming
2. **Lead with intuition before formalism** — explain the idea first, then the math
3. **Use everyday analogies** — "Like organizing a hand of cards by comparing adjacent cards and swapping them"
4. **Include concrete examples with small inputs** — show the algorithm working on [5, 3, 8, 1], not abstract descriptions
5. **Complexity sections must explain WHY** — "O(n^2) because we have two nested loops, each iterating up to n times"
6. **Real-world uses must be specific** — not "used in sorting" but "Used by Python's Timsort for merging sorted runs"
7. **Strengths and limitations must be honest** — every algorithm has trade-offs

---

## Writing Tips

- **Formatting matters** — Use bold, headers, tables, and code blocks to break up text
- **Keep paragraphs short** — 2-4 sentences maximum
- **Use active voice** — "The algorithm compares adjacent elements" not "Adjacent elements are compared"
- **Avoid jargon without explanation** — If you use "in-place," explain: "in-place (modifies the array without needing extra memory)"
- **Test readability** — Could a first-year CS student understand this without a textbook open?

---

## Markdown Features

Educational content supports full Markdown rendering in the drawer:

- **Bold** and _italic_ text
- `Code blocks` for variable names and operations
- Tables for comparison data
- Ordered and unordered lists
- Blockquotes for key insights
- Headers (##, ###) for section structure
- Mermaid diagrams for flowcharts

Example with Mermaid:

```ts
howItWorks: `
### How Bubble Sort Works

Compare adjacent elements and swap if out of order. Repeat until no swaps occur.

\`\`\`mermaid
flowchart LR
    A["Compare arr[i] and arr[i+1]"] --> B{"Out of order?"}
    B -- Yes --> C["Swap them"]
    B -- No --> D["Move to next pair"]
    C --> D
    D --> E{"End of array?"}
    E -- No --> A
    E -- Yes --> F{"Any swaps this pass?"}
    F -- Yes --> A
    F -- No --> G["Done!"]
\`\`\`
`;
```

---

## Example

Reference implementation: `src/algorithms/sorting/bubble-sort/educational.ts`

This file demonstrates all 7 sections with rich Markdown formatting, concrete examples, and clear explanations. Use it as a template when writing educational content for new algorithms.

---

## See Also

- [Contributing](contributing.md#step-3-write-the-educational-content) — educational content in the algorithm walkthrough
- [Glossary](glossary.md) — EducationalContent type definition
- [Architecture](architecture.md#educational-drawer) — how the drawer renders content
