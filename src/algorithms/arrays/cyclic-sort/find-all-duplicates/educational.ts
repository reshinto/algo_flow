import type { EducationalContent } from "@/types";

export const findAllDuplicatesEducational: EducationalContent = {
  overview:
    "**Find All Duplicates** detects every number that appears exactly twice in an array of values `1..n` using **O(n)** time and **O(1)** extra space (excluding the output list).\n\n" +
    'The key insight is that the array values can index back into the array itself. By **negating** the element at index `abs(value) - 1`, we leave a "visited" mark. If that slot is already negative when we revisit, the value is a duplicate.',

  howItWorks:
    "### Sign-Negation Technique\n\n" +
    "For each element at index `i`:\n\n" +
    "1. Compute `mappedIndex = abs(arr[i]) - 1` — this maps value `v` to index `v-1`.\n" +
    "2. If `arr[mappedIndex] < 0` → we have visited this index before → `abs(arr[i])` is a **duplicate**.\n" +
    "3. Otherwise → first visit → negate `arr[mappedIndex]` to mark it as seen.\n\n" +
    "### Trace on `[4, 3, 2, 7, 8, 2, 3, 1]`\n\n" +
    "```\n" +
    "i=0: value=4 → map=3. arr[3]=7 (pos) → negate → arr[3]=-7\n" +
    "i=1: value=3 → map=2. arr[2]=2 (pos) → negate → arr[2]=-2\n" +
    "i=2: value=2 → map=1. arr[1]=3 (pos) → negate → arr[1]=-3\n" +
    "i=3: value=7 → map=6. arr[6]=3 (pos) → negate → arr[6]=-3\n" +
    "i=4: value=8 → map=7. arr[7]=1 (pos) → negate → arr[7]=-1\n" +
    "i=5: value=2 → map=1. arr[1]=-3 (neg) → DUPLICATE: 2\n" +
    "i=6: value=3 → map=2. arr[2]=-2 (neg) → DUPLICATE: 3\n" +
    "i=7: value=1 → map=0. arr[0]=4 (pos) → negate → arr[0]=-4\n" +
    "Result: [2, 3]\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "A single pass through the array. Each element causes exactly one sign check and at most one negation.\n\n" +
    "**Space Complexity: `O(1)` auxiliary** (plus the output list)\n\n" +
    "The negation marks are written into the input array itself; no additional hash set, boolean array, or counter is needed. The output list is proportional to the number of duplicates, not to `n`.",

  bestAndWorstCase:
    "**Best Case: `O(n)`** — All values are unique. One pass with `n` negations, zero duplicates collected.\n\n" +
    "**Worst Case: `O(n)`** — Every value appears exactly twice (maximum duplicates). Still one pass; `n/2` duplicates are collected.\n\n" +
    "**Versus Hash Set:** A hash-set approach also achieves `O(n)` time but uses `O(n)` space. The sign-negation trick exploits the constraint `1 ≤ values ≤ n` to eliminate the auxiliary structure entirely.",

  realWorldUses: [
    "**Data Integrity Checks:** Detecting duplicate IDs in a compact integer-keyed dataset without allocating an extra lookup table.",
    "**Embedded Systems:** Duplicate detection in resource-constrained environments where heap allocation is forbidden.",
    "**Coding Interviews:** A canonical example of the 'use the array as its own index map' technique, appearing widely in competitive programming and FAANG screening.",
    "**Sensor Data Validation:** Identifying repeated readings in a bounded-range sensor stream with minimal overhead.",
    "**Database Deduplication:** In-place flagging of repeated foreign key values during a single-pass ETL scan.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(1) auxiliary space — no hash set, no boolean array, no extra allocation.",
      "Single-pass O(n) — optimal time for this class of problem.",
      "Self-contained: the marking information lives inside the array, requiring no external state.",
    ],
    limitations: [
      "Mutates the input array — values become negative after the pass. The array must be restored if the original values are needed afterward.",
      "Only works when all values are in the range 1..n — falls apart with zeros, negatives, or out-of-range values.",
      "Only catches duplicates that appear exactly twice — if a value appears three or more times, only the second occurrence triggers the found condition.",
    ],
  },

  whenToUseIt:
    "**Use Find All Duplicates when** the problem guarantees values in `1..n`, you need O(1) auxiliary space, and mutating the input is acceptable (or you can restore it afterward).\n\n" +
    "**Prefer a hash set when** values are not bounded to `1..n`, the input must remain unmodified, or values may appear more than twice.\n\n" +
    "**Avoid it** if the array contains any zeros or negative values, as the sign-negation mechanism breaks down.",
};
