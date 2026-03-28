import type { EducationalContent } from "@/types";

export const findMissingNumberEducational: EducationalContent = {
  overview:
    "**Find Missing Number (XOR)** solves a classic puzzle: given an array containing `n` distinct numbers drawn from the range `0` to `n`, find the one missing number in `O(n)` time and `O(1)` space.\n\n" +
    "The XOR bit-trick exploits two core properties of the XOR operation: `a ^ a = 0` (identical values cancel) and `a ^ 0 = a` (XOR with zero is identity). By XOR-ing every element in the array with every expected value in `0..n`, all present numbers cancel in pairs, leaving only the missing number behind.",

  howItWorks:
    "1. Record `arrayLength = inputArray.length`. The full range of expected values is `0` through `arrayLength` (inclusive), giving `arrayLength + 1` values.\n" +
    "2. Initialize `currentXor = 0`.\n" +
    "3. **First pass — XOR the expected range:** For each `expectedRange` from `0` to `arrayLength`, compute `currentXor ^= expectedRange`. After this loop, `currentXor` holds `0 ^ 1 ^ 2 ^ … ^ n`.\n" +
    "4. **Second pass — XOR the array:** For each element in `inputArray`, compute `currentXor ^= element`. Every number that is *present* in the array appears in both passes, so it cancels to `0`. Only the *missing* number, which appears only in the range pass, remains.\n" +
    "5. Return `currentXor` as the missing number.\n\n" +
    "### XOR Trace (`[3, 0, 1]`, n = 3, missing = 2)\n\n" +
    "```\n" +
    "Range pass:  0^1^2^3 = 0\n" +
    "Array pass:  0^3^0^1 = 3\n" +
    "Combined:    0^1^2^3^3^0^1 = 2  ✓\n" +
    "```\n\n" +
    "**Alternative — Gauss Sum:** Compute `expected = n*(n+1)/2`, subtract the actual array sum. Returns the same answer arithmetically but can overflow for very large `n` in languages without big integers.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "- The algorithm makes two independent linear passes: once over `0..n` (`n+1` iterations) and once over the input array (`n` iterations). Total work is `2n + 1` XOR operations — strictly `O(n)`.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a single accumulator variable (`currentXor`) is needed regardless of input size. No auxiliary arrays, hash sets, or recursion stacks are allocated.",

  bestAndWorstCase:
    "**Best Case — `O(n)`:** The missing number is `0` (the very first expected value). The XOR passes still visit all `n` elements — there is no early-exit optimization possible since the answer is not known until both passes finish.\n\n" +
    "**Worst Case — `O(n)`:** The missing number is `n` (the last expected value). Again, both full passes are required. Unlike sorted-array techniques, XOR has no mechanism to short-circuit.\n\n" +
    "The algorithm is uniformly `O(n)` across all cases, with a very small constant factor (single XOR per element, no comparisons, no branches inside the loops).",

  realWorldUses: [
    "**Data Integrity Checks:** Verifying that a sequence of transaction IDs, packet sequence numbers, or file chunk indices is complete — any gap is immediately surfaced.",
    "**Memory Diagnostics:** Detecting a missing address in a contiguous memory range scan without building an auxiliary bitmap.",
    "**Checksum / Parity:** XOR-based running accumulators are the foundation of RAID-5 parity, CRC computations, and network packet error detection.",
    "**Streaming Deduplication:** Identifying the one absent value in a single-pass stream where random access is unavailable and O(1) memory is mandatory.",
    "**Competitive Programming:** A fundamental building block for XOR-based tricks used in problems involving pairs, missing elements, and bit manipulation.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Optimal `O(n)` time and `O(1)` space — no hash set, no sorting required.",
      "Branchless inner loops — extremely cache-friendly and fast in practice.",
      "No integer overflow risk (unlike the Gauss sum approach) — XOR operates at the bit level.",
      "Generalizes to finding two missing numbers with additional XOR masking techniques.",
    ],
    limitations: [
      "Solves only the specific problem of *one* missing number in a range `0..n` — not directly applicable to arbitrary missing-element problems.",
      "Requires the input elements to be non-negative integers in a known range; negative values or floating-point inputs require a different strategy.",
      "Less intuitive than the Gauss sum approach — the XOR cancellation argument needs explanation for readers unfamiliar with bit manipulation.",
      "Cannot be easily adapted when *multiple* numbers are missing without additional passes and masking.",
    ],
  },

  whenToUseIt:
    "Use **Find Missing Number (XOR)** whenever you have an array of `n` integers drawn from `0..n` with exactly one missing value and need an `O(1)` space solution. It is the preferred approach over the Gauss sum when overflow safety is important.\n\n" +
    "Prefer the **Gauss sum** variant when code readability is the primary concern and integer overflow is not an issue (e.g., small `n` or a big-integer language).\n\n" +
    "Do **not** use this approach when: the array may contain duplicates, values outside `0..n`, multiple missing numbers (without modification), or when the input is not integer-typed.",
};
