import type { EducationalContent } from "@/types";

export const productExceptSelfEducational: EducationalContent = {
  overview:
    "**Product of Array Except Self** returns an output array where each element at index `i` is the product of every element in the input array *except* `inputArray[i]`.\n\n" +
    "The key constraint is that **no division is allowed**. A naïve approach would compute the total product and divide by each element, but that breaks down when zeros are present. The elegant solution uses two linear passes — one from left to right (prefix products) and one from right to left (suffix products) — requiring only `O(n)` time and `O(1)` extra space (excluding the output array).",

  howItWorks:
    "The algorithm runs two passes over the input array:\n\n" +
    "**Pass 1 — Prefix Products (left → right):**\n" +
    "- `result[0]` = 1 (nothing to the left of index 0)\n" +
    "- `result[i]` = product of all elements at indices `0` to `i−1`\n\n" +
    "**Pass 2 — Suffix Products (right → left):**\n" +
    "- Maintain a running `suffixProduct` starting at 1\n" +
    "- Multiply `result[i]` by `suffixProduct` (product of all elements to the right of `i`)\n" +
    "- Update `suffixProduct *= inputArray[i]`\n\n" +
    "After both passes, `result[i]` = (product of all left elements) × (product of all right elements).\n\n" +
    "### Trace for `[1, 2, 3, 4]`\n\n" +
    "```\n" +
    "After prefix pass:  [1, 1, 2,  6 ]\n" +
    "                              ↑ result[2] = 1×2 = 2 (product of indices 0,1)\n" +
    "Suffix pass multiplies right-to-left:\n" +
    "  index 3: result[3] = 6 × 1 = 6   (suffixProduct becomes 4)\n" +
    "  index 2: result[2] = 2 × 4 = 8   (suffixProduct becomes 12)\n" +
    "  index 1: result[1] = 1 × 12 = 12 (suffixProduct becomes 24)\n" +
    "  index 0: result[0] = 1 × 24 = 24\n" +
    "Final:              [24, 12, 8, 6]\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "- Two sequential linear passes over an array of length `n`: `O(n) + O(n) = O(n)`.\n" +
    "- Every element is visited exactly twice — once per pass.\n\n" +
    "**Space Complexity: `O(1)` excluding output**\n\n" +
    "- Only two scalar variables (`prefixProduct` and `suffixProduct`) are maintained during the passes.\n" +
    "- The output array is `O(n)` but is conventionally excluded from the space analysis since it is a required return value, not auxiliary storage.",

  bestAndWorstCase:
    "**Best and Worst Case are both `O(n)`** — there is no branching or early termination in this algorithm. Both passes always traverse the entire array regardless of the input values.\n\n" +
    "### Why Not Use Division?\n\n" +
    "At first glance, computing the total product and dividing by each element seems simpler. But:\n" +
    "- Division by zero fails when any element is `0`\n" +
    "- Floating-point precision issues arise with very large or very small values\n" +
    "- Integer division truncates remainders incorrectly\n\n" +
    "The two-pass approach handles zeros naturally: if `inputArray[i] = 0`, the prefix and suffix products on either side are unaffected, and `result[i]` correctly accumulates the product of all non-zero neighbors.",

  realWorldUses: [
    "**Signal Processing:** Computing the product response at each frequency bin from a filter bank, excluding self-interference from the current bin.",
    "**Probability Theory:** Calculating the joint probability of all events except one in an independence model — equivalent to dividing the total product without risking division by zero for rare events.",
    "**Compiler Optimization:** Propagating multiplicative invariants across loop iterations where one factor is variable and the rest are constants.",
    "**Database Analytics:** Computing row-wise product aggregations across window functions that exclude the current row.",
    "**Game Development:** Calculating influence weights for each agent in a multi-agent system where each agent's weight is the product of all other agents' strengths.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Handles zeros correctly without special-casing — no division means no divide-by-zero risk.",
      "Optimal `O(n)` time with a clean two-pass structure that is easy to reason about.",
      "Constant auxiliary space `O(1)` — the output array is the only allocation needed.",
      "Works with negative numbers, zeros, and large values without precision issues.",
    ],
    limitations: [
      "Requires two passes rather than one, though both are linear and the constant factor is small.",
      "Output array is `O(n)` — unavoidable since the result itself has `n` elements.",
      "Not suitable for streaming input where the full array is not available upfront, as both passes need the complete array.",
    ],
  },

  whenToUseIt:
    "Use **Product of Array Except Self** whenever you need to compute per-element products while excluding each element from its own result, especially when:\n" +
    "- The input may contain zeros (division-based approaches fail here)\n" +
    "- You need `O(1)` auxiliary space\n" +
    "- You want to avoid floating-point division precision issues\n\n" +
    "If division is explicitly allowed and zeros are guaranteed absent, a single-pass total-product-then-divide approach is simpler but less robust. For sparse arrays with many zeros, consider grouping by zero count first to short-circuit the calculation.",
};
