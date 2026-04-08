import type { EducationalContent } from "@/types";

export const majorityElementEducational: EducationalContent = {
  overview:
    "**Majority Element** finds the element that appears more than `⌊n/2⌋` times in an array. A hash map counting approach scans once, incrementing each element's count and returning immediately when a count exceeds the threshold — guaranteed to exist by the problem's precondition.",

  howItWorks:
    "The algorithm uses a single pass with an early-exit check:\n\n" +
    "**Compute threshold:** `⌊n/2⌋` — the count any element must exceed to be the majority.\n\n" +
    "**Scan and count:**\n" +
    "For each element, increment its frequency in the map. After each increment, check if the count exceeds the threshold — if so, return that element immediately.\n\n" +
    "### Example: `numbers = [2, 2, 1, 1, 1, 2, 2]`\n\n" +
    "```\n" +
    "threshold = 3\n" +
    "index 0: 2 → count 1\n" +
    "index 1: 2 → count 2\n" +
    "index 2: 1 → count 1\n" +
    "index 3: 1 → count 2\n" +
    "index 4: 1 → count 3\n" +
    "index 5: 2 → count 3\n" +
    "index 6: 2 → count 4 > 3 → return 2\n" +
    "```\n\n" +
    "Because a majority element is guaranteed to exist, the scan always terminates with a valid answer.\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["[2,2,1,1,1,2,2]"]:::input --> B["threshold = 3"]\n' +
    '  B --> C["2→1, 2→2, 1→1, 1→2, 1→3, 2→3"]:::checking\n' +
    '  C --> D["index 6: 2→4 > 3"]:::checking\n' +
    '  D --> E["return 2"]:::found\n' +
    "  classDef input fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef checking fill:#f59e0b,stroke:#d97706\n" +
    "  classDef found fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "The early-exit check fires the moment any count crosses `⌊n/2⌋`, so the scan often terminates before reaching the end of the array.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "A single pass over the array. Hash map operations are `O(1)` amortized. Early exit means the worst case is the full array, best case is the majority element appearing early.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The frequency map stores one entry per distinct element. In the worst case (many distinct values before the majority), this approaches `O(n)`.",

  bestAndWorstCase:
    "**Best case** — the majority element is the first element and appears more than `⌊n/2⌋` times in the prefix: early exit after `⌊n/2⌋ + 1` steps.\n\n" +
    "**Worst case** — the majority element only crosses the threshold at the last position: the full array is scanned, `O(n)` steps.",

  realWorldUses: [
    "**Voting systems:** Determining whether a candidate has won an outright majority.",
    "**Fault-tolerant computing:** Identifying the dominant value among replicated sensor readings.",
    "**Data validation:** Finding the most common record type in a dataset expected to have a majority class.",
    "**Consensus algorithms:** Detecting agreement when more than half of nodes report the same state.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) single-pass with early exit — often terminates before scanning the full array.",
      "Simple and readable implementation.",
      "Generalises easily to 'element appearing more than n/k times' with minor modifications.",
    ],
    limitations: [
      "O(n) space for the frequency map — Boyer-Moore voting achieves O(1) space for the strict majority case.",
      "Requires a majority element to exist — returns -1 for arrays without one.",
      "Not suitable when the threshold condition cannot be checked incrementally.",
    ],
  },

  whenToUseIt:
    "Use the frequency-map approach when you need to find a dominant element and O(n) space is acceptable. For strict majority with O(1) space, prefer Boyer-Moore voting. For 'top-k frequent elements', extend this pattern with a heap.",
};
