import type { EducationalContent } from "@/types";

export const moveZerosEducational: EducationalContent = {
  overview:
    "**Move Zeros to End** is an array manipulation technique that repositions all zero values to the tail of the array while preserving the relative order of all non-zero elements.\n\n" +
    "The algorithm uses a **two-pointer** approach: a *write pointer* anchors the next available slot for a non-zero element, while a *read pointer* scans every element. When the read pointer finds a non-zero, it swaps that value into the write pointer position and advances both pointers. Zero elements are naturally pushed to the back as non-zeros fill the front.",

  howItWorks:
    "1. Initialize `writePointer = 0` and begin scanning from the start of the array.\n" +
    "2. For each element at `readPointer`:\n" +
    "   - If the element **is non-zero**, swap it with the element at `writePointer`, then advance `writePointer`.\n" +
    "   - If the element **is zero**, advance only `readPointer` — the write pointer stays put.\n" +
    "3. After one full pass, all non-zero elements occupy indices `0` through `writePointer - 1` in their original relative order, and zeros fill the remaining positions.\n\n" +
    "### Two-Pointer Trace (`[0, 1, 0, 3, 12]`)\n\n" +
    "```\n" +
    "Step 1: read=0 (0)   → zero, skip\n" +
    "Step 2: read=1 (1)   → non-zero, swap with write=0 → [1, 0, 0, 3, 12], write=1\n" +
    "Step 3: read=2 (0)   → zero, skip\n" +
    "Step 4: read=3 (3)   → non-zero, swap with write=1 → [1, 3, 0, 0, 12], write=2\n" +
    "Step 5: read=4 (12)  → non-zero, swap with write=2 → [1, 3, 12, 0, 0], write=3\n" +
    "Result: [1, 3, 12, 0, 0]\n" +
    "```\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["0"] --> B["1"] --> C["0"] --> D["3"] --> E["12"]\n' +
    '  B -->|"swap→write=0"| F["1"]\n' +
    '  D -->|"swap→write=1"| G["3"]\n' +
    '  E -->|"swap→write=2"| H["12"]\n' +
    '  F --> G --> H --> I["0"] --> J["0"]\n' +
    "  style A fill:#f59e0b,stroke:#d97706\n" +
    "  style C fill:#f59e0b,stroke:#d97706\n" +
    "  style B fill:#06b6d4,stroke:#0891b2\n" +
    "  style D fill:#06b6d4,stroke:#0891b2\n" +
    "  style E fill:#06b6d4,stroke:#0891b2\n" +
    "  style F fill:#14532d,stroke:#22c55e\n" +
    "  style G fill:#14532d,stroke:#22c55e\n" +
    "  style H fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Zeros (amber) are skipped by the read pointer; non-zeros (cyan) are swapped into the write pointer position. The result (green) has all non-zeros compacted at the front with zeros pushed to the tail.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "- **Best / Average / Worst Case:** `O(n)` — Both pointers traverse the array at most once, regardless of the distribution of zeros.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "All swaps are performed in-place. Only two integer pointer variables are maintained alongside the input array — no auxiliary data structures are needed.",

  bestAndWorstCase:
    "**Best Case — `O(n)`:** The array contains no zeros. The write pointer matches the read pointer at every step, so no actual swaps occur. The algorithm still scans all `n` elements to verify this, but swap overhead is zero.\n\n" +
    "**Worst Case — `O(n)`:** Every element is zero (or all zeros precede all non-zeros). Every non-zero swap requires writing to the front of the array. The time complexity remains `O(n)` since only one pass occurs, but the maximum number of swap operations is performed.\n\n" +
    "Unlike sorts, time complexity does not change with input distribution — the pointer scan is unconditional.",

  realWorldUses: [
    "**Sparse Data Cleaning:** Pre-processing sensor readings or feature vectors where zero entries represent missing data — consolidating non-missing values before downstream analysis.",
    "**Memory Compaction:** Operating system or virtual machine GC-style compaction that relocates live objects to the front of a memory region, leaving free space contiguous at the end.",
    "**Signal Processing:** Removing silent samples (zero amplitude) from an audio buffer to densify useful signal data for compression or analysis.",
    "**Database Null Handling:** Rearranging nullable columns in a row-store so non-null values cluster together, improving column-scan performance.",
    "**Game Development:** Packing active entities toward the front of an entity array so update loops can break early when they encounter the first inactive (zero) slot.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Single-pass `O(n)` time with `O(1)` extra space — optimal for in-place rearrangement.",
      "Preserves the relative order of all non-zero elements, making it stable.",
      "Simple implementation with two integer variables and a single loop.",
      "Works well as a pre-processing step before other algorithms that assume no zeros.",
    ],
    limitations: [
      "Requires a mutable array — cannot be applied to immutable or read-only sequences without copying first.",
      "Specific to zero values; generalizing to an arbitrary sentinel requires a minor predicate change but is not built in.",
      "Does not deduplicate, sort, or handle multi-dimensional structures without modification.",
    ],
  },

  whenToUseIt:
    "Reach for **Move Zeros** when you need to partition an array in-place so that elements matching a specific value (often zero) migrate to one end while all other elements maintain their original relative order — and you have `O(1)` space budget.\n\n" +
    "If you instead need a general partition (e.g., negative/positive split or odd/even split) without the zero-specific constraint, the same two-pointer swap pattern applies with a different predicate. If order does not need to be preserved, a simpler overwrite variant (no swap) can be used.",
};
