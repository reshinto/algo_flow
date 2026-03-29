import type { EducationalContent } from "@/types";

export const boyerMooreVotingEducational: EducationalContent = {
  overview:
    "**Boyer-Moore Voting Algorithm** finds the majority element — an element appearing more than `n/2` times — in `O(n)` time using only `O(1)` space. " +
    "Invented by Robert Boyer and J Strother Moore in 1981, it uses a brilliant *cancellation metaphor*: " +
    "pair up every non-majority element with one majority element and discard both. " +
    "Since the majority element has more than half the votes, it survives all cancellations and remains as the final candidate.",

  howItWorks:
    "1. Maintain two variables: `candidate` (current survivor) and `voteCount` (net votes for the candidate).\n" +
    "2. For each element in the array:\n" +
    "   * If `voteCount === 0`, set the current element as the new `candidate` and reset `voteCount` to 1.\n" +
    "   * If the element **matches** the candidate, increment `voteCount`.\n" +
    "   * If the element **differs** from the candidate, decrement `voteCount`.\n" +
    "3. After the full pass, `candidate` holds the majority element.\n\n" +
    "### The Cancellation Metaphor\n\n" +
    "Every time `voteCount` reaches 0, the running candidate and all its challengers have *cancelled each other out*. " +
    "The next element becomes the fresh candidate. Because the majority element appears more than `n/2` times, " +
    "it can never be fully cancelled — it will always re-emerge.\n\n" +
    "### Walkthrough with `[2, 2, 1, 1, 1, 2, 2]`\n\n" +
    "| Index | Element | Action        | Candidate | VoteCount |\n" +
    "|-------|---------|---------------|-----------|-----------|\n" +
    "| 0     | 2       | set-candidate | 2         | 1         |\n" +
    "| 1     | 2       | increment     | 2         | 2         |\n" +
    "| 2     | 1       | decrement     | 2         | 1         |\n" +
    "| 3     | 1       | decrement     | 2         | 0         |\n" +
    "| 4     | 1       | set-candidate | 1         | 1         |\n" +
    "| 5     | 2       | decrement     | 1         | 0         |\n" +
    "| 6     | 2       | set-candidate | 2         | 1         |\n\n" +
    "**Result**: `candidate = 2`, which appears 4 out of 7 times (majority confirmed).",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "The algorithm performs a single linear pass through the array. Each element is examined exactly once, " +
    "and only two operations (increment or decrement) are performed per element.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only two variables are maintained — `candidate` and `voteCount` — regardless of input size. " +
    "No additional arrays, hash maps, or recursion stacks are used.",

  bestAndWorstCase:
    "**Both best and worst case are `O(n)`** — the algorithm always completes in one pass.\n\n" +
    "- **Best case**: The majority element occupies the entire array (e.g., `[5, 5, 5]`). The candidate is set on the first element and never changed.\n" +
    "- **Worst case**: The majority element is spread across the array with maximum opposition (e.g., `[1, 2, 1, 2, 1]`). The candidate changes multiple times but the majority always survives.\n\n" +
    "### Compared to Hash Map Approach\n\n" +
    "A hash map approach also runs in `O(n)` time but uses `O(n)` space to track element frequencies. " +
    "Boyer-Moore achieves the same time bound with `O(1)` space — a critical advantage for streaming data or memory-constrained environments.",

  realWorldUses: [
    "**Election Counting:** Efficiently determining if any candidate holds an outright majority without counting all votes first.",
    "**Stream Processing:** Finding the dominant element in a data stream where storing all elements is infeasible.",
    "**Distributed Systems:** Detecting the majority replica or consensus value across distributed nodes.",
    "**Database Query Optimization:** Finding the most frequent value in a column without a full frequency sort.",
    "**Fault-Tolerant Computing:** Identifying the correct output when a majority of redundant processors agree on the same result.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Optimal `O(1)` space — no hash map or auxiliary array needed, making it ideal for streams.",
      "Single-pass `O(n)` time — cannot be improved since every element must be examined.",
      "Elegant and simple: just two variables and a three-way branch per element.",
      "Naturally handles all input sizes including single-element and two-element arrays.",
    ],
    limitations: [
      "Only works when a majority element (> n/2 occurrences) is **guaranteed** to exist — the algorithm does not validate this.",
      "Does not find elements appearing more than n/3 or n/k times without modification (requires k−1 candidates).",
      "Cannot return all elements above a frequency threshold — only the single majority survivor.",
      "If no majority exists, the returned candidate is meaningless without a second verification pass.",
    ],
  },

  whenToUseIt:
    "Use **Boyer-Moore Voting** when the problem guarantees a majority element exists and you need `O(1)` space. " +
    "Classic signals: *find the element appearing more than n/2 times*, *majority vote*, or *dominant element*.\n\n" +
    "**Do not use** when no majority is guaranteed — add a verification pass or use a hash map instead. " +
    "Also avoid when you need elements appearing more than `n/k` times for `k > 2`; the generalized Boyer-Moore variant handles that case.",
};
