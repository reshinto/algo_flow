/**
 * Educational content for Block Sort (WikiSort).
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Block Sort. */
export const blockSortEducational: EducationalContent = {
  overview:
    "**Block Sort** (also called WikiSort) is an **in-place stable merge sort** invented by Kim Walisch and Cphases Ching in 2014. It merges adjacent sorted runs without requiring any extra memory by using a clever **rotation-based merge** strategy.\n\nUnlike standard merge sort which needs O(n) auxiliary space, Block Sort achieves O(1) extra space while maintaining stability (equal elements preserve their original order).",

  howItWorks:
    "Block Sort operates in two main phases:\n\n" +
    "### Phase 1: Find Natural Runs\n" +
    "1. Scan the array once from left to right.\n" +
    "2. When a descent is found (element smaller than previous), record the end of the current run.\n" +
    "3. Build a list of `[start, end]` run boundaries.\n\n" +
    "### Phase 2: Merge Adjacent Runs (Bottom-Up)\n" +
    "1. Pair adjacent runs and merge each pair into a longer sorted run.\n" +
    "2. Repeat until only one run covers the entire array.\n" +
    "3. Each merge is performed **in-place** using rotation:\n" +
    "   - Find the first element on the right that belongs before the current left pointer.\n" +
    "   - Rotate that segment to move right-run elements into position.\n\n" +
    "### Rotation-Based In-Place Merge\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '    A["Left run: [1, 4, 6]"] --> B["Right run: [2, 3, 5]"]\n' +
    '    B --> C["Compare 4 vs 2: rotate [4,6,2] → [2,4,6]"]\n' +
    '    C --> D["Compare 4 vs 3: rotate [4,6,3] → [3,4,6]"]\n' +
    '    D --> E["Merged: [1,2,3,4,6,5]..."] --> F["Final: [1,2,3,4,5,6]"]\n' +
    "    style F fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "The rotation is implemented by swapping elements between the left and right boundaries of the segment that needs to be brought forward.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n log n)`**\n\n" +
    "- **Best Case:** `O(n)` — when the input is already sorted, only one pass to discover the single run is needed; no merges occur.\n" +
    "- **Average Case:** `O(n log n)` — logarithmic number of merge passes, each O(n).\n" +
    "- **Worst Case:** `O(n log n)` — fully reverse-sorted array produces n single-element runs, requiring log(n) merge passes.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Block Sort performs all operations in-place. The rotation-based merge uses only a constant number of extra variables (pointers and a temporary swap variable), regardless of input size.",

  bestAndWorstCase:
    "**Best Case (`O(n)`):** A fully sorted array is discovered as a single natural run in one linear scan. No merge phase is triggered. This is identical to Tim Sort's behavior on sorted data.\n\n" +
    "**Worst Case (`O(n log n)`):** A strictly reverse-sorted array produces n single-element runs. Each element must participate in O(log n) merge rounds, each requiring O(n) total work across all merges in that round.\n\n" +
    "The **rotation cost** is the key trade-off: each rotation step is O(k) where k is the length of the rotated segment, but the total rotation work across all merges in a single pass is bounded by O(n).",

  realWorldUses: [
    "**Memory-constrained sorting:** Embedded systems or devices with no heap allocator benefit from the O(1) space guarantee combined with stable sorting.",
    "**Database merge operations:** Merging sorted pages of records without extra buffer allocation uses exactly this pattern.",
    "**File system sorting:** When sorting large files on disk with limited RAM, an in-place merge avoids temporary file creation.",
    "**Real-world libraries:** A variant of Block Sort is used in the Rust standard library's sort implementation for its stability and memory efficiency guarantees.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**O(1) auxiliary space:** True in-place stable sort — no extra arrays needed.",
      "**Stable:** Preserves relative order of equal elements, critical for multi-key sorting.",
      "**Adaptive:** Naturally exploits existing sorted runs in the input (similar to Tim Sort).",
      "**O(n log n) worst case:** Guaranteed performance regardless of input order.",
    ],
    limitations: [
      "**Complex implementation:** Rotation-based merging is significantly harder to implement correctly than standard merge sort.",
      "**Higher constant factor:** Each merge operation does more work per comparison than auxiliary-memory merge sort.",
      "**Cache behavior:** Non-sequential rotation accesses can cause cache misses on large arrays.",
      "**Not commonly taught:** Despite production use in Rust, Block Sort remains obscure in academic curricula.",
    ],
  },

  whenToUseIt:
    "Use **Block Sort** when you need a **stable, in-place sort** with O(n log n) worst-case performance and O(1) space. It is the ideal algorithm when memory allocation is prohibited or extremely expensive, and data stability (preserving equal-element order) is required.\n\nAvoid it when simplicity of implementation is important (use Merge Sort), when you have O(n) space available and need maximum throughput (Tim Sort will outperform it), or when the data is small (Insertion Sort is simpler and faster for tiny arrays).",
};
