import type { EducationalContent } from "@/types";

export const binaryIndexedTreeEducational: EducationalContent = {
  overview:
    "A **Binary Indexed Tree (BIT)**, also called a **Fenwick Tree**, is a space-efficient data structure for computing prefix sums and range sums with point updates in `O(log n)`. It stores partial sums in an array indexed using the least-significant bit (LSB) trick — `index & (-index)` reveals how many elements each position is responsible for.\n\nInvented by Peter Fenwick in 1994, BITs are simpler and faster in practice than segment trees for pure prefix-sum workloads.",

  howItWorks:
    "**Key insight:** Every integer can be expressed as a sum of powers of 2. The BIT uses the binary representation of indices to determine responsibilities:\n\n" +
    "- `bit[i]` stores the sum of `array[i - lsb(i) + 1 ... i]` where `lsb(i) = i & (-i)`.\n\n" +
    "**Update `update(i, delta)`:** Add `delta` to index `i` and propagate up:\n" +
    "```\n" +
    "while i ≤ n:  bit[i] += delta;  i += i & (-i)\n" +
    "```\n\n" +
    "**Prefix sum `query(i)`:** Sum from index 1 to i:\n" +
    "```\n" +
    "while i > 0:  sum += bit[i];  i -= i & (-i)\n" +
    "```\n\n" +
    "**Range sum `[L, R]`** = `query(R+1) - query(L)`.",

  timeAndSpaceComplexity:
    "**Update: `O(log n)`** — at most `log₂(n)` additions per update.\n\n" +
    "**Query: `O(log n)`** — at most `log₂(n)` additions per prefix sum.\n\n" +
    "**Space: `O(n)`** — just one extra array of size n+1.",

  bestAndWorstCase:
    "**Best case:** Single-element query — O(log n) but with very small constants.\n\n" +
    "**Worst case:** Repeated updates followed by all range queries — O((n + q) log n).\n\n" +
    "BITs are typically 2-3× faster than segment trees in practice due to lower constant factors.",

  realWorldUses: [
    "**Order statistics:** Count inversions in an array in O(n log n).",
    "**Frequency tables:** Maintain dynamic frequency distributions for sorting.",
    "**Competitive programming:** Standard tool for prefix sum with updates.",
    "**Event simulation:** Track cumulative event counts in sliding window problems.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Simpler implementation than segment trees — just 10-15 lines of code.",
      "O(n) space — no 4× overhead unlike segment trees.",
      "Cache-friendly array access pattern.",
    ],
    limitations: [
      "Only supports commutative and invertible operations (sum, XOR) — not min/max.",
      "Range updates require a modified construction (difference BIT).",
      "Conceptually less intuitive than segment trees.",
    ],
  },

  whenToUseIt:
    "Use a BIT when you need prefix sums or range sums with point updates and want minimum code complexity. For range minimum/maximum queries or range updates, use a segment tree instead.",
};
