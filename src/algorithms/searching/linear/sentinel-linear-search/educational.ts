import type { EducationalContent } from "@/types";

export const sentinelLinearSearchEducational: EducationalContent = {
  overview:
    "**Sentinel Linear Search** is an optimized variant of the classic linear search that eliminates one conditional check per loop iteration by temporarily placing the target value at the end of the array as a **sentinel**.\n\n" +
    "Because the sentinel guarantees the loop will always terminate on a match, the bounds check (`currentIndex < array.length`) can be removed from the inner loop. This halves the number of comparisons performed inside the loop, yielding a meaningful constant-factor speedup in practice — though the asymptotic complexity remains `O(n)`.\n\n" +
    "Like standard Linear Search, Sentinel Linear Search works on **unsorted arrays** and requires no preprocessing.",

  howItWorks:
    "1. **Save** the last element of the array: `lastElement = array[n - 1]`.\n" +
    "2. **Place the sentinel**: overwrite `array[n - 1]` with `targetValue`. This guarantees the loop will always find a match and exit naturally.\n" +
    "3. **Scan without bounds check**: loop `while (array[currentIndex] !== targetValue)`, incrementing the index. No `currentIndex < n` check is needed.\n" +
    "4. **Restore** the last element: `array[n - 1] = lastElement`.\n" +
    "5. **Validate the result**:\n" +
    "   - If `currentIndex < n - 1`: the match was found before the sentinel — return `currentIndex`.\n" +
    "   - If `currentIndex === n - 1` and `lastElement === targetValue`: the last element genuinely matches — return `currentIndex`.\n" +
    "   - Otherwise the only match was the sentinel itself — return `-1`.\n\n" +
    "### Step-by-Step Trace\n\n" +
    "```\n" +
    "Array: [4, 2, 7, 1, 9, 3, 8, 5]   Target: 9\n" +
    "\n" +
    "Save last: lastElement = 5\n" +
    "Place sentinel: array[7] = 9  →  [4, 2, 7, 1, 9, 3, 8, 9]\n" +
    "\n" +
    "Index 0: 4 ≠ 9  → advance\n" +
    "Index 1: 2 ≠ 9  → advance\n" +
    "Index 2: 7 ≠ 9  → advance\n" +
    "Index 3: 1 ≠ 9  → advance\n" +
    "Index 4: 9 = 9  → stop\n" +
    "\n" +
    "Restore: array[7] = 5\n" +
    "currentIndex (4) < n - 1 (7) → genuine match: FOUND at index 4\n" +
    "```\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["Save last=5\\nWrite sentinel: arr[7]=9"] --> B["idx=0 val=4 ≠ 9"]\n' +
    '  B -->|"advance"| C["idx=4 val=9 = 9\\nloop exits"]\n' +
    '  C --> D["Restore arr[7]=5"]\n' +
    '  D -->|"idx 4 < n-1 7"| E["✓ Genuine match\\nat index 4"]\n' +
    "  style A fill:#06b6d4,stroke:#0891b2\n" +
    "  style C fill:#f59e0b,stroke:#d97706\n" +
    "  style E fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "The sentinel at the array tail guarantees loop termination without a bounds check — each iteration performs only one comparison instead of two.",

  timeAndSpaceComplexity:
    "**Time Complexity**\n\n" +
    "| Case    | Complexity | Description |\n" +
    "|---------|-----------|-------------|\n" +
    "| Best    | `O(1)`    | Target is the first element |\n" +
    "| Average | `O(n)`    | Target is somewhere in the middle |\n" +
    "| Worst   | `O(n)`    | Target is last or absent |\n\n" +
    "The asymptotic complexity matches standard Linear Search, but the **constant factor** is roughly half because each loop iteration requires only one comparison (`array[i] !== target`) instead of two (`array[i] !== target` and `i < n`).\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a few scalar variables are used — no auxiliary data structures. The sentinel is placed in-place in the array and immediately restored, so no extra allocation is needed.",

  bestAndWorstCase:
    "**Best Case — `O(1)`**\n\n" +
    "The best case occurs when the target is the first element. The very first loop iteration matches, the index is less than `n - 1`, and the function returns index 0 after a single comparison.\n\n" +
    "**Worst Case — `O(n)`**\n\n" +
    "The worst case occurs when:\n" +
    "- The target is the **last element** — the loop runs to index `n - 1`, and the restoration + validation reveals a genuine match.\n" +
    "- The target is **absent** — the loop runs all the way to the sentinel at index `n - 1`, then restoration + validation confirms no real match, returning `-1`.\n\n" +
    "Despite the same worst-case complexity as basic Linear Search, real-world measurements often show Sentinel Linear Search completing in fewer CPU cycles because the inner loop is tighter — especially noticeable on large unsorted arrays.",

  realWorldUses: [
    "**Cache-Sensitive Scans:** Tight inner loops over large unsorted buffers benefit from the reduced per-iteration overhead, making sentinel search a practical micro-optimization in performance-critical code.",
    "**Embedded Systems:** Constrained environments where every CPU cycle matters can benefit from the reduced branch count even when asymptotic complexity stays the same.",
    "**Compiler-Optimized Search Routines:** Some standard library implementations use sentinel-style techniques internally for sequential searches on small or dynamically-typed collections.",
    "**Educational Comparison:** Often taught alongside standard Linear Search to illustrate how algorithm constants matter and how small code changes can affect real-world performance.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Faster in practice than standard Linear Search due to half the comparisons inside the loop.",
      "Works on **unsorted arrays** with no preprocessing required.",
      "Constant `O(1)` space — in-place modification is immediately reversed.",
      "Simple to implement and easy to reason about once the sentinel concept is understood.",
    ],
    limitations: [
      "Mutates the input array temporarily, which requires care in concurrent environments.",
      "Does **not** improve asymptotic complexity — still `O(n)` in average and worst cases.",
      "On very small arrays the setup overhead (save, write, restore) may negate the loop savings.",
      "Outperformed by Binary Search on sorted data — `O(log n)` vs `O(n)` makes Binary Search the right choice once sorting is available.",
    ],
  },

  whenToUseIt:
    "Use **Sentinel Linear Search** when:\n" +
    "- You need to scan an **unsorted array** and want better practical performance than a basic linear scan.\n" +
    "- You are processing **large unsorted datasets** where reducing per-iteration overhead provides a measurable speedup.\n" +
    "- Temporary mutation of the array is acceptable (single-threaded context or you hold exclusive access).\n\n" +
    "Avoid Sentinel Linear Search when:\n" +
    "- The array is **read-only** or shared across threads — the temporary write can cause data races.\n" +
    "- The data is **sorted** — Binary Search delivers `O(log n)` performance, which dwarfs the constant-factor gain of sentinel techniques.\n" +
    "- You need **multiple repeated searches** on a static dataset — sort once and use Binary Search for each query.",
};
