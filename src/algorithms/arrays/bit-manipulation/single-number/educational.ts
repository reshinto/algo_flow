import type { EducationalContent } from "@/types";

export const singleNumberEducational: EducationalContent = {
  overview:
    "**Single Number (XOR)** solves a deceptively simple problem: given an array where every element appears exactly *twice* except for one, find the unique element — in `O(n)` time with `O(1)` space.\n\n" +
    "The algorithm exploits two core XOR properties: `a ^ a = 0` (any value XOR'd with itself is zero) and `a ^ 0 = a` (XOR with zero is the identity). Running XOR across all elements causes every duplicate pair to cancel out, leaving only the single unpaired element.",

  howItWorks:
    "1. Initialize `runningXor = 0`.\n" +
    "2. Iterate over every element in `inputArray` from left to right.\n" +
    "3. For each `currentElement`, compute `runningXor ^= currentElement`.\n" +
    "   - When a pair appears (e.g., two `3`s), the two `3 ^ 3` operations contribute `0`, which vanishes into the accumulator.\n" +
    "   - The single unpaired element contributes exactly once and is never cancelled.\n" +
    "4. After the loop, `runningXor` holds the unique element — return it.\n\n" +
    "### XOR Trace (`[4, 1, 2, 1, 2]`)\n\n" +
    "```\n" +
    "Start:          runningXor = 0\n" +
    "XOR 4:          0  ^ 4  = 4\n" +
    "XOR 1:          4  ^ 1  = 5\n" +
    "XOR 2:          5  ^ 2  = 7\n" +
    "XOR 1:          7  ^ 1  = 6   (first 1 cancels with second 1)\n" +
    "XOR 2:          6  ^ 2  = 4   (first 2 cancels with second 2)\n" +
    "Result: 4  ✓\n" +
    "```\n\n" +
    "**Contrast with Hash Map approach:** A hash map counts occurrences in one pass and returns the key with an odd count. It also runs in `O(n)` time but requires `O(n)` space for the frequency table. XOR achieves the same answer with no auxiliary storage.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "- The algorithm makes a single linear pass over the input array, performing one XOR operation per element. Total work is exactly `n` XOR operations — strictly `O(n)` with a very small constant.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a single accumulator variable (`runningXor`) is used regardless of input size. Unlike the hash map approach, no extra memory is allocated.",

  bestAndWorstCase:
    "**Best Case — `O(n)`:** The unique element is the first value in the array. Even so, the full pass is required because elements can appear in any order — skipping the rest would risk missing a cancellation.\n\n" +
    "**Worst Case — `O(n)`:** The unique element is the last value in the array. All earlier pairs cancel during the traversal and only the final XOR reveals the answer.\n\n" +
    "The algorithm has no branching inside the loop — every case is uniformly `O(n)` with identical constant factors.",

  realWorldUses: [
    "**Bit Manipulation Puzzles:** The canonical LeetCode #136 problem and a building block for XOR-based tricks involving pairs, missing elements, and find-the-different-bit problems.",
    "**Fault Detection:** Identifying a non-duplicated sensor reading or transaction ID in a stream where all valid entries arrive in pairs.",
    "**Symmetric Difference:** When two multisets are XOR'd element-wise, the survivors are elements that appear an odd number of times — useful for incremental set reconciliation.",
    "**Cryptography / Checksums:** XOR accumulators are used in parity checks, RAID-5 stripes, and lightweight error detection where `O(1)` state is mandatory.",
    "**Signal Processing:** Detecting the lone anomalous sample in a balanced signal stream without buffering the entire sequence.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Optimal `O(n)` time and `O(1)` space — the best possible complexity for this problem.",
      "Single-pass, branch-free inner loop — maximally cache-friendly and easy to vectorize.",
      "No integer overflow or precision issues — XOR operates at the bit level on any integer type.",
      "Generalizes: with additional bit-masking, the XOR trick extends to finding two distinct single numbers.",
    ],
    limitations: [
      "Only works when every non-unique element appears *exactly* twice — if elements appear three or more times, a different approach (e.g., bit counting) is needed.",
      "Not directly applicable to non-integer types (strings, floats) without a custom hash.",
      "Less intuitive than a hash map solution — the cancellation argument requires understanding of XOR at the bit level.",
      "Provides no information about *which* elements were the duplicates, only which element was unique.",
    ],
  },

  whenToUseIt:
    "Use **Single Number (XOR)** whenever the problem guarantees that all elements except one appear exactly twice and you need an `O(1)` space solution. This is the textbook approach for LeetCode #136 and equivalent interview problems.\n\n" +
    "Prefer a **hash map** when: elements may appear more than twice, you need to know *all* duplicates, or the input type is not a primitive integer.\n\n" +
    "Do **not** use XOR when the duplication invariant (every non-unique element appears exactly twice) is not guaranteed — the algorithm will silently return a wrong answer for other distributions.",
};
