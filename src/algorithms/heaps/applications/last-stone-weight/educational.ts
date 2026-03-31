import type { EducationalContent } from "@/types";

export const lastStoneWeightEducational: EducationalContent = {
  overview:
    "**Last Stone Weight** (LeetCode 1046) simulates a stone-smashing game: repeatedly pick the two heaviest stones and smash them together. If they are equal weight, both are destroyed. If not, the difference survives. The game ends when one or zero stones remain.\n\nA **max-heap** makes this efficient — it always gives the two heaviest stones in O(log n) time each, turning a naïve O(n²) simulation into an **O(n log n)** solution.",

  howItWorks:
    "The algorithm uses a max-heap to efficiently retrieve the two heaviest stones at each round:\n\n" +
    "1. **Heapify** — Build a max-heap from the initial stone weights in O(n) using Floyd's bottom-up algorithm.\n" +
    "2. **Smash loop** — While the heap has at least 2 stones:\n" +
    "   - Extract the maximum (heaviest stone `y`).\n" +
    "   - Extract the new maximum (second heaviest stone `x`).\n" +
    "   - If `x == y`: both stones are destroyed, nothing is reinserted.\n" +
    "   - If `x < y`: insert `y - x` back into the heap and sift-up.\n" +
    "3. **Result** — If the heap is empty, return 0. Otherwise return the last remaining stone's weight.\n\n" +
    "### Example: stones = [2, 7, 4, 1, 8, 1]\n\n" +
    "```\n" +
    "Initial heap: [8, 7, 4, 1, 2, 1]\n\n" +
    "Round 1: Extract 8 and 7. 8 ≠ 7 → insert 1. Heap: [4, 2, 1, 1, 1]\n" +
    "Round 2: Extract 4 and 2. 4 ≠ 2 → insert 2. Heap: [2, 1, 1, 1]\n" +
    "Round 3: Extract 2 and 1. 2 ≠ 1 → insert 1. Heap: [1, 1, 1]\n" +
    "Round 4: Extract 1 and 1. 1 == 1 → both destroyed. Heap: [1]\n\n" +
    "Result: 1 (one stone of weight 1 remains)\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n log n)`**\n\n" +
    "Building the initial max-heap takes O(n) via Floyd's algorithm. Each smash round performs two extractions and at most one insertion — each O(log n). There are at most n − 1 rounds (each reduces the stone count by at least 1). Total: O(n log n).\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The heap holds all n stones initially. No additional memory beyond the heap and a constant number of variables is required.",

  bestAndWorstCase:
    "**Best case — O(n log n):** All stones are equal weight. Every round destroys both stones with no reinsertion. n/2 rounds of two O(log n) extractions each.\n\n" +
    "**Worst case — O(n log n):** Each round produces a difference that is reinserted. The heap never shrinks rapidly, maximizing the number of sift-up operations. In practice the constant factor is small because each round reduces the number of stones by at least 1.",

  realWorldUses: [
    "**Task merging simulations:** Model scenarios where two largest tasks combine into a smaller residual task (e.g., merge files, reduce queues).",
    "**Game theory:** Simulate elimination tournaments where the strongest remaining competitors face each other.",
    "**Priority queue drain patterns:** Any system that repeatedly consumes the two largest items and optionally requeues a remainder.",
    "**Huffman coding:** The Huffman tree construction algorithm uses the same pattern — merge the two smallest frequencies and reinsert.",
    "**Compression and encoding:** Greedy algorithms that combine or reduce elements based on priority use max-heap extraction in this pattern.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n log n) — far better than the O(n²) brute-force approach of scanning for the two largest values each round.",
      "Handles dynamic insertions — the heap naturally accommodates new elements (the difference stone) after each smash.",
      "Clean and readable — the max-heap abstraction directly models the problem's priority semantics.",
    ],
    limitations: [
      "O(n) space — the heap must store all stones, unlike a simple iterative scan.",
      "Overkill for very small inputs — for fewer than ~10 stones a linear scan may be simpler to implement.",
      "Max-heap is not built into most standard libraries as a direct data structure — min-heap with negated values is the common workaround.",
    ],
  },

  whenToUseIt:
    "Use the last stone weight approach whenever a problem requires repeatedly extracting the largest (or two largest) elements, optionally computing a remainder, and reinserting it — this is the classic max-heap application pattern. If the input is static (no reinsertion), a single sort suffices. If you need repeated access to the minimum instead, use a min-heap. This pattern generalizes to Huffman coding, greedy merging problems, and any simulation where the top-priority element changes each step.",
};
