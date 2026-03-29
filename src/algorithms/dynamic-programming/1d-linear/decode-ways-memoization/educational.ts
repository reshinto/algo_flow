import type { EducationalContent } from "@/types";

export const decodeWaysMemoizationEducational: EducationalContent = {
  overview:
    "**Decode Ways (Memoization)** counts the number of ways to decode a digit string where each letter A–Z maps to '1'–'26', using a **top-down dynamic programming** approach.\n\n" +
    "At each position `i`, you can decode one digit (`digits[i-1]`, valid if '1'–'9') or two digits (`digits[i-2..i-1]`, valid if '10'–'26'). Memoization caches `D(i)` — the number of ways to decode the first `i` digits — so each subproblem is solved exactly once, reducing a potentially exponential call tree to `O(n)`.",

  howItWorks:
    "1. Call `decode(n)` recursively on the full string length.\n" +
    "2. **Base case D(0):** Return `1` — the empty prefix has exactly one decoding (the empty string).\n" +
    "3. **Cache hit:** If `memo` already contains `D(i)`, return it immediately.\n" +
    "4. **Push call frame:** Record `D(i)` on the call stack for visualization.\n" +
    "5. **Single-digit branch:** If `digits[i-1]` is '1'–'9', add `decode(i-1)` to `ways`.\n" +
    "6. **Two-digit branch:** If `digits[i-2..i-1]` forms a value between 10 and 26, add `decode(i-2)` to `ways`.\n" +
    "7. **Cache and return:** Store `ways` in `memo[i]`, pop the call frame, and return.\n\n" +
    "### Call Tree for '123'\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    '    D3["D(3)"] --> D2A["D(2)"]\n' +
    '    D3 --> D1A["D(1)"]\n' +
    '    D2A --> D1B["D(1) ×cached"]\n' +
    '    D2A --> D0A["D(0)"]\n' +
    '    D1A --> D0B["D(0) ×cached"]\n' +
    "    style D1B fill:#14532d,stroke:#22c55e\n" +
    "    style D0B fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Once `D(1)` and `D(0)` are cached, repeated calls return instantly. Each node in the tree is resolved at most once.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Each unique subproblem `D(0)` through `D(n)` is computed exactly once. All subsequent calls for the same index hit the cache in `O(1)`, giving at most `n + 1` unique computations.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The memo cache stores at most `n + 1` entries. The recursive call stack reaches depth `O(n)` in the worst case before results start propagating back up.",

  bestAndWorstCase:
    "**Best case** and **worst case** are both `O(n)` — every position from `0` to `n` must be visited at least once to fill the cache.\n\n" +
    "In practice, the first call for `D(n)` drives recursion to the base case, then all intermediate results are cached. Strings with many valid two-digit pairs (e.g. all '1's or '2's) generate the most cache hits on backtracking branches.",

  realWorldUses: [
    "**Message Decoding:** Counting valid interpretations of encoded transmissions where symbols map to variable-length codes.",
    "**Compiler Tokenization:** Determining how many ways a character sequence can be split into valid language tokens.",
    "**Barcode Parsing:** Validating and enumerating decodings for digit-encoded product identifiers.",
    "**Algorithm Education:** A canonical example of top-down DP on strings with overlapping subproblems and two-choice branching.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Converts a potentially exponential brute-force recursion to `O(n)` with a straightforward cache.",
      "Only evaluates subproblems reachable from the top — skips positions that can never be reached.",
      "The recursive structure mirrors the problem definition directly, making it easy to derive from first principles.",
    ],
    limitations: [
      "Deep recursion can hit the JavaScript call stack limit for very long digit strings.",
      "Cache lookup adds constant overhead per call compared to tabulation's direct array indexing.",
      "Leading zeros (e.g. '06') invalidate single-digit paths, requiring careful boundary checks at each position.",
    ],
  },

  whenToUseIt:
    "Choose **memoization** when the recursive structure of the decode recurrence is clearest and you want to derive the solution top-down. Prefer **tabulation** when the full string must always be decoded, call stack depth is a concern, or you want the most cache-friendly sequential memory access pattern.",
};
