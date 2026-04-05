import type { EducationalContent } from "@/types";

export const implementQueueUsingStacksEducational: EducationalContent = {
  overview:
    "**Implement Queue Using Stacks** (LeetCode 232) constructs a FIFO queue using only two stacks. A stack is LIFO — last in, first out — so two reversals cancel each other out and restore FIFO order.\n\n" +
    "Values are pushed onto an **input stack**. When a dequeue is requested and the **output stack** is empty, all elements are transferred from the input stack to the output stack, reversing their order. The output stack is then popped normally, yielding elements in original insertion order.",

  howItWorks:
    "The algorithm operates in two phases:\n\n" +
    "**Push Phase** — every new value is pushed directly onto the input stack. This is always `O(1)`.\n\n" +
    "**Dequeue Phase:**\n" +
    "1. If the output stack is **non-empty**, pop from it — already in FIFO order.\n" +
    "2. If the output stack is **empty**, transfer every element from the input stack:\n" +
    "   - Pop each element from the input stack and push it onto the output stack.\n" +
    "   - This reverses the insertion order so the earliest-enqueued element sits at the output stack's top.\n" +
    "3. Pop from the output stack to complete the dequeue.\n\n" +
    "### Example trace on `[1, 2, 3]`\n\n" +
    "```\n" +
    "push 1 → inputStack: [1]\n" +
    "push 2 → inputStack: [1, 2]\n" +
    "push 3 → inputStack: [1, 2, 3]  (top = 3)\n\n" +
    "dequeue — outputStack empty, transfer:\n" +
    "  pop 3 → outputStack: [3]\n" +
    "  pop 2 → outputStack: [3, 2]\n" +
    "  pop 1 → outputStack: [3, 2, 1]  (top = 1)\n" +
    "  pop outputStack → dequeue returns 1  ✓  (first enqueued)\n\n" +
    "dequeue → pop outputStack → returns 2  ✓\n" +
    "dequeue → pop outputStack → returns 3  ✓\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(1)` amortized per operation**\n\n" +
    "Each element is pushed once and popped at most twice (once during transfer, once during dequeue). Averaged over all operations, the cost per element is constant.\n\n" +
    "Individual dequeue calls may be `O(n)` when a transfer is triggered, but that cost is amortized across subsequent `O(1)` dequeues until the output stack is exhausted again.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "At any point, all `n` elements reside in one of the two stacks, requiring `O(n)` extra space in total.",

  bestAndWorstCase:
    "**Best case** — output stack already has elements; dequeue is a single `O(1)` pop with no transfer needed.\n\n" +
    "**Worst case** — output stack is empty and all `n` elements sit in the input stack; one dequeue triggers an `O(n)` transfer. However, this can only happen after `n` pushes, so the amortized cost remains `O(1)` per operation.\n\n" +
    "**Push** is always `O(1)` — no transfer ever occurs on the push path.",

  realWorldUses: [
    "**Constraint-based systems:** In environments where only a stack primitive is available (e.g., certain embedded systems or language runtimes), this pattern provides full queue semantics.",
    "**Algorithm design interviews:** Demonstrates understanding of amortized analysis and the insight that two LIFO reversals produce FIFO order.",
    "**Recursive call stacks as queues:** BFS can be simulated with two stacks using this pattern when an explicit queue is unavailable.",
    "**Undo/redo with ordered replay:** Two stacks can model a queue of operations that must be replayed in insertion order.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(1) amortized time per operation — competitive with a real queue implementation.",
      "Uses only two stacks, making it useful when queue primitives are unavailable.",
      "Simple invariant: push always goes to inputStack, pop always comes from outputStack.",
    ],
    limitations: [
      "Individual dequeue calls can spike to O(n) when a transfer is triggered — not suitable for hard real-time systems.",
      "O(n) extra space overhead compared to a single-array queue.",
      "More complex than a direct queue; the two-stack indirection increases cognitive load.",
    ],
  },

  whenToUseIt:
    "Use this pattern when you need queue semantics but only have stack primitives — a common interview constraint. For production code, prefer a language-native deque or linked-list queue.\n\n" +
    "Avoid this approach in latency-sensitive systems where worst-case O(n) per dequeue is unacceptable. In those cases, a circular buffer queue offers O(1) worst-case dequeue.",
};
