import type { EducationalContent } from "@/types";

export const setCoverEducational: EducationalContent = {
  overview:
    "**Set Cover** is one of the classic NP-hard combinatorial optimization problems. " +
    "Given a universe `U` of `n` elements and a collection of subsets `S₁, S₂, …, Sₘ`, " +
    "the goal is to find the smallest sub-collection of sets whose union equals `U`.\n\n" +
    "Because the optimal solution requires checking all 2^m subset combinations, exact algorithms are infeasible " +
    "for large inputs. The **greedy approximation** solves this in polynomial time by always selecting the set " +
    "that covers the most currently uncovered elements. " +
    "This greedy strategy is provably near-optimal: it guarantees a solution within a factor of `ln(n) + 1` of the optimum.",

  howItWorks:
    "**Greedy Strategy — one round at a time:**\n\n" +
    "1. Start with an `uncovered` set containing every element of the universe.\n" +
    "2. In each round, scan every available subset and count how many uncovered elements it contains.\n" +
    "3. Select the subset with the highest count (`bestSetIdx`) and add it to the solution.\n" +
    "4. Remove all elements of the chosen subset from `uncovered`.\n" +
    "5. Repeat until `uncovered` is empty.\n\n" +
    "### Example: U = {1,2,3,4,5,6,7,8}, S = [{1,2,3}, {2,4}, {3,4,5}, {5,6,7}, {6,7,8}]\n\n" +
    "```\n" +
    "Round 1: evaluate all sets\n" +
    "  S0={1,2,3} covers 3  ← best\n" +
    "  S1={2,4}   covers 2\n" +
    "  S2={3,4,5} covers 3\n" +
    "  S3={5,6,7} covers 3\n" +
    "  S4={6,7,8} covers 3\n" +
    "  → select S0, uncovered = {4,5,6,7,8}\n\n" +
    "Round 2: evaluate remaining coverage\n" +
    "  S2={3,4,5} covers 2\n" +
    "  S3={5,6,7} covers 3  ← best\n" +
    "  S4={6,7,8} covers 3\n" +
    "  → select S3, uncovered = {4,5,8}\n\n" +
    "Round 3:\n" +
    "  S2={3,4,5} covers 2  ← best\n" +
    "  S4={6,7,8} covers 1\n" +
    "  → select S2, uncovered = {8}\n\n" +
    "Round 4:\n" +
    "  S4={6,7,8} covers 1  ← best\n" +
    "  → select S4, uncovered = {}\n\n" +
    "Result: 4 sets selected — [S0, S3, S2, S4]\n" +
    "```\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  subgraph U["Universe U = {1..8}"]\n' +
    '    u1["uncovered: {1..8}"]:::input\n' +
    "  end\n" +
    '  subgraph Rounds["Greedy Selection"]\n' +
    '    r1["R1: S0={1,2,3} covers 3"]:::excluded\n' +
    '    r2["R2: S3={5,6,7} covers 3"]:::excluded\n' +
    '    r3["R3: S2={3,4,5} covers 2"]:::excluded\n' +
    '    r4["R4: S4={6,7,8} covers 1"]:::excluded\n' +
    "  end\n" +
    '  subgraph R["Solution"]\n' +
    '    res["[S0, S3, S2, S4]"]:::result\n' +
    "  end\n" +
    "  U --> Rounds\n" +
    "  Rounds --> R\n" +
    "  classDef input fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef excluded fill:#f59e0b,stroke:#d97706\n" +
    "  classDef result fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Each greedy round (amber) picks the set with the highest remaining coverage. After 4 rounds the universe is fully covered and the selected sets (green) form the approximate minimum cover.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n × m)`**\n\n" +
    "- Each round evaluates all `m` subsets, and each evaluation scans the elements of a subset against the `uncovered` hash set in `O(1)` per lookup.\n" +
    "- There can be at most `n` rounds (one element removed per round in the worst case).\n" +
    "- Combined: `O(n × m)` for the outer while-loop over evaluate steps.\n\n" +
    "**Space Complexity: `O(n + m)`**\n\n" +
    "- `O(n)` for the `uncovered` hash set tracking remaining elements.\n" +
    "- `O(m)` for storing the selected set indices and references.\n\n" +
    "The **approximation ratio** is `H(n) ≈ ln(n) + 1`, where `H(n)` is the `n`-th harmonic number. " +
    "No polynomial-time algorithm can do better unless P = NP.",

  bestAndWorstCase:
    "**Best case** — one set covers the entire universe: a single evaluation round finds the universal set, " +
    "selects it immediately, and terminates. Runtime is `O(m)` (one pass over all sets).\n\n" +
    "**Worst case** — each round covers only one additional element: `n` full evaluation rounds are needed, " +
    "giving `O(n × m)` total comparisons. This happens when every set has significant overlap and the greedy " +
    "selection shrinks uncovered by just one element per round.\n\n" +
    "Note: unlike exact algorithms whose worst case is `O(2^m × n)`, the greedy bound of `O(n × m)` is always polynomial, " +
    "making it practical for large instances where the optimal solution is intractable.",

  realWorldUses: [
    "**Network monitoring:** Selecting the minimum set of network nodes to monitor so that every link is observed by at least one sensor.",
    "**Test suite minimization:** Choosing the fewest test cases from a suite that still exercise every code branch or requirement.",
    "**Facility location:** Deciding which warehouses or fire stations to open so that every city is within service range.",
    "**Genome sequencing:** Identifying the smallest probe set that hybridizes to all target DNA sequences in microarray design.",
    "**Ad targeting:** Selecting the minimum number of audience segments that together reach every target demographic.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Polynomial time O(n × m) — tractable for inputs where exact methods are impossible.",
      "Provably near-optimal — guaranteed within ln(n)+1 factor of the optimum solution.",
      "Simple to implement and understand — no complex data structures required.",
      "Works on any collection of subsets without requiring sorted input or special structure.",
    ],
    limitations: [
      "Does not guarantee the optimal (minimum) number of sets — only an approximation.",
      "The ln(n)+1 approximation factor grows with universe size, so quality degrades for very large universes.",
      "Re-evaluating all sets each round is wasteful when the number of sets is large — priority queues can reduce this to O(m log n).",
      "Ties in coverage are broken arbitrarily (first-found), which can affect the specific sets chosen even if the count is similar.",
    ],
  },

  whenToUseIt:
    "Use greedy set cover when you need a good-enough coverage solution quickly and the problem size makes " +
    "exact combinatorial search infeasible. It is the right choice when:\n\n" +
    "- The universe and set collection are too large for exhaustive enumeration (m > 20).\n" +
    "- An approximation within `ln(n) + 1` times optimal is acceptable.\n" +
    "- You need a simple, auditable algorithm without complex overhead.\n\n" +
    "Avoid it when optimality is mandatory — use integer linear programming (ILP) or branch-and-bound for exact solutions on small inputs. " +
    "If the sets have special structure (e.g., intervals on a line), polynomial exact algorithms may exist for that restricted case.",
};
