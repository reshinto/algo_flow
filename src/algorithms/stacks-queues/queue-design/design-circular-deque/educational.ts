import type { EducationalContent } from "@/types";

export const designCircularDequeEducational: EducationalContent = {
  overview:
    "**Design Circular Deque** (LeetCode 641) extends the circular queue to a double-ended queue (deque) with a fixed capacity. Two integer pointers — `front` and `rear` — track the read positions at both ends of a pre-allocated ring buffer. Insertions and deletions at either end use modular arithmetic to wrap the pointers, enabling O(1) operations with no memory reallocation.\n\nDeques appear wherever both stack-like (LIFO) and queue-like (FIFO) behaviour are needed simultaneously: browser history navigation, sliding-window maximum algorithms, and monotonic deque techniques all rely on this data structure.",

  howItWorks:
    "The ring buffer holds `capacity` slots. `front` points to the oldest element at the left end; `rear` points to the newest element at the right end. Both start at `-1` to signal an empty deque.\n\n" +
    "**PushBack(value)**\n" +
    '1. Reject if `size == capacity` → return `"full"`.\n' +
    "2. On first insertion, set `front = 0`.\n" +
    "3. Advance `rear = (rear + 1) % capacity`, write `buffer[rear] = value`, increment `size`.\n\n" +
    "**PushFront(value)**\n" +
    '1. Reject if `size == capacity` → return `"full"`.\n' +
    "2. On first insertion, set `front = rear = 0`.\n" +
    "3. Otherwise retreat `front = (front - 1 + capacity) % capacity`, write `buffer[front] = value`, increment `size`.\n\n" +
    "**PopFront**\n" +
    '1. Reject if `size == 0` → return `"empty"`.\n' +
    "2. Read `buffer[front]`, clear the slot.\n" +
    "3. If `front == rear`, the deque is now empty: reset both to `-1`.\n" +
    "4. Otherwise advance `front = (front + 1) % capacity`, decrement `size`.\n\n" +
    "**PopBack**\n" +
    '1. Reject if `size == 0` → return `"empty"`.\n' +
    "2. Read `buffer[rear]`, clear the slot.\n" +
    "3. If `front == rear`, the deque is now empty: reset both to `-1`.\n" +
    "4. Otherwise retreat `rear = (rear - 1 + capacity) % capacity`, decrement `size`.\n\n" +
    '**PeekFront / PeekRear** — return `buffer[front]` or `buffer[rear]`; return `"empty"` if the deque is empty.\n\n' +
    "### Example trace (capacity = 3)\n\n" +
    "```\n" +
    "op              buffer         front  rear  size\n" +
    "init            [_, _, _]       -1    -1     0\n" +
    "pushBack 1      [1, _, _]        0     0     1\n" +
    "pushFront 2     [1, _, 2]        2     0     2  ← front wraps to slot 2\n" +
    "popBack         [1, _, _]        2     0     1  ← removes 1 from slot 0\n" +
    "pushBack 3      [1, 3, _]  wait — slot 0 is the old rear...\n" +
    "peekFront       returns 2  ← front is at slot 2\n" +
    "peekRear        returns 3  ← rear is at slot 1\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(1)` per operation**\n\n" +
    "All four insertion/removal operations and both peek operations are constant-time: a modular increment or decrement and a single array write or read. No shifting or resizing occurs.\n\n" +
    "**Space Complexity: `O(k)`** where `k` is the fixed capacity\n\n" +
    "Memory is allocated once at construction. Unlike a dynamic array or linked list, the ring buffer never reallocates regardless of how many push/pop operations are performed.",

  bestAndWorstCase:
    "**Best case** — a single operation on an empty or full deque: `O(1)` — constant work regardless of capacity.\n\n" +
    "**Worst case** — still `O(1)` per operation. Because the ring buffer never resizes and every pointer update is a single modular arithmetic step, there is no amortised cost and no worst-case degradation.\n\n" +
    "The one-time initialisation of the backing array is `O(k)` but is a construction cost, not a per-operation cost.",

  realWorldUses: [
    "**Browser history:** Forward/back navigation maintains a bounded deque of visited URLs — new pages push to the rear, back presses pop from the rear, forward presses push from the front.",
    "**Sliding window maximum (monotonic deque):** Algorithms that need the maximum of the last `k` elements in O(1) per element use a deque to maintain a decreasing front-to-rear order, pushing to the rear and popping from both ends.",
    "**Work-stealing schedulers:** Thread pools such as Java's `ForkJoinPool` use per-thread deques where the owning thread pops from the rear (stack discipline) and thief threads steal from the front (queue discipline).",
    "**Undo/redo stacks:** Text editors maintain a bounded circular deque of edit operations; undo pops from the rear while redo pushes back, and oldest history is evicted from the front when the deque is full.",
    "**Embedded UART buffers:** Bidirectional serial communication drivers use a circular deque so both the ISR and the application layer can insert or remove bytes from either end without memory allocation.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(1) time for every operation — insertions and removals at both ends are equally fast.",
      "Fixed memory footprint — allocated once at construction, never reallocated.",
      "Cache-friendly contiguous array layout with pointer arithmetic instead of pointer chasing.",
      "Supports both stack and queue access patterns simultaneously from a single structure.",
    ],
    limitations: [
      'Fixed capacity — the buffer cannot grow; callers must handle `"full"` responses.',
      "O(k) initialisation cost — the backing array must be pre-allocated before any operation.",
      "Not thread-safe by default; concurrent producers/consumers at both ends require synchronisation.",
      "Wrap-around pointer arithmetic `(index - 1 + capacity) % capacity` is slightly more error-prone than a simple increment.",
    ],
  },

  whenToUseIt:
    "Use a circular deque when you need both LIFO and FIFO access patterns, the maximum number of in-flight items is bounded and known in advance, and O(1) guaranteed throughput at both ends is required. If only one-ended access is needed, a circular queue suffices. If capacity is unknown or must grow dynamically, prefer a linked-list deque or `ArrayDeque`. For sliding-window maximum/minimum problems, the monotonic deque pattern built on this structure is the canonical O(n) solution.",
};
