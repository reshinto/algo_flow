import type { EducationalContent } from "@/types";

export const reorganizeStringEducational: EducationalContent = {
  overview:
    "**Reorganize String** (LeetCode 767) asks: given a string, rearrange its characters so that no two adjacent characters are the same. If it's impossible, return an empty string.\n\nThe greedy key insight is: **always append the most frequent remaining character** — as long as it is not the same as the character just appended. A **max-heap** sorted by frequency makes extracting the most frequent character O(log n) per step, yielding an **O(n log 26) ≈ O(n)** solution since there are at most 26 distinct characters.",

  howItWorks:
    "The algorithm uses a **max-heap of (frequency, character) pairs**:\n\n" +
    "1. **Count frequencies** — Tally each character's occurrence count in a hash map.\n" +
    "2. **Build the heap** — Insert all (frequency, character) pairs into a max-heap ordered by frequency.\n" +
    "3. **Greedy assembly** — While the heap is non-empty:\n" +
    "   - Extract the most frequent character (the root). Append it to the result.\n" +
    "   - Decrement its frequency. Hold it aside — it cannot be used in the next step.\n" +
    "   - Reinsert the previously held character (if its frequency > 0) back into the heap.\n" +
    "   - The character held aside becomes the new 'previous' for the next round.\n" +
    "4. **Impossibility check** — If the heap is empty but the held character still has frequency > 0, no valid arrangement exists — return empty string.\n\n" +
    '### Example: text = "aabbc"\n\n' +
    "```\n" +
    "Frequencies: { a:2, b:2, c:1 }\n" +
    "Heap: [(2,'a'), (2,'b'), (1,'c')]\n\n" +
    "Step 1: Extract 'a' (freq=2). result='a'. Hold 'a'(freq=1). Insert nothing (no prev).\n" +
    "Step 2: Extract 'b' (freq=2). result='ab'. Reinsert 'a'(1). Hold 'b'(1).\n" +
    "Step 3: Extract 'a' (freq=1). result='aba'. Reinsert 'b'(1). Hold nothing.\n" +
    "Step 4: Extract 'b' (freq=1). result='abab'. Heap empty. Hold nothing.\n" +
    "Step 5: Extract 'c' (freq=1). result='ababc'.\n\n" +
    "Output: 'ababc'\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n log k)`** where k ≤ 26 (number of distinct characters)\n\n" +
    "Counting frequencies is O(n). Building the heap is O(k). Each of the n characters requires one extraction and one insertion — each O(log k). Since k ≤ 26, log k is a constant, making the effective complexity **O(n)**.\n\n" +
    "**Space Complexity: `O(k)` ≈ O(1)**\n\n" +
    "The frequency map and heap hold at most 26 entries. The output string is O(n) but that's required output space, not working memory.",

  bestAndWorstCase:
    "**Best case — O(n):** All characters are distinct (k = n, each frequency = 1). The heap has n entries but each extraction is O(log n). For the typical use case where k ≤ 26, it is always O(n).\n\n" +
    "**Worst case (impossible) — O(n):** One character appears more than ⌈n/2⌉ times. The algorithm detects this at the last step when the heap empties with a held character remaining. No extra work is needed — the greedy process naturally discovers impossibility.",

  realWorldUses: [
    "**Load balancing:** Distribute tasks of the same type evenly across time slots so no two identical tasks run back-to-back — the task scheduler problem is a direct extension.",
    "**Password generation:** Generate passwords where no character repeats consecutively, subject to frequency constraints.",
    "**DNA sequence design:** Arrange nucleotide sequences to minimize repeated adjacent bases that could cause secondary structure formation.",
    "**Music playlist shuffling:** Reorganize playlists so the same artist or genre does not appear in consecutive slots.",
    "**Network packet scheduling:** Distribute packet types across time windows to avoid bursts of the same protocol.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) effective time — since the alphabet size is bounded (26 for lowercase letters), the log factor is constant.",
      "Greedy optimality — always placing the most frequent character ensures the best chance of a valid arrangement.",
      "Clean impossibility detection — the algorithm naturally detects when no valid arrangement exists without any preprocessing.",
    ],
    limitations: [
      "Returns only one valid arrangement — there may be many valid rearrangements, but this approach finds just one.",
      "Does not generalize to arbitrary cooldown constraints without modification — the Task Scheduler problem is a related but harder variant.",
      "Requires holding a 'previous' entry outside the heap, which adds a small amount of bookkeeping complexity.",
    ],
  },

  whenToUseIt:
    "Use Reorganize String whenever you need to greedily interleave items by frequency with an adjacency constraint. The max-heap pattern generalizes directly to the Task Scheduler problem (with cooldown > 1), multi-color ball arrangement, and any scheduling problem where the same resource cannot be used consecutively. If the adjacency constraint spans more than one position (cooldown > 1), see Task Scheduler Heap. If the alphabet is unbounded, the O(n log k) complexity reverts to a true log factor.",
};
