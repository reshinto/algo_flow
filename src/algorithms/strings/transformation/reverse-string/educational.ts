import type { EducationalContent } from "@/types";

export const reverseStringEducational: EducationalContent = {
  overview:
    "**Reverse String** inverts the order of characters in a string using a two-pointer technique.\n\n" +
    "One pointer starts at the left end and another at the right end. They march toward each other, swapping the characters they point to at each step, until the pointers meet in the middle. The result is the original string with all characters in reversed order.",

  howItWorks:
    "The algorithm maintains two index pointers — `leftIndex` starting at `0` and `rightIndex` starting at `text.length - 1`.\n\n" +
    "Each iteration of the loop:\n\n" +
    "1. **Read** `chars[leftIndex]` and `chars[rightIndex]`.\n" +
    "2. **Swap** the two characters in place.\n" +
    "3. **Advance** `leftIndex` forward by one and `rightIndex` backward by one.\n\n" +
    "The loop terminates when `leftIndex >= rightIndex`, meaning all pairs have been swapped.\n\n" +
    "```\n" +
    "Input:   h  e  l  l  o\n" +
    "         ^           ^\n" +
    "Step 1:  o  e  l  l  h   (swap h ↔ o)\n" +
    "            ^     ^\n" +
    "Step 2:  o  l  l  e  h   (swap e ↔ l)\n" +
    "               ^\n" +
    "Step 3:  (centre reached — done)\n" +
    "Output:  o  l  l  e  h\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Every character is visited exactly once — the two pointers together traverse the full string, each moving `n/2` steps.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Swaps are performed directly on the character array with no auxiliary buffer. Only the two pointer variables and a single temporary swap value are used, regardless of input length.",

  bestAndWorstCase:
    "**Best case — single character or empty string:** `O(1)` — no iterations occur because `leftIndex >= rightIndex` immediately.\n\n" +
    "**Worst case — any string of length `n`:** `O(n)` — `n/2` swaps are always required. There is no early-exit condition; the algorithm always processes every pair.\n\n" +
    "Because best, average, and worst cases all have the same linear bound, Reverse String has a flat performance profile.",

  realWorldUses: [
    "**Palindrome checking:** Reversing a string is the first step in a naive palindrome check — compare the reversed copy to the original.",
    "**Text processing pipelines:** Reversing tokens or substrings is a building block in many encoding and obfuscation schemes (e.g., simple ciphers, base-conversion utilities).",
    "**Interview fundamentals:** Reverse String is a canonical two-pointer warm-up problem, testing pointer manipulation and in-place mutation.",
    "**Undo stacks:** Reversing an operation sequence restores a previous state — conceptually identical to reversing an array of commands.",
    "**Language internals:** String reversal is used inside standard library implementations for number-to-string conversion (e.g., digits are accumulated in reverse order, then reversed once).",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(1) auxiliary space — no second string is allocated during the swap phase.",
      "Simple to implement correctly and easy to reason about.",
      "Cache-friendly — sequential memory access pattern.",
    ],
    limitations: [
      "Naive implementation breaks Unicode multi-code-unit characters (e.g., emoji, surrogate pairs) — requires grapheme-cluster awareness for correct Unicode reversal.",
      "Not applicable to immutable string types without first copying to a mutable buffer (O(n) allocation).",
      "No partial reversal — if only a substring needs reversing, the loop bounds must be adjusted manually.",
    ],
  },

  whenToUseIt:
    "Use Reverse String whenever you need to invert character order with minimal memory overhead. It is the canonical solution for in-place string reversal interview problems.\n\n" +
    "Avoid it when working with Unicode text that contains multi-code-unit graphemes (emoji, combining characters, surrogate pairs) without a grapheme-aware splitting step — a byte-level or code-unit-level reversal will corrupt such sequences.",
};
