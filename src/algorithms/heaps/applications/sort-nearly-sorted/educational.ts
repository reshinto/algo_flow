import type { EducationalContent } from "@/types";

export const sortNearlySortedEducational: EducationalContent = {
  overview:
    "**Sort Nearly Sorted** (also called K-Sorted Array) solves the problem of sorting an array where every element is at most **k positions** away from its final sorted position. A standard sort would be O(n log n), but exploiting the bounded displacement property allows an **O(n log k)** solution using a min-heap of size k+1.\n\nThis problem appears in streaming data contexts where data arrives nearly in order — think sensor readings, log timestamps, or network packet reassembly.",

  howItWorks:
    "The algorithm uses a **sliding window min-heap** of size k+1:\n\n" +
    "1. **Seed the heap** — Insert the first k+1 elements into a min-heap. Since each element is at most k positions from its sorted place, the globally smallest element must be within the first k+1 positions.\n" +
    "2. **Slide the window** — For each subsequent element in the array:\n" +
    "   - Extract the minimum from the heap — this is the next element in sorted order.\n" +
    "   - Insert the new array element into the heap to maintain the window size.\n" +
    "3. **Drain the heap** — When no more input elements remain, extract all remaining elements from the heap in order.\n\n" +
    "### Example: array = [6, 5, 3, 2, 8, 10, 9], k = 3\n\n" +
    "```\n" +
    "Seed heap with first k+1=4 elements: [6, 5, 3, 2] → min-heap: [2, 5, 3, 6]\n\n" +
    "Process index 4 (value=8): extract min=2 → result=[2], insert 8 → heap=[3, 5, 8, 6]\n" +
    "Process index 5 (value=10): extract min=3 → result=[2,3], insert 10 → heap=[5, 6, 8, 10]\n" +
    "Process index 6 (value=9): extract min=5 → result=[2,3,5], insert 9 → heap=[6, 10, 8, 9]\n\n" +
    "Drain: extract 6, 8, 9, 10 → result=[2,3,5,6,8,9,10]\n" +
    "```\n\n" +
    "### Sliding Min-Heap (size k+1=4) — After Seeding with [6, 5, 3, 2]\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    h2((2)) --> h5((5))\n" +
    "    h2 --> h3((3))\n" +
    "    h5 --> h6((6))\n" +
    "    style h2 fill:#06b6d4,stroke:#0891b2\n" +
    "    style h3 fill:#14532d,stroke:#22c55e\n" +
    "    style h5 fill:#14532d,stroke:#22c55e\n" +
    "    style h6 fill:#f59e0b,stroke:#d97706\n" +
    "```\n\n" +
    "The root (cyan) is 2 — the guaranteed next sorted output, since no unseen element can be smaller within the k=3 displacement bound. The amber node (6) is farthest from its sorted position.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n log k)`**\n\n" +
    "Seeding the heap with k+1 elements takes O(k log k). Each of the remaining n−k−1 elements triggers one extraction and one insertion, each O(log k). Draining k elements takes O(k log k). Total: O(n log k). When k is small (k ≪ n), this is much faster than O(n log n).\n\n" +
    "**Space Complexity: `O(k)`**\n\n" +
    "The heap holds at most k+1 elements at any time. The result array requires O(n) space, but that is output — the working space is O(k).",

  bestAndWorstCase:
    "**Best case — O(n):** When k = 0, the array is already sorted. The heap has size 1, and every extraction/insertion is O(1). The algorithm degenerates to a linear scan.\n\n" +
    "**Worst case — O(n log n):** When k = n−1, every element could be anywhere in the array and the heap grows to size n — making this equivalent to heap sort. In practice k is much smaller than n, which is the key assumption of the problem.",

  realWorldUses: [
    "**Network packet reassembly:** Packets may arrive slightly out of order due to routing. A k-sorted heap reorders them efficiently without waiting for all packets.",
    "**Log file merging:** Distributed systems emit logs nearly in timestamp order. A small heap merges multiple nearly-sorted streams efficiently.",
    "**Sensor data processing:** Physical sensors emit readings in near-chronological order with small jitter. This algorithm handles the jitter window.",
    "**External sort merge phase:** When merging sorted runs from disk that are nearly aligned, bounded displacement enables a small heap rather than a large priority queue.",
    "**Real-time leaderboards:** Score updates arrive nearly in rank order. The k-sorted heap efficiently maintains the correct ordering.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n log k) — substantially faster than O(n log n) when k ≪ n.",
      "O(k) working space — memory usage scales with displacement bound, not array size.",
      "Streaming-friendly — processes elements one at a time as they arrive.",
      "Simple to implement — just a min-heap with a sliding window of fixed size.",
    ],
    limitations: [
      "Requires knowing k in advance — if the bound is unknown, a standard sort is safer.",
      "Degrades to O(n log n) when k ≈ n — no benefit over heap sort in the worst case.",
      "Min-heap is not built into all standard libraries natively (e.g., Java and JavaScript require manual implementation or negation tricks).",
    ],
  },

  whenToUseIt:
    "Use Sort Nearly Sorted when you know that your input data has **bounded disorder** — each element is at most k positions from where it belongs. This is common in streaming scenarios (sensor data, network packets, real-time feeds) and in merge phases of distributed sort pipelines. If k is unknown or could be as large as n, fall back to a standard sort. If k is very large relative to n, heap sort or merge sort is equally appropriate and avoids the overhead of managing the window.",
};
