import type { EducationalContent } from "@/types";

export const metaBinarySearchEducational: EducationalContent = {
  overview:
    "**Meta Binary Search** (also called One-Sided Binary Search) is a variant that uses bit manipulation to construct the search position incrementally from the most significant bit down to the least significant bit.\n\nInstead of maintaining separate `low` and `high` pointers, it builds a single `position` value by conditionally setting bits from largest to smallest, converging on the target index in exactly `floor(log2(n)) + 1` iterations.",

  howItWorks:
    "1. Calculate the number of bits needed: `bitCount = floor(log2(n))`.\n" +
    "2. Start with `position = 0`.\n" +
    "3. For each bit from the most significant (`bitCount`) down to `0`:\n" +
    "   - Tentatively set that bit: `newPosition = position | (1 << bitIndex)`.\n" +
    "   - If `newPosition` is within bounds AND `array[newPosition] <= target`, keep the bit: `position = newPosition`.\n" +
    "   - Otherwise, leave `position` unchanged (the bit stays 0).\n" +
    "4. After the loop, check if `array[position] === target`. If yes, return `position`; otherwise return `-1`.\n\n" +
    "### Bit-by-Bit Position Construction\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    subgraph Array: [2,5,8,12,16,23,38,56,72,91], Target: 23\n" +
    '    A["bit=3: newPos=8, arr[8]=72>23, skip"] --> B["bit=2: newPos=4, arr[4]=16≤23, keep"]\n' +
    '    B --> C["bit=1: newPos=6, arr[6]=38>23, skip"] --> D["bit=0: newPos=5, arr[5]=23≤23, keep"]\n' +
    '    D --> E["position=5, arr[5]=23=target → Found!"]\n' +
    "    end\n" +
    "    style E fill:#10b981,stroke:#059669\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(log n)`**\n\n" +
    "- The loop runs exactly `floor(log2(n)) + 1` iterations — one per bit in the array length.\n" +
    "- **Best Case:** `O(1)` — Target happens to be found immediately at position 0.\n" +
    "- **Worst Case:** `O(log n)` — All bit positions are evaluated.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a constant number of integer variables are used — no recursion or auxiliary structures.",

  bestAndWorstCase:
    "**Best case** `O(1)` is rare and occurs when the target is at index 0 and the first comparison resolves immediately.\n\n" +
    "**Worst case** `O(log n)` iterates through all `floor(log2(n)) + 1` bits. For an array of 1,000,000 elements, this is at most 20 iterations — identical asymptotically to standard binary search, but with a different constant factor due to bit operations.",

  realWorldUses: [
    "**Hardware-Optimized Search:** CPU architectures with fast bit-shift instructions can execute this variant with lower branch-prediction overhead than standard binary search.",
    "**Embedded Systems:** Systems with limited instruction sets benefit from the single-variable approach over maintaining two pointer variables.",
    "**Branchless Searching:** The bit-setting pattern lends itself to branchless implementations on SIMD-capable processors.",
    "**Academic Research:** Used as a teaching tool to illustrate how binary search connects to binary number representation.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Fixed number of iterations — always exactly `floor(log2(n)) + 1` steps regardless of target position.",
      "Single position variable instead of two pointers — simpler mental model for bit-level thinking.",
      "Naturally branchless-friendly — the conditional bit-setting can be expressed without branches on some architectures.",
    ],
    limitations: [
      "Less intuitive than standard binary search for most developers — the bit manipulation requires careful reasoning.",
      "Requires the array to be sorted, just like all binary search variants.",
      "The `log2` calculation at setup adds a small constant overhead not present in standard binary search.",
    ],
  },

  whenToUseIt:
    "Use **Meta Binary Search** when working on hardware-sensitive code where bit manipulation is cheaper than branch instructions, or when you need a fixed and predictable iteration count regardless of where the target lies.\n\nAvoid it in general application code where standard binary search is clearer, better known, and equally efficient. Do not use it on unsorted arrays.",
};
