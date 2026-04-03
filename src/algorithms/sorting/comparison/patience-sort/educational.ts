/**
 * Educational content for Patience Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Patience Sort. */
export const patienceSortEducational: EducationalContent = {
  overview:
    "**Patience Sort** is a sorting algorithm modeled after the **patience card game**. " +
    "Cards (elements) are dealt one at a time onto piles following a placement rule, then the piles " +
    "are merged to produce sorted output.\n\n" +
    "Beyond sorting, Patience Sort has a remarkable theoretical property: **the number of piles " +
    "created equals the length of the Longest Increasing Subsequence (LIS)** of the input, " +
    "making it an elegant algorithm with dual utility.",

  howItWorks:
    "Patience Sort works in two phases:\n\n" +
    "### Phase 1: Place Cards into Piles\n" +
    "For each card (element) in the input:\n" +
    "1. Scan pile tops from left to right using **binary search**.\n" +
    "2. Place the card on the **leftmost pile whose top value ≥ the card**.\n" +
    "3. If no such pile exists, start a **new pile** on the right.\n\n" +
    "This ensures each pile is in **descending order** from bottom to top.\n\n" +
    "### Phase 2: Merge Piles\n" +
    "4. Perform a **k-way merge** across all pile tops (smallest first).\n" +
    "5. Pop the minimum pile top, append to output, and continue.\n\n" +
    "### Visualizing Patience Sort on [3, 1, 4, 1, 5, 2]\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '    A["Deal 3"] --> P1["Pile 1: [3]"]\n' +
    '    B["Deal 1"] --> P2["Pile 1: [3,1]"]\n' +
    '    C["Deal 4"] --> P3["New Pile 2: [4]"]\n' +
    '    D["Deal 1"] --> P4["Pile 1: [3,1,1]"]\n' +
    '    E["Deal 5"] --> P5["New Pile 3: [5]"]\n' +
    '    F["Deal 2"] --> P6["Pile 2: [4,2]"]\n' +
    "```\n\n" +
    "Piles after placement: `[3,1,1]`, `[4,2]`, `[5]`\n" +
    "Merge from tops → smallest first: `1, 1, 2, 3, 4, 5`",

  timeAndSpaceComplexity:
    "**Time Complexity:**\n\n" +
    "| Case | Complexity | Reason |\n" +
    "| --- | --- | --- |\n" +
    "| Best | `O(n log n)` | Binary search for placement + k-way merge |\n" +
    "| Average | `O(n log n)` | `n` placements × `O(log n)` binary search + merge |\n" +
    "| Worst | `O(n log n)` | Reverse-sorted input creates `n` piles but merge is still `O(n log n)` |\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "All `n` elements are redistributed across piles. The number of piles is at most `n` (one pile per element " +
    "in the worst case), and the total elements across all piles is always exactly `n`.",

  bestAndWorstCase:
    "**Best case:** An already-sorted input creates exactly **one pile** (each new element is always " +
    "larger than the current pile top, so a new pile is created... wait — actually, each new element " +
    "goes on the existing pile if it's ≥ the top). An increasing sequence creates maximum piles since " +
    "each element must start a new pile. A **decreasing sequence** creates exactly 1 pile.\n\n" +
    "**Worst case:** A strictly increasing sequence creates `n` piles (each element starts a new pile). " +
    "The merge phase then requires comparing `n` pile tops at each step. A heap-based k-way merge " +
    "runs in `O(n log n)`, so the overall complexity remains `O(n log n)`.\n\n" +
    "**LIS connection:** The number of piles equals the length of the Longest Increasing Subsequence. " +
    "The card that went onto each pile forms a pointer to the previous pile, allowing LIS reconstruction.",

  realWorldUses: [
    "**Longest Increasing Subsequence**: The pile structure during Phase 1 directly solves the LIS problem — a foundational dynamic programming problem.",
    "**Card games**: Directly models physical patience/solitaire card laying strategy.",
    "**Sorting with partial order information**: When the input is known to have few increasing runs, Patience Sort minimizes pile count.",
    "**Algorithm education**: Beautifully illustrates the connection between sorting and combinatorics (the RSK correspondence).",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Elegant dual use**: Simultaneously sorts and solves the LIS problem.",
      "**Stable**: Cards within a pile preserve original relative order.",
      "**O(log n) placement**: Binary search on pile tops is efficient.",
      "**Adaptive**: Fewer piles = fewer merge comparisons, so nearly-sorted inputs run faster.",
    ],
    limitations: [
      "**O(n) space**: All elements must live in piles simultaneously.",
      "**Not in-place**: Requires significant auxiliary storage.",
      "**Merge overhead**: The k-way merge requires a heap for optimal `O(n log n)` performance; a naive scan is `O(n²)` for the merge.",
      "**Unfamiliar pattern**: The two-phase approach is less intuitive than simple comparison sorts.",
    ],
  },

  whenToUseIt:
    "Use **Patience Sort** when you need to **simultaneously sort and find the LIS** of a sequence — " +
    "the pile count directly encodes LIS length without additional computation.\n\n" +
    "It is also a good choice when:\n" +
    "- Input has many natural decreasing runs (few piles → fast merge).\n" +
    "- Stability is required.\n\n" +
    "For general-purpose sorting without the LIS requirement, **Tim Sort** or **Intro Sort** are " +
    "more practical due to better cache behavior and lower constant factors.",
};
