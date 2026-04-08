import type { EducationalContent } from "@/types";

export const topKFrequentHeapEducational: EducationalContent = {
  overview:
    "**Top-K Frequent Elements (Heap)** finds the `k` elements that appear most often in an array by combining a frequency count with a size-bounded min-heap.\n\n" +
    "Rather than sorting all elements by frequency (`O(n log n)`), maintaining a min-heap of exactly `k` entries keeps only the current top-k candidates in memory and runs in `O(n log k)` time — a significant speedup when `k` is much smaller than `n`.",

  howItWorks:
    "The algorithm runs in two phases:\n\n" +
    "**Phase 1 — Count frequencies:** Iterate the input once, recording how many times each unique element appears in a hash map. This takes `O(n)` time.\n\n" +
    "**Phase 2 — Maintain a min-heap of size k:**\n" +
    "For each unique element and its frequency:\n" +
    "- If the heap has fewer than `k` entries, insert the new `(frequency, element)` pair and sift up.\n" +
    "- Otherwise, compare the element's frequency against the root (the current minimum in the heap).\n" +
    "  - If the new frequency is **greater**, replace the root with the new entry and sift down.\n" +
    "  - If not, discard — it cannot be in the top k.\n\n" +
    "At the end, the heap contains exactly the `k` most frequent elements.\n\n" +
    "### Example: array = [1,1,1,2,2,3,3,3,3,4], k = 2\n\n" +
    "```\n" +
    "Frequencies: {1→3, 2→2, 3→4, 4→1}\n\n" +
    "Insert 1 (freq 3): heap = [(3,1)]\n" +
    "Insert 2 (freq 2): heap = [(2,2),(3,1)]  ← min-heap by freq\n" +
    "Insert 3 (freq 4): 4 > root(2) → replace → sift down\n" +
    "  heap = [(3,1),(4,3)]\n" +
    "Insert 4 (freq 1): 1 ≤ root(3) → discard\n\n" +
    "Result: [1, 3]  (elements with freq 3 and 4)\n" +
    "```\n\n" +
    "### Min-Heap of Size k=2 After Processing All Elements\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    '    root("(freq=3, val=1)") --> child("(freq=4, val=3)")\n' +
    "    style root fill:#06b6d4,stroke:#0891b2\n" +
    "    style child fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "The root (cyan) is the minimum-frequency keeper — any new element with frequency ≤ 3 is discarded. The settled child (green) has frequency 4 and is safely in the top-2.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n log k)`**\n\n" +
    "Counting frequencies is `O(n)`. For each of the `m` unique elements, inserting into or sifting within the heap takes `O(log k)`. Overall: `O(n + m log k)`. Since `m ≤ n`, this is `O(n log k)`.\n\n" +
    "Compared to a full sort of unique elements (`O(m log m)`), this wins whenever `k ≪ m`.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The frequency map uses `O(m)` space for `m` unique elements (at most `O(n)`). The heap is capped at `O(k)`. Total: `O(n)`.",

  bestAndWorstCase:
    "**Best case — `O(n)`:** When all elements are identical (`k = 1`), only one element ever enters the heap, and frequency counting dominates.\n\n" +
    "**Typical case — `O(n log k)`:** The heap processes each unique element in `O(log k)`. For large `n` and small `k`, this is close to linear.\n\n" +
    "**Worst case — `O(n log n)`:** When `k = n`, the heap can grow to `n` elements and each insertion takes `O(log n)`. In this degenerate case, a sort would be equally efficient.",

  realWorldUses: [
    "**Search autocomplete:** Rank the top-k most typed queries from a user history log efficiently without sorting the entire log.",
    "**Trending topics:** Identify the k most-mentioned hashtags or keywords in a stream of social media posts.",
    "**Recommendation engines:** Surface the k most-clicked items from a large catalog by maintaining a bounded heap over click counts.",
    "**Log analysis:** Find the k most frequent error codes in server logs to prioritize incident response.",
    "**Database query optimization:** Identify the top-k most frequently accessed rows or indexes to tune caching strategies.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n log k) time — much faster than full sort when k is small.",
      "O(k) heap space — constant memory overhead regardless of input size.",
      "Single-pass over unique elements after O(n) frequency counting.",
    ],
    limitations: [
      "Does not preserve insertion order for ties — elements with equal frequency may appear in any order.",
      "Requires O(n) extra space for the frequency map regardless of k.",
      "When k ≈ n, a sort-based approach is equally fast with simpler code.",
    ],
  },

  whenToUseIt:
    "Use the heap-based top-k approach when `k` is significantly smaller than the number of unique elements and you need the result efficiently without sorting everything. It is the standard solution for interview problems asking for 'top k frequent elements' and production systems tracking popularity in large datasets. If you need a strict frequency ordering of all elements, a full frequency sort is simpler. If `k = 1`, a simple linear scan for the maximum frequency suffices.",
};
