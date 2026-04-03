/**
 * Educational content for Sleep Sort.
 */
import type { EducationalContent } from "@/types";

export const sleepSortEducational: EducationalContent = {
  overview:
    "**Sleep Sort** is a humorous concurrent sorting algorithm that exploits operating system timers. Each element spawns a thread that sleeps for a duration equal to its value, then appends itself to the output when it wakes up.\n\nBecause threads with smaller sleep durations wake up first, the output ends up in ascending order — as long as all threads complete before any is interrupted.",

  howItWorks:
    "### The Concurrent Concept\n" +
    "1. For each element `v` in the array, spawn a thread that calls `sleep(v)`.\n" +
    "2. Each thread appends its value to a shared output list when it wakes.\n" +
    "3. Since smaller values sleep for less time, they wake and append first.\n" +
    "4. After all threads complete, the output list is sorted.\n\n" +
    "### Why This Visualization is Simulated\n" +
    "Real sleep sort requires actual timer-based concurrency. In this visualization, we **simulate** the concept: elements are ordered by their sleep delay (their value), and each wake-up event is shown step by step in ascending value order.\n\n" +
    "```mermaid\n" +
    "sequenceDiagram\n" +
    "    participant Thread1 as Thread(v=1)\n" +
    "    participant Thread2 as Thread(v=3)\n" +
    "    participant Thread3 as Thread(v=5)\n" +
    "    participant Output as Output List\n" +
    "    Note over Thread1,Thread3: All threads start simultaneously\n" +
    "    Thread1->>Output: wake after 1ms → append 1\n" +
    "    Thread2->>Output: wake after 3ms → append 3\n" +
    "    Thread3->>Output: wake after 5ms → append 5\n" +
    "    Note over Output: [1, 3, 5] — sorted!\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n + max(values))`**\n\n" +
    "- The wall-clock time is determined by the largest value in the array, not the count of elements.\n" +
    "- **Best Case:** `O(n)` when all values are equal or tightly clustered.\n" +
    "- **Worst Case:** `O(max_value)` — a single very large value dominates.\n\n" +
    "**Space Complexity: `O(n)`** for the thread pool and output array.\n\n" +
    "Note: Thread scheduling introduces non-determinism — correctness is not guaranteed under heavy system load.",

  bestAndWorstCase:
    "**Best case:** `O(n)` — all values are identical or very close together; all threads wake nearly simultaneously.\n\n" +
    "**Worst case:** `O(max_value)` — one thread with a very large value blocks completion. If the array contains `[1, 1, 1, 1, 1000000]`, the sort takes 1,000,000 time units regardless of how many elements there are.",

  realWorldUses: [
    "**Educational curiosity:** Demonstrates how OS scheduling and concurrency can be exploited for computation.",
    "**Timer-based event sequencing:** The underlying concept (delay = priority) appears in real-time embedded systems.",
    "**Humor and interviews:** Famous as an example of a 'working but terrible' algorithm that highlights the difference between algorithmic complexity and practical design.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "**Conceptually elegant:** Demonstrates how concurrency can solve sorting without explicit comparisons.",
      "**Trivially parallelizable:** Each element is fully independent before the output phase.",
      "**O(n + max) instead of O(n²):** For small value ranges with large arrays, it can theoretically outperform comparison sorts.",
    ],
    limitations: [
      "**Non-deterministic:** OS scheduling jitter can corrupt results under load.",
      "**Unbounded by input size:** A single large value causes arbitrarily long execution.",
      "**Not practical:** Real implementations require threads/timers, adding massive overhead versus comparison sorts.",
    ],
  },

  whenToUseIt:
    "**Never use Sleep Sort in production.** It is an algorithmic curiosity that demonstrates how concurrency and OS timers interact. The simulation here is useful for understanding thread scheduling concepts.\n\nFor real sorting, use a comparison-based sort (`O(n log n)`) or a distribution sort (`O(n + range)`) like Counting Sort when values are bounded.",
};
