/**
 * Educational content for Strand Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Strand Sort. */
export const strandSortEducational: EducationalContent = {
  overview:
    "**Strand Sort** is a comparison-based sorting algorithm that works by **repeatedly extracting sorted sublists** (called strands) from the unsorted input, then merging each strand into a growing sorted output.\n\nIt is particularly efficient on data that already has many natural ascending sequences, achieving O(n) performance on already-sorted input. The name comes from the metaphor of 'pulling strands' of sorted data out of a tangled collection.",

  howItWorks:
    "Strand Sort repeats two operations until the input is empty:\n\n" +
    "### Step 1: Extract a Strand\n" +
    "1. Start a new strand with the first element of the remaining input.\n" +
    "2. Walk through the remaining elements left to right.\n" +
    "3. If the current element is ≥ the last element added to the strand, add it to the strand.\n" +
    "4. Otherwise, leave it in the remaining input (it goes to the next strand).\n" +
    "5. Each strand is a sorted subsequence of the original input.\n\n" +
    "### Step 2: Merge Strand into Output\n" +
    "1. Merge the extracted strand with the current output array using a standard two-pointer merge.\n" +
    "2. The output grows with each pass.\n\n" +
    "### Visualizing Strand Sort on [3, 1, 4, 2, 5]\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    '    A["Input: [3,1,4,2,5]"] --> B["Strand 1: [3,4,5], Leftover: [1,2]"]\n' +
    '    B --> C["Output after merge: [3,4,5]"]\n' +
    '    C --> D["Strand 2: [1,2], Leftover: []"]\n' +
    '    D --> E["Merge [3,4,5] + [1,2] → [1,2,3,4,5]"]\n' +
    "    style E fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "- **Pass 1:** Extract `[3, 4, 5]` (ascending), leftover `[1, 2]`. Output = `[3, 4, 5]`.\n" +
    "- **Pass 2:** Extract `[1, 2]` (ascending), leftover `[]`. Merge → `[1, 2, 3, 4, 5]`.",

  timeAndSpaceComplexity:
    "**Time Complexity**\n\n" +
    "- **Best Case: `O(n)`** — when the input is already sorted, one strand covers the entire array; a single pass and merge completes the sort.\n" +
    "- **Average Case: `O(n√n)`** — for random input, expected √n passes are needed, each requiring O(n) work.\n" +
    "- **Worst Case: `O(n²)`** — on reverse-sorted input, each pass extracts only one element (every element breaks the ascending sequence), resulting in n passes of O(n) merge work.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "Strand Sort requires O(n) extra space for the strand list and the output array. The remaining input is maintained in-place by filtering out strand elements.",

  bestAndWorstCase:
    "**Best Case (`O(n)`):** A fully sorted array produces exactly one strand covering all elements. The merge with an empty output is O(n), and no further passes are needed. This is the optimal behavior, matching linear scan algorithms.\n\n" +
    "**Worst Case (`O(n²)`):** A reverse-sorted array (e.g., `[5, 4, 3, 2, 1]`) produces n strands of size 1. Each merge operation must compare against the growing output, summing to 1 + 2 + 3 + … + n = O(n²) total work.",

  realWorldUses: [
    "**Nearly-sorted data streams:** Useful when data arrives in mostly-sorted order with occasional out-of-place elements, as each pass extracts long strands efficiently.",
    "**Online data processing:** Strand Sort can work incrementally — each extracted strand can be merged into a growing result list as data arrives.",
    "**Linked list sorting:** Strand Sort is naturally suited to linked lists, where extracting elements by relinking nodes avoids shifting overhead.",
    "**Database query optimization:** The concept of extracting sorted runs and merging them is the foundation of external merge sort used in database systems.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Adaptive:** O(n) best case on sorted or nearly-sorted data.",
      "**Simple conceptually:** The 'extract a strand, merge it' pattern is easy to explain and visualize.",
      "**Stable:** Elements within a strand maintain their relative order, and the merge is stable.",
      "**Natural run exploitation:** Automatically benefits from pre-existing sorted subsequences in the input.",
    ],
    limitations: [
      "**O(n²) worst case:** Reverse-sorted input causes maximum passes, each contributing O(n) merge work.",
      "**Extra space:** Requires O(n) auxiliary memory for the strand and output arrays.",
      "**Inefficient for random data:** The O(n√n) average case is worse than O(n log n) algorithms like Merge Sort.",
      "**Not commonly used in production:** Tim Sort handles natural runs more efficiently with a more sophisticated run detection and merging strategy.",
    ],
  },

  whenToUseIt:
    "Use **Strand Sort** when your input is expected to be **nearly sorted** or contains many long ascending subsequences, and memory allows O(n) auxiliary space. It shines on linked lists where strand extraction is cheap (pointer relinking rather than array shifting).\n\nAvoid it for random or reverse-sorted data where its O(n²) worst case becomes a liability — prefer Tim Sort or Merge Sort for general-purpose sorting.",
};
