import type { EducationalContent } from "@/types";

export const searchRotatedArrayEducational: EducationalContent = {
  overview:
    "**Search in Rotated Sorted Array** is a binary search variant that efficiently locates a target value in a sorted array that has been rotated at an unknown pivot point.\n\n" +
    "A rotated sorted array is one where a sorted sequence has been split at some pivot and the two halves swapped — for example, `[0, 1, 2, 4, 5, 6, 7]` becomes `[4, 5, 6, 7, 0, 1, 2]`. Despite the rotation, binary search can still achieve `O(log n)` time by observing that at least one of the two halves is always fully sorted.",

  howItWorks:
    "1. Set `low = 0` and `high = array.length - 1`.\n" +
    "2. While `low <= high`, compute `mid = floor((low + high) / 2)`.\n" +
    "3. If `array[mid] === target`, return `mid` — element found.\n" +
    "4. Determine which half is sorted by comparing `array[low]` with `array[mid]`:\n" +
    "   - If `array[low] <= array[mid]`, the **left half** is sorted.\n" +
    "     - If `array[low] <= target < array[mid]`, search the left half (`high = mid - 1`).\n" +
    "     - Otherwise, search the right half (`low = mid + 1`).\n" +
    "   - Else, the **right half** is sorted.\n" +
    "     - If `array[mid] < target <= array[high]`, search the right half (`low = mid + 1`).\n" +
    "     - Otherwise, search the left half (`high = mid - 1`).\n" +
    "5. If the loop ends without finding the target, return `-1`.\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    subgraph Finding 0 in [4,5,6,7,0,1,2]\n" +
    '    A["low=0, high=6, mid=3 (value=7)"] -->|"left [4..7] sorted, 0 not in range"| B["low=4, high=6"]\n' +
    '    B -->|"mid=5 (value=1), right [1..2] sorted, 0 not in range"| C["low=4, high=4"]\n' +
    '    C -->|"mid=4 (value=0) === target"| D["Found at index 4"]\n' +
    "    end\n" +
    "    style D fill:#10b981,stroke:#059669\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(log n)`**\n\n" +
    "- **Best Case:** `O(1)` — the target is at the initial midpoint.\n" +
    "- **Average & Worst Case:** `O(log n)` — the search range halves on every iteration because at least one half is always confirmed sorted.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a constant number of index variables are maintained regardless of array size.",

  bestAndWorstCase:
    "**Best case** occurs when the midpoint of the initial search range equals the target, resolving in `O(1)` — one comparison.\n\n" +
    "**Worst case** is `O(log n)` iterations — when the target is near the boundary between the two rotated halves, or when the target is absent. For an array of one million elements, this requires at most around 20 comparisons.",

  realWorldUses: [
    "**Database Index Rotation:** Some ring-buffer or circular log structures maintain approximate sort order with a rotation point; this algorithm locates records efficiently.",
    "**Time-Series Data:** Sensor readings or stock prices stored in circular buffers can be searched in `O(log n)` without knowing the current write head.",
    "**Competitive Programming:** LeetCode problem 33 and many variants appear in coding interviews at top technology companies.",
    "**Version Rollout Systems:** Searching for a specific build version in a deployment ring where versions wrap around a circular identifier space.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Maintains `O(log n)` time complexity despite the rotation — no need to find the pivot first.",
      "Works in-place with `O(1)` space — only three index variables required.",
      "Handles all rotation amounts including no rotation (standard sorted array) and full rotation.",
    ],
    limitations: [
      "Requires that the array was originally sorted with no duplicate values; arrays with duplicates require a modified algorithm with `O(n)` worst case.",
      "More complex to implement correctly than standard binary search due to the extra sorted-half detection step.",
      "Not applicable to arrays that are not the result of a rotation of a sorted array.",
    ],
  },

  whenToUseIt:
    "Use **Search in Rotated Sorted Array** when you need to find a value in a sorted array that may have been rotated at an unknown pivot, and duplicates are guaranteed to be absent.\n\n" +
    "Avoid it when the array contains duplicate values (use a linear scan or a modified variant), when the array is not sorted, or when the rotation pivot is already known (in which case a direct offset calculation followed by standard binary search is cleaner).",
};
