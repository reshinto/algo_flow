import type { EducationalContent } from "@/types";

export const twoPointerSumEducational: EducationalContent = {
  overview:
    "**Two Sum (Sorted Array)** is a classic two-pointer technique for finding a pair of elements in a **sorted** array that add up to a given target value.\n\n" +
    "Unlike the hash-map Two Sum approach (which works on unsorted arrays in `O(n)` time but requires `O(n)` extra space), this variant exploits the sorted order to converge two pointers from opposite ends of the array — achieving the same `O(n)` time complexity with only `O(1)` extra space.\n\n" +
    "A **left pointer** starts at the smallest element and a **right pointer** starts at the largest. If their sum is too small, the left pointer advances to a larger value; if too large, the right pointer retreats to a smaller value. If they meet exactly at the target, the pair is found.",

  howItWorks:
    "1. Initialize `leftPointer = 0` and `rightPointer = array.length - 1`.\n" +
    "2. While `leftPointer < rightPointer`:\n" +
    "   - Compute `currentSum = array[leftPointer] + array[rightPointer]`.\n" +
    "   - If `currentSum === target` → **pair found**, return the indices.\n" +
    "   - If `currentSum < target` → sum is too small, increment `leftPointer` to try a larger value.\n" +
    "   - If `currentSum > target` → sum is too large, decrement `rightPointer` to try a smaller value.\n" +
    "3. If the pointers meet without finding a pair, no valid pair exists.\n\n" +
    "### Two-Pointer Trace (`[1, 2, 4, 6, 8, 11, 15]`, target = `10`)\n\n" +
    "```\n" +
    "left=0(1), right=6(15): 1+15=16 > 10 → retreat right\n" +
    "left=0(1), right=5(11): 1+11=12 > 10 → retreat right\n" +
    "left=0(1), right=4(8):  1+8=9  < 10 → advance left\n" +
    "left=1(2), right=4(8):  2+8=10 == 10 → found! indices (1, 4)\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "- **Best Case:** `O(1)` — The first pair checked (leftmost + rightmost) happens to equal the target.\n" +
    "- **Average / Worst Case:** `O(n)` — Each pointer moves at most `n` steps total before the two pointers meet.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only two integer pointers are used regardless of input size. This is the primary advantage over the hash-map approach, which requires `O(n)` space to store visited elements.\n\n" +
    "**Comparison with hash-map Two Sum:**\n\n" +
    "| Variant | Prerequisite | Time | Space |\n" +
    "| --- | --- | --- | --- |\n" +
    "| Hash Map Two Sum | None (unsorted OK) | `O(n)` | `O(n)` |\n" +
    "| Two Pointer Sum | Sorted input | `O(n)` | `O(1)` |",

  bestAndWorstCase:
    "**Best Case — `O(1)`:** The pair is the outermost two elements (index 0 and index n−1) and their sum equals the target. A single comparison suffices.\n\n" +
    "**Worst Case — `O(n)`:** The target pair is near the center, or no pair exists at all. Both pointers traverse nearly the entire array before the answer is determined or the pointers meet.\n\n" +
    "The two-pointer strategy strictly dominates a brute-force `O(n²)` nested-loop check for sorted arrays, and matches the hash-map approach in time while using constant space.",

  realWorldUses: [
    "**Two-Sum Interview Problems:** The canonical sorted-array variant of LeetCode #167 (Two Sum II) and similar interview questions.",
    "**Database Range Queries:** Checking if any pair of values in a sorted column satisfies a target sum condition without a full self-join.",
    "**Financial Analysis:** Finding pairs of asset returns from a sorted list that together achieve a specific combined return target.",
    "**Collision Detection:** Pairing elements from two sorted lists (left/right boundaries) to detect overlapping intervals summing to a threshold.",
    "**Recommendation Systems:** Matching complementary items (e.g., protein + carbs) from sorted nutrition tables to hit a calorie target.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Optimal `O(1)` space — no hash set or extra array needed compared to the hash-map approach.",
      "Clean and predictable `O(n)` time with a simple convergence guarantee.",
      "Easy to extend for related problems (e.g., Three Sum, Four Sum) by fixing outer pointers and applying two-pointer on the remainder.",
      "Works well in memory-constrained environments where allocating a hash map is expensive.",
    ],
    limitations: [
      "Requires the input array to be **sorted** — if unsorted, a sort step costs `O(n log n)` which worsens the overall complexity compared to the `O(n)` hash-map approach.",
      "Only finds one valid pair; enumerating all pairs requires additional logic.",
      "Does not directly generalize to finding pairs where elements can be reused (the pointer approach would need adjusting).",
    ],
  },

  whenToUseIt:
    "Use **Two Sum (Sorted, Two Pointer)** when the input array is already sorted (or sorting it is acceptable) and you want to minimize extra memory. If the array is unsorted and memory is not a constraint, the hash-map Two Sum approach is simpler and avoids the sort cost.\n\n" +
    "For `k`-sum variants (`k ≥ 3`), fix `k−2` outer pointers and apply this two-pointer inner loop — it scales better than a full hash-map approach for those cases.",
};
