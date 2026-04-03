/**
 * Educational content for Spaghetti Sort.
 */
import type { EducationalContent } from "@/types";

export const spaghettiSortEducational: EducationalContent = {
  overview:
    "**Spaghetti Sort** is a physically-inspired sorting algorithm based on a simple analog computer: cut spaghetti strands to lengths proportional to the values you want to sort, hold them upright in your fist, then repeatedly extract the tallest strand.\n\nThe extracted strand represents the maximum remaining value. Repeated maximum extraction produces a sorted order from largest to smallest (or smallest to largest if you reverse).",

  howItWorks:
    "### Physical Analogy\n" +
    "Imagine you have uncooked spaghetti strands, each cut to a length matching one element of your array (e.g., value 5 → 5cm strand).\n" +
    "1. Hold all strands upright in your fist on a flat table.\n" +
    "2. The tallest strand sticking out is the maximum value.\n" +
    "3. Pinch off the tallest strand and set it aside.\n" +
    "4. Repeat — the next tallest becomes the new maximum.\n" +
    "5. The set-aside strands, collected in order, are sorted largest-to-smallest.\n\n" +
    "### Computational Equivalent\n" +
    "This is equivalent to **repeated maximum extraction** — similar to Selection Sort but finding the max instead of the min:\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    '    A["spaghettiSort([5, 3, 8, 1, 4])"] --> B["Find tallest: 8"]\n' +
    '    B --> C["Remove 8 → remaining [5,3,1,4]"]\n' +
    '    C --> D["Find tallest: 5"]\n' +
    '    D --> E["Remove 5 → remaining [3,1,4]"]\n' +
    '    E --> F["Continue..."] --> G["Result: [1,3,4,5,8]"]\n' +
    "    style G fill:#14532d,stroke:#22c55e\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n²)`**\n\n" +
    "- Each of `n` extraction passes scans remaining elements: `n + (n-1) + ... + 1 = n(n+1)/2`.\n" +
    "- **Best Case:** `O(n²)` — full scan required even if sorted.\n" +
    "- **Average Case:** `O(n²)`.\n" +
    "- **Worst Case:** `O(n²)`.\n\n" +
    "**Space Complexity: `O(n)`** — for the remaining-strands list and result buffer.\n\n" +
    "In the physical analog, the sort runs in `O(n)` *parallel* time (all strands are visible simultaneously), but `O(n)` extraction steps are needed.",

  bestAndWorstCase:
    "**Best case:** `O(n²)` — even a pre-sorted array requires scanning all remaining elements each pass to confirm the maximum.\n\n" +
    "**Worst case:** `O(n²)` — same structure; the comparison count is always `n(n-1)/2`. The physical version is special: it runs in `O(n)` parallel time because a human can instantly identify the tallest strand. The sequential simulation loses this advantage.",

  realWorldUses: [
    "**Parallel computing analog:** The physical version demonstrates O(n) parallel sorting when all comparisons happen simultaneously — relevant to sorting networks.",
    "**Educational demonstrations:** A memorable physical demonstration of the relationship between sorting and repeated extremum selection.",
    "**Priority queue concept:** The repeated-maximum pattern is the core operation of a max-heap, which achieves O(n log n) by making extraction O(log n).",
    "**Hardware sorting:** Analog electronic sorting circuits use similar 'tallest signal wins' logic in priority encoders.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Intuitive physical analogy:** Easy to understand and demonstrate with real objects.",
      "**O(n) parallel time:** If comparisons can be parallelized, it outperforms sequential sorts.",
      "**Stable in the physical model:** Strands of equal height maintain relative order.",
    ],
    limitations: [
      "**O(n²) sequential time:** No better than Selection Sort in practice.",
      "**O(n) extra space:** Requires a separate output buffer.",
      "**Not in-place:** The physical splicing of the remaining-strands list requires memory allocation.",
    ],
  },

  whenToUseIt:
    "Use the Spaghetti Sort concept as an educational demonstration of parallel sorting and priority queues. Its physical intuition makes it excellent for teaching.\n\nFor actual sorting, use a max-heap (O(n log n)) which achieves the same repeated-maximum extraction but makes each extraction O(log n) instead of O(n).",
};
