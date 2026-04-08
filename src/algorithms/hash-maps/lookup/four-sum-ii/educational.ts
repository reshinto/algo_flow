import type { EducationalContent } from "@/types";

export const fourSumIIEducational: EducationalContent = {
  overview:
    "**Four Sum II** counts the number of tuples `(i, j, k, l)` such that `A[i] + B[j] + C[k] + D[l] == 0`. The brute-force `O(n⁴)` approach checks every combination, but splitting into two phases with a hash map reduces it to `O(n²)`.\n\nPhase 1 precomputes all `A+B` sums. Phase 2 checks whether `-(C+D)` exists in that map.",

  howItWorks:
    "The algorithm runs in two phases:\n\n" +
    "**Phase 1 — Build the map:**\n" +
    "- Iterate every pair `(a, b)` from arrays A and B.\n" +
    "- Store each `a + b` sum in a hash map with its occurrence count.\n\n" +
    "**Phase 2 — Count matches:**\n" +
    "- Iterate every pair `(c, d)` from arrays C and D.\n" +
    "- Compute `complement = -(c + d)`. If `complement` exists in the map, add its count to the result.\n\n" +
    "### Example: A=[1,2], B=[-2,-1], C=[-1,2], D=[0,2]\n\n" +
    "```\n" +
    "Phase 1 map: { -1:1, 0:1, 1:1 }\n" +
    "  (1+-2)=-1, (1+-1)=0, (2+-2)=0 → 0 count=2, (2+-1)=1\n" +
    "Phase 2:\n" +
    "  (-1+0)=-1 → complement=1 found (count 1) → tuples+=1\n" +
    "  (-1+2)=1  → complement=-1 found (count 1) → tuples+=1\n" +
    "  (2+0)=2   → complement=-2 not found\n" +
    "  (2+2)=4   → complement=-4 not found\n" +
    "Result: 2\n" +
    "```\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["A+B pairs"] -->|enumerate n²| B["map:{-1:1, 0:2, 1:1}"]\n' +
    '  C["C+D pair: (-1+0)=-1"] -->|complement=1| D["found in map (count 1)"]\n' +
    '  E["C+D pair: (-1+2)=1"] -->|complement=-1| F["found in map (count 1)"]\n' +
    '  D --> G["count=2"]\n' +
    "  F --> G\n" +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style C fill:#f59e0b,stroke:#d97706\n" +
    "  style E fill:#f59e0b,stroke:#d97706\n" +
    "  style G fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Phase 1 builds a frequency map of all A+B sums. Phase 2 checks whether each C+D pair's negation exists in that map, accumulating hit counts.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n²)`**\n\n" +
    "Phase 1 iterates `n×n` pairs; Phase 2 does the same. Each hash map operation is `O(1)` amortized.\n\n" +
    "**Space Complexity: `O(n²)`**\n\n" +
    "In the worst case the A+B map holds `n²` distinct sums.",

  bestAndWorstCase:
    "**Best case** — all A+B sums are identical (one map entry). Phase 1 runs in `O(n²)` but Phase 2 is very fast as every lookup hits the same key. Overall still `O(n²)`.\n\n" +
    "**Worst case** — all `n²` A+B sums are distinct and no C+D pair finds a complement. The map holds `n²` entries and all lookups miss. Time `O(n²)`, space `O(n²)`.",

  realWorldUses: [
    "**Scientific computing:** Finding four-element combinations that cancel to zero (e.g., particle physics balance equations).",
    "**Financial analytics:** Detecting four transactions across four ledgers that net to zero for fraud detection.",
    "**Combinatorial search:** Enumerating zero-sum subsets in split datasets where full cross-product evaluation is prohibitive.",
    "**Database joins:** The two-phase strategy mirrors hash-join algorithms used in query optimizers.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n²) time — massively better than O(n⁴) brute force for large n.",
      "Counts all valid tuples, not just the first.",
      "Phase split generalizes to any k-sum problem where k is even.",
    ],
    limitations: [
      "O(n²) space for the map — can be large when n is in the thousands.",
      "Only works for four separate arrays; single-array 4-sum requires a different approach.",
      "Hash map with many collisions degrades to O(n²) per lookup in adversarial cases.",
    ],
  },

  whenToUseIt:
    "Use this two-phase hash map strategy whenever you have four separate input arrays and need all zero-sum quadruples in better than `O(n⁴)`. If the arrays are the same or overlap, adapt by ensuring index uniqueness. For three arrays, a similar `O(n²)` approach works by pairing two into a map and linear-scanning the third.",
};
