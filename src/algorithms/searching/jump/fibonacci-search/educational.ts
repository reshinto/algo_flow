import type { EducationalContent } from "@/types";

export const fibonacciSearchEducational: EducationalContent = {
  overview:
    "**Fibonacci Search** is a comparison-based searching algorithm for sorted arrays that uses Fibonacci numbers to determine the split points rather than halving the range as in binary search.\n\nBy dividing the array at Fibonacci-number boundaries, the algorithm achieves O(log n) time complexity while avoiding division operations — making it attractive for systems where division is expensive but addition and subtraction are cheap.",

  howItWorks:
    "1. Find the **smallest Fibonacci number** `fibM` that is greater than or equal to the array length.\n" +
    "2. Use three consecutive Fibonacci numbers: `fibM`, `fibM1` (one before), and `fibM2` (two before).\n" +
    "3. Compare the element at index `min(offset + fibM2, n-1)` with the target.\n" +
    "   - If **equal**: target found — return the index.\n" +
    "   - If **less than target**: move two Fibonacci numbers down, advance `offset` to `compareIndex`.\n" +
    "   - If **greater than target**: move one Fibonacci number down, keep `offset` unchanged.\n" +
    "4. Continue until `fibM` reaches 1, then check the single remaining element.\n\n" +
    "### Example: Finding 38 in [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\n\n" +
    "```\n" +
    "arrayLength = 10, fibM = 13, fibM1 = 8, fibM2 = 5, offset = -1\n\n" +
    "Step 1: compareIndex = min(-1+5, 9) = 4 → value 16 < 38 → advance offset to 4\n" +
    "        fibM=8, fibM1=5, fibM2=3\n" +
    "Step 2: compareIndex = min(4+3, 9) = 7 → value 56 > 38 → shrink left\n" +
    "        fibM=3, fibM1=2, fibM2=1\n" +
    "Step 3: compareIndex = min(4+1, 9) = 5 → value 23 < 38 → advance offset to 5\n" +
    "        fibM=2, fibM1=1, fibM2=1\n" +
    "Step 4: compareIndex = min(5+1, 9) = 6 → value 38 === 38 → FOUND at index 6\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(log n)`**\n\n" +
    "- The Fibonacci sequence grows exponentially, so the number of iterations is proportional to `log_φ(n)` where φ ≈ 1.618.\n" +
    "- This is asymptotically equivalent to `O(log n)`, the same as binary search.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only three Fibonacci number variables (`fibM`, `fibM1`, `fibM2`) and an offset tracker are required. No recursion stack or auxiliary arrays are used.",

  bestAndWorstCase:
    "**Best Case: `O(1)`** — The target element lands exactly at the first comparison index (`offset + fibM2`), returning immediately on the first iteration.\n\n" +
    "**Worst Case: `O(log n)`** — The target is at the very end of the array or is absent, requiring the full sequence of Fibonacci reductions. For an array of 1,000 elements, this means at most about 14 comparisons.",

  realWorldUses: [
    "**Processors without hardware division:** Fibonacci Search avoids the division operator, making it suitable for embedded or RISC systems where division is significantly slower than addition.",
    "**Cache-efficient searching:** The division points in Fibonacci Search are slightly biased toward smaller indices, which can improve cache hit rates when elements near the start are accessed more frequently.",
    "**Academic and competitive programming:** Often used to demonstrate that O(log n) search can be achieved without binary division.",
    "**Signal processing:** Useful in algorithms that process data streams where the Fibonacci structure maps naturally onto the data segmentation.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Achieves O(log n) time complexity without using the division operator — only addition and subtraction.",
      "Performs well on systems where division is expensive relative to addition.",
      "Works entirely in-place with O(1) extra space.",
    ],
    limitations: [
      "Requires the array to be sorted before searching.",
      "Slightly more complex to implement correctly than binary search.",
      "On modern hardware with cheap division, binary search is often faster in practice due to simpler control flow.",
      "Performance depends on element distribution; Fibonacci boundaries do not always align optimally.",
    ],
  },

  whenToUseIt:
    "Use **Fibonacci Search** when you are working with sorted data on architectures or environments where integer division is costly or unavailable. It is also a good choice when you need O(log n) performance and want to explore an alternative to binary search for educational or research purposes.\n\nAvoid it for general-purpose use on modern hardware where binary search is simpler and equally fast, or when the array is unsorted.",
};
