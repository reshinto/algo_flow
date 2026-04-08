import type { EducationalContent } from "@/types";

export const taskSchedulerEducational: EducationalContent = {
  overview:
    "**Task Scheduler** (LeetCode 621) computes the minimum number of CPU intervals needed to execute all tasks given a cooldown period `n`. The same task type cannot be executed again within `n` intervals — idle slots pad the schedule when no task is ready.\n\nA queue acts as a cooldown waiting area: after executing a task, its entry is enqueued with a timestamp indicating when it will be available again. The greedy strategy always executes the highest-frequency available task, minimising wasted idle time.",

  howItWorks:
    "**Step 1 — Count frequencies**\n\n" +
    "Build a frequency map from the task list. The task with the highest frequency (`maxFreq`) determines the frame structure.\n\n" +
    "**Step 2 — Identify the dominant frame**\n\n" +
    "A *frame* is `cooldown + 1` slots wide — one execution slot plus `cooldown` waiting slots. The most frequent task anchors the start of each frame. `maxFreqCount` is the number of tasks that share the maximum frequency.\n\n" +
    "**Step 3 — Apply the greedy formula**\n\n" +
    "```\n" +
    "result = max(tasks.length, (maxFreq - 1) × (cooldown + 1) + maxFreqCount)\n" +
    "```\n\n" +
    "- `(maxFreq - 1) × (cooldown + 1)` — all frames except the last, each fully padded to width `cooldown + 1`.\n" +
    "- `+ maxFreqCount` — the final partial frame only needs one slot per max-frequency task.\n" +
    "- `max(tasks.length, ...)` — when tasks are dense enough, idle slots disappear and the schedule is exactly `tasks.length` long.\n\n" +
    "**Step 4 — Simulate with a cooldown queue (for visualisation)**\n\n" +
    "1. Maintain a max-frequency priority queue of ready tasks.\n" +
    "2. At each time unit: release any cooling tasks whose wait has ended, then execute the highest-frequency ready task and push it to the cooldown queue with `availableAt = currentTime + cooldown + 1`.\n" +
    "3. Repeat until all tasks are exhausted.\n\n" +
    "### Example: `tasks = [A,A,A,B,B,B]`, `n = 2`\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    '    subgraph Frame1["Frame 1 (slots 1-3)"]\n' +
    '        T1(["A"]) --> T2(["B"]) --> T3(["idle"])\n' +
    "    end\n" +
    '    subgraph Frame2["Frame 2 (slots 4-6)"]\n' +
    '        T4(["A"]) --> T5(["B"]) --> T6(["idle"])\n' +
    "    end\n" +
    '    subgraph Frame3["Frame 3 (slots 7-8, partial)"]\n' +
    '        T7(["A"]) --> T8(["B"])\n' +
    "    end\n" +
    "    Frame1 --> Frame2 --> Frame3\n" +
    "    style T1 fill:#f59e0b,stroke:#d97706\n" +
    "    style T4 fill:#f59e0b,stroke:#d97706\n" +
    "    style T7 fill:#14532d,stroke:#22c55e\n" +
    "    style T8 fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Each frame is `cooldown + 1 = 3` slots wide. The last frame is partial — it only needs one slot per max-frequency task (`maxFreqCount = 2`), giving total length `(3-1)×3 + 2 = 8`.\n\n" +
    "```\n" +
    "freqA = 3, freqB = 3  →  maxFreq = 3, maxFreqCount = 2\n" +
    "formula = (3-1) × (2+1) + 2 = 6 + 2 = 8\n" +
    "max(6, 8) = 8\n\n" +
    "Schedule: A  B  idle  A  B  idle  A  B\n" +
    "Time:     1  2   3    4  5   6    7  8\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Building the frequency map requires one pass over the `n` tasks. Extracting `maxFreq` and `maxFreqCount` requires one pass over the (at most 26-letter) frequency map — effectively `O(1)` since the alphabet is fixed. The closed-form formula then computes the answer in constant time.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "The frequency map holds at most 26 entries (one per uppercase letter), so it occupies constant space regardless of input size. No auxiliary arrays proportional to `n` are needed.",

  bestAndWorstCase:
    "**Best case** — `cooldown = 0`: every task can run consecutively with no waiting, so the answer is simply `tasks.length`. No idle slots are ever inserted.\n\n" +
    "**Worst case** — one task dominates with very high frequency and a large cooldown: the schedule has many idle slots and the result is `(maxFreq - 1) × (cooldown + 1) + 1`, which can be much larger than `tasks.length`.\n\n" +
    "For example, `tasks = [A, A, A]`, `n = 100`: result = `(3-1) × 101 + 1 = 203`, versus only 3 tasks.",

  realWorldUses: [
    "**CPU scheduling:** Operating systems rate-limit repeated requests from the same process to prevent starvation of other processes — the cooldown models the minimum interval between identical system calls.",
    "**API rate limiting:** Web services enforce per-endpoint cooldowns to protect backend resources; the scheduler formula determines the minimum total time to serve a batch of requests.",
    "**Job queues:** Distributed task runners (Celery, Sidekiq) use cooldown periods to avoid thundering-herd problems when the same expensive job recurs frequently.",
    "**Battery/thermal throttling:** Mobile and embedded systems delay re-execution of power-hungry tasks after they run to prevent overheating — the same frame-based scheduling applies.",
    "**Database connection pools:** Some pooling strategies enforce a minimum idle period between reuse of the same connection to avoid holding transactions open too long.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) time — single frequency pass plus a constant-time closed-form formula.",
      "O(1) space — the frequency map is bounded by the fixed alphabet size (26 uppercase letters).",
      "Exact optimal result — no approximation; the formula gives the provably minimum schedule length.",
      "Intuitive: the dominant task's frame structure directly determines the answer.",
    ],
    limitations: [
      "Assumes tasks are single-unit atomic operations — cannot model variable-duration tasks.",
      "The formula applies only when tasks are identified by type (letter); it does not generalise to arbitrary dependency graphs.",
      "Idle slots are implicit — the formula counts them but does not name which task type goes in each slot.",
      "For multi-core scheduling with parallelism, a more complex model is required.",
    ],
  },

  whenToUseIt:
    "Use this greedy formula whenever you need the minimum time to schedule a multiset of tasks subject to per-type cooldown constraints and single-CPU execution. If tasks have dependencies (must-run-before relationships), use a topological sort instead. If multiple CPUs are available, the problem changes significantly and this formula no longer applies directly.",
};
