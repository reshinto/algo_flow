import type { EducationalContent } from "@/types";

export const fourSumEducational: EducationalContent = {
  overview:
    "**Four Sum** finds all unique quadruplets in an array whose values sum to a given target. It is a natural extension of the Three Sum pattern, adding one more fixed outer loop and relying on the same sort + two-pointer inner search.\n\n" +
    "The brute-force approach of checking every combination of four elements costs `O(n⁴)`. Sorting and fixing two outer pointers reduces this to `O(n³)`, while duplicate skipping ensures the output contains only unique quadruplets.",

  howItWorks:
    "1. **Sort** the input array in ascending order — this enables two-pointer convergence and adjacent duplicate detection.\n" +
    "2. Iterate `firstIndex` from `0` to `n−4` as the first fixed element:\n" +
    "   - Skip if `firstIndex > 0` and the current value equals the previous (duplicate first).\n" +
    "3. Iterate `secondIndex` from `firstIndex+1` to `n−3` as the second fixed element:\n" +
    "   - Skip if `secondIndex > firstIndex+1` and the current value equals the previous (duplicate second).\n" +
    "4. Set `leftPointer = secondIndex + 1` and `rightPointer = arrayLength − 1`.\n" +
    "5. While `leftPointer < rightPointer`:\n" +
    "   - Compute `currentSum = array[first] + array[second] + array[left] + array[right]`.\n" +
    "   - If `currentSum === target`: record the quadruplet, skip duplicate left/right values, advance both pointers.\n" +
    "   - If `currentSum < target`: advance `leftPointer` to increase the sum.\n" +
    "   - If `currentSum > target`: retreat `rightPointer` to decrease the sum.\n\n" +
    "### Trace for `[1, 0, -1, 0, -2, 2]`, target `0`\n\n" +
    "```\n" +
    "Sorted: [-2, -1, 0, 0, 1, 2]\n\n" +
    "first=-2(0), second=-1(1): left=0(2), right=2(5) → -2-1+0+2=-1 < 0 → left++\n" +
    "  left=0(3), right=2(5) → -2-1+0+2=-1 < 0 → left++\n" +
    "  left=1(4), right=2(5) → -2-1+1+2=0 → quadruplet! [-2,-1,1,2]\n" +
    "first=-2(0), second=0(2): left=0(3), right=2(5) → -2+0+0+2=0 → quadruplet! [-2,0,0,2]\n" +
    "  left=1(4), right=2(5) → -2+0+1+2=1 > 0 → right--  (pointers meet)\n" +
    "first=-2(0), second=0(3): duplicate of index 2 → skip\n" +
    "first=-2(0), second=1(4): left=2(5), right... pointers meet immediately\n" +
    "first=-1(1), second=0(2): left=0(3), right=2(5) → -1+0+0+2=1 > 0 → right--\n" +
    "  left=0(3), right=1(4) → -1+0+0+1=0 → quadruplet! [-1,0,0,1]\n" +
    "Result: [[-2,-1,1,2], [-2,0,0,2], [-1,0,0,1]]\n" +
    "```\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["-2"] --> B["-1"]\n' +
    '  B --> C["0"]\n' +
    '  C --> D["0"]\n' +
    '  D --> E["1"]\n' +
    '  E --> F["2"]\n' +
    "  style A fill:#f59e0b,stroke:#d97706\n" +
    "  style B fill:#f59e0b,stroke:#d97706\n" +
    "  style C fill:#06b6d4,stroke:#0891b2\n" +
    "  style F fill:#06b6d4,stroke:#0891b2\n" +
    "  style D fill:#14532d,stroke:#22c55e\n" +
    "  style E fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Sorted array `[-2, -1, 0, 0, 1, 2]`: the two outer fixed pointers (amber) pin -2 and -1, while the two-pointer inner scan (cyan = left, green = inner processed) converges to find the quadruplet `[-2, -1, 1, 2]` summing to 0.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n³)`**\n\n" +
    "- Sorting costs `O(n log n)`.\n" +
    "- Two outer loops contribute `O(n²)` iterations; each inner two-pointer pass is `O(n)` amortized.\n" +
    "- Total: `O(n log n) + O(n³) = O(n³)` — dominated by the three nested iterations.\n\n" +
    "**Space Complexity: `O(1)` auxiliary**\n\n" +
    "- Only pointer variables are used beyond the sorted copy and output array.\n" +
    "- The output quadruplets list is `O(k)` where `k` is the result count — excluded from auxiliary space.\n\n" +
    "**Comparison with other approaches:**\n\n" +
    "| Approach | Time | Space |\n" +
    "| --- | --- | --- |\n" +
    "| Brute force (4 nested loops) | `O(n⁴)` | `O(1)` |\n" +
    "| Hash set reduction | `O(n³)` | `O(n)` |\n" +
    "| Sort + Two Outer + Two Pointer | `O(n³)` | `O(1)` |",

  bestAndWorstCase:
    "**Best Case — `O(n³)`:** Even with no valid quadruplets, the outer two loops and inner two-pointer scan cannot be avoided; there is no early termination that reduces the asymptotic bound.\n\n" +
    "**Worst Case — `O(n³)`:** Many valid quadruplets are found, but recording them does not change the traversal cost — the two-pointer inner loop still converges in linear time per outer pair.\n\n" +
    "### Why Sorting Enables Duplicate Skipping\n\n" +
    "Sorting clusters identical values together. Checking `sortedArray[firstIndex] === sortedArray[firstIndex - 1]` guarantees that all valid quadruplets starting with that value were already enumerated in the previous iteration, preventing exact duplicates from appearing in the output.",

  realWorldUses: [
    "**Computational chemistry:** Finding four atoms whose combined charge or mass satisfies a balance condition.",
    "**Portfolio management:** Identifying four assets whose weighted returns sum to a precise target allocation.",
    "**Cryptography:** Searching for four plaintext fragments that XOR or sum to a known checksum.",
    "**Combinatorial testing:** Generating four-way parameter combinations that produce a specific aggregate outcome.",
    "**Constraint satisfaction:** Solving systems where four decision variables must jointly satisfy a linear equality.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Extends the proven Three Sum pattern with minimal additional complexity — only one more outer loop.",
      "Produces uniquely sorted quadruplets without a hash set, thanks to the sorted input.",
      "`O(1)` auxiliary space beyond the sorted copy and output — no extra data structures.",
      "Generalizes to any `k`-sum problem by fixing `k−2` outer pointers and applying two-pointer on the innermost two.",
    ],
    limitations: [
      "Still `O(n³)` — for large arrays (`n > 1000`), performance degrades rapidly.",
      "Requires sorting, which destroys original element positions.",
      "Output size can be `O(n²)` in adversarial inputs (e.g., many repeated values), consuming significant memory.",
    ],
  },

  whenToUseIt:
    "Use **Four Sum** when you need all unique quadruplets summing to a target and:\n" +
    "- Input size is modest (typically `n ≤ 200`) where `O(n³)` is acceptable\n" +
    "- You want `O(1)` auxiliary space and clean duplicate elimination without hash sets\n" +
    "- The problem is a direct generalization of Three Sum (e.g., interview extensions)\n\n" +
    "Avoid this approach for large arrays — at `n = 1000`, `O(n³)` requires ~10⁹ operations. In those cases, consider hash-based approaches or problem-specific pruning.",
};
