import type { EducationalContent } from "@/types";

export const onlineStockSpanEducational: EducationalContent = {
  overview:
    "**Online Stock Span** (LeetCode 901) computes, for each day's stock price, the number of consecutive days up to and including today where the price was less than or equal to today's price.\n\nA **monotonic decreasing stack** of `(price, span)` pairs makes this efficient: whenever a new price arrives, pop all stack entries with a smaller or equal price, accumulate their spans, then push the new pair. Each element is pushed and popped at most once, giving amortized O(1) per query.",

  howItWorks:
    "The algorithm maintains a stack of `(price, span)` pairs ordered so that prices are strictly decreasing from bottom to top:\n\n" +
    "1. **For each price** → set `spanCount = 1`.\n" +
    "2. **While** the stack is non-empty and the top price is ≤ today's price:\n" +
    "   - Add the top span to `spanCount`.\n" +
    "   - Pop the top entry.\n" +
    "3. **Push** `(todayPrice, spanCount)` onto the stack.\n" +
    "4. Record `spanCount` as today's result.\n\n" +
    "### Example trace on `[100, 80, 60, 70, 60, 75, 85]`\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    "    subgraph Day 3 price=70\n" +
    '    A["stack: (100,1)(80,1)(60,1)"] -->|"pop 60≤70, span+=1"| B["(100,1)(80,1)"]\n' +
    '    B -->|"push (70,2)"| C["(100,1)(80,1)(70,2)"]\n' +
    "    end\n" +
    "    subgraph Day 6 price=85\n" +
    '    D["(100,1)(80,1)(75,4)"] -->|"pop 75≤85, span+=4"| E["(100,1)(80,1)"]\n' +
    '    E -->|"pop 80≤85, span+=1"| F["(100,1)"]\n' +
    '    F -->|"push (85,6)"| G["(100,1)(85,6) → span=6"]\n' +
    "    end\n" +
    "    style A fill:#06b6d4,stroke:#0891b2\n" +
    "    style C fill:#f59e0b,stroke:#d97706\n" +
    "    style G fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Popped entries donate their accumulated spans to the new price, so each push already encodes the consecutive streak it represents.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)` amortized**\n\n" +
    "Each price is pushed onto the stack exactly once and popped at most once. Even though the inner `while` loop can run multiple times, the total number of push + pop operations across all `n` days is bounded by `2n`, so the amortized cost per day is `O(1)`.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "In the worst case (prices are strictly decreasing, e.g. `[100, 90, 80, ...]`) no element is ever popped, so the stack grows to size `n`.",

  bestAndWorstCase:
    "**Best case** — strictly increasing prices (e.g. `[10, 20, 30, 40]`): every previous element is popped on each step, the stack stays at size 1, and each query does the most work — but still `O(n)` total.\n\n" +
    "**Worst case** — strictly decreasing prices (e.g. `[100, 90, 80, 70]`): no elements are ever popped, the stack grows to size `n`, and every query is `O(1)`. Space usage is maximized.\n\n" +
    "Both cases are `O(n)` time overall due to the amortized argument.",

  realWorldUses: [
    "**Stock market dashboards:** Displaying the streak of days a stock has stayed below or at its current price — a common signal in technical analysis.",
    "**Streaming data analytics:** Computing rolling windows or streaks over continuous data feeds where you cannot look back arbitrarily far.",
    "**Game leaderboards:** Counting how long a player has maintained a score at or above a given threshold.",
    "**Sensor monitoring:** Detecting consecutive readings within an acceptable range for anomaly detection.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Amortized O(1) per query — handles real-time price streams with minimal latency.",
      "Single-pass algorithm with no lookahead — well-suited for online (streaming) scenarios.",
      "Stack naturally encodes all the information needed to answer future queries without re-scanning history.",
    ],
    limitations: [
      "O(n) auxiliary space in the worst case (strictly decreasing input).",
      "Only answers the 'span looking backwards' query — not suitable for forward-looking span questions without modification.",
      "Requires storing `(price, span)` pairs; a naïve counter approach would be O(n²) per query.",
    ],
  },

  whenToUseIt:
    "Use the monotonic stack approach whenever you need to count consecutive preceding elements that satisfy a monotonic condition (≤, ≥, <, >) relative to the current element. It generalises to problems like Daily Temperatures (next greater element), Largest Rectangle in Histogram, and Trapping Rain Water. If you only need a simple running maximum or minimum, a plain variable suffices — the stack shines when you need full span or range information.",
};
