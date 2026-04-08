import type { EducationalContent } from "@/types";

export const countingSortEducational: EducationalContent = {
  overview:
    "**Counting Sort** is a non-comparison integer sorting algorithm that achieves O(n + k) time complexity by counting the frequency of each distinct value rather than comparing elements.\n\n" +
    "Where `n` is the number of elements and `k` is the range of input values (max − min + 1). When `k` is small relative to `n`, Counting Sort dramatically outperforms comparison-based algorithms like Merge Sort or Quick Sort, which are bounded by the O(n log n) comparison lower bound.",

  howItWorks:
    "1. **Find the range**: Determine the maximum value `k` in the input array.\n" +
    "2. **Count frequencies**: Create a `count` array of size `k + 1`. Scan the input and increment `count[value]` for each element.\n" +
    "3. **Reconstruct**: Iterate over `count` from index `0` to `k`. For each index, write that value `count[index]` times into the output array.\n\n" +
    "### Walkthrough: `[4, 2, 2, 3, 1]`\n\n" +
    "```\n" +
    "Input:   [4, 2, 2, 3, 1]\n" +
    "Max = 4  →  count array size = 5\n" +
    "\n" +
    "After counting:\n" +
    "count = [0, 1, 2, 1, 1]   (index = value, cell = frequency)\n" +
    "         ↑  ↑  ↑  ↑  ↑\n" +
    "         0  1  2  3  4\n" +
    "\n" +
    "Reconstruct:\n" +
    "  count[1]=1 → write 1 once\n" +
    "  count[2]=2 → write 2 twice\n" +
    "  count[3]=1 → write 3 once\n" +
    "  count[4]=1 → write 4 once\n" +
    "\n" +
    "Output: [1, 2, 2, 3, 4]\n" +
    "```\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  I1["4"] --> I2["2"] --> I3["2"] --> I4["3"] --> I5["1"]\n' +
    "  style I1 fill:#06b6d4,stroke:#0891b2\n" +
    "  style I2 fill:#06b6d4,stroke:#0891b2\n" +
    "  style I3 fill:#06b6d4,stroke:#0891b2\n" +
    "  style I4 fill:#06b6d4,stroke:#0891b2\n" +
    "  style I5 fill:#06b6d4,stroke:#0891b2\n" +
    '  C["count\\n[0,1,2,1,1]"] -. frequencies .-> I2\n' +
    '  O1["1"] --> O2["2"] --> O3["2"] --> O4["3"] --> O5["4"]\n' +
    "  style O1 fill:#14532d,stroke:#22c55e\n" +
    "  style O2 fill:#14532d,stroke:#22c55e\n" +
    "  style O3 fill:#14532d,stroke:#22c55e\n" +
    "  style O4 fill:#14532d,stroke:#22c55e\n" +
    "  style O5 fill:#14532d,stroke:#22c55e\n" +
    "  C -. reconstruct .-> O1\n" +
    "```\n\n" +
    "Cyan = unsorted input, count array records frequencies, green = reconstructed sorted output.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n + k)`**\n\n" +
    "- Counting pass: `O(n)` — one scan of the input array.\n" +
    "- Reconstruction pass: `O(k)` — iterate over the count array once, writing `n` total elements.\n" +
    "- Total: `O(n + k)`, which beats `O(n log n)` when `k = O(n)`.\n\n" +
    "**Space Complexity: `O(k)`**\n\n" +
    "- The count array requires `O(k)` space. For small `k` (e.g., sorting exam scores 0–100), this is negligible. For large `k` (e.g., sorting 32-bit integers), this can be prohibitive.",

  bestAndWorstCase:
    "**Best Case: `O(n + k)`** — Always linear in both `n` and `k`. No early termination is possible because the full count array must be scanned.\n\n" +
    "**Worst Case: `O(n + k)`** — Performance degrades only when `k` grows large relative to `n`. If sorting 10 elements with values up to 1,000,000, `k` dominates and the algorithm wastes O(1,000,000) on an empty count array scan.\n\n" +
    "### When k Matters\n\n" +
    "| n     | k         | Total ops |\n" +
    "| ----- | --------- | --------- |\n" +
    "| 1,000 | 100       | ~1,100    |\n" +
    "| 1,000 | 1,000     | ~2,000    |\n" +
    "| 1,000 | 1,000,000 | ~1,001,000|\n\n" +
    "For the last row, Quick Sort's `O(n log n) ≈ 10,000` operations is far faster.",

  realWorldUses: [
    "**Sorting Exam Scores**: Scores 0–100 make `k = 101` — tiny relative to thousands of students.",
    "**Histogram Generation**: Counting pixel intensity frequencies (0–255) in image processing.",
    "**Radix Sort Subroutine**: Counting Sort on each digit position is the inner loop of Radix Sort.",
    "**Character Frequency Analysis**: Sorting ASCII characters (k = 128) in text processing pipelines.",
    "**Age-Based Sorting**: Sorting population records by age (0–120) for demographic analysis.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Breaks the O(n log n) comparison-based lower bound when k is small.",
      "Stable sort by default when reconstructing from a cumulative count array.",
      "Extremely simple to implement for non-negative integer inputs.",
      "Cache-friendly linear scans with no recursive calls or pivoting.",
    ],
    limitations: [
      "Only works on non-negative integers (or values mappable to non-negative indices).",
      "Impractical when k (value range) is much larger than n (element count).",
      "Cannot sort floating-point numbers, strings, or custom objects directly.",
      "Memory usage scales with k, not n — a large value range wastes space even for small inputs.",
    ],
  },

  whenToUseIt:
    "Choose **Counting Sort** when all of the following are true:\n\n" +
    "- Input elements are non-negative integers (or can be mapped to non-negative integers).\n" +
    "- The value range `k` is small relative to `n` (a good rule of thumb: `k ≤ 10 * n`).\n" +
    "- You need a linear-time sort and cannot afford O(n log n).\n\n" +
    "**Avoid it when** the value range is large (e.g., sorting arbitrary 32-bit integers), the input contains floats or strings, or memory usage is constrained. In those cases, prefer Merge Sort, Quick Sort, or Radix Sort.",
};
