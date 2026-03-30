import type { EducationalContent } from "@/types";

export const containsDuplicateIIEducational: EducationalContent = {
  overview:
    "**Contains Duplicate II** asks whether any two equal values in an array are at most `k` index positions apart. It extends the basic duplicate check by adding a **distance constraint**, solved in `O(n)` using a hash map that stores the most recent index of each value.",

  howItWorks:
    "The algorithm maintains a hash map of `{ value → lastSeenIndex }`:\n\n" +
    "1. **Check map** — if the current value already has a stored index AND `|currentIndex - storedIndex| ≤ k`, return `true`.\n" +
    "2. **Update** — if the value exists but is too far away, overwrite the stored index with the current one (keeps the closest candidate).\n" +
    "3. **Insert** — if the value is new, store `map[value] = currentIndex`.\n" +
    "4. **No match** — return `false` after the loop.\n\n" +
    "### Example: `numbers = [1, 2, 3, 1]`, `maxDistance = 3`\n\n" +
    "```\n" +
    "currentIndex  current  storedIndex  distance  action\n" +
    "     0           1        —            —       insert { 1: 0 }\n" +
    "     1           2        —            —       insert { 2: 1 }\n" +
    "     2           3        —            —       insert { 3: 2 }\n" +
    "     3           1        0            3       3 ≤ 3 → return true\n" +
    "```\n\n" +
    "Storing only the **most recent** index is sufficient: if a closer future occurrence existed, it would also satisfy the constraint.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "One pass through the array. Each hash map lookup and insert is `O(1)` amortized.\n\n" +
    "**Space Complexity: `O(min(n, k))`**\n\n" +
    "The map holds at most one entry per distinct value seen. In the worst case it holds all `n` values, but if `k` is small and many elements repeat, entries get overwritten and the map stays bounded by the window size.",

  bestAndWorstCase:
    "**Best case** — the first two elements are equal and `k ≥ 1`: returns `true` after just two iterations in `O(1)` space.\n\n" +
    "**Worst case** — no qualifying pair exists and all values are distinct: all `n` elements are inserted into the map. Time is `O(n)` and space is `O(n)`.",

  realWorldUses: [
    "**Fraud detection:** Flagging duplicate transaction IDs that appear within a short time window (mapped to array indices).",
    "**Duplicate packet detection:** Network protocols discard retransmitted packets whose sequence numbers fall within a recent window.",
    "**Sliding window deduplication:** Log aggregators suppress repeated messages that appear within a configurable cooldown period.",
    "**Cache invalidation:** Detecting whether a resource was requested again within a recency threshold to decide whether to serve from cache.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) time — single pass with O(1) per operation.",
      "Handles the distance constraint without sorting or a sliding window data structure.",
      "Overwrites stale entries, keeping only the most useful (closest) prior index.",
    ],
    limitations: [
      "O(n) extra space in the worst case.",
      "Only reports existence — does not return the indices of the qualifying pair.",
      "Requires a second read of the stored index to compute distance, adding a constant overhead compared to a pure membership check.",
    ],
  },

  whenToUseIt:
    "Use this pattern whenever a duplicate check carries a **proximity constraint** (within `k` positions, within `t` value difference, etc.). For strictly value-based duplicates without distance, Contains Duplicate (hash set) is simpler. For range queries on values rather than indices, extend the map value to a list of indices.",
};
