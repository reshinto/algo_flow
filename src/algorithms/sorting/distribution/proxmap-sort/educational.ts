/**
 * Educational content for Proxmap Sort.
 * Provides learner-facing explanations, complexity analysis, and usage guidance
 * displayed in the explanation panel during visualization.
 */
import type { EducationalContent } from "@/types";

/** Structured educational material covering all required sections for Proxmap Sort. */
export const proxmapSortEducational: EducationalContent = {
  overview:
    "**Proxmap Sort** (Proximity Map Sort) is a distribution sorting algorithm that computes each element's approximate final position using a linear mapping from value to array index. It was developed by Thomas A. Standish at UC Irvine as a demonstration that sorting can be done in linear average time by leveraging value distribution.\n\nThe core insight: if you know the range of values, you can mathematically predict roughly where each element should land in the sorted array. Elements are inserted near their predicted positions using insertion sort to resolve collisions.",

  howItWorks:
    "Proxmap Sort operates in four phases:\n\n" +
    "### Phase 1: Build the Proxmap (Position Map)\n" +
    "1. Find the minimum and maximum values to establish the range.\n" +
    "2. Compute a scale factor: `scaleFactor = (n-1) / (max - min)`.\n" +
    "3. For each element, compute its **mapped position**: `⌊scaleFactor × (value - min)⌋`.\n" +
    "4. Count how many elements map to each position — this builds the `hitCount` array.\n\n" +
    "### Phase 2: Compute Cluster Start Positions\n" +
    "5. Convert `hitCount` to prefix sums — each position stores where its cluster begins in the output array.\n\n" +
    "### Phase 3: Insert into Output Array\n" +
    "6. For each element, compute its mapped position and find the cluster's current insertion slot.\n" +
    "7. Use **insertion sort within the cluster** to place the element in sorted order among elements already in that cluster.\n" +
    "8. With uniform distribution, each cluster has ~1 element, making insertion trivial.\n\n" +
    "### Phase 4: Copy Back\n" +
    "9. Copy the fully sorted output array back to the original array.\n\n" +
    "### Visualizing Proxmap Sort on [64, 34, 25, 12, 22, 11, 90]\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    "    A[Input: 64 34 25 12 22 11 90] --> B[Scale: 79 range over 7 positions]\n" +
    "    B --> C[Map each element to position]\n" +
    "    C --> D[11 → pos 0, 12 → pos 0, 22 → pos 1]\n" +
    "    C --> E[25 → pos 1, 34 → pos 2, 64 → pos 5, 90 → pos 6]\n" +
    "    D --> F[Cluster 0: insertion sort 11 12]\n" +
    "    E --> G[Other clusters: single elements]\n" +
    "    F --> H[Output: 11 12 22 25 34 64 90]\n" +
    "    G --> H\n" +
    "```\n\n" +
    "- **Scale factor:** `(7-1)/(90-11) = 6/79 ≈ 0.076`\n" +
    "- **11 maps to:** `⌊0.076 × 0⌋ = 0` — cluster 0\n" +
    "- **90 maps to:** `⌊0.076 × 79⌋ = 6` — cluster 6 (last slot)\n" +
    "- **Collision:** 11 and 12 both map to cluster 0 → resolved by insertion sort",

  timeAndSpaceComplexity:
    "**Time Complexity:**\n\n" +
    "- **Best Case:** `O(n)` — uniform distribution, each cluster has exactly one element, no insertion sort work needed.\n" +
    "- **Average Case:** `O(n)` — expected linear time when input values are drawn from a uniform distribution.\n" +
    "- **Worst Case:** `O(n²)` — all elements map to the same cluster (e.g., all identical values), causing insertion sort to perform quadratic work.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "Requires three auxiliary arrays of size `n`: `hitCount`, `startPosition`, and `outputArray`. Unlike in-place algorithms, Proxmap Sort always uses `O(n)` extra memory.",

  bestAndWorstCase:
    "**Best case** is uniformly distributed data where each cluster receives exactly one element. The proxmap phase and insertion phase each take `O(n)` — total `O(n)`.\n\n" +
    "**Worst case** is identical elements or highly clustered data — all elements map to position 0 and insertion sort within that cluster becomes `O(n²)`. Similarly, any input where the distribution deviates significantly from uniform causes cluster imbalance.\n\n" +
    "**Key insight:** Proxmap Sort makes a statistical bet on uniformity. Unlike comparison sorts which are distribution-agnostic, Proxmap Sort's performance is tightly coupled to the input distribution.",

  realWorldUses: [
    "**Academic Research:** Originally designed as a pedagogical demonstration that average-case linear sorting is achievable without radix techniques.",
    "**Scientific Simulation:** Sorting simulation output values (particle positions, temperature readings) that naturally follow uniform distributions over known bounded ranges.",
    "**Database Pre-Sort:** Initial distribution phase for multi-level sort-merge operations where value ranges are known from statistics.",
    "**Computational Geometry:** Sorting point coordinates along an axis as a pre-processing step for spatial data structures when coordinates are uniformly distributed.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Linear average time:** `O(n)` for uniformly distributed data — matches counting sort and radix sort without requiring integer keys.",
      "**Works on any numeric type:** Unlike radix/counting sort, Proxmap Sort works on floating-point values and any comparable numeric type.",
      "**Simple clustering model:** The proxmap construction is easy to understand and visualize.",
    ],
    limitations: [
      "**Distribution-sensitive:** Worst case `O(n²)` for skewed or uniform-clustered inputs.",
      "**Extra space:** Always requires `O(n)` auxiliary arrays — not suitable for in-place requirements.",
      "**Non-stable:** Elements in the same cluster are reordered by insertion sort — relative original order is not preserved.",
      "**Rare in practice:** Outperformed by Timsort for general use and by Counting Sort/Radix Sort for integer keys — mainly of academic interest.",
    ],
  },

  whenToUseIt:
    "Use **Proxmap Sort** when working with floating-point or general numeric data that is **known to be uniformly distributed** over a bounded range, and you need average-case linear performance. It is the right choice when radix/counting sort cannot be applied due to non-integer values.\n\nAvoid it for integer keys (use Counting or Radix Sort instead), skewed distributions, data with many duplicates, or when auxiliary space is constrained. In production code, Timsort is almost always a better choice.",
};
