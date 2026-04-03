/**
 * Educational content for Library Sort (Gapped Insertion Sort).
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Library Sort. */
export const librarySortEducational: EducationalContent = {
  overview:
    "**Library Sort** (also called **Gapped Insertion Sort**) is an insertion sort variant inspired by how librarians leave shelf gaps between books for future insertions.\n\nInstead of packing elements tightly, Library Sort maintains a **sparse array with intentional gaps** between elements. This dramatically reduces the average number of shifts needed when inserting each new element, allowing `O(n log n)` average-case performance — the same asymptotic behavior as Merge Sort or Quick Sort.",

  howItWorks:
    "Library Sort operates on a **gapped array** — an array roughly twice the size of the input, initialized with `null` gaps.\n\n" +
    "### Step-by-Step Execution\n" +
    "1. **Initialize:** Place the first element at the center of the gapped array.\n" +
    "2. **Find position:** For each new element, use **binary search** on the filled slots to locate the correct insertion position.\n" +
    "3. **Insert:** Slide to the nearest null gap and shift elements into it to open space.\n" +
    "4. **Rebalance:** When the array becomes too dense (over half full), redistribute all filled elements evenly across the gapped array to restore gaps.\n" +
    "5. **Collect:** At the end, read off the non-null elements in order.\n\n" +
    "### Visualizing Library Sort\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    subgraph Gapped Array\n" +
    "    A[null] --- B[12] --- C[null] --- D[25] --- E[null] --- F[34] --- G[null]\n" +
    "    end\n" +
    "    subgraph Insert 22\n" +
    "    H[12] --- I[22] --- J[25] --- K[34]\n" +
    "    end\n" +
    "    style B fill:#14532d,stroke:#22c55e\n" +
    "    style D fill:#14532d,stroke:#22c55e\n" +
    "    style F fill:#14532d,stroke:#22c55e\n" +
    "    style I fill:#1d4ed8,stroke:#3b82f6\n" +
    "```\n\n" +
    "- Gaps act as buffers — inserting `22` between `12` and `25` requires at most one shift instead of potentially `O(n)` shifts.",

  timeAndSpaceComplexity:
    "**Time Complexity:**\n\n" +
    "- **Best Case:** `O(n log n)` — binary search overhead dominates on sparse arrays.\n" +
    "- **Average Case:** `O(n log n)` — gaps reduce shifting; rebalancing is amortized.\n" +
    "- **Worst Case:** `O(n²)` — degenerate inputs can cluster elements, defeating the gap strategy.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "Requires a gapped array approximately 2× the input size (configurable via `gapFactor`).",

  bestAndWorstCase:
    "**Best case** occurs when elements arrive in a distribution that evenly uses the pre-allocated gaps, keeping average shift distances small. In this scenario, Library Sort approaches `O(n log n)` with low constants.\n\n" +
    "**Worst case** occurs when many elements cluster in a small region of the gapped array, filling gaps locally and triggering frequent shifts (or rebalancing). Adversarial inputs can reduce performance to `O(n²)`, similar to standard Insertion Sort.",

  realWorldUses: [
    "**Databases with pre-sorted regions:** Gap-based insertion avoids expensive page splits when inserting into already-ordered segments.",
    "**Text editors with rope data structures:** Maintaining intentional gaps (slack space) between paragraphs reduces re-flow cost during editing.",
    "**Research into cache-efficient sorting:** Library Sort's sparse structure can improve cache locality compared to dense array sorts.",
    "**Educational demonstrations:** Illustrates how data structure padding (gaps) can improve algorithmic efficiency.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**`O(n log n)` average case:** Competitive with comparison-optimal algorithms.",
      "**Stable sort:** Preserves relative order of equal elements.",
      "**Adaptive:** Gaps absorb clustered insertions efficiently.",
    ],
    limitations: [
      "**`O(n)` extra space:** The gapped array requires extra memory proportional to input size.",
      "**Complex implementation:** Gap management and rebalancing add significant code complexity vs. simple insertion sort.",
      "**Worst case `O(n²)`:** Adversarial input distributions defeat the gap strategy.",
      "**Not widely used in practice:** More predictable alternatives like Timsort or Merge Sort are preferred.",
    ],
  },

  whenToUseIt:
    "Use **Library Sort** when you expect elements to arrive in a roughly random distribution and memory overhead is acceptable. Its `O(n log n)` average performance rivals Merge Sort, but with `O(1)` auxiliary space growth per element rather than `O(n)` for a merge buffer.\n\nAvoid it when worst-case performance matters or when memory is tightly constrained — the gapped array nearly doubles memory usage.",
};
