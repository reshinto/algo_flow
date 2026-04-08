import type { EducationalContent } from "@/types";

export const setComplementEducational: EducationalContent = {
  overview:
    "**Set Complement** finds all elements in a universal set U that do **not** belong to set A. Mathematically written as U \\ A (or A\u1d9c relative to U), the complement answers the question: 'what is everything in the universe that A does **not** cover?'\n\n" +
    "The algorithm uses a **hash set** built from A so that each membership test against U costs `O(1)`, giving an overall runtime of `O(n + u)` where n = |A| and u = |U|.",

  howItWorks:
    "**Phase 1 — Build the hash set** `O(n)`:\n\n" +
    "Insert every element of array A into a hash set. Each insertion is `O(1)` amortized.\n\n" +
    "**Phase 2 — Scan the universal set** `O(u)`:\n\n" +
    "Iterate over universalSet. For each element:\n" +
    "- `hashSet.has(value)` — `O(1)` membership check\n" +
    "- If **found in A**: skip (it is in A, so not in the complement)\n" +
    "- If **not found in A**: add to result (it belongs to the complement)\n\n" +
    "### Example: A = [2, 4, 6], U = [1, 2, 3, 4, 5, 6, 7, 8]\n\n" +
    "```\n" +
    "Phase 1 → hash set: {2, 4, 6}\n" +
    "\n" +
    "Phase 2:\n" +
    "  U[0]=1  → not in A → result: [1]\n" +
    "  U[1]=2  → in A     → skip\n" +
    "  U[2]=3  → not in A → result: [1, 3]\n" +
    "  U[3]=4  → in A     → skip\n" +
    "  U[4]=5  → not in A → result: [1, 3, 5]\n" +
    "  U[5]=6  → in A     → skip\n" +
    "  U[6]=7  → not in A → result: [1, 3, 5, 7]\n" +
    "  U[7]=8  → not in A → result: [1, 3, 5, 7, 8]\n" +
    "```\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  subgraph A["Set A"]\n' +
    '    a1["2"]:::input\n' +
    '    a2["4"]:::input\n' +
    '    a3["6"]:::input\n' +
    "  end\n" +
    '  subgraph U["Universal Set U"]\n' +
    '    u1["1"]:::start\n' +
    '    u2["2"]:::excluded\n' +
    '    u3["3"]:::start\n' +
    '    u4["4"]:::excluded\n' +
    '    u5["5"]:::start\n' +
    "  end\n" +
    '  subgraph R["Complement U \\\\ A"]\n' +
    '    r1["1"]:::result\n' +
    '    r2["3"]:::result\n' +
    '    r3["5"]:::result\n' +
    "  end\n" +
    "  U --> R\n" +
    "  A -. skip .-> R\n" +
    "  classDef input fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef start fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef excluded fill:#f59e0b,stroke:#d97706\n" +
    "  classDef result fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Elements in A (amber) are skipped; elements in U but not in A (cyan input) pass through to the complement result (green).",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n + u)`**\n\n" +
    "- Phase 1: `O(n)` — one pass over array A, each insertion `O(1)` amortized.\n" +
    "- Phase 2: `O(u)` — one pass over the universal set, each lookup `O(1)` amortized.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The hash set holds at most `n` elements (the size of array A). The result can be as large as `u - n` in the worst case, but output space is generally not counted in the space complexity.",

  bestAndWorstCase:
    "**Best case** — A = U (A contains every element in U): the complement is empty. All elements are found in the hash set and skipped, but all `u` elements of U must still be visited: `O(n + u)`.\n\n" +
    "**Worst case** — A and U are disjoint: every element of U is added to the result. All `u` elements pass the membership check and are collected: still `O(n + u)`.\n\n" +
    "The hash set approach has no best/worst-case divergence in terms of asymptotic complexity.",

  realWorldUses: [
    "**Access revocation:** Given the set of all users and the set of active users, the complement yields all revoked or inactive accounts.",
    "**Network security:** Given all known IP addresses and a blocklist, the complement identifies permitted addresses.",
    "**Content recommendation:** Given all available items and a user's already-seen items, the complement is the candidate recommendation pool.",
    "**Database NOT IN queries:** SQL `WHERE id NOT IN (subquery)` is logically a complement operation.",
    "**Set-based testing:** Given all test cases and those already passed, the complement reveals remaining failures.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n + u) time — faster than sorting-based approaches when inputs are unsorted.",
      "Single pass over each input — no nested loops or repeated scanning.",
      "Simple two-phase structure makes the algorithm easy to reason about and implement.",
    ],
    limitations: [
      "Requires an explicit universal set — the domain must be finite and enumerated.",
      "O(n) extra space for the hash set — not in-place.",
      "If A and U are both sorted, a two-pointer merge achieves O(n + u) time with O(1) extra space.",
    ],
  },

  whenToUseIt:
    "Use set complement when you have an explicit finite universal set and need to find everything outside of A. If the universal set is very large but sparse relative to A, consider bit-array representations for `O(1)` space per element. If both inputs are sorted, prefer a two-pointer scan to avoid the hash set overhead. When the universal set is implicit (e.g., all non-negative integers), represent the result as a logical negation rather than materialising all elements.",
};
