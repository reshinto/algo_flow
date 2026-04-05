import type { EducationalContent } from "@/types";

export const asteroidCollisionEducational: EducationalContent = {
  overview:
    "**Asteroid Collision** simulates a row of asteroids moving through space. Positive integers move right, negative integers move left. When a right-moving asteroid meets a left-moving one, they collide: the smaller explodes, equal-sized asteroids both explode, and the larger survives. Two asteroids moving in the same direction never collide.\n\nA stack is the natural structure: right-moving asteroids pile up waiting for a potential left-mover, and each new left-mover repeatedly challenges the stack top until it survives or is itself destroyed.",

  howItWorks:
    "The algorithm scans left to right and maintains a stack of surviving asteroids:\n\n" +
    "1. **Right-moving asteroid** (positive) → always push onto the stack (no collision possible yet).\n" +
    "2. **Left-moving asteroid** (negative) → enter a collision loop:\n" +
    "   - If the stack is empty or the top is also left-moving → no collision, push the asteroid.\n" +
    "   - If `stack.top < |current|` → stack top explodes, pop and keep looping.\n" +
    "   - If `stack.top == |current|` → both explode, pop and mark current as dead.\n" +
    "   - If `stack.top > |current|` → current explodes, mark as dead and stop looping.\n" +
    "3. If the asteroid survived the loop, push it onto the stack.\n" +
    "4. Return the stack contents as the final array.\n\n" +
    "### Example trace on `[5, 10, -5]`\n\n" +
    "```\n" +
    "asteroid  action                         stack\n" +
    "5         push (moving right)            [5]\n" +
    "10        push (moving right)            [5, 10]\n" +
    "-5        compare: 10 > |-5| → -5 dies  [5, 10]\n" +
    "end       result                         [5, 10]\n" +
    "```\n\n" +
    "### Example trace on `[8, -8]`\n\n" +
    "```\n" +
    "asteroid  action                          stack\n" +
    "8         push (moving right)             [8]\n" +
    "-8        compare: 8 == |-8| → both die  []\n" +
    "end       result                          []\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Each asteroid is pushed onto the stack at most once and popped at most once. Even though there is a nested collision loop, the total number of pop operations across the entire algorithm cannot exceed the total number of push operations, which is at most `n`. The amortised cost per asteroid is therefore `O(1)`.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "In the worst case (all asteroids moving in the same direction), every asteroid is pushed onto the stack without any collisions, using `O(n)` extra space.",

  bestAndWorstCase:
    "**Best case** — all asteroids move in the same direction: no collisions occur, every asteroid is pushed once, giving `O(n)` time and `O(n)` space with the minimum constant factor.\n\n" +
    "**Worst case** — a sequence of right-moving asteroids followed by a single large left-mover that destroys all of them: the inner loop runs `n - 1` times for the last asteroid, but the total work across the entire pass is still `O(n)` due to amortisation.\n\n" +
    "The algorithm is `O(n)` in all cases.",

  realWorldUses: [
    "**Physics simulations:** Modelling one-dimensional particle or object collisions where direction and mass determine the outcome.",
    "**Collision detection in games:** Side-scrolling game engines use similar stack-based logic to resolve projectile impacts in order.",
    "**Event stream processing:** Merging opposing streams of events where later events can cancel earlier ones (e.g., undo/redo stacks).",
    "**Text editor backspace processing:** The related 'backspace string compare' problem uses an identical stack pattern to process delete characters.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) amortised time — each asteroid is processed at most twice (one push, one pop).",
      "In-place stack simulation with no extra data structures beyond the output stack.",
      "Handles all edge cases (same direction, equal mass, chain reactions) in a single unified loop.",
    ],
    limitations: [
      "O(n) extra space for the stack — cannot be done truly in-place without a more complex approach.",
      "Only models one-dimensional collisions; two-dimensional physics requires entirely different techniques.",
      "Assumes asteroids move at the same speed — variable speeds would require a different comparison model.",
    ],
  },

  whenToUseIt:
    "Use a stack whenever you need to repeatedly compare an incoming element against the most recently accepted element and potentially cancel both. The asteroid collision pattern generalises to any 'opposing forces' problem where each new item challenges the previous survivor. If the problem involves only one direction of challenge (e.g., 'next greater element'), a monotonic stack suffices; the two-way collision pattern here is specifically for mutual destruction scenarios.",
};
