import type { EducationalContent } from "@/types";

export const countMinSketchEducational: EducationalContent = {
  overview:
    "**Count-Min Sketch** is a probabilistic data structure that estimates the frequency of elements in a data stream using a compact `d × w` counter matrix. It trades a small amount of accuracy for dramatically reduced memory — making it practical for scenarios where exact counts are impossible or unnecessary.\n\n" +
    "Unlike exact counting with hash maps, Count-Min Sketch uses `O(d × w)` space regardless of the number of distinct elements. Frequency queries may slightly overcount (one-sided error), but they **never undercount** — making it safe for use cases that require conservative lower-bound guarantees.",

  howItWorks:
    "**Data Structure:** A `d × w` matrix of integer counters, initialized to zero. `d` is the number of hash functions (depth), `w` is the number of columns (width).\n\n" +
    "**Insert phase — O(d) per element:**\n" +
    "For each element, apply all `d` hash functions to map it to a column index per row. Increment the counter at `[row][col]` for each of the `d` rows.\n\n" +
    "**Query phase — O(d) per query:**\n" +
    "Apply the same `d` hash functions to the query value. Return the **minimum** of the `d` counters. The minimum is used because hash collisions can only add to a counter, never subtract — so the smallest value is the closest estimate.\n\n" +
    "### Example: elements = [3, 3, 7, 7, 7, 11], queries = [3, 7, 11, 5], width = 8, depth = 3\n\n" +
    "```\n" +
    "After inserting all elements:\n" +
    "  matrix[0]: [0, 0, 0, 2, 0, 3, 0, 1]   (row 0 hash results)\n" +
    "  matrix[1]: [0, 3, 2, 0, 0, 0, 0, 1]   (row 1 hash results)\n" +
    "  matrix[2]: [0, 0, 3, 2, 0, 0, 0, 1]   (row 2 hash results)\n" +
    "\n" +
    "Query 7  → min(3, 3, 3) = 3  ✓ (true count: 3)\n" +
    "Query 3  → min(2, 2, 2) = 2  ✓ (true count: 2)\n" +
    "Query 5  → min(0, 0, 0) = 0  → not found (true count: 0)\n" +
    "```\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  EL["insert 7 × 3"]:::input\n' +
    '  ER["insert 3 × 2"]:::input\n' +
    '  R0["row 0: h0(x) → col"]:::current\n' +
    '  R1["row 1: h1(x) → col"]:::current\n' +
    '  R2["row 2: h2(x) → col"]:::current\n' +
    '  Q7["query 7 → min(3,3,3) = 3"]:::result\n' +
    '  Q3["query 3 → min(2,2,2) = 2"]:::result\n' +
    "  EL --> R0 & R1 & R2\n" +
    "  ER --> R0 & R1 & R2\n" +
    "  R0 & R1 & R2 --> Q7 & Q3\n" +
    "  classDef input fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef current fill:#f59e0b,stroke:#d97706\n" +
    "  classDef result fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Each insert increments one counter per row (d=3 rows). A query takes the minimum across all rows to cancel out collisions, returning the closest estimate to the true frequency.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(d)` per operation**\n\n" +
    "- Each insert applies `d` hash functions and performs `d` counter increments.\n" +
    "- Each query applies `d` hash functions and returns the minimum of `d` values.\n" +
    "- For `n` insertions and `q` queries: total time is `O((n + q) × d)`.\n\n" +
    "**Space Complexity: `O(d × w)`**\n\n" +
    "The counter matrix has exactly `d × w` cells. Typical values `d = 3–5` and `w = 1000–100000` keep memory usage far below what an exact hash map would require for high-cardinality streams.",

  bestAndWorstCase:
    "**Best case** — no hash collisions: every element maps to a unique column in every row. All frequency estimates are exact, with zero overcount error.\n\n" +
    "**Worst case** — all elements hash to the same column in every row: every counter is maximally inflated, and all queries return the total stream length. This is adversarial and practically impossible with multiple independent hash functions.\n\n" +
    "**Theoretical error bound:** With `d = ⌈ln(1/δ)⌉` and `w = ⌈e/ε⌉`, the estimated count exceeds the true count by more than `ε × N` (where `N` is total insertions) with probability at most `δ`. Tuning `d` and `w` gives direct control over accuracy vs. memory.",

  realWorldUses: [
    "**Network traffic analysis:** Internet routers use Count-Min Sketch to detect heavy hitters (high-frequency IP flows) in real time without storing per-flow state.",
    "**Database query optimization:** Query planners use frequency sketches to estimate join cardinalities and choose efficient execution plans.",
    "**Anti-spam and DDoS detection:** Count request frequencies per IP, user, or token to flag anomalous traffic patterns without maintaining large exact counters.",
    "**Streaming analytics:** Platforms like Apache Flink and Kafka Streams use probabilistic sketches to count events over high-velocity data streams.",
    "**Ad tech:** Estimating how many times a user or device has seen a given advertisement, within acceptable error tolerances.",
    "**NLP:** Frequency estimation over large corpora for tasks like top-K word counting without storing every unique word in memory.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Sub-linear space — O(d × w) regardless of stream cardinality.",
      "O(d) time per insert and query — extremely fast for high-velocity streams.",
      "One-sided error guarantee — estimated count ≥ true count, so it never undercounts.",
      "Tunable accuracy — increasing d and w reduces error probability and magnitude.",
      "Merge-friendly — two sketches of equal dimensions can be merged by element-wise addition.",
    ],
    limitations: [
      "Cannot return exact counts — queries may overestimate due to hash collisions.",
      "Deletion is not natively supported (requires conservative delete variants like CMS with Min-Heap).",
      "Does not support enumeration of elements — you can query a known key but not discover frequent keys without additional structures.",
      "Error bounds hold in expectation — adversarial inputs can degrade accuracy.",
    ],
  },

  whenToUseIt:
    "Use Count-Min Sketch when you need frequency estimates over a high-cardinality or unbounded stream and exact counts are either impossible or unnecessarily expensive. It is ideal when `O(ε, δ)` accuracy is acceptable and memory is constrained.\n\n" +
    "Prefer an exact hash map when the domain is small or bounded and you need precise counts. For point queries with membership-only semantics (present/absent), a Bloom Filter is more space-efficient. If you also need the identity of top-K frequent elements, pair Count-Min Sketch with a min-heap to maintain the heavy hitters.",
};
