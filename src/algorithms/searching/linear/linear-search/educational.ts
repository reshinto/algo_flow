import type { EducationalContent } from "@/types";

export const linearSearchEducational: EducationalContent = {
  overview:
    "**Linear Search** is the simplest searching algorithm. It scans each element of an array one by one from left to right, comparing each value against the target until a match is found or the entire array has been checked.\n\n" +
    "Unlike Binary Search, Linear Search works on **unsorted arrays** — it makes no assumptions about the order of elements, which makes it a universal but often slower option for large datasets.",

  howItWorks:
    "1. Start at the **first element** (index 0) of the array.\n" +
    "2. **Compare** the current element with the target value.\n" +
    "3. If they **match**: return the current index — search is complete.\n" +
    "4. If they **do not match**: advance to the next element (index + 1).\n" +
    "5. Repeat steps 2–4 until either the target is found or the end of the array is reached.\n" +
    "6. If the end is reached without a match: return `-1` to signal the target is absent.\n\n" +
    "### Step-by-Step Trace\n\n" +
    "```\n" +
    "Array: [4, 2, 7, 1, 9, 3, 8, 5]   Target: 7\n" +
    "\n" +
    "Index 0: 4 ≠ 7  → continue\n" +
    "Index 1: 2 ≠ 7  → continue\n" +
    "Index 2: 7 = 7  → FOUND at index 2\n" +
    "```\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["idx=0\\nval=4 ≠ 7"] -->|"advance"| B["idx=1\\nval=2 ≠ 7"]\n' +
    '  B -->|"advance"| C["idx=2\\nval=7 = 7"]\n' +
    '  C --> D["✓ Found at index 2"]\n' +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style B fill:#f59e0b,stroke:#d97706\n" +
    "  style C fill:#f59e0b,stroke:#d97706\n" +
    "  style D fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Each element is compared exactly once in order; the search stops as soon as a match is found or the array is exhausted.",

  timeAndSpaceComplexity:
    "**Time Complexity**\n\n" +
    "| Case    | Complexity | Description |\n" +
    "|---------|-----------|-------------|\n" +
    "| Best    | `O(1)`    | Target is the first element |\n" +
    "| Average | `O(n)`    | Target is somewhere in the middle |\n" +
    "| Worst   | `O(n)`    | Target is last or absent |\n\n" +
    "In the worst case, every element must be examined before the algorithm can confirm the target is absent or found at the final position.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Linear Search uses only a single index variable — no auxiliary data structures are required.",

  bestAndWorstCase:
    "**Best Case — `O(1)`**\n\n" +
    "The best case occurs when the target value is the very first element in the array. Only one comparison is needed before returning index 0.\n\n" +
    "**Worst Case — `O(n)`**\n\n" +
    "The worst case occurs in two scenarios:\n" +
    "- The target is the **last element** in the array — every element except the last fails comparison.\n" +
    "- The target is **not present at all** — every element is checked before returning `-1`.\n\n" +
    "For an array of 1,000,000 elements, Linear Search may require up to 1,000,000 comparisons in the worst case, compared to just ~20 for Binary Search on a sorted array.",

  realWorldUses: [
    "**Small or Unsorted Lists:** Searching phone contact lists, to-do items, or any dataset too small for the overhead of sorting to pay off.",
    "**Sequential Media:** Scanning audio tracks, video frames, or log file entries where data arrives in an unpredictable order.",
    "**One-off Lookups:** When a dataset is searched only once, sorting first would cost more time than a direct linear scan.",
    "**Linked Lists:** Data structures that do not support random access (like singly linked lists) require sequential scanning by nature.",
    "**Fuzzy or Pattern Matching:** When searching for elements meeting a complex condition (not just equality), linear traversal is often the only option.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Works on **any array** — sorted, unsorted, or containing duplicates.",
      "Extremely simple to implement correctly with minimal code.",
      "No preprocessing required — no sorting, no index building.",
      "Optimal for very small arrays where the overhead of binary search would be unnecessary.",
    ],
    limitations: [
      "Slow on large datasets — `O(n)` means performance degrades linearly with array size.",
      "Outperformed by Binary Search on sorted data (O(log n) vs O(n)).",
      "Not suitable for repeated searches on static large datasets — sorting once and using Binary Search would be faster overall.",
    ],
  },

  whenToUseIt:
    "Use **Linear Search** when:\n" +
    "- The array is **unsorted** and sorting it first is not practical.\n" +
    "- The dataset is **small** (typically fewer than ~50 elements) where algorithmic overhead matters less than simplicity.\n" +
    "- You are performing a **one-time search** and the cost of sorting would exceed the cost of scanning.\n" +
    "- The elements are stored in a **sequential-access structure** like a linked list that does not support random access.\n\n" +
    "Avoid Linear Search when:\n" +
    "- The array is **sorted** — use Binary Search instead for `O(log n)` performance.\n" +
    "- You need to perform **many repeated searches** on the same large dataset — sort once and use Binary Search.\n" +
    "- Performance is critical and the dataset exceeds a few hundred elements.",
};
