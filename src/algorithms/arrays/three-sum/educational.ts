import type { EducationalContent } from "@/types";

export const threeSumEducational: EducationalContent = {
  overview:
    "**Three Sum** finds all unique triplets in an array whose values sum to zero. It is one of the most common interview problems and a direct extension of the classic Two Sum problem.\n\n" +
    "The naive brute-force approach checks every possible combination of three elements, yielding `O(n³)` time. The optimized solution reduces this to `O(n²)` by sorting the array first, then fixing one element (the *anchor*) and using a two-pointer technique to efficiently search for the complementary pair among the remaining elements.",

  howItWorks:
    "1. **Sort** the input array in ascending order — this enables the two-pointer technique and simplifies duplicate skipping.\n" +
    "2. Iterate through each element as the **anchor** (index `anchorIndex` from `0` to `n−3`):\n" +
    "   - If the anchor is a duplicate of the previous anchor, skip it to avoid duplicate triplets.\n" +
    "3. Set `leftPointer = anchorIndex + 1` and `rightPointer = arrayLength − 1`.\n" +
    "4. While `leftPointer < rightPointer`:\n" +
    "   - Compute `currentSum = anchor + array[leftPointer] + array[rightPointer]`.\n" +
    "   - If `currentSum === 0`: record the triplet, then advance both pointers while skipping duplicates.\n" +
    "   - If `currentSum < 0`: the sum is too small — advance `leftPointer` to increase it.\n" +
    "   - If `currentSum > 0`: the sum is too large — retreat `rightPointer` to decrease it.\n" +
    "5. Continue until all anchors are exhausted.\n\n" +
    "### Trace for `[-1, 0, 1, 2, -1, -4]`\n\n" +
    "```\n" +
    "Sorted: [-4, -1, -1, 0, 1, 2]\n\n" +
    "Anchor = -4 (index 0): left=1(-1), right=5(2) → -4+-1+2=-3 < 0 → advance left\n" +
    "  left=2(-1), right=5(2) → -4+-1+2=-3 < 0 → advance left\n" +
    "  left=3(0),  right=5(2) → -4+0+2=-2  < 0 → advance left\n" +
    "  left=4(1),  right=5(2) → -4+1+2=-1  < 0 → advance left  (pointers meet)\n" +
    "Anchor = -1 (index 1): left=2(-1), right=5(2) → -1+-1+2=0 → triplet! [-1,-1,2]\n" +
    "  left=3(0),  right=4(1) → -1+0+1=0  → triplet! [-1,0,1]\n" +
    "Anchor = -1 (index 2): duplicate of index 1 → skip\n" +
    "Anchor =  0 (index 3): left=4(1),  right=5(2) → 0+1+2=3 > 0 → retreat right (pointers meet)\n" +
    "Result: [[-1,-1,2], [-1,0,1]]\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n²)`**\n\n" +
    "- Sorting costs `O(n log n)`.\n" +
    "- The outer anchor loop runs `O(n)` times; each iteration runs the two-pointer inner loop in `O(n)` amortized time.\n" +
    "- Total: `O(n log n) + O(n²) = O(n²)` — dominated by the nested loop.\n\n" +
    "**Space Complexity: `O(1)` auxiliary**\n\n" +
    "- Only a constant number of pointer variables are used beyond the output array.\n" +
    "- The output triplets list is `O(k)` where `k` is the number of results — conventionally excluded from auxiliary space.\n\n" +
    "**Comparison with brute force:**\n\n" +
    "| Approach | Time | Space |\n" +
    "| --- | --- | --- |\n" +
    "| Brute force (3 nested loops) | `O(n³)` | `O(1)` |\n" +
    "| Hash set per anchor | `O(n²)` | `O(n)` |\n" +
    "| Sort + Two Pointer | `O(n²)` | `O(1)` |",

  bestAndWorstCase:
    "**Best Case — `O(n²)`:** Even if no valid triplets exist, both the outer anchor loop and inner two-pointer loop still scan through the array. There is no early termination that makes the best case faster than quadratic.\n\n" +
    "**Worst Case — `O(n²)`:** A large number of valid triplets requires recording all of them but does not change the asymptotic time — the two-pointer convergence still terminates each inner loop in linear time.\n\n" +
    "### Why Sorting Enables Duplicate Skipping\n\n" +
    "Because the array is sorted, duplicate values are adjacent. When we skip `sortedArray[anchorIndex] === sortedArray[anchorIndex - 1]`, we guarantee we have already explored every valid triplet that starts with this value. The same logic applies to the left and right pointers after a triplet is found.",

  realWorldUses: [
    "**Geometry:** Finding three collinear points or three points forming a degenerate triangle in a coordinate system.",
    "**Financial Analysis:** Identifying three assets whose combined net position (long/short) nets to zero — used in delta-neutral portfolio balancing.",
    "**Chemistry:** Searching for reaction triplets where reactant and product masses balance to zero net change.",
    "**Data Deduplication:** Finding triples of records that are mutual duplicates when the similarity function is zero-sum.",
    "**Game Development:** Detecting three-way interactions in physics engines where force contributions cancel out.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Dramatically reduces brute-force `O(n³)` to `O(n²)` — a 1000x improvement for large arrays.",
      "Produces only unique triplets without requiring a hash set for deduplication, thanks to sorted order.",
      "Constant `O(1)` auxiliary space — no hash map or additional data structures needed.",
      "Generalizes naturally to `k`-sum problems by fixing `k−2` outer pointers and applying two-pointer on the innermost two.",
    ],
    limitations: [
      "Requires sorting the input (`O(n log n)`), which is acceptable but precludes using original indices.",
      "Still `O(n²)` — for very large arrays (`n > 10⁶`), this may be too slow and a probabilistic or approximate approach is needed.",
      "Output size can be `O(n²)` in the worst case (e.g., all-zeros array), consuming significant memory.",
    ],
  },

  whenToUseIt:
    "Use **Three Sum (Sort + Two Pointer)** when you need to find all unique zero-sum triplets and:\n" +
    "- The input array is unsorted (or sorting is acceptable and original indices are not needed)\n" +
    "- Memory is constrained and you want to avoid a `O(n)` hash set per anchor iteration\n" +
    "- You want a clean, well-known interview pattern that extends to Four Sum and beyond\n\n" +
    "Avoid this approach if the array is extremely large and `O(n²)` is too slow — in that case, consider probabilistic methods or problem-specific optimizations. If you need original indices rather than values, use the hash-set variant instead.",
};
