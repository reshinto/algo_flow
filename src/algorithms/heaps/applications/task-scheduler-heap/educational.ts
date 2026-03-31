import type { EducationalContent } from "@/types";

export const taskSchedulerHeapEducational: EducationalContent = {
  overview:
    "**Task Scheduler Heap** (LeetCode 621) finds the minimum number of CPU intervals needed to execute a list of tasks, where identical tasks must be separated by at least **n cooldown intervals**. Idle slots are inserted when no valid task is available.\n\nA **max-heap of task frequencies** drives a greedy round-based simulation: each round fills up to n+1 slots with the most frequent available tasks, then optionally idles. This yields an **O(total_tasks × log 26) ≈ O(n)** solution.",

  howItWorks:
    "The algorithm simulates task execution in rounds of size **cooldown + 1**:\n\n" +
    "1. **Count frequencies** — Tally occurrences of each task type in a hash map.\n" +
    "2. **Build the heap** — Insert all frequencies into a max-heap.\n" +
    "3. **Round simulation** — While the heap is non-empty:\n" +
    "   - Extract up to (cooldown + 1) tasks from the heap (highest frequencies first). Decrement each by 1.\n" +
    "   - Reinsert any tasks with remaining frequency > 0.\n" +
    "   - If the heap still has tasks after this round, add a full cycle (cooldown + 1) to the interval count.\n" +
    "   - If this is the last round (heap is empty after reinsertion), add only the number of tasks executed — no idle slots needed.\n\n" +
    "### Example: tasks = [A,A,A,B,B,B], cooldown = 2\n\n" +
    "```\n" +
    "Frequencies: { A:3, B:3 }\n" +
    "Heap: [3, 3]\n\n" +
    "Round 1 (slots: A, B, idle): Extract A(3→2), B(3→2). Only 2 tasks < 3 slots → 1 idle.\n" +
    "  Reinsert: [2, 2]. Intervals += 3 (full cycle). Total=3.\n\n" +
    "Round 2 (slots: A, B, idle): Extract A(2→1), B(2→1). 1 idle.\n" +
    "  Reinsert: [1, 1]. Intervals += 3. Total=6.\n\n" +
    "Round 3 (slots: A, B): Extract A(1→0), B(1→0). Heap empty after reinsertion.\n" +
    "  Intervals += 2 (tasks only, no idle). Total=8.\n\n" +
    "Result: 8 intervals\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n log k)`** where n = total tasks, k ≤ 26 (unique task types)\n\n" +
    "Counting frequencies is O(n). Building the heap is O(k). Each round extracts and reinserts at most k tasks — O(k log k) per round. There are at most n rounds in total, but each round processes cooldown+1 tasks, so actual rounds ≈ n/(cooldown+1). Total: O(n log k). Since k ≤ 26, this is effectively **O(n)**.\n\n" +
    "**Space Complexity: `O(k)` ≈ O(1)**\n\n" +
    "The heap holds at most k ≤ 26 frequencies. The round buffer holds at most k entries. No other significant memory is used.",

  bestAndWorstCase:
    "**Best case — O(n):** cooldown = 0. Every task can execute immediately after any other. One round processes all tasks with no idle slots. The result equals the number of tasks.\n\n" +
    "**Worst case — O(n × cooldown):** One task dominates all others (frequency = n, all others = 1). Every round after the first requires idle slots to fill the cooldown gap. The formula max(n, (maxFrequency - 1) × (cooldown + 1) + taskTypesWithMaxFrequency) gives the exact answer, but the heap simulation takes the same algorithmic time.",

  realWorldUses: [
    "**CPU scheduling:** Operating systems use cooldown-based scheduling to prevent a single process from monopolizing resources. This algorithm models the minimum time to complete a job set.",
    "**Rate-limited API calls:** When the same endpoint cannot be called more than once per N requests, task scheduler logic governs the minimum total call sequence length.",
    "**Database connection pooling:** Queries to the same table may need cooldown intervals to avoid lock contention. Scheduling maximizes throughput.",
    "**Data center workload planning:** Batch jobs with cooldown constraints (e.g., ML training runs that share GPUs) use this pattern to compute minimum makespan.",
    "**Game development:** Ability cooldowns in games are a direct analogy — ensuring the same attack cannot repeat within N ticks while maximizing damage output.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) effective complexity — heap size is bounded by 26 (unique task types), making log k a constant.",
      "Greedy optimality — always executing the most frequent task first is provably optimal for minimizing total intervals.",
      "Naturally handles all edge cases — cooldown = 0, single task type, and all identical tasks.",
    ],
    limitations: [
      "The heap approach is slightly more complex than the mathematical formula: max(n, (maxFreq - 1) × (n+1) + count(maxFreq)). The formula is O(n) with no heap needed.",
      "Simulates rather than computes — useful for visualization and step-by-step explanation but not the most concise production solution.",
      "Does not return the actual schedule — only the total interval count.",
    ],
  },

  whenToUseIt:
    "Use Task Scheduler Heap when you need to simulate or visualize the greedy round-based execution of tasks with cooldown constraints. It is the teaching-friendly version of LeetCode 621, making each scheduling decision visible. For production code where only the count is needed, the mathematical formula is simpler and equally fast. This heap pattern extends naturally to any scheduling problem where resources have cooldown periods and you want to minimize total time.",
};
