import type { EducationalContent } from "@/types";

export const isomorphicStringsEducational: EducationalContent = {
  overview:
    '**Isomorphic Strings** checks whether two strings have the same structural shape — every character in one string can be consistently replaced by a character in the other to produce a perfect match. Two maps enforce the bijection in both directions: `textA → textB` and `textB → textA`.\n\nFor example, `"egg"` and `"add"` are isomorphic: `e→a` and `g→d`. But `"foo"` and `"bar"` are not: `o` maps to two different characters.',

  howItWorks:
    "The algorithm walks both strings character by character in parallel:\n\n" +
    "1. **Length check** — strings of different lengths cannot be isomorphic.\n" +
    "2. **For each position**, look up `aToB[charA]` and `bToA[charB]`.\n" +
    "   - **Neither mapped** — create both mappings and continue.\n" +
    "   - **Both match** — existing mapping is consistent; continue.\n" +
    "   - **Any mismatch** — return `false`.\n" +
    "3. If the full loop completes, return `true`.\n\n" +
    '### Example: `textA="egg"`, `textB="add"`\n\n' +
    "```\n" +
    "idx  charA  charB  aToB       bToA       action\n" +
    " 0    e      a     {}         {}         insert e→a, a→e\n" +
    " 1    g      d     {e:a}      {a:e}      insert g→d, d→g\n" +
    " 2    g      d     {e:a,g:d}  {a:e,d:g}  match g↔d ✓\n" +
    "Result: true\n" +
    "```\n\n" +
    '### Counter-example: `textA="foo"`, `textB="bar"`\n\n' +
    "```\n" +
    "idx  charA  charB  aToB  action\n" +
    " 0    f      b     {}    insert f→b\n" +
    " 1    o      a     {f:b} insert o→a\n" +
    " 2    o      r     {f:b, o:a} mismatch: o already maps to a, not r → false\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "One pass through both strings. Each hash map operation is `O(1)` amortized for single characters.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "The character set is bounded (e.g., 256 ASCII chars), so the two maps hold at most a fixed number of entries regardless of string length.",

  bestAndWorstCase:
    "**Best case** — the first pair of characters conflicts: return `false` after one iteration in `O(1)`.\n\n" +
    "**Worst case** — all characters are unique and consistent (or the mismatch is at the last position): all `n` characters are processed in `O(n)` time.",

  realWorldUses: [
    "**Compiler symbol table:** Checking whether two expression trees have the same structural shape (alpha-equivalence).",
    "**Template matching:** Verifying that a document follows a fixed structural template where token identities may vary.",
    "**Cryptanalysis:** Detecting substitution cipher patterns by checking character-level structural isomorphism.",
    "**Graph theory:** Determining graph isomorphism at the sequence level for simple path comparisons.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) time — single pass with constant-time lookups.",
      "O(1) space for bounded character sets (ASCII/Unicode blocks).",
      "Bidirectional check correctly rejects all non-bijective mappings.",
    ],
    limitations: [
      "Only works character by character — token-level isomorphism requires tokenization first.",
      "Case-sensitive by default; case-insensitive variants need normalization.",
      "Cannot detect structural isomorphism beyond flat sequences (e.g., nested structures need tree algorithms).",
    ],
  },

  whenToUseIt:
    "Use two-map character isomorphism whenever you need to verify a consistent one-to-one character substitution between two strings. If only one direction matters (many-to-one), a single map suffices. For word-level isomorphism, see Word Pattern — the same bidirectional map strategy applies with words as keys.",
};
