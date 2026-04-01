import type { EducationalContent } from "@/types";

export const interpolationSearchEducational: EducationalContent = {
  overview:
    "**Interpolation Search** improves on binary search by estimating the likely position of the target based on its value relative to the range boundaries. Instead of always checking the midpoint, it uses the interpolation formula:\n\n`position = low + ((target - arr[low]) × (high - low)) / (arr[high] - arr[low])`\n\nFor uniformly distributed data, this estimation is highly accurate, resulting in far fewer comparisons than binary search.",

  howItWorks:
    "1. Set `low = 0` and `high = array.length - 1`.\n" +
    "2. Check that the target is within `[array[low], array[high]]` — if not, it cannot be in the array.\n" +
    "3. Estimate the position using the interpolation formula:\n" +
    "   `position = low + floor(((target - arr[low]) × (high - low)) / (arr[high] - arr[low]))`\n" +
    "4. Compare `array[position]` to the target:\n" +
    "   - If equal: return `position` — target found.\n" +
    "   - If less: the target is to the right — set `low = position + 1`.\n" +
    "   - If greater: the target is to the left — set `high = position - 1`.\n" +
    "5. Guard against division by zero when `arr[low] === arr[high]`.\n" +
    "6. Repeat until found or the range is empty.\n\n" +
    "### Example: Finding 23 in [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    '    A["Estimate: pos = 0 + (23-2)×9/(91-2) = 2.12 → pos=2, val=8"] -->|"8 < 23"| B["low=3"]\n' +
    '    B -->|"Estimate: pos = 3 + (23-12)×6/(91-12) = 3.83 → pos=3, val=12"] -->|"12 < 23"| C["low=4"]\n' +
    '    C -->|"Estimate: pos = 4 + (23-16)×5/(91-16) = 4.46 → pos=4, val=16"] -->|"16 < 23"| D["low=5"]\n' +
    '    D -->|"Estimate: pos=5, val=23 == 23"| E["Found at index 5!"]\n' +
    "    style E fill:#10b981,stroke:#059669\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity:**\n\n" +
    "- **Best Case:** `O(1)` — the interpolation estimate lands exactly on the target.\n" +
    "- **Average Case:** `O(log log n)` — for uniformly distributed data, each estimate reduces the search space dramatically.\n" +
    "- **Worst Case:** `O(n)` — for exponentially distributed or adversarially constructed data, the estimate can repeatedly miss, degrading to linear performance.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a constant number of index and value variables are used, with no recursion or auxiliary structures.",

  bestAndWorstCase:
    "**Best case** is `O(1)` when the interpolation formula points directly to the target on the first attempt, which is common when the array is small or the target is near the estimated center.\n\n" +
    "**Average case** is `O(log log n)` for uniformly distributed data — significantly better than `O(log n)` for binary search. A billion-element array needs roughly 5 comparisons instead of 30.\n\n" +
    "**Worst case** is `O(n)` for data with heavy skew, such as exponential distributions or sorted arrays with extreme outliers. In these cases, the interpolation formula repeatedly probes one element at a time, effectively becoming linear search.",

  realWorldUses: [
    "**Phone book lookups:** When names are uniformly distributed, interpolation search can quickly estimate which page to open based on alphabetical position.",
    "**Dictionary and encyclopedia indexing:** Estimating the physical page location of a word by its first few characters exploits the near-uniform distribution of natural language.",
    "**Financial time-series search:** Finding a timestamp in a uniformly sampled time series can be accelerated by interpolation on the timestamp values.",
    "**Scientific data lookup:** Uniformly sampled sensor readings or simulation outputs are well-suited to interpolation search for range queries.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Achieves `O(log log n)` average-case performance on uniformly distributed data — much faster than binary search.",
      "Particularly effective when the data density is known to be roughly uniform, such as sequential IDs or evenly sampled measurements.",
      "Constant space complexity with no auxiliary structures or recursion stack.",
    ],
    limitations: [
      "Degrades to `O(n)` worst-case for non-uniform or adversarial distributions.",
      "More complex to implement correctly than binary search — must guard against division by zero and boundary overflows.",
      "Requires the array to be sorted and indexed by value, limiting applicability to numeric or comparable data types.",
    ],
  },

  whenToUseIt:
    "Use **Interpolation Search** when you have a large, sorted array of numeric values that are uniformly or near-uniformly distributed, and you need the fastest possible average-case search performance.\n\nFavor **Binary Search** when the data distribution is unknown or non-uniform, when implementation simplicity is a priority, or when worst-case guarantees matter more than average-case speed.",
};
