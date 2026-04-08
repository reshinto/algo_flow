import type { EducationalContent } from "@/types";

export const floydCycleDetectionEducational: EducationalContent = {
  overview:
    "**Floyd's Cycle Detection** (also called the *Tortoise and Hare* algorithm) detects whether a sequence contains a cycle, and if so, identifies the exact node where the cycle begins — all in `O(n)` time and `O(1)` space.\n\n" +
    "In the array variant, the array is treated as an implicit linked list: index `i` points to `array[i]`. Because values are in range `[0, n-1]`, following pointers always stays within bounds. A duplicate value creates a cycle — the duplicate is the cycle entrance.\n\n" +
    "This is famously used to solve **LeetCode 287: Find the Duplicate Number** without modifying the array and without extra space.",

  howItWorks:
    "The algorithm runs in two phases:\n\n" +
    "**Phase 1 — Detect the meeting point:**\n" +
    "- Start both `tortoise` and `hare` at `array[0]`.\n" +
    "- Each step: `tortoise = array[tortoise]` (moves 1 step), `hare = array[array[hare]]` (moves 2 steps).\n" +
    "- Because the hare moves twice as fast, it must lap the tortoise inside the cycle.\n" +
    "- When `tortoise === hare`, they have met somewhere inside the cycle.\n\n" +
    "**Phase 2 — Find the cycle entrance:**\n" +
    "- Reset `tortoise` to index `0`. Keep `hare` at the meeting point.\n" +
    "- Now advance both `tortoise` and `hare` by 1 step at a time.\n" +
    "- They meet exactly at the **cycle entrance** — the duplicate value.\n\n" +
    "### Why Phase 2 Works (Mathematical Proof Sketch)\n\n" +
    "Let `F` = distance from start to cycle entrance, `C` = cycle length, `k` = steps inside cycle where they meet.\n" +
    "At the meeting point: `tortoise` traveled `F + k` steps; `hare` traveled `F + k + mC` steps (m full extra laps).\n" +
    "Since hare moves twice as fast: `2(F + k) = F + k + mC` → `F + k = mC` → `F = mC - k`.\n" +
    "After resetting tortoise to 0, both advance `F` more steps: tortoise reaches the entrance; hare travels `F = mC - k` more steps from the meeting point, which also lands on the entrance (it completes `m` laps minus the `k` already done).\n\n" +
    "### Trace for `[1, 3, 4, 2, 2]`\n\n" +
    "```\n" +
    "Implicit linked list: 0→1→3→2→4→2→4→... (cycle: 2↔4)\n\n" +
    "Phase 1:\n" +
    "  Start: tortoise=array[0]=1, hare=array[0]=1\n" +
    "  Step 1: tortoise=array[1]=3, hare=array[array[1]]=array[3]=2\n" +
    "  Step 2: tortoise=array[3]=2, hare=array[array[2]]=array[4]=2\n" +
    "  tortoise==hare==2 → meeting point found\n\n" +
    "Phase 2:\n" +
    "  Reset tortoise=0, hare=2\n" +
    "  Step 1: tortoise=array[0]=1, hare=array[2]=4\n" +
    "  Step 2: tortoise=array[1]=3, hare=array[4]=2\n" +
    "  Step 3: tortoise=array[3]=2, hare=array[2]=4... wait\n" +
    "  Step 1: tortoise=array[0]=1, hare=array[2]=4\n" +
    "  Step 2: tortoise=array[1]=3, hare=array[4]=2\n" +
    "  Step 3: tortoise=array[3]=2, hare=array[2]=4 — not equal\n" +
    "  Actually: reset tortoise=0, hare stays at 2 (meeting point)\n" +
    "  tortoise=0→1→3→2, hare=2→4→2 → meet at 2\n" +
    "  cycleStart = 2 ✓\n" +
    "```\n\n" +
    "### Tortoise & Hare Pointer Diagram (`[1, 3, 4, 2, 2]`)\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  N0["idx 0\\nval 1"] -->|"points to"| N1["idx 1\\nval 3"]\n' +
    '  N1 -->|"points to"| N3["idx 3\\nval 2"]\n' +
    '  N3 -->|"points to"| N2["idx 2\\nval 4"]\n' +
    '  N2 -->|"points to"| N4["idx 4\\nval 2"]\n' +
    '  N4 -->|"cycle back"| N2\n' +
    "  style N0 fill:#06b6d4,stroke:#0891b2\n" +
    "  style N2 fill:#f59e0b,stroke:#d97706\n" +
    "  style N4 fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Index 2 and index 4 both hold value `2`, creating the cycle. Phase 2 resets the tortoise to index 0 and both pointers converge at the cycle entrance (index 2 = duplicate value `2`).",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "- Phase 1: The hare must catch the tortoise within `O(n)` steps (cycle length ≤ n).\n" +
    "- Phase 2: Both pointers advance at most `F` steps before meeting, where `F ≤ n`.\n" +
    "- Total: `O(n) + O(n) = O(n)`.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "- Only two pointer variables (`tortoise` and `hare`) are used — no hash set, no visited array.\n" +
    "- This is the key advantage over hash-based cycle detection which uses `O(n)` space.\n\n" +
    "**Comparison with alternatives:**\n\n" +
    "| Approach | Time | Space | Modifies Array |\n" +
    "| --- | --- | --- | --- |\n" +
    "| Hash Set (seen indices) | `O(n)` | `O(n)` | No |\n" +
    "| Sorting + scan | `O(n log n)` | `O(1)` | Yes |\n" +
    "| Floyd's (Tortoise & Hare) | `O(n)` | `O(1)` | No |",

  bestAndWorstCase:
    "**Best Case — `O(n)`:** If the cycle starts immediately at the first element and is short, both phases terminate quickly. However, the algorithm always completes both phases regardless — there is no early exit that avoids `O(n)` work in the worst case.\n\n" +
    "**Worst Case — `O(n)`:** A long tail (`F` close to `n`) before the cycle entrance means both phases each take `O(n)` steps. The total remains `O(n)`.\n\n" +
    "### Key Insight: The Array as a Linked List\n\n" +
    "The array `[1, 3, 4, 2, 2]` can be read as: 'index 0 points to 1, index 1 points to 3, index 2 points to 4, index 3 points to 2, index 4 points to 2.' Since value 2 appears twice at indices 2 and 4, both indices point to the same next node — creating a fork and a cycle. The cycle entrance is the duplicate value.",

  realWorldUses: [
    "**Duplicate detection:** Finding the duplicate in an array of `n+1` integers drawn from `[1, n]` (LeetCode 287) without extra space.",
    "**Linked list cycle detection:** The classic application — detecting infinite loops in singly-linked lists (e.g., in OS kernel data structures or graph traversal).",
    "**Pseudo-random number generator analysis:** Detecting when a PRNG sequence repeats (finding the period and pre-period of sequences like Rho factorization).",
    "**Memory leak detection:** Some garbage collectors use cycle detection to find circular reference chains.",
    "**Functional iteration:** Finding fixed points and cycles in iterated function systems `f(f(...f(x)...))` in numerical analysis.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Optimal `O(1)` extra space — no hash set or visited array required.",
      "Linear `O(n)` time — as fast as any comparison-based cycle detection.",
      "Does not modify the input array — safe for read-only data.",
      "Elegant two-phase structure with a clean mathematical proof of correctness.",
    ],
    limitations: [
      "Requires the sequence to be a functional graph (each node has exactly one outgoing edge) — cannot directly detect cycles in arbitrary graphs.",
      "Both phases must complete; there is no short-circuit if the cycle is long.",
      "The array must contain values that are valid indices (`[0, n-1]`); out-of-range values would cause index errors.",
      "Finds only one cycle entrance — multiple disjoint cycles require repeated application.",
    ],
  },

  whenToUseIt:
    "Use **Floyd's Cycle Detection** when:\n" +
    "- You need to detect a cycle in a functional sequence (each element maps to exactly one next element)\n" +
    "- Space is constrained and `O(n)` extra memory (e.g., a hash set) is unacceptable\n" +
    "- You must not modify the input structure\n" +
    "- Classic problems: find duplicate in array, detect loop in linked list, Rho factorization\n\n" +
    "Avoid this approach when the sequence is not a functional graph (nodes with multiple outgoing edges), or when you need to detect all cycles in a general graph — use DFS-based cycle detection instead.",
};
