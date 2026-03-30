import type { EducationalContent } from "@/types";

export const groupAnagramsEducational: EducationalContent = {
  overview:
    "**Group Anagrams** takes a list of words and groups together all words that are anagrams of one another. Two words are anagrams if they contain the same characters in any order.\n\nThe key insight is that sorting the characters of an anagram always produces the same string — this sorted form acts as a canonical **key** for each anagram group.",

  howItWorks:
    "The algorithm uses a hash map where each key is the sorted form of a word and each value is the list of words that produce that key:\n\n" +
    "1. **Sort characters** — for each word, sort its characters alphabetically (e.g., `'eat'` → `'aet'`).\n" +
    "2. **Look up the key** — check if the sorted form already exists in the map.\n" +
    "3. **Append or create** — if found, append the current word to the existing group; if not, start a new group with just this word.\n" +
    "4. **Return all groups** — after all words are processed, return the map's values.\n\n" +
    "### Example: `['eat', 'tea', 'tan', 'ate', 'nat', 'bat']`\n\n" +
    "```\n" +
    "word   sorted-key   action\n" +
    "eat    aet          insert { aet: ['eat'] }\n" +
    "tea    aet          append → { aet: ['eat','tea'] }\n" +
    "tan    ant          insert { ant: ['tan'] }\n" +
    "ate    aet          append → { aet: ['eat','tea','ate'] }\n" +
    "nat    ant          append → { ant: ['tan','nat'] }\n" +
    "bat    abt          insert { abt: ['bat'] }\n" +
    "```\n\n" +
    "Result: `[['eat','tea','ate'], ['tan','nat'], ['bat']]`",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n · k log k)`**\n\n" +
    "Where `n` is the number of words and `k` is the maximum word length. Sorting each word takes `O(k log k)`, and we do this for every word.\n\n" +
    "**Space Complexity: `O(n · k)`**\n\n" +
    "The hash map stores all `n` words, each of length up to `k`.",

  bestAndWorstCase:
    "**Best case** — all words are the same length and form one large group: all `n` sorts run in `O(k log k)` each, one map entry. No structural advantage in terms of big-O.\n\n" +
    "**Worst case** — every word is a unique anagram group and has the maximum length `k`: still `O(n · k log k)` time and `O(n · k)` space, same asymptotic bound.\n\n" +
    "The constant factors are better when words are short.",

  realWorldUses: [
    "**Search engines:** Grouping query suggestions that are scrambled versions of each other.",
    "**Spell checkers:** Detecting that two differently-typed words have the same letters.",
    "**Word game solvers:** Anagram finders in Scrabble or crossword puzzle helpers.",
    "**Bioinformatics:** Grouping DNA sequences with identical nucleotide composition.",
    "**Data deduplication:** Recognizing records that differ only in field ordering.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n · k log k) time — far better than brute-force O(n² · k) pairwise comparison.",
      "Simple canonical-key pattern is easy to understand and extend to other grouping problems.",
      "Works for any alphabet — not limited to lowercase English letters.",
    ],
    limitations: [
      "Sorting each word adds O(k log k) overhead; a character-count fingerprint (O(k)) can be faster.",
      "O(n · k) extra space for the map — not in-place.",
      "Requires all words to be processed upfront; does not support streaming updates efficiently.",
    ],
  },

  whenToUseIt:
    "Use Group Anagrams whenever you need to cluster strings by their character composition. The sorted-key approach is the simplest correct solution. For very long words in performance-critical paths, consider a frequency-count fingerprint (array of 26 counts) as the key instead of sorting.",
};
