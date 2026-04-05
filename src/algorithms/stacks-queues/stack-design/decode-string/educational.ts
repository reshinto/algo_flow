import type { EducationalContent } from "@/types";

export const decodeStringEducational: EducationalContent = {
  overview:
    "**Decode String** expands a run-length encoded string where numbers prefix bracketed segments. " +
    "For example, `3[a2[c]]` decodes to `accaccacc` — the inner `2[c]` becomes `cc`, and the outer `3[...]` repeats `acc` three times.\n\n" +
    "A stack lets the algorithm remember the context (partial string and repeat count) each time it descends into a nested bracket, " +
    "then restore that context when the matching `]` is reached.",

  howItWorks:
    "The algorithm scans the encoded string left to right, maintaining a current string accumulator and a current repeat count:\n\n" +
    "1. **Digit** → accumulate into `currentCount` (supports multi-digit numbers like `12[a]`).\n" +
    "2. **`[`** → push `currentCount` and `currentString` onto their respective stacks, then reset both to handle the nested segment.\n" +
    "3. **`]`** → pop the saved count and string, set `currentString = prevString + currentString.repeat(count)`.\n" +
    "4. **Letter** → append to `currentString`.\n\n" +
    "### Example trace on `3[a2[c]]`\n\n" +
    "```\n" +
    "char  action                        currentString  currentCount\n" +
    '3     digit                         ""             3\n' +
    '[     push(3, ""), reset            ""             0\n' +
    'a     append                        "a"            0\n' +
    '2     digit                         "a"            2\n' +
    '[     push(2, "a"), reset           ""             0\n' +
    'c     append                        "c"            0\n' +
    ']     pop(2, "a") → "a" + "cc"     "acc"          —\n' +
    ']     pop(3, "")  → "" + "accacc"  "accaccacc"    —\n' +
    'end   return "accaccacc"\n' +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n × k)`** where `n` is the length of the encoded string and `k` is the maximum total expansion factor.\n\n" +
    "Each decoded character may be written multiple times due to repetition. In the worst case (deeply nested, high repeat counts) " +
    "the output can be exponentially larger than the input.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The two stacks each store at most `d` entries where `d` is the nesting depth, bounded by `n`. " +
    "The decoded string itself can be `O(n × k)` in size.",

  bestAndWorstCase:
    "**Best case** — no brackets or digits (plain string like `abc`): single linear scan with no stack operations, `O(n)` time.\n\n" +
    "**Worst case** — deeply nested, high-multiplier input like `10[10[10[a]]]`: the output size grows as `k^d` " +
    "where `d` is nesting depth, making construction `O(n × k)` time.\n\n" +
    "The algorithm always completes in a single left-to-right pass over the encoded input.",

  realWorldUses: [
    "**Data compression:** Run-length encoding is a foundational compression scheme used in fax machines, BMP images, and PCX graphics.",
    "**Network protocols:** Compressed representations of repetitive data segments in messaging protocols and serialization formats.",
    "**Bioinformatics:** Compact encoding of repetitive DNA/RNA sequences where motifs repeat many times.",
    "**Template engines:** Expanding repetitive template constructs in code generation and configuration file processing.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Single linear pass over the encoded input regardless of nesting depth.",
      "Handles arbitrarily deep nesting and multi-digit repeat counts naturally.",
      "Simple stack discipline — push on `[`, pop on `]` — mirrors the recursive structure of the grammar.",
    ],
    limitations: [
      "Output string can be exponentially larger than the input, consuming significant memory.",
      "Does not handle malformed input gracefully (unmatched brackets cause undefined behavior without validation).",
      "Not suitable for streaming decoding when the expanded output is too large to hold in memory.",
    ],
  },

  whenToUseIt:
    "Use the stack-based decode approach whenever the encoded format uses matched delimiter pairs with preceding repeat counts. " +
    "If nesting is not possible (flat run-length encoding), a simpler two-pointer scan suffices. " +
    "For very large expansions that cannot fit in memory, consider a lazy iterator or streaming decoder instead.",
};
