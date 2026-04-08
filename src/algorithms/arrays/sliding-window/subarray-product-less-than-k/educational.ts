import type { EducationalContent } from "@/types";

export const subarrayProductLessThanKEducational: EducationalContent = {
  overview:
    "**Subarray Product Less Than K** counts every contiguous subarray whose element product is strictly less than a given threshold. The algorithm uses a variable-size sliding window that expands to include new elements and shrinks from the left whenever the product constraint is violated.\n\nThe counting insight is that every time the window is valid, all subarrays ending at `rightPointer` and starting anywhere within `[leftPointer, rightPointer]` are valid — adding `rightPointer - leftPointer + 1` new subarrays per step.",

  howItWorks:
    "1. Initialize `leftPointer = 0`, `currentProduct = 1`, `count = 0`.\n" +
    "2. For each `rightPointer` from `0` to `n-1`:\n" +
    "   * **Expand:** Multiply `currentProduct` by `array[rightPointer]`.\n" +
    "   * **Shrink:** While `currentProduct >= threshold`, divide by `array[leftPointer]` and advance `leftPointer`.\n" +
    "   * **Count:** Add `rightPointer - leftPointer + 1` to `count` (all valid subarrays ending here).\n" +
    "3. Return `count`.\n\n" +
    "### Example with `[10, 5, 2, 6]`, threshold = `100`\n\n" +
    "| rightPointer | Window | Product | +count | Total |\n" +
    "|---|---|---|---|---|\n" +
    "| 0 | `[10]` | 10 | 1 | 1 |\n" +
    "| 1 | `[10,5]` | 50 | 2 | 3 |\n" +
    "| 2 | `[10,5,2]` → shrink → `[5,2]` | 100→10 | 2 | 5 |\n" +
    "| 3 | `[5,2,6]` | 60 | 3 | 8 |\n\n" +
    "Wait — `[10,5,2]` = 100 ≥ 100, so shrink: `[5,2]` = 10, then add `[5,2,6]` = 60 < 100. Result: **8** subarrays (LeetCode 713 answer is also 16 for the full 6-element array).\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["10"] --> B["5"] --> C["2"] --> D["6"]\n' +
    "  style A fill:#14532d,stroke:#22c55e\n" +
    "  style B fill:#f59e0b,stroke:#d97706\n" +
    "  style C fill:#f59e0b,stroke:#d97706\n" +
    "  style D fill:#f59e0b,stroke:#d97706\n" +
    '  L["leftPointer"] -. after shrink .-> B\n' +
    '  R["rightPointer"] -. expanded .-> D\n' +
    '  P["product=60 < 100\\n+3 subarrays"] -. count .-> C\n' +
    "```\n\n" +
    "After `10` is evicted (product 100 ≥ threshold), the valid window is `[5, 2, 6]` with product 60. " +
    "All 3 subarrays ending at index 3 (`[6]`, `[2,6]`, `[5,2,6]`) are counted in one step.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "- Each element is touched at most twice: once when `rightPointer` adds it, and once when `leftPointer` removes it. The total number of pointer moves is bounded by `2n`.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only scalar variables are used. No hash maps, auxiliary arrays, or recursion stacks are needed.",

  bestAndWorstCase:
    "**Best Case: `O(n)`** — When the very first element already exceeds the threshold (e.g., `threshold = 1`), the window is always empty and the answer is `0`, but all `n` elements are still visited.\n\n" +
    "**Worst Case: `O(n)`** — Even when every element contributes and the window shrinks frequently, the total pointer movements remain `O(n)` because each pointer only moves right.\n\n" +
    "Integer division during shrinking must be performed with care to avoid floating-point drift — using integer arithmetic throughout is preferred.",

  realWorldUses: [
    "**Risk Assessment:** Counting scenarios where the combined probability factor (product) of multiple independent risk events stays below an acceptable threshold.",
    "**Compiler Optimization:** Enumerating instruction sequences whose combined latency product satisfies a timing constraint.",
    "**Chemistry:** Finding all reactant sequences whose concentration product remains below a reaction threshold.",
    "**Cryptography:** Counting key segments whose combined entropy product satisfies a security bound.",
    "**Game Design:** Finding all item combinations whose combined multiplier stat stays below a balance cap.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Achieves `O(n)` by observing that adding `rightPointer - leftPointer + 1` counts all new valid subarrays per step.",
      "No hash map or prefix-product array needed — pure two-pointer approach.",
      "Easily extended to count subarrays with product greater than k by inverting the condition.",
    ],
    limitations: [
      "Only works when all elements are positive integers — zeros and negatives break the monotonic product property.",
      "Uses integer division during shrinking; floating-point inputs can cause precision errors.",
      "Counts subarrays but does not enumerate them — listing all subarrays would require `O(n²)` output.",
    ],
  },

  whenToUseIt:
    "Use the **Subarray Product < K** sliding window when you need to **count** (not enumerate) contiguous subarrays with a product constraint and all values are strictly positive integers.\n\nRecognize this pattern from phrases like 'count subarrays where product is less than k' or 'how many windows have product below threshold'. If the array can contain zeros or negatives, use a prefix-product approach instead.",
};
