import type { EducationalContent } from "@/types";

export const hashSearchEducational: EducationalContent = {
  overview:
    "**Hash-Based Search** is a two-phase searching technique that trades extra space for dramatically faster lookup time. In the build phase, it iterates through the array once to populate a hash map from value to index. In the search phase, it performs a single O(1) hash map lookup to find the target.\n\nUnlike binary or jump search, it works on unsorted arrays and achieves effectively constant-time lookup at the cost of O(n) extra memory.",

  howItWorks:
    "### Phase 1 — Build the Hash Map (`O(n)`)\n\n" +
    "1. Create an empty hash map `Map<number, number>` mapping element values to their indices.\n" +
    "2. Iterate through every element in the array.\n" +
    "3. For each element at index `i`, store `hashMap.set(value, i)`.\n\n" +
    "### Phase 2 — Look Up the Target (`O(1)`)\n\n" +
    "4. Call `hashMap.get(targetValue)`.\n" +
    "5. If the result is a defined index, the target was found — return the index.\n" +
    "6. Otherwise return `-1`.\n\n" +
    "### Example: Finding 9 in [4, 2, 7, 1, 9, 3, 8, 5]\n\n" +
    "```\n" +
    "Build phase:\n" +
    "  hashMap = { 4→0, 2→1, 7→2, 1→3, 9→4, 3→5, 8→6, 5→7 }\n\n" +
    "Search phase:\n" +
    "  hashMap.get(9) → 4   ✓ found at index 4\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)` build + `O(1)` lookup**\n\n" +
    "- Building the hash map requires a single pass through all `n` elements: `O(n)`.\n" +
    "- Each lookup is O(1) on average due to hash table constant-time access.\n" +
    "- If you search many times for different targets against the same array, the build cost is amortized.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The hash map stores one entry per element, requiring O(n) additional memory. This is the primary trade-off compared to in-place O(1)-space algorithms like binary search.",

  bestAndWorstCase:
    "**Best Case: `O(n)`** — Even if the target is the very first element, the build phase still iterates the entire array to construct the hash map.\n\n" +
    "**Worst Case: `O(n)`** — Building the hash map is always linear regardless of where the target appears. The lookup itself is O(1) in all cases, making the algorithm dominated by the build phase.\n\n" +
    "**Note:** Hash collisions in the underlying hash table can degrade lookup to O(n) in pathological cases, but modern hash maps use strategies like open addressing or chaining to keep average performance at O(1).",

  realWorldUses: [
    "**Database index joins:** Hash joins in query engines build a hash table on one relation then probe it with rows from the other, achieving O(n + m) join performance.",
    "**Caching and memoization:** Looking up previously computed values in constant time using hash maps is a core pattern in dynamic programming.",
    "**Frequency counting:** Building value-to-count maps in a single pass to find duplicates, modes, or anagrams.",
    "**Symbol tables in compilers:** Storing variable names and their memory addresses for O(1) resolution during compilation.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(1) average lookup time after the initial O(n) build phase — extremely fast for repeated searches.",
      "Works on unsorted arrays — no preprocessing sort is required.",
      "Simple and intuitive two-phase structure that maps naturally to many real-world problems.",
    ],
    limitations: [
      "Requires O(n) extra memory for the hash map, which may be prohibitive for very large datasets.",
      "The O(n) build cost makes it inefficient if you only need a single search on a sorted array (binary search is better).",
      "Hash collisions, though rare with good hash functions, can degrade performance to O(n) in worst-case scenarios.",
      "Does not preserve sorted order information — cannot answer range queries efficiently.",
    ],
  },

  whenToUseIt:
    "Use **Hash-Based Search** when you need to search an unsorted array multiple times for different targets, or when you want guaranteed O(1) lookup after paying a one-time O(n) setup cost. It is ideal for frequency analysis, index building, and any scenario where the array is large and searches are frequent.\n\nAvoid it for single searches on sorted arrays where binary search is O(log n) with O(1) space, or when memory is severely constrained.",
};
