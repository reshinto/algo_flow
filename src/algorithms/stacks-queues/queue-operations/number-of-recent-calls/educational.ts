import type { EducationalContent } from "@/types";

export const numberOfRecentCallsEducational: EducationalContent = {
  overview:
    "**Number of Recent Calls** (LeetCode 933) counts how many calls have been made within the last 3000 milliseconds, including the current call. A queue acts as a sliding time window: timestamps are enqueued as they arrive, and any timestamp older than `t - 3000` is dequeued from the front.\n\nThe queue always holds exactly the timestamps that fall within the current window, so its length is the answer for each call.",

  howItWorks:
    "For each incoming timestamp `t`:\n\n" +
    "1. **Enqueue** `t` at the rear of the queue.\n" +
    "2. **Expire old entries:** while the front of the queue is less than `t - 3000`, dequeue it.\n" +
    "3. **Count:** the queue length is the number of recent calls in `[t - 3000, t]`.\n\n" +
    "### Example trace on `[1, 100, 3001, 3002]`\n\n" +
    "```\n" +
    "t=1     queue=[1]              window=[−2999, 1]    count=1\n" +
    "t=100   queue=[1, 100]         window=[−2900, 100]  count=2\n" +
    "t=3001  queue=[1, 100, 3001]   window=[1, 3001]     count=3  (1 stays: 1 >= 1)\n" +
    "t=3002  queue=[100, 3001,3002] window=[2, 3002]     count=3  (1 expired: 1 < 2)\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Each timestamp is enqueued once and dequeued at most once, giving amortized `O(1)` per call and `O(n)` overall for `n` calls.\n\n" +
    "**Space Complexity: `O(w)`**\n\n" +
    "Where `w` is the maximum number of timestamps that fit within any 3000ms window. In the worst case (all calls in one window) this is `O(n)`, but in practice `w` is bounded by the input rate.",

  bestAndWorstCase:
    "**Best case** — calls are spaced more than 3000ms apart: the queue never holds more than one element at a time, dequeue overhead is zero, and each call is `O(1)`.\n\n" +
    "**Worst case** — all calls arrive within a single 3000ms window: no timestamps are ever expired, the queue grows to length `n`, and space usage is `O(n)`.\n\n" +
    "In both cases the total work is `O(n)` because each timestamp is enqueued and dequeued at most once.",

  realWorldUses: [
    "**Rate limiting:** API gateways use a sliding-window counter built on the same queue principle to cap requests per second per client.",
    "**Event stream analytics:** Counting events (clicks, purchases, errors) that occurred within a rolling time window in real-time dashboards.",
    "**Network packet monitoring:** Measuring packets received per second with a sliding window to detect traffic spikes.",
    "**Debounce and throttle utilities:** Frontend frameworks track recent invocations in a time window to decide whether to suppress a callback.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Amortized O(1) per call — each timestamp is enqueued and dequeued at most once.",
      "Constant extra work per query beyond the natural window expiry.",
      "Simple implementation with a standard queue; no sorting or hashing required.",
    ],
    limitations: [
      "Space scales with the window population, not a fixed constant.",
      "Only supports a fixed 3000ms window; a variable window requires a parameter change.",
      "Assumes timestamps are non-decreasing (guaranteed by the problem); unsorted input would need a different approach.",
    ],
  },

  whenToUseIt:
    "Use a queue-based sliding window when you need to count or aggregate events within a fixed time range and timestamps arrive in non-decreasing order. If the window size is variable or timestamps can arrive out of order, consider a sorted structure or a deque with binary search instead.",
};
