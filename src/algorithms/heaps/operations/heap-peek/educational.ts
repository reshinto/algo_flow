import type { EducationalContent } from "@/types";

export const heapPeekEducational: EducationalContent = {
  overview:
    "**Heap Peek** reads the minimum element of a min-heap without modifying the heap. Because a min-heap guarantees the smallest value is always stored at index 0 (the root), this is a single array access — `O(1)` time and `O(1)` space.\n\nWhile trivially simple, peek is a fundamental heap operation that enables inspect-then-decide patterns in algorithms like Dijkstra's and A*, where you want to evaluate the top of the queue before committing to removal.",

  howItWorks:
    "The min-heap *structural invariant* guarantees that every parent node is smaller than or equal to its children. This means the root (index 0) is always the minimum of all elements in the heap.\n\n" +
    "Peek simply accesses `array[0]` and returns it:\n\n" +
    "```\n" +
    "Min-heap:     1         ← always the global minimum\n" +
    "             / \\\n" +
    "            3   5\n" +
    "           / \\ / \\\n" +
    "          7  9 8  6\n\n" +
    "heapPeek([1, 3, 5, 7, 9, 8, 6]) → 1\n" +
    "```\n\n" +
    "No traversal, no comparison, no mutation — the heap is left completely unchanged.\n\n" +
    "**Why is index 0 always the min?** By induction: the root is smaller than both children (heap property). Each child is smaller than its own children. This cascades down every path, so no node in any subtree can be smaller than the root.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(1)`**\n\n" +
    "A single array index access. No iteration, recursion, or comparison required. The heap size has zero effect on runtime.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "No additional memory is allocated. The operation uses one local variable to hold the return value.",

  bestAndWorstCase:
    "**Best case and worst case are identical: `O(1)`.**\n\n" +
    "There is no branching, no loop, and no recursion. Peek is a constant-time operation in every possible scenario — empty heap aside (which should be guarded against before calling).\n\n" +
    "This is the defining advantage of the heap data structure: the priority element is always pre-positioned at index 0 by the structural invariant, not found by searching.",

  realWorldUses: [
    "**Dijkstra's algorithm:** Peek at the unvisited node with the smallest known distance before extracting it — useful when a conditional check (e.g., already visited?) is needed first.",
    "**A* pathfinding:** Inspect the lowest f-score candidate to decide if it is worth expanding before committing to extraction.",
    "**Rate limiting / throttling:** Check the timestamp of the earliest scheduled event without removing it to decide if enough time has passed.",
    "**Merge k sorted lists:** Before extracting the next element, peek to decide if the top of the current heap is a valid candidate.",
    "**Priority scheduling inspection:** Operating system monitors may inspect the highest-priority ready process without descheduling the current one.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(1) — the fastest possible read operation; heap size is irrelevant.",
      "Non-destructive — the heap is unchanged, enabling safe repeated inspection.",
      "Composable — frequently used as a guard before conditional extract operations.",
    ],
    limitations: [
      "Only reveals the minimum (root) — accessing any other element requires O(n) linear search.",
      "Heap must be valid — if the heap invariant has been violated (e.g., by direct array mutation), peek may return a wrong value.",
      "Does not remove the element — algorithms that need both the value and removal must still call extract (O(log n)).",
    ],
  },

  whenToUseIt:
    "Use `heapPeek` whenever you need to inspect the minimum element before deciding whether to extract it — for example, checking if an event's timestamp has passed, or whether the minimum cost path qualifies under a threshold. If you always need both the value and to remove it, skip peek and call extract directly. Never use peek to scan all elements — use a sorted structure or linear scan instead.",
};
