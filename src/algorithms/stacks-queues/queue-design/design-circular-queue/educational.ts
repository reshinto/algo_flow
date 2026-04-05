import type { EducationalContent } from "@/types";

export const designCircularQueueEducational: EducationalContent = {
  overview:
    "**Design Circular Queue** (LeetCode 622) implements a fixed-capacity FIFO queue using a ring buffer. Two integer pointers — `front` and `rear` — track the read and write positions within a pre-allocated array. When a pointer reaches the end of the array, modular arithmetic wraps it back to the start, enabling the buffer to reuse freed slots without shifting elements.\n\nThis is the foundation of many real-world systems: I/O buffers, network packet queues, audio streaming pipelines, and operating-system scheduler rings all use the same pattern.",

  howItWorks:
    "The ring buffer holds `capacity` slots. `front` points to the oldest element; `rear` points to the newest. Both start at `-1` to signal an empty queue.\n\n" +
    "**Enqueue(value)**\n" +
    '1. Reject if `size == capacity` → return `"full"`.\n' +
    "2. On first enqueue, set `front = 0`.\n" +
    "3. Advance `rear = (rear + 1) % capacity`, write `buffer[rear] = value`, increment `size`.\n\n" +
    "**Dequeue**\n" +
    '1. Reject if `size == 0` → return `"empty"`.\n' +
    "2. Read `buffer[front]`, clear the slot.\n" +
    "3. If `front == rear`, the queue is now empty: reset both to `-1`.\n" +
    "4. Otherwise advance `front = (front + 1) % capacity`, decrement `size`.\n\n" +
    '**Front / Rear peek** — return `buffer[front]` or `buffer[rear]`; return `"empty"` if the queue is empty.\n\n' +
    "### Example trace (capacity = 3)\n\n" +
    "```\n" +
    "op            buffer         front  rear  size\n" +
    "init          [_, _, _]       -1    -1     0\n" +
    "enqueue 1     [1, _, _]        0     0     1\n" +
    "enqueue 2     [1, 2, _]        0     1     2\n" +
    "enqueue 3     [1, 2, 3]        0     2     3  ← full\n" +
    "dequeue       [_, 2, 3]        1     2     2  ← returns 1\n" +
    "enqueue 4     [4, 2, 3]        1     0     3  ← wraps around\n" +
    "front         returns 2\n" +
    "rear          returns 4\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(1)` per operation**\n\n" +
    "Enqueue, dequeue, front, and rear are all constant-time: a modular increment and a single array write or read. There is no shifting or resizing.\n\n" +
    "**Space Complexity: `O(k)`** where `k` is the fixed capacity\n\n" +
    "Memory is allocated once at construction and never reallocated regardless of how many enqueue/dequeue operations are performed.",

  bestAndWorstCase:
    "**Best case** — a single operation on an empty or full queue: `O(1)` — constant work regardless of capacity.\n\n" +
    "**Worst case** — still `O(1)` per operation. The ring buffer never degrades; no operation has an amortised cost because there is nothing to amortise.\n\n" +
    "The only cost that scales with `k` is the one-time initialisation of the backing array.",

  realWorldUses: [
    "**Operating system I/O buffers:** Keyboard, network, and disk drivers use ring buffers to decouple hardware interrupt rates from software processing speeds.",
    "**Network packet queues:** Routers and NICs store in-flight packets in circular buffers to absorb bursts without unbounded memory growth.",
    "**Audio and video streaming:** Media players use ring buffers to keep a rolling window of decoded frames so playback is never stalled by a slow decoder.",
    "**Producer-consumer pipelines:** Any bounded-buffer problem — thread-safe queues between goroutines, actors, or workers — benefits from the zero-allocation, cache-friendly ring buffer.",
    "**Embedded systems:** Microcontrollers with strict memory limits use circular buffers for UART/SPI receive queues because the fixed footprint is known at compile time.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(1) time for every operation — no amortised cost, no worst-case spikes.",
      "Fixed memory footprint — allocated once, never reallocated.",
      "Cache-friendly sequential access pattern through contiguous array storage.",
      "Simple implementation with only two pointers and one counter.",
    ],
    limitations: [
      'Fixed capacity — the buffer cannot grow; callers must handle `"full"` responses.',
      "O(k) initialisation cost — the backing array must be allocated before any operation.",
      "Not thread-safe by default; concurrent producers/consumers require external synchronisation.",
      "Distinguishing full from empty requires an explicit size counter (or sacrificing one slot).",
    ],
  },

  whenToUseIt:
    "Use a circular queue when the maximum number of in-flight items is bounded and known in advance, and when O(1) guaranteed throughput matters more than unbounded capacity. If the capacity is unknown or must grow dynamically, prefer a linked-list queue or a dynamically-resized deque. For single-producer / single-consumer lock-free patterns, a circular buffer is the canonical choice.",
};
