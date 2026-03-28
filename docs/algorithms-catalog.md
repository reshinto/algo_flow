[← Back to README](../README.md)

# Algorithm Catalog

Complete listing of all 58 algorithms available in AlgoFlow, organized by category with visualizer descriptions and technique subcategories.

> **Prerequisites:** None — this is a reference document.

## Contents

- [Sorting (1)](#sorting-1-algorithm)
- [Searching (1)](#searching-1-algorithm)
- [Graph (1)](#graph-1-algorithm)
- [Pathfinding (1)](#pathfinding-1-algorithm)
- [Dynamic Programming (2)](#dynamic-programming-2-algorithms)
- [Arrays (44)](#arrays-44-algorithms)
- [Trees (1)](#trees-1-algorithm)
- [Linked Lists (1)](#linked-lists-1-algorithm)
- [Heaps (1)](#heaps-1-algorithm)
- [Stacks & Queues (1)](#stacks--queues-1-algorithm)
- [Hash Maps (1)](#hash-maps-1-algorithm)
- [Strings (1)](#strings-1-algorithm)
- [Matrices (1)](#matrices-1-algorithm)
- [Sets (1)](#sets-1-algorithm)

---

## Sorting (1 algorithm)

Algorithms that arrange elements in a specific order.

| Algorithm   | Visualizer         | Source Directory                      |
| ----------- | ------------------ | ------------------------------------- |
| Bubble Sort | Animated bar chart | `src/algorithms/sorting/bubble-sort/` |

---

## Searching (1 algorithm)

Algorithms that find elements in data structures.

| Algorithm     | Visualizer                       | Source Directory                          |
| ------------- | -------------------------------- | ----------------------------------------- |
| Binary Search | Bar chart with pointer narrowing | `src/algorithms/searching/binary-search/` |

---

## Graph (1 algorithm)

Algorithms that traverse or analyze graph structures.

| Algorithm            | Visualizer            | Source Directory            |
| -------------------- | --------------------- | --------------------------- |
| Breadth-First Search | SVG node + edge graph | `src/algorithms/graph/bfs/` |

---

## Pathfinding (1 algorithm)

Algorithms that find shortest paths in grids or weighted graphs.

| Algorithm            | Visualizer              | Source Directory                       |
| -------------------- | ----------------------- | -------------------------------------- |
| Dijkstra's Algorithm | CSS grid with wavefront | `src/algorithms/pathfinding/dijkstra/` |

---

## Dynamic Programming (2 algorithms)

Break problems into overlapping subproblems and cache results.

| Algorithm               | Visualizer            | Source Directory                                            |
| ----------------------- | --------------------- | ----------------------------------------------------------- |
| Fibonacci (Tabulation)  | DP table cells        | `src/algorithms/dynamic-programming/fibonacci-tabulation/`  |
| Fibonacci (Memoization) | DP table + call stack | `src/algorithms/dynamic-programming/fibonacci-memoization/` |

---

## Arrays (44 algorithms)

The largest category, covering a wide range of array manipulation techniques.

### Two Pointers

| Algorithm                     | Visualizer                                   |
| ----------------------------- | -------------------------------------------- |
| Move Zeros to End             | Bar chart with fast/slow pointers            |
| Remove Duplicates (Sorted)    | Bar chart with write/read pointers           |
| Two Sum (Sorted, Two Pointer) | Bar chart with converging pointers           |
| Three Sum (Zero Triplets)     | Bar chart with anchor + two pointers         |
| Four Sum                      | Bar chart with four pointers                 |
| Container With Most Water     | Bar chart with converging pointers           |
| Trapping Rain Water           | Bar chart with two-pointer water calculation |
| Dutch National Flag           | Bar chart with 3-way partition pointers      |

### Sliding Window (Fixed)

| Algorithm                      | Visualizer                               |
| ------------------------------ | ---------------------------------------- |
| Sliding Window (Max Sum)       | Bar chart with window range              |
| Sliding Window (Min Sum)       | Bar chart with window range              |
| Count Anagram Windows          | Bar chart with frequency-matching window |
| First Negative in Window       | Bar chart with deque-tracked negatives   |
| Sliding Window Maximum (Deque) | Bar chart with deque-based max tracking  |

### Sliding Window (Variable)

| Algorithm                   | Visualizer                                   |
| --------------------------- | -------------------------------------------- |
| Longest K-Distinct Subarray | Bar chart with distinct-count window         |
| Min Size Subarray Sum       | Bar chart with variable window               |
| Subarray Product < K        | Bar chart with product-based variable window |
| Max Consecutive Ones III    | Bar chart with zero-flip window              |

### Kadane's / Subarray

| Algorithm                         | Visualizer                              |
| --------------------------------- | --------------------------------------- |
| Kadane's Algorithm (Max Subarray) | Bar chart with extend/restart window    |
| Minimum Subarray Sum              | Bar chart with inverted Kadane's window |
| Max Product Subarray              | Bar chart with dual min/max tracking    |

### Greedy / Stock Trading

| Algorithm                      | Visualizer                              |
| ------------------------------ | --------------------------------------- |
| Best Time Buy/Sell Stock       | Bar chart with min-price pointer        |
| Best Time Buy/Sell (Unlimited) | Bar chart with greedy profit highlights |
| Boyer-Moore Voting (Majority)  | Bar chart with candidate tracking       |

### Sorting & Partitioning

| Algorithm                   | Visualizer                              |
| --------------------------- | --------------------------------------- |
| Lomuto Partition            | Bar chart with pivot + boundary pointer |
| Quickselect (K-th Smallest) | Bar chart with partition narrowing      |
| Rotate Array (Reversal)     | Bar chart with three-pass reversal      |
| Rotate Array (Cyclic)       | Bar chart with cycle-following swaps    |
| Cyclic Sort                 | Bar chart with index-placement swaps    |
| Merge Two Sorted Arrays     | Dual bar chart (inputs + merged result) |
| Counting Sort               | Dual bar chart (input + count array)    |

### Bit Manipulation

| Algorithm                 | Visualizer                                 |
| ------------------------- | ------------------------------------------ |
| Find Missing Number (XOR) | Bar chart with running XOR highlight       |
| Single Number (XOR)       | Bar chart with pair-cancellation highlight |

### Index Marking

| Algorithm              | Visualizer                             |
| ---------------------- | -------------------------------------- |
| Find All Duplicates    | Bar chart with sign-negation marking   |
| First Missing Positive | Bar chart with placement + scan phases |

### Monotonic Stack

| Algorithm                      | Visualizer                                     |
| ------------------------------ | ---------------------------------------------- |
| Next Greater Element           | Bar chart with monotonic stack resolution      |
| Previous Smaller Element       | Bar chart with monotonic stack (left scan)     |
| Daily Temperatures             | Bar chart with distance-based stack resolution |
| Largest Rectangle in Histogram | Bar chart (histogram) with monotonic stack     |

### Prefix / Suffix

| Algorithm                       | Visualizer                             |
| ------------------------------- | -------------------------------------- |
| Prefix Sum (Range Query)        | Dual bar chart (original + prefix sum) |
| Subarray Sum Equals K           | Bar chart with prefix sum + hash map   |
| Product of Array Except Self    | Bar chart with two-pass prefix/suffix  |
| Difference Array (Range Update) | Dual bar chart (diff array + result)   |
| XOR Range Query                 | Dual bar chart (original + prefix XOR) |

### Cycle Detection

| Algorithm               | Visualizer                            |
| ----------------------- | ------------------------------------- |
| Floyd's Cycle Detection | Bar chart with tortoise/hare pointers |

---

## Trees (1 algorithm)

Algorithms that traverse or manipulate tree data structures.

| Algorithm              | Visualizer                           | Source Directory                    |
| ---------------------- | ------------------------------------ | ----------------------------------- |
| BST In-Order Traversal | SVG binary tree with traversal order | `src/algorithms/trees/bst-inorder/` |

---

## Linked Lists (1 algorithm)

Algorithms that manipulate linked list nodes.

| Algorithm           | Visualizer                            | Source Directory                                   |
| ------------------- | ------------------------------------- | -------------------------------------------------- |
| Reverse Linked List | SVG node chain with pointer animation | `src/algorithms/linked-lists/reverse-linked-list/` |

---

## Heaps (1 algorithm)

Algorithms involving heap/priority queue operations.

| Algorithm      | Visualizer                                | Source Directory                       |
| -------------- | ----------------------------------------- | -------------------------------------- |
| Build Min Heap | SVG tree + array dual-view with sift-down | `src/algorithms/heaps/build-min-heap/` |

---

## Stacks & Queues (1 algorithm)

Algorithms using stack or queue data structures.

| Algorithm         | Visualizer                                 | Source Directory                                  |
| ----------------- | ------------------------------------------ | ------------------------------------------------- |
| Valid Parentheses | Stack push/pop with input character states | `src/algorithms/stacks-queues/valid-parentheses/` |

---

## Hash Maps (1 algorithm)

Algorithms leveraging hash table lookups.

| Algorithm | Visualizer                    | Source Directory                    |
| --------- | ----------------------------- | ----------------------------------- |
| Two Sum   | Input array + key→value table | `src/algorithms/hash-maps/two-sum/` |

---

## Strings (1 algorithm)

Algorithms for string matching and manipulation.

| Algorithm  | Visualizer                           | Source Directory                     |
| ---------- | ------------------------------------ | ------------------------------------ |
| KMP Search | Text row, pattern row, failure table | `src/algorithms/strings/kmp-search/` |

---

## Matrices (1 algorithm)

Algorithms operating on 2D matrix structures.

| Algorithm              | Visualizer                              | Source Directory                        |
| ---------------------- | --------------------------------------- | --------------------------------------- |
| Spiral Order Traversal | CSS grid with boundary shrink animation | `src/algorithms/matrices/spiral-order/` |

---

## Sets (1 algorithm)

Algorithms involving set operations.

| Algorithm        | Visualizer                                | Source Directory                        |
| ---------------- | ----------------------------------------- | --------------------------------------- |
| Set Intersection | Array A, array B, hash set, result panels | `src/algorithms/sets/set-intersection/` |

---

## Adding New Algorithms

See the [full algorithm walkthrough](contributing.md#adding-a-new-algorithm) in the contributing guide for step-by-step instructions.

## See Also

- [Contributing](contributing.md#adding-a-new-algorithm) — how to add a new algorithm
- [Architecture](architecture.md) — registry pattern, data flow, visualizers
- [Glossary](glossary.md) — key terms (AlgorithmDefinition, ExecutionStep, Tracker)
