import type { EducationalContent } from "@/types";

export const hammingDistanceEducational: EducationalContent = {
  overview:
    "**Hamming Distance** measures how different two equal-length strings are by counting the number of positions where their corresponding characters differ.\n\n" +
    "Named after mathematician Richard Hamming, it was originally developed for error detection and correction in digital communications. Given two strings `text` and `pattern` of length `n`, the Hamming distance is the minimum number of single-character substitutions needed to transform one string into the other.\n\n" +
    "If the strings are not the same length, the Hamming distance is undefined — this implementation returns `-1` in that case.",

  howItWorks:
    "The algorithm is a single linear scan with no preprocessing:\n\n" +
    "1. **Length check** — if `text.length !== pattern.length`, return `-1` immediately.\n" +
    "2. **Scan** — iterate through every index `charIndex` from `0` to `n - 1`.\n" +
    "3. **Compare** — if `text[charIndex] !== pattern[charIndex]`, increment a `distance` counter.\n" +
    "4. **Return** — after the loop, `distance` holds the total number of mismatched positions.\n\n" +
    "Example:\n" +
    "```\n" +
    "text:    k a r o l i n\n" +
    "pattern: k a t h r i n\n" +
    "diff:    . . ✗ ✗ ✗ . .\n" +
    "```\n" +
    "Hamming distance = **3** (positions 2, 3, and 4 differ).",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "- Each of the `n` character positions is visited exactly once.\n" +
    "- No inner loops, no recursion, no sorting.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "- Only a single integer counter (`distance`) is maintained regardless of input size.\n" +
    "- No auxiliary arrays or data structures are allocated.",

  bestAndWorstCase:
    "**Best case** — both strings are identical: the loop runs all `n` iterations but the distance counter stays at 0. Still `O(n)` — there is no early exit because every position must be checked.\n\n" +
    "**Worst case** — every character pair differs (e.g., `'aaaa'` vs `'bbbb'`): the counter increments at every position, reaching `n`. Still `O(n)`.\n\n" +
    "Unlike most search algorithms, Hamming Distance has no difference between best and worst case in terms of asymptotic complexity — both are exactly `O(n)`.",

  realWorldUses: [
    "**Error-correcting codes:** Hamming codes use the distance metric to detect and correct single-bit errors in data transmission (the original motivation for the algorithm).",
    "**DNA sequence analysis:** Comparing two aligned sequences of the same length to count single-nucleotide polymorphisms (SNPs) between individuals.",
    "**Cryptography:** Measuring the diffusion property of hash functions and block ciphers — a good cipher should produce a Hamming distance close to `n/2` for a 1-bit input change.",
    "**Spell checking:** Flagging words that differ in exactly one character from a dictionary entry as likely typos.",
    "**Machine learning:** Used as a similarity metric for binary feature vectors in nearest-neighbour classification.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Extremely simple to implement — a single loop with one comparison per iteration.",
      "O(1) space with no heap allocations, making it suitable for embedded or memory-constrained environments.",
      "Deterministic O(n) time with no worst-case degradation.",
      "Naturally parallelisable — each position is independent, enabling SIMD or GPU acceleration.",
    ],
    limitations: [
      "Requires equal-length strings — cannot compare strings of different lengths without padding.",
      "Counts only substitutions — insertions and deletions are not modelled (use Levenshtein distance for those).",
      "Not suitable for approximate matching where the pattern may appear at different alignments within a longer text.",
    ],
  },

  whenToUseIt:
    "Use Hamming Distance when you have two strings of identical length and want to count character-level differences in a single pass. It is the right choice for binary strings, fixed-width codes, aligned DNA sequences, or any domain where the strings are already aligned and only substitutions matter.\n\n" +
    "If the strings can differ in length, or if insertions and deletions are possible, prefer **Levenshtein (edit) distance**. If you need to find a pattern anywhere inside a longer text, prefer **KMP Search** or **Rabin–Karp**.",
};
