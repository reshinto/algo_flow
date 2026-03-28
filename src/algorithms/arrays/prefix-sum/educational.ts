import type { EducationalContent } from "@/types";

export const prefixSumEducational: EducationalContent = {
  overview:
    "**Prefix Sum** is a preprocessing technique that transforms an array into a cumulative sum array, enabling any contiguous range sum query to be answered in **O(1)** time after a one-time **O(n)** build step.\n\n" +
    "Given an array `A`, the prefix sum array `P` is defined as `P[i] = A[0] + A[1] + ... + A[i]`. Once built, the sum of any subarray `A[left..right]` is simply `P[right] - P[left - 1]` — a single subtraction regardless of the range size.",

  howItWorks:
    "### Phase 1: Build the Prefix Array\n\n" +
    "1. Initialize `prefix[0] = array[0]`.\n" +
    "2. For each subsequent index `i`, set `prefix[i] = prefix[i-1] + array[i]`.\n" +
    "3. Each position now stores the cumulative sum from index 0 up to that position.\n\n" +
    "### Phase 2: Answer Range Queries\n\n" +
    "For a query `(left, right)`:\n" +
    "- If `left == 0`: result = `prefix[right]`\n" +
    "- Otherwise: result = `prefix[right] - prefix[left - 1]`\n\n" +
    "### Example\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    '    A["Input:  [2, 4, 1, 3, 5, 2]"]\n' +
    '    B["Prefix: [2, 6, 7,10,15,17]"]\n' +
    '    C["Query (1,3): prefix[3] - prefix[0] = 10 - 2 = 8"]\n' +
    "    A --> B --> C\n" +
    "```\n\n" +
    "With `inputArray = [2, 4, 1, 3, 5, 2]`:\n" +
    "- Prefix = `[2, 6, 7, 10, 15, 17]`\n" +
    "- Query `[1, 3]`: `prefix[3] - prefix[0]` = `10 - 2` = **8** (4+1+3)\n" +
    "- Query `[0, 4]`: `prefix[4]` = **15** (2+4+1+3+5)\n" +
    "- Query `[2, 5]`: `prefix[5] - prefix[1]` = `17 - 6` = **11** (1+3+5+2)",

  timeAndSpaceComplexity:
    "**Time Complexity**\n\n" +
    "- **Build:** `O(n)` — one pass through the array to construct the prefix array.\n" +
    "- **Query:** `O(1)` — each range sum is a single subtraction.\n" +
    "- **Total for Q queries:** `O(n + Q)` — compare to `O(n × Q)` naive.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The prefix array requires one additional slot per input element.",

  bestAndWorstCase:
    "**Best Case:** `O(n)` build + `O(1)` query — the build cost is unavoidable, but once paid, every query is instant regardless of query range size or array length.\n\n" +
    "**Worst Case:** `O(n)` build + `O(1)` per query — the algorithm has no degenerate paths. Even with the largest possible query ranges, each query remains a single subtraction.\n\n" +
    "**Versus Brute Force:** Without prefix sums, a naïve range-sum query loops from `left` to `right`, giving `O(n)` per query. With 1,000 queries on a 10,000-element array, brute force requires 10 million operations; prefix sums reduce this to 10,010 — a **1000x improvement**.",

  realWorldUses: [
    "**Database Aggregations:** Cumulative sum queries over date ranges (e.g., total sales between two timestamps) without scanning every row.",
    "**Image Processing:** 2D prefix sums (summed area tables) enable instant rectangular region sums — used in face detection (Viola-Jones algorithm).",
    "**Competitive Programming:** The foundational building block for difference arrays, segment trees, and Fenwick trees.",
    "**Game Development:** Computing cumulative probability distributions for weighted random item drops.",
    "**Signal Processing:** Rolling energy calculations over fixed observation windows in audio and sensor data.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Transforms O(n) per query into O(1) — dramatic speedup when many queries share the same array.",
      "Conceptually simple and easy to implement correctly.",
      "Composable: 2D prefix sums, difference arrays, and sparse tables all extend the same core idea.",
      "Zero query overhead after the one-time build cost.",
    ],
    limitations: [
      "Requires a static array — any update to an element invalidates the entire prefix array and demands a rebuild (or a more complex structure like a Fenwick tree).",
      "Carries O(n) extra space overhead, which matters for very large arrays.",
      "Only directly supports sum queries; min/max queries require different structures (sparse tables, segment trees).",
    ],
  },

  whenToUseIt:
    "**Use Prefix Sum when** the array is static (no updates after build) and you need to answer multiple range sum queries efficiently.\n\n" +
    "Classic problem signals: *'sum of elements from index L to R'*, *'number of elements equal to K in a range'*, *'balance a series of interval additions'*.\n\n" +
    "**Avoid it when:**\n" +
    "- The array changes frequently between queries (use a Fenwick tree or segment tree instead).\n" +
    "- You need range min/max rather than range sum (use a sparse table for static data).\n" +
    "- Memory is extremely constrained and you only have one or two queries total.",
};
