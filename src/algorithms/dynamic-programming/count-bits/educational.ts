import type { EducationalContent } from "@/types";

export const countBitsEducational: EducationalContent = {
  overview:
    "**Count Bits (Tabulation)** computes the number of `1`-bits (popcount) in the binary representation of every integer from `0` to `n` in a single linear pass. It uses **bit manipulation combined with dynamic programming**: each number's popcount is derived from the popcount of its right-shifted half, plus whether the least significant bit is set.\n\nThis produces the full answer array in `O(n)` time — far faster than computing popcount for each number independently.",

  howItWorks:
    "1. **Initialize** a DP table `dp` of size `n + 1`, all zeroed.\n" +
    "2. **Base case:** `dp[0] = 0` — zero has no set bits.\n" +
    "3. **Iterate** from `1` to `n`. For each `i`:\n" +
    "   - **Read cache:** look up `dp[i >> 1]` (popcount of `i` with its LSB stripped).\n" +
    "   - **Compute cell:** `dp[i] = dp[i >> 1] + (i & 1)` — add `1` if the LSB is set.\n" +
    "4. Return the full `dp` array.\n\n" +
    "### Table for n = 5\n\n" +
    "```\n" +
    "i    binary  dp[i>>1]  i&1  dp[i]\n" +
    "0    000     —         —    0\n" +
    "1    001     dp[0]=0   1    1\n" +
    "2    010     dp[1]=1   0    1\n" +
    "3    011     dp[1]=1   1    2\n" +
    "4    100     dp[2]=1   0    1\n" +
    "5    101     dp[2]=1   1    2\n" +
    "```\n\n" +
    "The lookback is **unusual**: instead of `dp[i-1]` or `dp[i-2]`, it reaches back to `dp[i >> 1]` — half the current index. This is what makes it a bit-manipulation DP rather than a standard recurrence.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "A single pass from `1` to `n` fills the table. Each iteration performs two `O(1)` bit operations (`>>` and `&`), so total work is exactly `n` iterations.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The output array itself holds `n + 1` values — no auxiliary space beyond the answer. The algorithm is output-optimal: every value in the array is part of the required result.",

  bestAndWorstCase:
    "**Best, average, and worst case are all `O(n)`** — the loop always runs from `1` to `n` with no early exits or input-dependent branching.\n\n" +
    "There is no way to skip entries: computing `dp[i]` requires `dp[i >> 1]`, which must already be in the table. The strict left-to-right fill order is mandatory.",

  realWorldUses: [
    "**Network Programming:** Popcount is used in CIDR subnet mask calculations and Hamming distance checks for error detection.",
    "**Cryptography & Hashing:** Many hash functions and checksums rely on counting set bits to measure bit dispersion.",
    "**Compression:** Huffman and arithmetic coders use popcount to track symbol frequencies encoded in bitmaps.",
    "**Hardware Design:** Efficient adder trees in CPUs count set bits for parity, overflow, and SIMD lane selection.",
    "**Competitive Programming:** LeetCode 338 (Counting Bits) is a canonical DP + bit manipulation problem in coding interviews.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Produces all `n + 1` popcounts in a single `O(n)` pass — amortized `O(1)` per element.",
      "No math library needed — only two bit operations per iteration (`>>` and `&`).",
      "The unusual half-index lookback is elegant: right-shifting strips the LSB, preserving all other bits.",
      "Cache-friendly sequential memory access pattern.",
    ],
    limitations: [
      "Requires the full output array — not suitable when only a single popcount is needed (use `n.toString(2).split('1').length - 1` or a hardware popcount intrinsic instead).",
      "The half-index recurrence is non-obvious; developers unfamiliar with bit manipulation may find the `dp[i >> 1]` dependency confusing.",
    ],
  },

  whenToUseIt:
    "Use Count Bits tabulation when you need the popcount of **every** integer in a range `[0, n]` — for example, generating a lookup table, computing Hamming distances in bulk, or visualizing binary representations step by step.\n\nIf you need only a single popcount, use JavaScript's `Math.clz32` trick or `n.toString(2).replace(/0/g, '').length` instead. Prefer this DP approach when the repeated lookback pattern across a range justifies building the full table.",
};
