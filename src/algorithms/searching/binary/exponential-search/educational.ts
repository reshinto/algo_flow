import type { EducationalContent } from "@/types";

export const exponentialSearchEducational: EducationalContent = {
  overview:
    "**Exponential Search** is a two-phase search algorithm designed for unbounded or very large sorted arrays. In the first phase, it probes indices 1, 2, 4, 8, 16... (powers of two) until it finds an element greater than or equal to the target. In the second phase, it performs a standard binary search within that bounded range.\n\nThis makes it particularly useful when the target is near the beginning of the array, as the exponential phase reaches a useful bound very quickly.",

  howItWorks:
    "**Phase 1 — Exponential Probing:**\n" +
    "1. Start with `bound = 1`.\n" +
    "2. While `array[bound] <= target` and `bound < length`, double the bound: `bound = bound * 2`.\n" +
    "3. This finds a range `[bound/2, min(bound, length-1)]` that must contain the target if it exists.\n\n" +
    "**Phase 2 — Binary Search:**\n" +
    "4. Run standard binary search within `[bound/2, min(bound, length-1)]`.\n" +
    "5. Compute `mid = floor((low + high) / 2)` and compare `array[mid]` to target.\n" +
    "   - If equal: return `mid`.\n" +
    "   - If less: search right half.\n" +
    "   - If greater: search left half.\n\n" +
    "### Example: Finding 8 in [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    '    A["Probe bound=1: arr[1]=5 ≤ 8"] -->|"Double"| B["Probe bound=2: arr[2]=8 ≤ 8"]\n' +
    '    B -->|"Double"| C["Probe bound=4: arr[4]=16 > 8 — stop"]\n' +
    '    C -->|"Binary search [2,4]"| D["mid=3: arr[3]=12 > 8 — go left"]\n' +
    '    D -->|"Binary search [2,2]"| E["mid=2: arr[2]=8 == 8 — Found!"]\n' +
    "    style E fill:#10b981,stroke:#059669\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(log n)`**\n\n" +
    "- **Phase 1 (probing):** Takes `O(log i)` comparisons where `i` is the index of the target, since the bound doubles each step.\n" +
    "- **Phase 2 (binary search):** Operates on a range of size `bound/2`, which is `O(log i)` as well.\n" +
    "- **Overall:** `O(log i)` where `i` is the target's position — faster than `O(log n)` when the target is near the start.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a constant number of index variables are used. No recursion stack needed.",

  bestAndWorstCase:
    "**Best case** is `O(1)` — when the first element is the target, it is found immediately before any probing loop.\n\n" +
    "**Average/Worst case** is `O(log n)` — the probing phase takes `O(log i)` steps and the binary search phase also takes `O(log i)` steps. When the target is near the end of a large array, performance approaches standard binary search.\n\n" +
    "Exponential search outperforms binary search when the target's position `i` is much smaller than `n`, because it only examines `O(log i)` elements rather than `O(log n)`.",

  realWorldUses: [
    "**Unbounded arrays:** Exponential search is the standard approach for searching arrays whose size is unknown — it finds a bound before applying binary search.",
    "**Streaming data:** When data arrives incrementally and the end is unknown, exponential probing naturally extends the search range.",
    "**Databases with unknown sizes:** Record lookup in systems where the data boundary is not fixed benefits from exponential probing.",
    "**Early-terminating searches:** When targets are frequently concentrated near the beginning of a distribution, exponential search reduces average comparisons significantly.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Outperforms binary search when the target is near the start of the array — `O(log i)` vs `O(log n)`.",
      "Works on unbounded or infinite sorted sequences where the length is unknown.",
      "Constant space usage — no additional memory beyond a few index variables.",
    ],
    limitations: [
      "Requires the array to be sorted — unsorted arrays produce incorrect results.",
      "Adds overhead versus plain binary search when the target is uniformly distributed across the full array.",
      "The doubling strategy can overshoot significantly, leading to a larger binary search range than necessary in some cases.",
    ],
  },

  whenToUseIt:
    "Use **Exponential Search** when searching a very large sorted array where the target is likely near the beginning, or when searching in an unbounded sequence where the array length is not known in advance.\n\nFor arrays of fixed and known length where targets are uniformly distributed, standard **Binary Search** is simpler and equally efficient. For nearly sorted or small arrays, **Linear Search** may be more practical.",
};
