import type { EducationalContent } from "@/types";

export const setPermutationsEducational: EducationalContent = {
  overview:
    "**Set Permutations** generates all `n!` orderings of a set by exploring every possible arrangement " +
    "of its elements. Unlike combinations, order matters: `[1, 2, 3]` and `[3, 2, 1]` are distinct permutations.\n\n" +
    "The algorithm uses **backtracking with in-place swaps**: at each depth level, it tries placing every " +
    "remaining element at the current position by swapping it into place, recursing deeper, then " +
    "restoring the original order before trying the next candidate. This avoids allocating new arrays " +
    "at each recursive call.",

  howItWorks:
    "**Backtracking with swap-and-restore:**\n\n" +
    "`permute(startIdx)`:\n" +
    "1. **Base case:** If `startIdx === n`, the working array is a complete permutation — record it.\n" +
    "2. **Recursive case:** For each `swapIdx` from `startIdx` to `n - 1`:\n" +
    "   - Swap `working[startIdx]` with `working[swapIdx]` (choose the next element)\n" +
    "   - Recurse: `permute(startIdx + 1)`\n" +
    "   - Swap back (backtrack, restoring the array for the next iteration)\n\n" +
    "### Example: elements = [1, 2, 3]\n\n" +
    "```\n" +
    "permute(0):\n" +
    "  swap(0,0)=[1,2,3] → permute(1):\n" +
    "    swap(1,1)=[1,2,3] → permute(2) → emit [1,2,3]\n" +
    "    swap(1,2)=[1,3,2] → permute(2) → emit [1,3,2]  ← backtrack\n" +
    "  swap(0,1)=[2,1,3] → permute(1):\n" +
    "    swap(1,1)=[2,1,3] → permute(2) → emit [2,1,3]\n" +
    "    swap(1,2)=[2,3,1] → permute(2) → emit [2,3,1]  ← backtrack\n" +
    "  swap(0,2)=[3,2,1] → permute(1):\n" +
    "    swap(1,1)=[3,2,1] → permute(2) → emit [3,2,1]\n" +
    "    swap(1,2)=[3,1,2] → permute(2) → emit [3,1,2]  ← backtrack\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n × n!)`**\n\n" +
    "- There are `n!` permutations.\n" +
    "- Each permutation requires `O(n)` work to copy the working array into the result.\n" +
    "- Total: `O(n × n!)` — unavoidable since the output itself has this size.\n\n" +
    "**Space Complexity: `O(n × n!)`**\n\n" +
    "The result array stores all `n!` permutations of length `n`. " +
    "The recursion call stack reaches depth `n`, using `O(n)` stack space. " +
    "No additional auxiliary arrays are allocated — swaps happen in-place.",

  bestAndWorstCase:
    "**Best case** — `n = 1`: a single-element set has exactly one permutation. " +
    "The algorithm terminates immediately after emitting it. `O(1)` effective work.\n\n" +
    "**Worst case** — large `n`: the output grows as `n!`, which exceeds all polynomial growth rates. " +
    "`n = 10` produces 3,628,800 permutations; `n = 12` produces 479,001,600. " +
    "Practical upper limits are around `n = 10–12` without streaming output.\n\n" +
    "There is no early exit — all `n!` orderings must be visited to produce the complete result.",

  realWorldUses: [
    "**Anagram generation:** Producing all letter orderings from a set of characters to detect anagrams.",
    "**Scheduling optimization:** Enumerating all possible task orderings to find the optimal schedule (brute force).",
    "**Cryptography:** Generating all key permutations in small-key exhaustive search scenarios.",
    "**Puzzle solving:** Exploring all tile or piece arrangements in combinatorial puzzles like the 15-puzzle.",
    "**Board games:** Evaluating all possible move sequences to find winning game tree paths.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "In-place swap avoids allocating new arrays at each recursion level — memory-efficient per call.",
      "Generates all n! permutations without duplication.",
      "Backtracking structure is extensible — easily adapted to pruned search with additional constraints.",
    ],
    limitations: [
      "Output size is O(n × n!) — infeasible for n > 12 without streaming or lazy evaluation.",
      "Recursive call stack reaches depth n — stack overflow risk for very large inputs.",
      "Does not handle duplicate elements gracefully — identical values produce duplicate permutations.",
    ],
  },

  whenToUseIt:
    "Use set permutations when you need to enumerate all orderings of a small set exhaustively — " +
    "typically `n ≤ 10`. For larger inputs, consider generating permutations on demand using a " +
    "Steinhaus–Johnson–Trotter iterator to avoid storing all results simultaneously. " +
    "If duplicates are present and you want distinct permutations only, sort the input first and " +
    "skip swaps where `working[startIdx] === working[swapIdx]` (pruning). " +
    "For constraint-satisfaction problems, combine the backtracking structure with early pruning " +
    "to avoid exploring invalid branches.",
};
