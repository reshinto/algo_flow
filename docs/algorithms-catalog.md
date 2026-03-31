[← Back to README](../README.md)

# Algorithm Catalog

Complete listing of all 169 algorithms available in AlgoFlow, organized by category with visualizer descriptions and technique subcategories.

> **Prerequisites:** None — this is a reference document.

## Contents

- [Sorting (1)](#sorting-1-algorithm)
- [Searching (1)](#searching-1-algorithm)
- [Graph (28)](#graph-28-algorithms)
- [Pathfinding (1)](#pathfinding-1-algorithm)
- [Dynamic Programming (32)](#dynamic-programming-32-algorithms)
- [Arrays (44)](#arrays-44-algorithms)
- [Trees (1)](#trees-1-algorithm)
- [Linked Lists (1)](#linked-lists-1-algorithm)
- [Heaps (28)](#heaps-28-algorithms)
- [Stacks & Queues (1)](#stacks--queues-1-algorithm)
- [Hash Maps (28)](#hash-maps-28-algorithms)
- [Strings (1)](#strings-1-algorithm)
- [Matrices (1)](#matrices-1-algorithm)
- [Sets (1)](#sets-1-algorithm)

---

## Sorting (1 algorithm)

Algorithms that arrange elements in a specific order. Algorithms live under `src/algorithms/sorting/<technique>/<algorithm>/`.

| Technique  | Algorithm   | Visualizer         | Source Directory                                 |
| ---------- | ----------- | ------------------ | ------------------------------------------------ |
| Comparison | Bubble Sort | Animated bar chart | `src/algorithms/sorting/comparison/bubble-sort/` |

---

## Searching (1 algorithm)

Algorithms that find elements in data structures. Algorithms live under `src/algorithms/searching/<technique>/<algorithm>/`.

| Technique | Algorithm     | Visualizer                       | Source Directory                                 |
| --------- | ------------- | -------------------------------- | ------------------------------------------------ |
| Binary    | Binary Search | Bar chart with pointer narrowing | `src/algorithms/searching/binary/binary-search/` |

---

## Graph (28 algorithms)

Algorithms that traverse or analyze graph structures. Algorithms live under `src/algorithms/graph/<technique>/<algorithm>/`.

### Traversal (4)

| Technique | Algorithm            | Visualizer            | Source Directory                                    |
| --------- | -------------------- | --------------------- | --------------------------------------------------- |
| Traversal | Breadth-First Search | SVG node + edge graph | `src/algorithms/graph/traversal/bfs/`               |
| Traversal | Depth-First Search   | SVG node + edge graph | `src/algorithms/graph/traversal/dfs/`               |
| Traversal | IDDFS                | SVG node + edge graph | `src/algorithms/graph/traversal/iddfs/`             |
| Traversal | Bidirectional BFS    | SVG node + edge graph | `src/algorithms/graph/traversal/bidirectional-bfs/` |

### Shortest Path (5)

| Technique     | Algorithm         | Visualizer            | Source Directory                                        |
| ------------- | ----------------- | --------------------- | ------------------------------------------------------- |
| Shortest Path | Dijkstra          | SVG node + edge graph | `src/algorithms/graph/shortest-path/dijkstra/`          |
| Shortest Path | Bellman-Ford      | SVG node + edge graph | `src/algorithms/graph/shortest-path/bellman-ford/`      |
| Shortest Path | Floyd-Warshall    | SVG node + edge graph | `src/algorithms/graph/shortest-path/floyd-warshall/`    |
| Shortest Path | A\* Search        | SVG node + edge graph | `src/algorithms/graph/shortest-path/a-star/`            |
| Shortest Path | DAG Shortest Path | SVG node + edge graph | `src/algorithms/graph/shortest-path/dag-shortest-path/` |

### Minimum Spanning Tree (3)

| Technique | Algorithm | Visualizer            | Source Directory                    |
| --------- | --------- | --------------------- | ----------------------------------- |
| MST       | Kruskal's | SVG node + edge graph | `src/algorithms/graph/mst/kruskal/` |
| MST       | Prim's    | SVG node + edge graph | `src/algorithms/graph/mst/prim/`    |
| MST       | Boruvka's | SVG node + edge graph | `src/algorithms/graph/mst/boruvka/` |

### Topological Sort (2)

| Technique        | Algorithm            | Visualizer            | Source Directory                                       |
| ---------------- | -------------------- | --------------------- | ------------------------------------------------------ |
| Topological Sort | Kahn's Algorithm     | SVG node + edge graph | `src/algorithms/graph/topological-sort/kahns/`         |
| Topological Sort | DFS Topological Sort | SVG node + edge graph | `src/algorithms/graph/topological-sort/dfs-topo-sort/` |

### Cycle Detection (3)

| Technique       | Algorithm                        | Visualizer            | Source Directory                                       |
| --------------- | -------------------------------- | --------------------- | ------------------------------------------------------ |
| Cycle Detection | DFS Cycle Detection (Directed)   | SVG node + edge graph | `src/algorithms/graph/cycle-detection/dfs-directed/`   |
| Cycle Detection | DFS Cycle Detection (Undirected) | SVG node + edge graph | `src/algorithms/graph/cycle-detection/dfs-undirected/` |
| Cycle Detection | Union-Find Cycle Detection       | SVG node + edge graph | `src/algorithms/graph/cycle-detection/union-find/`     |

### Connectivity (5)

| Technique    | Algorithm            | Visualizer            | Source Directory                                          |
| ------------ | -------------------- | --------------------- | --------------------------------------------------------- |
| Connectivity | Connected Components | SVG node + edge graph | `src/algorithms/graph/connectivity/connected-components/` |
| Connectivity | Tarjan's SCC         | SVG node + edge graph | `src/algorithms/graph/connectivity/tarjans-scc/`          |
| Connectivity | Kosaraju's SCC       | SVG node + edge graph | `src/algorithms/graph/connectivity/kosarajus-scc/`        |
| Connectivity | Bridges              | SVG node + edge graph | `src/algorithms/graph/connectivity/bridges/`              |
| Connectivity | Articulation Points  | SVG node + edge graph | `src/algorithms/graph/connectivity/articulation-points/`  |

### Network Flow (2)

| Technique    | Algorithm      | Visualizer            | Source Directory                                    |
| ------------ | -------------- | --------------------- | --------------------------------------------------- |
| Network Flow | Ford-Fulkerson | SVG node + edge graph | `src/algorithms/graph/network-flow/ford-fulkerson/` |
| Network Flow | Edmonds-Karp   | SVG node + edge graph | `src/algorithms/graph/network-flow/edmonds-karp/`   |

### Graph Coloring (2)

| Technique      | Algorithm       | Visualizer            | Source Directory                                 |
| -------------- | --------------- | --------------------- | ------------------------------------------------ |
| Graph Coloring | Greedy Coloring | SVG node + edge graph | `src/algorithms/graph/coloring/greedy-coloring/` |
| Graph Coloring | Bipartite Check | SVG node + edge graph | `src/algorithms/graph/coloring/bipartite-check/` |

### Eulerian (1)

| Technique | Algorithm              | Visualizer            | Source Directory                             |
| --------- | ---------------------- | --------------------- | -------------------------------------------- |
| Eulerian  | Hierholzer's Algorithm | SVG node + edge graph | `src/algorithms/graph/eulerian/hierholzers/` |

### Matching (1)

| Technique | Algorithm                    | Visualizer            | Source Directory                                     |
| --------- | ---------------------------- | --------------------- | ---------------------------------------------------- |
| Matching  | Hungarian Bipartite Matching | SVG node + edge graph | `src/algorithms/graph/matching/hungarian-bipartite/` |

---

## Pathfinding (1 algorithm)

Algorithms that find shortest paths in grids or weighted graphs. Algorithms live under `src/algorithms/pathfinding/<technique>/<algorithm>/`.

| Technique     | Algorithm            | Visualizer              | Source Directory                                     |
| ------------- | -------------------- | ----------------------- | ---------------------------------------------------- |
| Shortest Path | Dijkstra's Algorithm | CSS grid with wavefront | `src/algorithms/pathfinding/shortest-path/dijkstra/` |

---

## Dynamic Programming (32 algorithms)

Break problems into overlapping subproblems and cache results. Algorithms live under `src/algorithms/dynamic-programming/<technique>/<algorithm>/`.

| Technique    | Algorithm                                          | Time Complexity | Space Complexity | Approach    |
| ------------ | -------------------------------------------------- | --------------- | ---------------- | ----------- |
| 1D Linear    | Fibonacci (Memoization)                            | O(n)            | O(n)             | Memoization |
| 1D Linear    | Fibonacci (Tabulation)                             | O(n)            | O(n)             | Tabulation  |
| 1D Linear    | Climbing Stairs (Memoization)                      | O(n)            | O(n)             | Memoization |
| 1D Linear    | Climbing Stairs (Tabulation)                       | O(n)            | O(n)             | Tabulation  |
| 1D Linear    | Min Cost Climbing Stairs (Memoization)             | O(n)            | O(n)             | Memoization |
| 1D Linear    | Min Cost Climbing Stairs (Tabulation)              | O(n)            | O(n)             | Tabulation  |
| 1D Linear    | Tribonacci (Memoization)                           | O(n)            | O(n)             | Memoization |
| 1D Linear    | Tribonacci (Tabulation)                            | O(n)            | O(n)             | Tabulation  |
| 1D Linear    | House Robber (Memoization)                         | O(n)            | O(n)             | Memoization |
| 1D Linear    | House Robber (Tabulation)                          | O(n)            | O(n)             | Tabulation  |
| 1D Linear    | Count Bits (Tabulation)                            | O(n)            | O(n)             | Tabulation  |
| 1D Linear    | Decode Ways (Memoization)                          | O(n)            | O(n)             | Memoization |
| 1D Linear    | Decode Ways (Tabulation)                           | O(n)            | O(n)             | Tabulation  |
| Optimization | Coin Change — Minimum (Memoization)                | O(n × m)        | O(n)             | Memoization |
| Optimization | Coin Change — Minimum (Tabulation)                 | O(n × m)        | O(n)             | Tabulation  |
| Optimization | Integer Break (Memoization)                        | O(n²)           | O(n)             | Memoization |
| Optimization | Integer Break (Tabulation)                         | O(n²)           | O(n)             | Tabulation  |
| Optimization | Perfect Squares (Tabulation)                       | O(n × √n)       | O(n)             | Tabulation  |
| Optimization | Rod Cutting (Tabulation)                           | O(n²)           | O(n)             | Tabulation  |
| Counting     | Coin Change — Count Ways (Tabulation)              | O(n × m)        | O(n)             | Tabulation  |
| Counting     | Catalan Numbers (Tabulation)                       | O(n²)           | O(n)             | Tabulation  |
| Counting     | Unique Paths (Tabulation)                          | O(m × n)        | O(m × n)         | Tabulation  |
| Counting     | Pascal's Triangle Row (Tabulation)                 | O(n²)           | O(n)             | Tabulation  |
| Subsequence  | LIS — Longest Increasing Subsequence (Memoization) | O(n²)           | O(n)             | Memoization |
| Subsequence  | LIS — Longest Increasing Subsequence (Tabulation)  | O(n²)           | O(n)             | Tabulation  |
| Subsequence  | Maximum Subarray — Kadane's (Tabulation)           | O(n)            | O(n)             | Tabulation  |
| Subsequence  | Can Jump (Tabulation)                              | O(n²)           | O(n)             | Tabulation  |
| Subsequence  | Minimum Jumps (Tabulation)                         | O(n²)           | O(n)             | Tabulation  |
| Knapsack     | 0/1 Knapsack (Tabulation)                          | O(n × W)        | O(n × W)         | Tabulation  |
| Knapsack     | Partition Equal Subset Sum (Tabulation)            | O(n × sum)      | O(sum)           | Tabulation  |
| String DP    | Word Break (Memoization)                           | O(n²)           | O(n)             | Memoization |
| String DP    | Word Break (Tabulation)                            | O(n²)           | O(n)             | Tabulation  |

---

## Arrays (44 algorithms)

The largest category, covering a wide range of array manipulation techniques. Algorithms live under `src/algorithms/arrays/<technique>/<algorithm>/`.

| Technique              | Algorithm                         | Visualizer                                     |
| ---------------------- | --------------------------------- | ---------------------------------------------- |
| Sliding Window         | Sliding Window (Max Sum)          | Bar chart with window range                    |
| Sliding Window         | Sliding Window (Min Sum)          | Bar chart with window range                    |
| Sliding Window         | Sliding Window Maximum (Deque)    | Bar chart with deque-based max tracking        |
| Sliding Window         | Min Size Subarray Sum             | Bar chart with variable window                 |
| Sliding Window         | Count Anagram Windows             | Bar chart with frequency-matching window       |
| Sliding Window         | First Negative in Window          | Bar chart with deque-tracked negatives         |
| Sliding Window         | Longest K-Distinct Subarray       | Bar chart with distinct-count window           |
| Sliding Window         | Subarray Product < K              | Bar chart with product-based variable window   |
| Sliding Window         | Max Consecutive Ones III          | Bar chart with zero-flip window                |
| Sliding Window         | Minimum Subarray Sum              | Bar chart with inverted Kadane's window        |
| Two Pointer            | Two Sum (Sorted, Two Pointer)     | Bar chart with converging pointers             |
| Two Pointer            | Three Sum (Zero Triplets)         | Bar chart with anchor + two pointers           |
| Two Pointer            | Four Sum                          | Bar chart with four pointers                   |
| Two Pointer            | Container With Most Water         | Bar chart with converging pointers             |
| Two Pointer            | Move Zeros to End                 | Bar chart with fast/slow pointers              |
| Two Pointer            | Remove Duplicates (Sorted)        | Bar chart with write/read pointers             |
| Two Pointer            | Merge Two Sorted Arrays           | Dual bar chart (inputs + merged result)        |
| Prefix Sum             | Prefix Sum (Range Query)          | Dual bar chart (original + prefix sum)         |
| Prefix Sum             | Subarray Sum Equals K             | Bar chart with prefix sum + hash map           |
| Prefix Sum             | Difference Array (Range Update)   | Dual bar chart (diff array + result)           |
| Prefix Sum             | XOR Range Query                   | Dual bar chart (original + prefix XOR)         |
| Prefix Sum             | Product of Array Except Self      | Bar chart with two-pass prefix/suffix          |
| Stack-Based            | Next Greater Element              | Bar chart with monotonic stack resolution      |
| Stack-Based            | Previous Smaller Element          | Bar chart with monotonic stack (left scan)     |
| Stack-Based            | Daily Temperatures                | Bar chart with distance-based stack resolution |
| Stack-Based            | Trapping Rain Water               | Bar chart with two-pointer water calculation   |
| Stack-Based            | Largest Rectangle in Histogram    | Bar chart (histogram) with monotonic stack     |
| Sorting & Partitioning | Dutch National Flag               | Bar chart with 3-way partition pointers        |
| Sorting & Partitioning | Lomuto Partition                  | Bar chart with pivot + boundary pointer        |
| Sorting & Partitioning | Counting Sort                     | Dual bar chart (input + count array)           |
| Sorting & Partitioning | Quickselect (K-th Smallest)       | Bar chart with partition narrowing             |
| Cyclic Sort            | Cyclic Sort                       | Bar chart with index-placement swaps           |
| Cyclic Sort            | Find Missing Number (XOR)         | Bar chart with running XOR highlight           |
| Cyclic Sort            | Find All Duplicates               | Bar chart with sign-negation marking           |
| Cyclic Sort            | First Missing Positive            | Bar chart with placement + scan phases         |
| Kadane / Subarray      | Kadane's Algorithm (Max Subarray) | Bar chart with extend/restart window           |
| Kadane / Subarray      | Max Product Subarray              | Bar chart with dual min/max tracking           |
| Kadane / Subarray      | Best Time Buy/Sell Stock          | Bar chart with min-price pointer               |
| Kadane / Subarray      | Best Time Buy/Sell (Unlimited)    | Bar chart with greedy profit highlights        |
| Bit Manipulation       | Single Number (XOR)               | Bar chart with pair-cancellation highlight     |
| Cycle Detection        | Floyd's Cycle Detection           | Bar chart with tortoise/hare pointers          |
| Rotation               | Rotate Array (Reversal)           | Bar chart with three-pass reversal             |
| Rotation               | Rotate Array (Cyclic)             | Bar chart with cycle-following swaps           |
| Voting                 | Boyer-Moore Voting (Majority)     | Bar chart with candidate tracking              |

---

## Trees (1 algorithm)

Algorithms that traverse or manipulate tree data structures. Algorithms live under `src/algorithms/trees/<technique>/<algorithm>/`.

| Technique | Algorithm              | Visualizer                           | Source Directory                              |
| --------- | ---------------------- | ------------------------------------ | --------------------------------------------- |
| Traversal | BST In-Order Traversal | SVG binary tree with traversal order | `src/algorithms/trees/traversal/bst-inorder/` |

---

## Linked Lists (1 algorithm)

Algorithms that manipulate linked list nodes. Algorithms live under `src/algorithms/linked-lists/<technique>/<algorithm>/`.

| Technique    | Algorithm           | Visualizer                            | Source Directory                                                |
| ------------ | ------------------- | ------------------------------------- | --------------------------------------------------------------- |
| Manipulation | Reverse Linked List | SVG node chain with pointer animation | `src/algorithms/linked-lists/manipulation/reverse-linked-list/` |

---

## Heaps (28 algorithms)

Algorithms involving heap/priority queue operations. Algorithms live under `src/algorithms/heaps/<technique>/<algorithm>/`.

| Technique      | Algorithm               | Visualizer                                 | Source Directory                                             |
| -------------- | ----------------------- | ------------------------------------------ | ------------------------------------------------------------ |
| Construction   | Build Min Heap          | SVG tree + array dual-view with sift-down  | `src/algorithms/heaps/construction/build-min-heap/`          |
| Construction   | Build Max Heap          | SVG tree + array dual-view with sift-down  | `src/algorithms/heaps/construction/build-max-heap/`          |
| Construction   | Build Heap (Top-Down)   | SVG tree with sift-up insertion            | `src/algorithms/heaps/construction/build-heap-top-down/`     |
| Construction   | Heapify Single Node     | SVG tree with single sift-down path        | `src/algorithms/heaps/construction/heapify-single-node/`     |
| Operations     | Heap Insert             | SVG tree with sift-up after append         | `src/algorithms/heaps/operations/heap-insert/`               |
| Operations     | Extract Min             | SVG tree with root extraction + sift-down  | `src/algorithms/heaps/operations/heap-extract-min/`          |
| Operations     | Extract Max             | SVG tree with root extraction + sift-down  | `src/algorithms/heaps/operations/heap-extract-max/`          |
| Operations     | Heap Peek               | SVG tree with root highlight               | `src/algorithms/heaps/operations/heap-peek/`                 |
| Operations     | Delete Arbitrary Node   | SVG tree with replacement + sift           | `src/algorithms/heaps/operations/heap-delete-arbitrary/`     |
| Operations     | Decrease Key            | SVG tree with value update + sift-up       | `src/algorithms/heaps/operations/heap-decrease-key/`         |
| Operations     | Increase Key            | SVG tree with value update + sift-down     | `src/algorithms/heaps/operations/heap-increase-key/`         |
| Operations     | Replace Root            | SVG tree with root replacement + sift-down | `src/algorithms/heaps/operations/heap-replace-root/`         |
| Applications   | Kth Largest Element     | SVG tree showing min-heap of size k        | `src/algorithms/heaps/applications/kth-largest-element/`     |
| Applications   | Kth Smallest Element    | SVG tree showing max-heap of size k        | `src/algorithms/heaps/applications/kth-smallest-element/`    |
| Applications   | Last Stone Weight       | SVG tree with repeated extract + insert    | `src/algorithms/heaps/applications/last-stone-weight/`       |
| Applications   | K Closest Points        | SVG tree with max-heap of distances        | `src/algorithms/heaps/applications/k-closest-points/`        |
| Applications   | Ugly Number II          | SVG tree with min-heap generating sequence | `src/algorithms/heaps/applications/ugly-number-ii/`          |
| Applications   | Heap Sort (Heap View)   | SVG tree shrinking during extraction       | `src/algorithms/heaps/applications/heap-sort-visualization/` |
| Applications   | Top K Frequent (Heap)   | SVG tree with frequency-based min-heap     | `src/algorithms/heaps/applications/top-k-frequent-heap/`     |
| Applications   | Merge K Sorted Arrays   | SVG tree as k-way merge buffer             | `src/algorithms/heaps/applications/merge-k-sorted-arrays/`   |
| Applications   | Sort Nearly Sorted      | SVG tree with sliding window heap          | `src/algorithms/heaps/applications/sort-nearly-sorted/`      |
| Applications   | Reorganize String       | SVG tree with char frequency max-heap      | `src/algorithms/heaps/applications/reorganize-string/`       |
| Applications   | Task Scheduler          | SVG tree with task frequency max-heap      | `src/algorithms/heaps/applications/task-scheduler-heap/`     |
| Applications   | Find Median from Stream | SVG tree tracking max-heap lower half      | `src/algorithms/heaps/applications/find-median-stream/`      |
| Applications   | Meeting Rooms II        | SVG tree with end-time min-heap            | `src/algorithms/heaps/applications/meeting-rooms-ii/`        |
| Priority Queue | PQ Enqueue              | SVG tree with priority insert              | `src/algorithms/heaps/priority-queue/pq-enqueue/`            |
| Priority Queue | PQ Dequeue              | SVG tree with priority extraction          | `src/algorithms/heaps/priority-queue/pq-dequeue/`            |
| Priority Queue | Change Priority         | SVG tree with priority update + re-heapify | `src/algorithms/heaps/priority-queue/pq-change-priority/`    |

---

## Stacks & Queues (1 algorithm)

Algorithms using stack or queue data structures. Algorithms live under `src/algorithms/stacks-queues/<technique>/<algorithm>/`.

| Technique  | Algorithm         | Visualizer                                 | Source Directory                                             |
| ---------- | ----------------- | ------------------------------------------ | ------------------------------------------------------------ |
| Validation | Valid Parentheses | Stack push/pop with input character states | `src/algorithms/stacks-queues/validation/valid-parentheses/` |

---

## Hash Maps (28 algorithms)

Algorithms leveraging hash table lookups, frequency counting, grouping, tracking, prefix sums, mapping, and sliding windows. Algorithms live under `src/algorithms/hash-maps/<technique>/<algorithm>/`.

| Technique      | Algorithm                           | Visualizer                                   | Source Directory                                                               |
| -------------- | ----------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------ |
| Lookup         | Two Sum                             | Input array + key→value table                | `src/algorithms/hash-maps/lookup/two-sum/`                                     |
| Lookup         | Contains Duplicate                  | Input array + hash set                       | `src/algorithms/hash-maps/lookup/contains-duplicate/`                          |
| Lookup         | Contains Duplicate II               | Input array + value→index map                | `src/algorithms/hash-maps/lookup/contains-duplicate-ii/`                       |
| Lookup         | Four Sum II                         | Dual-phase sum map + checking                | `src/algorithms/hash-maps/lookup/four-sum-ii/`                                 |
| Counting       | First Unique Character              | Char array + frequency map                   | `src/algorithms/hash-maps/counting/first-unique-character/`                    |
| Counting       | Valid Anagram                       | Dual input + frequency map                   | `src/algorithms/hash-maps/counting/valid-anagram/`                             |
| Counting       | Ransom Note                         | Dual input + frequency map                   | `src/algorithms/hash-maps/counting/ransom-note/`                               |
| Counting       | Majority Element                    | Input array + frequency map                  | `src/algorithms/hash-maps/counting/majority-element/`                          |
| Counting       | Find the Difference                 | Dual input + frequency map                   | `src/algorithms/hash-maps/counting/find-the-difference/`                       |
| Counting       | N-Repeated Element                  | Input array + frequency map                  | `src/algorithms/hash-maps/counting/n-repeated-element/`                        |
| Counting       | Number of Good Pairs                | Input array + frequency map                  | `src/algorithms/hash-maps/counting/number-of-good-pairs/`                      |
| Frequency      | Top K Frequent Elements             | Input array + frequency map + highlighting   | `src/algorithms/hash-maps/frequency/top-k-frequent-elements/`                  |
| Frequency      | Sort Characters by Frequency        | Char array + frequency map                   | `src/algorithms/hash-maps/frequency/sort-characters-by-frequency/`             |
| Frequency      | Find All Anagrams                   | Sliding window + frequency comparison        | `src/algorithms/hash-maps/frequency/find-all-anagrams/`                        |
| Grouping       | Group Anagrams                      | Word array + sorted-key map + group result   | `src/algorithms/hash-maps/grouping/group-anagrams/`                            |
| Grouping       | Word Pattern                        | Dual input + bidirectional map               | `src/algorithms/hash-maps/grouping/word-pattern/`                              |
| Grouping       | Isomorphic Strings                  | Dual input + bidirectional char map          | `src/algorithms/hash-maps/grouping/isomorphic-strings/`                        |
| Tracking       | Longest Consecutive Sequence        | Input array + hash set + sequence scan       | `src/algorithms/hash-maps/tracking/longest-consecutive-sequence/`              |
| Tracking       | Happy Number                        | Dynamic input + seen set + cycle detection   | `src/algorithms/hash-maps/tracking/happy-number/`                              |
| Tracking       | Jewels and Stones                   | Dual input + jewel set + stone counting      | `src/algorithms/hash-maps/tracking/jewels-and-stones/`                         |
| Tracking       | Intersection of Two Arrays          | Dual input + set intersection                | `src/algorithms/hash-maps/tracking/intersection-of-two-arrays/`                |
| Tracking       | Find All Duplicates                 | Input array + seen set                       | `src/algorithms/hash-maps/tracking/find-all-duplicates/`                       |
| Tracking       | Missing Number                      | Input array + number set + range check       | `src/algorithms/hash-maps/tracking/missing-number/`                            |
| Prefix Sum     | Subarray Sum Equals K               | Input array + prefix sum map                 | `src/algorithms/hash-maps/prefix-sum/subarray-sum-equals-k/`                   |
| Prefix Sum     | Contiguous Array                    | Binary input + prefix sum map                | `src/algorithms/hash-maps/prefix-sum/contiguous-array/`                        |
| Mapping        | Roman to Integer                    | Char input + symbol→value map                | `src/algorithms/hash-maps/mapping/roman-to-integer/`                           |
| Mapping        | Integer to Roman                    | Value→symbol map + greedy subtraction        | `src/algorithms/hash-maps/mapping/integer-to-roman/`                           |
| Sliding Window | Longest Substring Without Repeating | Char input + char→index map + window overlay | `src/algorithms/hash-maps/sliding-window/longest-substring-without-repeating/` |

---

## Strings (1 algorithm)

Algorithms for string matching and manipulation. Algorithms live under `src/algorithms/strings/<technique>/<algorithm>/`.

| Technique        | Algorithm  | Visualizer                           | Source Directory                                      |
| ---------------- | ---------- | ------------------------------------ | ----------------------------------------------------- |
| Pattern Matching | KMP Search | Text row, pattern row, failure table | `src/algorithms/strings/pattern-matching/kmp-search/` |

---

## Matrices (1 algorithm)

Algorithms operating on 2D matrix structures. Algorithms live under `src/algorithms/matrices/<technique>/<algorithm>/`.

| Technique | Algorithm              | Visualizer                              | Source Directory                                  |
| --------- | ---------------------- | --------------------------------------- | ------------------------------------------------- |
| Traversal | Spiral Order Traversal | CSS grid with boundary shrink animation | `src/algorithms/matrices/traversal/spiral-order/` |

---

## Sets (1 algorithm)

Algorithms involving set operations. Algorithms live under `src/algorithms/sets/<technique>/<algorithm>/`.

| Technique  | Algorithm        | Visualizer                                | Source Directory                                   |
| ---------- | ---------------- | ----------------------------------------- | -------------------------------------------------- |
| Operations | Set Intersection | Array A, array B, hash set, result panels | `src/algorithms/sets/operations/set-intersection/` |

---

## Adding New Algorithms

See the [full algorithm walkthrough](contributing.md#adding-a-new-algorithm) in the contributing guide for step-by-step instructions.

## See Also

- [Contributing](contributing.md#adding-a-new-algorithm) — how to add a new algorithm
- [Architecture](architecture.md) — registry pattern, data flow, visualizers
- [Glossary](glossary.md) — key terms (AlgorithmDefinition, ExecutionStep, Tracker)
