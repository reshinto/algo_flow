import type { EducationalContent } from "@/types";

export const containsDuplicateEducational: EducationalContent = {
  overview:
    "**Contains Duplicate** determines whether any value appears more than once in an array. A brute-force double loop checks every pair in `O(n²)`, but a **hash set** reduces it to a single `O(n)` pass.\n\nFor each element, check if it already exists in the set. If it does, a duplicate has been found. If not, insert it and continue.",

  howItWorks:
    "The algorithm maintains a hash set of values seen so far:\n\n" +
    "1. **Check set** — if the current element is already in the set, return `true`.\n" +
    "2. **Insert** — otherwise add the element to the set and move on.\n" +
    "3. **No duplicate** — if the loop ends without a hit, return `false`.\n\n" +
    "### Example: `numbers = [1, 2, 3, 1]`\n\n" +
    "```\n" +
    "elementIndex  current  set lookup        action\n" +
    "     0           1     not found         insert { 1 }\n" +
    "     1           2     not found         insert { 1, 2 }\n" +
    "     2           3     not found         insert { 1, 2, 3 }\n" +
    "     3           1     FOUND!            return true\n" +
    "```\n\n" +
    "The key insight: hash set membership is `O(1)`, so each check is constant time regardless of how many elements have been stored.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "One pass through the array. Each hash set operation (lookup and insert) is `O(1)` amortized, so the total work is linear.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "In the worst case (no duplicate exists) the set holds all `n` elements before returning `false`.",

  bestAndWorstCase:
    "**Best case** — the first two elements are equal: the algorithm returns `true` after just two iterations with `O(1)` space.\n\n" +
    "**Worst case** — no duplicate exists, or the duplicate is the very last element: all `n` elements are inserted before the answer is determined. Time and space are both `O(n)`.",

  realWorldUses: [
    "**Database integrity checks:** Ensuring a column marked UNIQUE contains no repeated values before committing a bulk insert.",
    "**Event deduplication:** Detecting repeated event IDs in a stream to prevent double-processing in messaging systems.",
    "**URL deduplication:** Web crawlers use hash sets to avoid revisiting the same URL twice in a session.",
    "**Username validation:** Checking whether a chosen username already exists in a set of registered accounts in `O(1)` time.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) time — optimal for unsorted input since any algorithm must read all elements to prove no duplicate exists.",
      "Single pass — no sorting or preprocessing needed.",
      "Early exit — returns immediately on the first duplicate found, potentially far before the end of the array.",
    ],
    limitations: [
      "O(n) extra space for the hash set — not in-place.",
      "Reports only existence, not which value is duplicated or how many duplicates exist.",
      "Hash set performance depends on the hash function — pathological inputs can degrade to O(n) per operation.",
    ],
  },

  whenToUseIt:
    "Use a hash set when you need `O(n)` duplicate detection on unsorted data and can afford `O(n)` extra space. If the array may be sorted first, a simple adjacent-comparison pass achieves `O(1)` space. If you need the actual duplicate values or their counts, switch to a hash map.",
};
