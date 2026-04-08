import type { EducationalContent } from "@/types";

export const maxFrequencyStackEducational: EducationalContent = {
  overview:
    "**Max Frequency Stack** (LeetCode 895) is a stack-like data structure that always pops the most frequently pushed element. When multiple elements share the same maximum frequency, the one pushed most recently is returned — mimicking normal stack ordering as a tiebreaker.\n\nThe key insight is to maintain a **frequency map** (element → count) alongside a **stack-of-stacks grouped by frequency**. Each frequency level gets its own stack, and a single `maxFrequency` integer tracks the current peak.",

  howItWorks:
    "The algorithm works in two phases for the visualization:\n\n" +
    "**Push phase** — for each incoming value:\n" +
    "1. Increment the element's count in `freqMap`.\n" +
    "2. If the new count exceeds `maxFrequency`, update `maxFrequency`.\n" +
    "3. Append the value to `freqStacks[newFreq]` — the stack at that frequency level.\n\n" +
    "**Pop phase** — to pop the most frequent element:\n" +
    "1. Remove the top element from `freqStacks[maxFrequency]`.\n" +
    "2. Decrement `freqMap[popped]`.\n" +
    "3. If `freqStacks[maxFrequency]` is now empty, decrement `maxFrequency`.\n\n" +
    "### Example trace on `[5, 7, 5, 7, 4, 5]`\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    subgraph After pushing all 6\n" +
    '        F3["freq 3: [5]"]\n' +
    '        F2["freq 2: [5, 7]"]\n' +
    '        F1["freq 1: [5, 7, 4]"]\n' +
    '        MX["maxFreq = 3"]\n' +
    "    end\n" +
    "    subgraph Pop order\n" +
    '        P1["pop → 5"] --> P2["pop → 7"] --> P3["pop → 5"]\n' +
    "    end\n" +
    '    F3 -->|"top of maxFreq stack"| P1\n' +
    "    style F3 fill:#f59e0b,stroke:#d97706\n" +
    "    style MX fill:#06b6d4,stroke:#0891b2\n" +
    "    style P1 fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "The pop always takes from the highest-frequency stack. When that stack empties, `maxFreq` " +
    "decrements and the next tier becomes the new target.\n\n" +
    "```\n" +
    "Push 5 → freq[5]=1, maxFreq=1, freqStacks={1:[5]}\n" +
    "Push 7 → freq[7]=1, maxFreq=1, freqStacks={1:[5,7]}\n" +
    "Push 5 → freq[5]=2, maxFreq=2, freqStacks={1:[5,7],2:[5]}\n" +
    "Push 7 → freq[7]=2, maxFreq=2, freqStacks={1:[5,7],2:[5,7]}\n" +
    "Push 4 → freq[4]=1, maxFreq=2, freqStacks={1:[5,7,4],2:[5,7]}\n" +
    "Push 5 → freq[5]=3, maxFreq=3, freqStacks={1:[5,7,4],2:[5,7],3:[5]}\n" +
    "Pop    → 5  (freq 3, the only element)\n" +
    "Pop    → 7  (freq 2, last pushed at freq 2)\n" +
    "Pop    → 5  (freq 2, before 7)\n" +
    "Pop    → 4  (freq 1, last pushed)\n" +
    "Pop    → 7  (freq 1)\n" +
    "Pop    → 5  (freq 1)\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(1)` per operation**\n\n" +
    "Both push and pop perform a fixed number of hash map lookups and stack push/pop operations — each `O(1)` amortized. No iteration over elements is required.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The frequency map stores one entry per unique element. The stack-of-stacks together hold exactly `n` entries in total (one slot per push). Overall space grows linearly with the number of elements pushed.",

  bestAndWorstCase:
    "**Best case** — all pushed elements are distinct: every element has frequency 1, so `freqStacks` has only one level. Push and pop still run in `O(1)`, but no tiebreaking between frequency levels is needed.\n\n" +
    "**Worst case** — all pushed elements are identical: a single element reaches frequency `n`, producing `n` levels in `freqStacks`. Push and pop remain `O(1)` per call, but the structure uses `O(n)` space across `n` levels.\n\n" +
    "Both cases are `O(1)` per operation — the worst case only affects space, not time.",

  realWorldUses: [
    "**Cache eviction policies:** LFU (Least Frequently Used) caches evict the least frequent element instead of the most frequent, but the underlying frequency-grouped data structure is identical — just inverted.",
    "**Recommendation systems:** Surfacing the most frequently interacted-with items (songs, products, articles) uses frequency tracking analogous to this stack's `freqMap`.",
    "**Task scheduling:** Operating systems and job queues can use frequency-based ordering to prioritize or deprioritize recurring task types.",
    "**Rate limiting and analytics:** Counting and ranking events by occurrence frequency in streaming data relies on the same map-of-counters pattern.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(1) push and pop — both operations are constant time regardless of the number of elements.",
      "Correct tiebreaking — elements with equal frequency are popped in LIFO order, matching natural stack behavior.",
      "Clean separation of concerns — freqMap and freqStacks each have a single responsibility.",
    ],
    limitations: [
      "O(n) space — stores every pushed element in the stack-of-stacks, plus the frequency map.",
      "Frequency levels are never reclaimed once maxFrequency decreases — the freqStacks entries for old levels remain allocated until garbage collected.",
      "Not a general-purpose stack — it does not support arbitrary peek or indexed access; only the most frequent element is accessible.",
    ],
  },

  whenToUseIt:
    "Use Max Frequency Stack when you need to retrieve elements in most-frequent-first order and want `O(1)` per operation. It is the building block for **LFU caches** (swap 'max frequency' for 'min frequency') and any system that must rank items by access count in real time. If insertion order matters more than frequency, use a plain stack or queue instead.",
};
