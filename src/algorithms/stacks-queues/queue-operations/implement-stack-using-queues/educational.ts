import type { EducationalContent } from "@/types";

export const implementStackUsingQueuesEducational: EducationalContent = {
  overview:
    "**Implement Stack Using Queues** (LeetCode 225) shows how to build a LIFO stack with only queue primitives — enqueue and dequeue. After each push, the new element is rotated to the front so that the front of the queue always holds the most-recently pushed value, giving O(1) pop at the cost of O(n) push.\n\nThis problem is the conceptual mirror of LeetCode 232 (Implement Queue Using Stacks) and together they illustrate how the two fundamental linear structures can emulate each other.",

  howItWorks:
    "The algorithm uses a **single queue** and re-orders it on every push:\n\n" +
    "1. **Push(x):** Enqueue `x` at the rear. Then dequeue and re-enqueue every element that was already in the queue (i.e. `queue.length - 1` rotations). This cycles the old elements behind the new one, leaving `x` at the front.\n" +
    "2. **Pop / top:** The front of the queue is always the most-recently pushed element, so a plain dequeue gives LIFO order.\n\n" +
    "### Example trace on `[1, 2, 3]`\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '    subgraph Push3["push(3): enqueue 3, rotate old elements"]\n' +
    '        Q1["front→ 2 1 3"] -->|"rotate 2, then 1"| Q2["front→ 3 2 1"]\n' +
    "    end\n" +
    '    subgraph Pop["pop: dequeue from front = stack top"]\n' +
    '        Q2B["front→ 3 2 1"] -->|dequeue| R(["pop = 3"])\n' +
    "    end\n" +
    "    Push3 --> Pop\n" +
    "    style Q2 fill:#06b6d4,stroke:#0891b2\n" +
    "    style R fill:#14532d,stroke:#22c55e\n" +
    "    style Q1 fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "After each push, the new element is rotated to the front by cycling all prior elements to the rear. The front always equals the stack top, so pop is a simple dequeue.\n\n" +
    "```\n" +
    "push(1): enqueue 1   → queue: [1]   (0 rotations)\n" +
    "push(2): enqueue 2   → queue: [1,2]\n" +
    "         rotate 1    → queue: [2,1]\n" +
    "push(3): enqueue 3   → queue: [2,1,3]\n" +
    "         rotate 2,1  → queue: [3,2,1]\n" +
    "pop:  dequeue 3 ✓\n" +
    "pop:  dequeue 2 ✓\n" +
    "pop:  dequeue 1 ✓\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: O(n) push / O(1) pop**\n\n" +
    "Each push enqueues one element and then rotates all previously enqueued elements — `k` rotations for the k-th push. Summed over `n` pushes this is `0 + 1 + 2 + … + (n-1) = O(n²)` total rotations, but each individual push is O(n) in the worst case. Pop is O(1) because no rotation is needed.\n\n" +
    "**Space Complexity: O(n)**\n\n" +
    "Only one queue is used, holding at most `n` elements.",

  bestAndWorstCase:
    "**Best case push** — pushing onto an empty stack requires zero rotations: O(1).\n\n" +
    "**Worst case push** — the n-th push triggers n-1 rotations: O(n).\n\n" +
    "**Pop** is always O(1) because the front is maintained as the stack top.",

  realWorldUses: [
    "**Interview preparation:** A classic problem that tests understanding of both stack and queue semantics and the cost of emulating one with the other.",
    "**Constrained environments:** Situations where only queue-based APIs are exposed (e.g., message brokers, job queues) but LIFO access order is required.",
    "**Concurrent systems:** Task-reversal patterns where the last-submitted task must run first, implemented on top of a FIFO channel.",
    "**Algorithm design:** Demonstrates that any computable behaviour can be built from simpler primitives, at varying efficiency trade-offs.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Single queue — simpler state than the two-stack approach used for the inverse problem.",
      "O(1) pop and top — reads are instant regardless of queue size.",
      "Conceptually clear: rotation keeps the invariant that the queue front equals the stack top.",
    ],
    limitations: [
      "O(n) push — each insertion triggers up to n-1 extra dequeue/enqueue operations.",
      "Not practical for write-heavy workloads; the two-stack approach offers amortized O(1) push.",
      "Total work across n pushes is O(n²), making it unsuitable for large data sets.",
    ],
  },

  whenToUseIt:
    "Use this approach when pops are far more frequent than pushes, or when only a single queue primitive is available. If both pushes and pops need to be fast, use two stacks (LeetCode 232 in reverse) which gives amortized O(1) for both operations.",
};
