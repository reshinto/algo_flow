import type { EducationalContent } from "@/types";

export const findPeakElementEducational: EducationalContent = {
  overview:
    "**Find Peak Element** uses binary search to locate a peak element in an array in `O(log n)` time — without requiring the array to be sorted.\n\n" +
    "A peak element is one that is strictly greater than its neighbors. The boundary elements only need one neighbor to be greater than. The algorithm exploits the slope property: if the value at `mid` is less than its right neighbor, there must be a peak to the right; otherwise there must be a peak at `mid` or to the left.",

  howItWorks:
    "1. Set `low = 0` and `high = array.length - 1`.\n" +
    "2. While `low < high`, compute `mid = floor((low + high) / 2)`.\n" +
    "3. Compare `array[mid]` with `array[mid + 1]`:\n" +
    "   - If `array[mid] < array[mid + 1]`, the slope is **ascending** — a peak must exist to the right.\n" +
    "     Move `low = mid + 1`.\n" +
    "   - Otherwise, the slope is **descending or flat** — a peak exists at `mid` or to the left.\n" +
    "     Move `high = mid`.\n" +
    "4. When `low === high`, the remaining index is the peak.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    subgraph Finding peak in [1,3,20,4,1,0]\n" +
    '    A["low=0, high=5, mid=2 (20)"] -->|"arr[2]=20 > arr[3]=4 → descending"| B["high=2"]\n' +
    '    B -->|"low=0, high=2, mid=1 (3)"] -->|"arr[1]=3 < arr[2]=20 → ascending"| C["low=2"]\n' +
    '    C -->|"low=2 === high=2 → peak at index 2 (value 20)"| D["Peak found"]\n' +
    "    end\n" +
    "    style D fill:#10b981,stroke:#059669\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(log n)`**\n\n" +
    "- **Best Case:** `O(1)` — the midpoint is already a peak on the first comparison.\n" +
    "- **Average & Worst Case:** `O(log n)` — the search range halves each iteration because the slope comparison always eliminates at least half the remaining elements.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only three index variables (`lowIndex`, `highIndex`, `midIndex`) are maintained regardless of array size.",

  bestAndWorstCase:
    "**Best case** is `O(1)` — when the midpoint of the initial range is already a peak element.\n\n" +
    "**Worst case** is `O(log n)` — when the peak is at one extreme end of the array (e.g., a strictly increasing or strictly decreasing array), requiring the full logarithmic traversal. Note that the algorithm always finds *a* peak; there may be multiple valid answers.",

  realWorldUses: [
    "**Signal Processing:** Finding local maxima in audio waveforms or sensor readings to identify significant events.",
    "**Optimization Problems:** Unimodal function maximization — when a function increases then decreases, binary search on the slope finds the maximum efficiently.",
    "**Image Analysis:** Locating intensity peaks in histograms or 1D projections of image data.",
    "**Competitive Programming:** LeetCode problem 162 and variants that require finding local optima in arrays appear regularly in coding interviews.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Works on unsorted arrays — unlike most binary search variants which require sorted input.",
      "Achieves `O(log n)` time despite the unsorted input, by exploiting the slope guarantee.",
      "Always finds a valid answer — the algorithm is guaranteed to return a peak index for any non-empty array.",
    ],
    limitations: [
      "Returns only one peak even if multiple peaks exist — the specific peak returned depends on the array structure.",
      "Requires that `array[mid + 1]` is always accessible, meaning the array must have at least one element.",
      "The slope-following guarantee relies on the assumption that boundary elements are treated as having `-Infinity` virtual neighbors.",
    ],
  },

  whenToUseIt:
    "Use **Find Peak Element** when you need any local maximum in an array in `O(log n)` time and do not require the globally maximum element.\n\n" +
    "Avoid it when you need the global maximum (use a linear scan), when the array has fewer than one element, or when you specifically need all peaks rather than just one.",
};
