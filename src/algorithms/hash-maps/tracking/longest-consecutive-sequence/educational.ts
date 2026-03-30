import type { EducationalContent } from "@/types";

export const longestConsecutiveSequenceEducational: EducationalContent = {
  overview:
    "**Longest Consecutive Sequence** finds the length of the longest run of consecutive integers in an unsorted array. The naive approach sorts the array in `O(n log n)`, but a **hash set** reduces it to `O(n)` by enabling constant-time membership checks.\n\nFor each number, first check if it's a sequence start (its predecessor is absent). If so, count forward until the run breaks.",

  howItWorks:
    "The algorithm runs in two phases:\n\n" +
    "**Phase 1 — Build the set:** Insert every number into a hash set in `O(n)`.\n\n" +
    "**Phase 2 — Scan for sequence starts:** For each number, check if `number - 1` is in the set. If not, this is the beginning of a consecutive run. Count forward (`number + 1`, `number + 2`, …) until the chain breaks, recording the run length.\n\n" +
    "### Example: `[100, 4, 200, 1, 3, 2]`\n\n" +
    "```\n" +
    "Set: {100, 4, 200, 1, 3, 2}\n" +
    "100 — predecessor 99 not in set → run: 100        length 1\n" +
    "  4 — predecessor 3 in set     → skip\n" +
    "200 — predecessor 199 not in set → run: 200       length 1\n" +
    "  1 — predecessor 0 not in set  → run: 1,2,3,4   length 4  ← max\n" +
    "  3 — predecessor 2 in set     → skip\n" +
    "  2 — predecessor 1 in set     → skip\n" +
    "```\n\n" +
    "Each element is touched at most twice across both phases, giving linear time.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Building the set is `O(n)`. During scanning, although there is a nested `while` loop, each element is visited as part of a consecutive chain at most once across the entire outer loop — so total inner iterations are bounded by `n`.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The hash set stores up to `n` distinct integers.",

  bestAndWorstCase:
    "**Best case** — every number is isolated (no consecutive pairs): each scan finds a run of length 1 immediately. The while loop never executes. Still `O(n)` overall.\n\n" +
    "**Worst case** — all numbers form one giant consecutive sequence (e.g., `[1, 2, 3, … n]`): the while loop runs `n - 1` times for the one sequence start and never for others. Still `O(n)` total.",

  realWorldUses: [
    "**Scheduling gaps:** Finding the longest uninterrupted block of available time slots in a calendar when slots are stored as numeric IDs.",
    "**Genomics:** Detecting the longest contiguous region of mapped base pairs in sparse genome assemblies.",
    "**Log analysis:** Identifying the longest run of consecutive log sequence numbers to detect missing entries.",
    "**Game development:** Finding the longest consecutive chain in match-3 or number-puzzle games.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) time — avoids the O(n log n) cost of sorting.",
      "Works on unsorted input with no preprocessing.",
      "Clean two-phase structure makes the logic easy to reason about.",
    ],
    limitations: [
      "O(n) extra space for the hash set — not in-place.",
      "Returns only the length, not the actual sequence (trivial to reconstruct but adds code).",
      "Hash set performance depends on hash quality — rare worst-case collisions degrade lookups.",
    ],
  },

  whenToUseIt:
    "Use this pattern when you need the longest run of consecutive values and `O(n)` time is required. If the array is already sorted, a single linear scan suffices with `O(1)` extra space. For counting all distinct consecutive groups (not just the longest), adapt the scan phase to collect all run lengths.",
};
