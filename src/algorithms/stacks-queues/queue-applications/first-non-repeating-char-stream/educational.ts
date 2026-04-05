import type { EducationalContent } from "@/types";

export const firstNonRepeatingCharStreamEducational: EducationalContent = {
  overview:
    "**First Non-Repeating Character in a Stream** finds, after each character is read, which character in the stream so far has appeared exactly once and arrived earliest.\n\n" +
    "A **queue** acts as a candidate buffer — it holds characters that might still be the answer. A **frequency map** tracks how many times each character has been seen. When a character's count rises above one it is no longer a candidate, so stale entries are pruned from the front of the queue. The front of the surviving queue is always the answer.",

  howItWorks:
    "The algorithm processes each incoming character and maintains two structures:\n\n" +
    "1. **Frequency map** — `freqMap[char]` is incremented for each character seen.\n" +
    "2. **Candidate queue** — every new character is pushed to the rear.\n\n" +
    "After each enqueue, characters are removed from the **front** while `freqMap[front] > 1` — those characters are repeated and can never be the answer again. The front of the remaining queue is the first non-repeating character, or `#` if the queue is empty.\n\n" +
    "### Example trace on `aabcbcd`\n\n" +
    "```\n" +
    "step  char  freqMap               queue     answer\n" +
    "1     a     {a:1}                 [a]       a\n" +
    "2     a     {a:2}                 []        #\n" +
    "3     b     {a:2, b:1}            [b]       b\n" +
    "4     c     {a:2, b:1, c:1}       [b,c]     b\n" +
    "5     b     {a:2, b:2, c:1}       [c]       c\n" +
    "6     c     {a:2, b:2, c:2}       []        #  → wait... d not yet seen\n" +
    "7     d     {a:2, b:2, c:2, d:1}  [d]       d\n" +
    "```\n\n" +
    'Result array: `["a", "#", "b", "b", "c", "#", "d"]`',

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Each character is enqueued once and dequeued at most once, so the total number of queue operations across the entire stream is `O(n)`. The frequency map lookup and update are `O(1)` per character.\n\n" +
    "**Space Complexity: `O(k)`**\n\n" +
    "The frequency map holds at most `k` entries where `k` is the size of the character alphabet (26 for lowercase English letters). The queue holds at most `k` distinct characters at any time — repeated characters are pruned immediately — so its size is also bounded by `O(k)`.",

  bestAndWorstCase:
    "**Best case** — every character appears at least twice: the queue stays empty after pruning, and every answer is `#` in `O(1)` amortised work per step.\n\n" +
    "**Worst case** — all characters are distinct: no pruning occurs, the queue grows to length `n`, and every step peeks in `O(1)`. Overall still `O(n)` time.\n\n" +
    "The algorithm is `O(n)` in all cases because each element is enqueued and dequeued at most once.",

  realWorldUses: [
    "**Live typing suggestions:** Highlight the first unique character as the user types in a search box or form field.",
    "**Stream deduplication dashboards:** Monitor event streams and flag the first event type that has appeared only once so far.",
    "**Log analysis tools:** Identify the first unique error code in a stream of server logs to surface novel failures quickly.",
    "**Interview and competitive programming:** Classic problem used to demonstrate the power of combining a frequency map with a FIFO queue.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) time — each character is processed with a constant number of operations amortised.",
      "O(k) space — memory is bounded by alphabet size, not stream length.",
      "Online algorithm — produces an answer after each character without needing the full input.",
      "Simple and composable — the queue + frequency map pattern applies to many stream problems.",
    ],
    limitations: [
      "Returns '#' instead of a typed sentinel value — callers must agree on the convention.",
      "Alphabet must be finite and known; very large alphabets increase space usage proportionally.",
      "Only tracks the first non-repeating character — finding the k-th requires a more elaborate structure.",
    ],
  },

  whenToUseIt:
    "Use this pattern whenever you need to query the first unique element in a growing stream after each new arrival. The queue + frequency map combination is ideal when the order of first appearance matters and the alphabet is bounded. For offline processing (full input available), a single scan with a linked hash map is equivalent but simpler to implement.",
};
