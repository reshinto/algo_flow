import type { EducationalContent } from "@/types";

export const wordPatternEducational: EducationalContent = {
  overview:
    "**Word Pattern** checks whether a sentence follows a given character pattern exactly. Each unique pattern character must map to a unique word, and each unique word must map back to a unique pattern character — a **bijection** (one-to-one correspondence).\n\nTwo hash maps enforce both directions simultaneously: `char → word` and `word → char`.",

  howItWorks:
    "The algorithm splits the sentence into words and walks both the pattern and the word list in parallel:\n\n" +
    "1. **Length check** — if the pattern length differs from the word count, return `false` immediately.\n" +
    "2. **For each position**, look up both `charToWord[patternChar]` and `wordToChar[currentWord]`.\n" +
    "   - **Neither mapped** — create both mappings and continue.\n" +
    "   - **Both match** — the mapping is consistent; continue.\n" +
    "   - **Mismatch** — return `false`.\n" +
    "3. If the loop completes without mismatch, return `true`.\n\n" +
    '### Example: pattern=`"abba"`, sentence=`"dog cat cat dog"`\n\n' +
    "```\n" +
    "idx  char  word   charToWord   wordToChar   action\n" +
    " 0    a    dog    {}           {}           insert a→dog, dog→a\n" +
    " 1    b    cat    {a:dog}      {dog:a}      insert b→cat, cat→b\n" +
    " 2    b    cat    {a:dog,b:cat}{dog:a,cat:b} match b↔cat ✓\n" +
    " 3    a    dog    same         same          match a↔dog ✓\n" +
    "Result: true\n" +
    "```\n\n" +
    'Checking both maps prevents the bijection violation where two different chars map to the same word (e.g., pattern=`"aa"`, sentence=`"dog dog"` would fail the `wordToChar` check if using only one map).',

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "One pass through the pattern/words. Each hash map lookup and insert is `O(1)` amortized (assuming bounded word lengths).\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "Both maps together hold at most `n` entries.",

  bestAndWorstCase:
    "**Best case** — the first pair mismatches (e.g., length mismatch or first character conflicts): returns immediately in `O(1)`.\n\n" +
    "**Worst case** — the entire pattern matches or the mismatch is at the last position: all `n` characters are processed in `O(n)` time and `O(n)` space.",

  realWorldUses: [
    "**Template validation:** Verifying that a log format follows a structural pattern (e.g., `ERROR <code> <message>`).",
    "**Linguistic analysis:** Detecting syntactic isomorphism between sentences in computational linguistics.",
    "**Protocol verification:** Checking that message fields follow a declared schema bijection.",
    "**Code pattern matching:** Identifying whether AST node sequences match a structural template in refactoring tools.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) time and space — optimal for this problem.",
      "Two-map approach correctly enforces bijection in both directions.",
      "Generalizes to any token-level pattern matching, not just single characters.",
    ],
    limitations: [
      "Only works for space-delimited words; different delimiters require preprocessing.",
      "Case-sensitive by default — 'Dog' and 'dog' are treated as different words.",
      "Assumes the pattern uses single characters; multi-char pattern tokens need a tokenizer.",
    ],
  },

  whenToUseIt:
    "Use bidirectional hash map matching whenever you need to verify a one-to-one correspondence between two sequences. If only one direction matters (many-to-one), a single map suffices. For multi-token patterns or regex-style matching, use a proper parser instead.",
};
