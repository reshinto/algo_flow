import type { EducationalContent } from "@/types";

export const meetingRoomsIIEducational: EducationalContent = {
  overview:
    "**Meeting Rooms II** determines the minimum number of meeting rooms required to host all meetings without overlap (LeetCode 253).\n\nThe key insight is that a room can be reused when a meeting ends at or before the next meeting starts. A **min-heap of end times** tracks when each occupied room becomes available — at each step, we check whether the earliest-ending room is free before allocating a new one.",

  howItWorks:
    "The algorithm runs in two phases:\n\n" +
    "1. **Sort** — sort all meetings by their start time so we process them in chronological order.\n" +
    "2. **Greedy allocation with a min-heap** — for each meeting:\n" +
    "   - Peek at the heap root (earliest end time among all occupied rooms).\n" +
    "   - If that end time ≤ current meeting's start time, a room is free: extract it from the heap (reuse).\n" +
    "   - Insert the current meeting's end time into the heap (allocate/reuse a room).\n" +
    "   - The heap size at any point equals the number of rooms in use. The maximum heap size over the entire run equals the answer.\n\n" +
    "### Example: `[[0,30],[5,10],[15,20],[2,7]]`\n\n" +
    "```\n" +
    "Sorted: [0,30] [2,7] [5,10] [15,20]\n\n" +
    "[0,30]  → heap empty → insert 30  → heap: [30]            rooms: 1\n" +
    "[2,7]   → root=30 > 2 → insert 7  → heap: [7, 30]         rooms: 2\n" +
    "[5,10]  → root=7 > 5  → insert 10 → heap: [7, 30, 10]     rooms: 3\n" +
    "[15,20] → root=7 ≤ 15 → extract, insert 20 → heap: [10, 30, 20] rooms: 3\n\n" +
    "Answer: 3 rooms\n" +
    "```\n\n" +
    "The min-heap ensures we always check the room that becomes free soonest, minimizing unnecessary room allocation.\n\n" +
    "### Min-Heap of End Times — After Processing [5,10]\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    e7((end:7)) --> e30((end:30))\n" +
    "    e7 --> e10((end:10))\n" +
    "    style e7 fill:#06b6d4,stroke:#0891b2\n" +
    "    style e10 fill:#f59e0b,stroke:#d97706\n" +
    "    style e30 fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "The root (cyan) is the earliest-ending room — end time 7. When meeting [15,20] arrives, 7 ≤ 15 so this room is reused. The amber node (end:10) is the next room to check.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n log n)`**\n\n" +
    "Sorting takes `O(n log n)`. Each meeting performs at most one extract and one insert on the heap, each costing `O(log n)`. With `n` meetings total, the heap operations contribute `O(n log n)`, giving an overall time of `O(n log n)`.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "In the worst case (all meetings overlap), every end time is in the heap simultaneously, requiring `O(n)` space for the heap.",

  bestAndWorstCase:
    "**Best case — `O(n log n)`:** Even if no rooms overlap at all (every meeting ends before the next starts), we still need to sort first. The heap never grows beyond size 1, so all heap operations are `O(1)`. Sort dominates at `O(n log n)`.\n\n" +
    "**Worst case — `O(n log n)`:** All meetings overlap completely. The heap grows to size `n`, and each insert or extract traverses a path of height `log n`. Combined with sorting, the total is `O(n log n)`.",

  realWorldUses: [
    "**Conference room booking systems:** Determines the minimum room count needed to satisfy a schedule without conflicts — the direct real-world origin of this problem.",
    "**Cloud resource scheduling:** Allocating virtual machines or containers for overlapping jobs, minimizing the fleet size needed.",
    "**Operating system CPU scheduling:** Deciding how many processor cores or threads are needed to execute concurrent tasks.",
    "**Network bandwidth allocation:** Determining how many simultaneous connections a server must support at peak overlap.",
    "**Hospital appointment management:** Ensuring enough examination rooms or staff are available during overlapping appointment windows.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Optimal solution — the greedy min-heap approach always finds the true minimum number of rooms.",
      "Efficient — O(n log n) sorting and heap operations, no exponential backtracking required.",
      "Intuitive mapping — the heap directly models the real-world notion of 'which room becomes free soonest'.",
    ],
    limitations: [
      "Requires sorting — not suitable for pure streaming inputs where meetings arrive out of order and must be answered instantly.",
      "Only answers the count — does not assign specific rooms or output a full schedule.",
      "Single-resource model — tracks one resource type (rooms); multi-resource scheduling is significantly more complex.",
    ],
  },

  whenToUseIt:
    "Use Meeting Rooms II whenever you need the **minimum number of resources** to cover overlapping intervals — the pattern generalises to CPU cores, connections, workers, and bandwidth. If you also need the actual assignment of intervals to rooms, extend the algorithm by tagging each heap entry with a room identifier. Avoid this approach if meetings arrive in a non-sorted stream with no lookahead, or if the resource constraints are multi-dimensional (e.g., rooms with different capacities).",
};
