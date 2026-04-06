[← Back to README](../README.md)

# Algorithm Catalog

Complete listing of all 452 algorithms available in AlgoFlow, organized by category with visualizer descriptions and technique subcategories.

> **Prerequisites:** None — this is a reference document.

## Contents

- [Sorting (53)](#sorting-53-algorithms)
- [Searching (18)](#searching-18-algorithms)
- [Graph (28)](#graph-28-algorithms)
- [Pathfinding (27)](#pathfinding-27-algorithms)
- [Dynamic Programming (32)](#dynamic-programming-32-algorithms)
- [Arrays (44)](#arrays-44-algorithms)
- [Trees (87)](#trees-87-algorithms)
- [Linked Lists (8)](#linked-lists-8-algorithms)
- [Heaps (28)](#heaps-28-algorithms)
- [Stacks & Queues (28)](#stacks--queues-28-algorithms)
- [Hash Maps (28)](#hash-maps-28-algorithms)
- [Strings (32)](#strings-32-algorithms)
- [Matrices (20)](#matrices-20-algorithms)
- [Sets (19)](#sets-19-algorithms)

---

## Sorting (53 algorithms)

Algorithms that arrange elements in a specific order. Algorithms live under `src/algorithms/sorting/<technique>/<algorithm>/`.

| Technique    | Algorithm                    | Visualizer         | Source Directory                                           |
| ------------ | ---------------------------- | ------------------ | ---------------------------------------------------------- |
| Comparison   | Bubble Sort                  | Animated bar chart | `src/algorithms/sorting/comparison/bubble-sort/`           |
| Comparison   | Selection Sort               | Animated bar chart | `src/algorithms/sorting/comparison/selection-sort/`        |
| Comparison   | Insertion Sort               | Animated bar chart | `src/algorithms/sorting/comparison/insertion-sort/`        |
| Comparison   | Merge Sort                   | Animated bar chart | `src/algorithms/sorting/comparison/merge-sort/`            |
| Comparison   | Quick Sort                   | Animated bar chart | `src/algorithms/sorting/comparison/quick-sort/`            |
| Comparison   | Heap Sort                    | Animated bar chart | `src/algorithms/sorting/comparison/heap-sort/`             |
| Comparison   | Shell Sort                   | Animated bar chart | `src/algorithms/sorting/comparison/shell-sort/`            |
| Comparison   | Tim Sort                     | Animated bar chart | `src/algorithms/sorting/comparison/tim-sort/`              |
| Comparison   | Intro Sort                   | Animated bar chart | `src/algorithms/sorting/comparison/intro-sort/`            |
| Comparison   | Tree Sort                    | Animated bar chart | `src/algorithms/sorting/comparison/tree-sort/`             |
| Comparison   | Tournament Sort              | Animated bar chart | `src/algorithms/sorting/comparison/tournament-sort/`       |
| Comparison   | Patience Sort                | Animated bar chart | `src/algorithms/sorting/comparison/patience-sort/`         |
| Comparison   | Cycle Sort                   | Animated bar chart | `src/algorithms/sorting/comparison/cycle-sort/`            |
| Comparison   | Smooth Sort                  | Animated bar chart | `src/algorithms/sorting/comparison/smooth-sort/`           |
| Comparison   | Cube Sort                    | Animated bar chart | `src/algorithms/sorting/comparison/cube-sort/`             |
| Comparison   | Block Sort                   | Animated bar chart | `src/algorithms/sorting/comparison/block-sort/`            |
| Comparison   | Strand Sort                  | Animated bar chart | `src/algorithms/sorting/comparison/strand-sort/`           |
| Comparison   | Merge Insertion Sort         | Animated bar chart | `src/algorithms/sorting/comparison/merge-insertion-sort/`  |
| Exchange     | Cocktail Shaker Sort         | Animated bar chart | `src/algorithms/sorting/exchange/cocktail-shaker-sort/`    |
| Exchange     | Gnome Sort                   | Animated bar chart | `src/algorithms/sorting/exchange/gnome-sort/`              |
| Exchange     | Comb Sort                    | Animated bar chart | `src/algorithms/sorting/exchange/comb-sort/`               |
| Exchange     | Odd-Even Sort                | Animated bar chart | `src/algorithms/sorting/exchange/odd-even-sort/`           |
| Exchange     | Pancake Sort                 | Animated bar chart | `src/algorithms/sorting/exchange/pancake-sort/`            |
| Exchange     | Circle Sort                  | Animated bar chart | `src/algorithms/sorting/exchange/circle-sort/`             |
| Exchange     | Exchange Sort                | Animated bar chart | `src/algorithms/sorting/exchange/exchange-sort/`           |
| Distribution | Counting Sort (Distribution) | Animated bar chart | `src/algorithms/sorting/distribution/counting-sort/`       |
| Distribution | Radix Sort (LSD)             | Animated bar chart | `src/algorithms/sorting/distribution/radix-sort-lsd/`      |
| Distribution | Radix Sort (MSD)             | Animated bar chart | `src/algorithms/sorting/distribution/radix-sort-msd/`      |
| Distribution | Bucket Sort                  | Animated bar chart | `src/algorithms/sorting/distribution/bucket-sort/`         |
| Distribution | Pigeonhole Sort              | Animated bar chart | `src/algorithms/sorting/distribution/pigeonhole-sort/`     |
| Distribution | Flash Sort                   | Animated bar chart | `src/algorithms/sorting/distribution/flash-sort/`          |
| Distribution | Spread Sort                  | Animated bar chart | `src/algorithms/sorting/distribution/spread-sort/`         |
| Distribution | American Flag Sort           | Animated bar chart | `src/algorithms/sorting/distribution/american-flag-sort/`  |
| Distribution | Proxmap Sort                 | Animated bar chart | `src/algorithms/sorting/distribution/proxmap-sort/`        |
| Distribution | Bead Sort                    | Animated bar chart | `src/algorithms/sorting/distribution/bead-sort/`           |
| Insertion    | Binary Insertion Sort        | Animated bar chart | `src/algorithms/sorting/insertion/binary-insertion-sort/`  |
| Insertion    | Library Sort                 | Animated bar chart | `src/algorithms/sorting/insertion/library-sort/`           |
| Selection    | Double Selection Sort        | Animated bar chart | `src/algorithms/sorting/selection/double-selection-sort/`  |
| Selection    | Cartesian Tree Sort          | Animated bar chart | `src/algorithms/sorting/selection/cartesian-tree-sort/`    |
| Hybrid       | Quick Sort (3-Way)           | Animated bar chart | `src/algorithms/sorting/hybrid/quick-sort-3-way/`          |
| Hybrid       | Dual-Pivot Quick Sort        | Animated bar chart | `src/algorithms/sorting/hybrid/dual-pivot-quick-sort/`     |
| Hybrid       | Block Merge Sort             | Animated bar chart | `src/algorithms/sorting/hybrid/block-merge-sort/`          |
| Hybrid       | Bitonic Sort                 | Animated bar chart | `src/algorithms/sorting/hybrid/bitonic-sort/`              |
| Network      | Bitonic Sort Network         | Animated bar chart | `src/algorithms/sorting/network/bitonic-sort-network/`     |
| Network      | Odd-Even Merge Sort          | Animated bar chart | `src/algorithms/sorting/network/odd-even-merge-sort/`      |
| Network      | Pairwise Sorting Network     | Animated bar chart | `src/algorithms/sorting/network/pairwise-sorting-network/` |
| Concurrent   | Sleep Sort                   | Animated bar chart | `src/algorithms/sorting/concurrent/sleep-sort/`            |
| Concurrent   | Stooge Sort                  | Animated bar chart | `src/algorithms/sorting/concurrent/stooge-sort/`           |
| Concurrent   | Slow Sort                    | Animated bar chart | `src/algorithms/sorting/concurrent/slow-sort/`             |
| Novelty      | Bogo Sort                    | Animated bar chart | `src/algorithms/sorting/novelty/bogo-sort/`                |
| Novelty      | Bozo Sort                    | Animated bar chart | `src/algorithms/sorting/novelty/bozo-sort/`                |
| Novelty      | Stalin Sort                  | Animated bar chart | `src/algorithms/sorting/novelty/stalin-sort/`              |
| Novelty      | Spaghetti Sort               | Animated bar chart | `src/algorithms/sorting/novelty/spaghetti-sort/`           |

---

## Searching (18 algorithms)

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

## Pathfinding (27 algorithms)

Algorithms that find shortest paths, explore grids, generate mazes, and fill regions. Algorithms live under `src/algorithms/pathfinding/<technique>/<algorithm>/`.

### Shortest Path (6)

| Technique     | Algorithm              | Visualizer              | Source Directory                                                   |
| ------------- | ---------------------- | ----------------------- | ------------------------------------------------------------------ |
| Shortest Path | Dijkstra's Algorithm   | CSS grid with wavefront | `src/algorithms/pathfinding/shortest-path/dijkstra/`               |
| Shortest Path | BFS Shortest Path      | CSS grid with wavefront | `src/algorithms/pathfinding/shortest-path/bfs-shortest-path/`      |
| Shortest Path | A\* Search             | CSS grid with wavefront | `src/algorithms/pathfinding/shortest-path/a-star/`                 |
| Shortest Path | Bellman-Ford Grid      | CSS grid with wavefront | `src/algorithms/pathfinding/shortest-path/bellman-ford-grid/`      |
| Shortest Path | Lee Algorithm          | CSS grid with wavefront | `src/algorithms/pathfinding/shortest-path/lee-algorithm/`          |
| Shortest Path | Dijkstra Bidirectional | CSS grid with wavefront | `src/algorithms/pathfinding/shortest-path/dijkstra-bidirectional/` |

### Heuristic Search (6)

| Technique        | Algorithm               | Visualizer              | Source Directory                                                       |
| ---------------- | ----------------------- | ----------------------- | ---------------------------------------------------------------------- |
| Heuristic Search | Greedy Best-First       | CSS grid with wavefront | `src/algorithms/pathfinding/heuristic-search/greedy-best-first/`       |
| Heuristic Search | Jump Point Search       | CSS grid with wavefront | `src/algorithms/pathfinding/heuristic-search/jump-point-search/`       |
| Heuristic Search | IDA\*                   | CSS grid with wavefront | `src/algorithms/pathfinding/heuristic-search/ida-star/`                |
| Heuristic Search | Weighted A\*            | CSS grid with wavefront | `src/algorithms/pathfinding/heuristic-search/weighted-a-star/`         |
| Heuristic Search | D\* Lite                | CSS grid with wavefront | `src/algorithms/pathfinding/heuristic-search/d-star-lite/`             |
| Heuristic Search | Best-First Tie Breaking | CSS grid with wavefront | `src/algorithms/pathfinding/heuristic-search/best-first-tie-breaking/` |

### Graph Traversal (5)

| Technique       | Algorithm               | Visualizer              | Source Directory                                                      |
| --------------- | ----------------------- | ----------------------- | --------------------------------------------------------------------- |
| Graph Traversal | BFS Exploration         | CSS grid with wavefront | `src/algorithms/pathfinding/graph-traversal/bfs-exploration/`         |
| Graph Traversal | DFS Exploration         | CSS grid with wavefront | `src/algorithms/pathfinding/graph-traversal/dfs-exploration/`         |
| Graph Traversal | Bidirectional BFS       | CSS grid with wavefront | `src/algorithms/pathfinding/graph-traversal/bidirectional-bfs/`       |
| Graph Traversal | Iterative Deepening DFS | CSS grid with wavefront | `src/algorithms/pathfinding/graph-traversal/iterative-deepening-dfs/` |
| Graph Traversal | Wall Follower           | CSS grid with wavefront | `src/algorithms/pathfinding/graph-traversal/wall-follower/`           |

### Flood Fill (3)

| Technique  | Algorithm        | Visualizer                                  | Source Directory                                          |
| ---------- | ---------------- | ------------------------------------------- | --------------------------------------------------------- |
| Flood Fill | Flood Fill BFS   | CSS grid with region fill sweep             | `src/algorithms/pathfinding/flood-fill/flood-fill-bfs/`   |
| Flood Fill | Flood Fill DFS   | CSS grid with region fill sweep             | `src/algorithms/pathfinding/flood-fill/flood-fill-dfs/`   |
| Flood Fill | Multi-Source BFS | CSS grid with topographical heatmap mapping | `src/algorithms/pathfinding/flood-fill/multi-source-bfs/` |

### Maze Generation (7)

| Technique       | Algorithm             | Visualizer                  | Source Directory                                                    |
| --------------- | --------------------- | --------------------------- | ------------------------------------------------------------------- |
| Maze Generation | Recursive Backtracker | CSS grid with wall carving  | `src/algorithms/pathfinding/maze-generation/recursive-backtracker/` |
| Maze Generation | Prim's Maze           | CSS grid with wall carving  | `src/algorithms/pathfinding/maze-generation/prims-maze/`            |
| Maze Generation | Kruskal's Maze        | CSS grid with wall carving  | `src/algorithms/pathfinding/maze-generation/kruskals-maze/`         |
| Maze Generation | Recursive Division    | CSS grid with wall building | `src/algorithms/pathfinding/maze-generation/recursive-division/`    |
| Maze Generation | Aldous-Broder         | CSS grid with wall carving  | `src/algorithms/pathfinding/maze-generation/aldous-broder/`         |
| Maze Generation | Binary Tree Maze      | CSS grid with wall carving  | `src/algorithms/pathfinding/maze-generation/binary-tree-maze/`      |
| Maze Generation | Eller's Maze          | CSS grid with wall carving  | `src/algorithms/pathfinding/maze-generation/ellers-maze/`           |

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

## Trees (87 algorithms)

Algorithms that traverse or manipulate tree data structures. Algorithms live under `src/algorithms/trees/<technique>/<algorithm>/`.

### Traversal (13)

| Technique | Algorithm                          | Visualizer                           | Source Directory                                                          |
| --------- | ---------------------------------- | ------------------------------------ | ------------------------------------------------------------------------- |
| Traversal | BST In-Order Traversal             | SVG binary tree with traversal order | `src/algorithms/trees/traversal/bst-inorder/`                             |
| Traversal | BST In-Order (Iterative)           | SVG binary tree with traversal order | `src/algorithms/trees/traversal/bst-inorder-iterative/`                   |
| Traversal | BST Pre-Order Traversal            | SVG binary tree with traversal order | `src/algorithms/trees/traversal/bst-preorder/`                            |
| Traversal | BST Pre-Order (Iterative)          | SVG binary tree with traversal order | `src/algorithms/trees/traversal/bst-preorder-iterative/`                  |
| Traversal | BST Post-Order Traversal           | SVG binary tree with traversal order | `src/algorithms/trees/traversal/bst-postorder/`                           |
| Traversal | BST Post-Order (Iterative)         | SVG binary tree with traversal order | `src/algorithms/trees/traversal/bst-postorder-iterative/`                 |
| Traversal | Level-Order Traversal              | SVG binary tree with level highlights | `src/algorithms/trees/traversal/level-order-traversal/`                  |
| Traversal | Reverse Level-Order                | SVG binary tree with level highlights | `src/algorithms/trees/traversal/reverse-level-order/`                    |
| Traversal | Zigzag Level-Order                 | SVG binary tree with alternating direction | `src/algorithms/trees/traversal/zigzag-level-order/`                 |
| Traversal | Vertical Order Traversal           | SVG binary tree with column grouping | `src/algorithms/trees/traversal/vertical-order-traversal/`                |
| Traversal | Boundary Traversal                 | SVG binary tree with boundary path   | `src/algorithms/trees/traversal/boundary-traversal/`                     |
| Traversal | Diagonal Traversal                 | SVG binary tree with diagonal groups | `src/algorithms/trees/traversal/diagonal-traversal/`                     |
| Traversal | Morris In-Order Traversal          | SVG binary tree with thread links    | `src/algorithms/trees/traversal/morris-inorder-traversal/`                |

### BST Operations (21)

| Technique      | Algorithm                              | Visualizer                                | Source Directory                                                                          |
| -------------- | -------------------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------- |
| BST Operations | BST Search                             | SVG binary tree with search path          | `src/algorithms/trees/bst-operations/bst-search/`                                        |
| BST Operations | BST Search (Iterative)                 | SVG binary tree with search path          | `src/algorithms/trees/bst-operations/bst-search-iterative/`                              |
| BST Operations | BST Insert                             | SVG binary tree with insertion point      | `src/algorithms/trees/bst-operations/bst-insert/`                                        |
| BST Operations | BST Insert (Iterative)                 | SVG binary tree with insertion point      | `src/algorithms/trees/bst-operations/bst-insert-iterative/`                              |
| BST Operations | BST Delete                             | SVG binary tree with deletion steps       | `src/algorithms/trees/bst-operations/bst-delete/`                                        |
| BST Operations | BST Delete (Iterative)                 | SVG binary tree with deletion steps       | `src/algorithms/trees/bst-operations/bst-delete-iterative/`                              |
| BST Operations | BST Validation                         | SVG binary tree with range bounds         | `src/algorithms/trees/bst-operations/bst-validation/`                                    |
| BST Operations | BST Validation (Iterative)             | SVG binary tree with range bounds         | `src/algorithms/trees/bst-operations/bst-validation-iterative/`                          |
| BST Operations | BST Kth Smallest                       | SVG binary tree with in-order count       | `src/algorithms/trees/bst-operations/bst-kth-smallest/`                                  |
| BST Operations | BST Kth Smallest (Iterative)           | SVG binary tree with in-order count       | `src/algorithms/trees/bst-operations/bst-kth-smallest-iterative/`                        |
| BST Operations | BST Lowest Common Ancestor             | SVG binary tree with ancestor path        | `src/algorithms/trees/bst-operations/bst-lowest-common-ancestor/`                        |
| BST Operations | BST Lowest Common Ancestor (Iterative) | SVG binary tree with ancestor path        | `src/algorithms/trees/bst-operations/bst-lowest-common-ancestor-iterative/`              |
| BST Operations | BST from Sorted Array                  | SVG binary tree with construction steps   | `src/algorithms/trees/bst-operations/bst-from-sorted-array/`                             |
| BST Operations | BST Iterator                           | SVG binary tree with stack state          | `src/algorithms/trees/bst-operations/bst-iterator/`                                      |
| BST Operations | BST Floor and Ceil                     | SVG binary tree with range search         | `src/algorithms/trees/bst-operations/bst-floor-ceil/`                                    |
| BST Operations | BST Floor and Ceil (Iterative)         | SVG binary tree with range search         | `src/algorithms/trees/bst-operations/bst-floor-ceil-iterative/`                          |
| BST Operations | BST Range Sum                          | SVG binary tree with range highlights     | `src/algorithms/trees/bst-operations/bst-range-sum/`                                     |
| BST Operations | BST Range Sum (Iterative)              | SVG binary tree with range highlights     | `src/algorithms/trees/bst-operations/bst-range-sum-iterative/`                           |
| BST Operations | BST to Greater Tree                    | SVG binary tree with reverse in-order sum | `src/algorithms/trees/bst-operations/bst-to-greater-tree/`                               |
| BST Operations | BST to Greater Tree (Iterative)        | SVG binary tree with reverse in-order sum | `src/algorithms/trees/bst-operations/bst-to-greater-tree-iterative/`                     |
| BST Operations | BST Recover Swapped                    | SVG binary tree with swapped node markers | `src/algorithms/trees/bst-operations/bst-recover-swapped/`                               |

### Properties (21)

| Technique  | Algorithm                              | Visualizer                                   | Source Directory                                                                    |
| ---------- | -------------------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------- |
| Properties | Maximum Depth                          | SVG binary tree with depth annotation        | `src/algorithms/trees/properties/maximum-depth/`                                   |
| Properties | Maximum Depth (Iterative)              | SVG binary tree with depth annotation        | `src/algorithms/trees/properties/maximum-depth-iterative/`                         |
| Properties | Minimum Depth                          | SVG binary tree with depth annotation        | `src/algorithms/trees/properties/minimum-depth/`                                   |
| Properties | Minimum Depth (Iterative)              | SVG binary tree with depth annotation        | `src/algorithms/trees/properties/minimum-depth-iterative/`                         |
| Properties | Diameter of Binary Tree                | SVG binary tree with longest path highlight  | `src/algorithms/trees/properties/diameter-of-binary-tree/`                         |
| Properties | Is Balanced Tree                       | SVG binary tree with height balance check    | `src/algorithms/trees/properties/is-balanced-tree/`                                |
| Properties | Is Balanced Tree (Iterative)           | SVG binary tree with height balance check    | `src/algorithms/trees/properties/is-balanced-tree-iterative/`                      |
| Properties | Is Symmetric Tree                      | SVG binary tree with mirror comparison       | `src/algorithms/trees/properties/is-symmetric-tree/`                               |
| Properties | Is Symmetric Tree (Iterative)          | SVG binary tree with mirror comparison       | `src/algorithms/trees/properties/is-symmetric-tree-iterative/`                     |
| Properties | Count Complete Tree Nodes              | SVG binary tree with node count              | `src/algorithms/trees/properties/count-complete-tree-nodes/`                       |
| Properties | Path Sum                               | SVG binary tree with root-to-leaf path       | `src/algorithms/trees/properties/path-sum/`                                        |
| Properties | Path Sum (Iterative)                   | SVG binary tree with root-to-leaf path       | `src/algorithms/trees/properties/path-sum-iterative/`                              |
| Properties | Maximum Path Sum                       | SVG binary tree with max path highlight      | `src/algorithms/trees/properties/maximum-path-sum/`                                |
| Properties | Sum of Left Leaves                     | SVG binary tree with left leaf highlights    | `src/algorithms/trees/properties/sum-of-left-leaves/`                              |
| Properties | Sum of Left Leaves (Iterative)         | SVG binary tree with left leaf highlights    | `src/algorithms/trees/properties/sum-of-left-leaves-iterative/`                    |
| Properties | All Root-to-Leaf Paths                 | SVG binary tree with path enumeration        | `src/algorithms/trees/properties/all-root-to-leaf-paths/`                          |
| Properties | All Root-to-Leaf Paths (Iterative)     | SVG binary tree with path enumeration        | `src/algorithms/trees/properties/all-root-to-leaf-paths-iterative/`                |
| Properties | Binary Tree Tilt                       | SVG binary tree with tilt value annotation   | `src/algorithms/trees/properties/binary-tree-tilt/`                                |
| Properties | Cousins in Binary Tree                 | SVG binary tree with level and parent check  | `src/algorithms/trees/properties/cousins-in-binary-tree/`                          |
| Properties | Sum Root-to-Leaf Numbers               | SVG binary tree with path number accumulation | `src/algorithms/trees/properties/sum-root-to-leaf-numbers/`                       |
| Properties | Sum Root-to-Leaf Numbers (Iterative)   | SVG binary tree with path number accumulation | `src/algorithms/trees/properties/sum-root-to-leaf-numbers-iterative/`             |

### Construction (6)

| Technique    | Algorithm                               | Visualizer                                    | Source Directory                                                                             |
| ------------ | --------------------------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Construction | Build from Pre-Order + In-Order         | SVG binary tree with construction steps       | `src/algorithms/trees/construction/build-from-preorder-inorder/`                            |
| Construction | Build from Pre-Order + In-Order (Iter.) | SVG binary tree with construction steps       | `src/algorithms/trees/construction/build-from-preorder-inorder-iterative/`                  |
| Construction | Build from Post-Order + In-Order        | SVG binary tree with construction steps       | `src/algorithms/trees/construction/build-from-postorder-inorder/`                           |
| Construction | Build from Post-Order + In-Order (Iter.)| SVG binary tree with construction steps       | `src/algorithms/trees/construction/build-from-postorder-inorder-iterative/`                 |
| Construction | Serialize / Deserialize Tree            | SVG binary tree with serialization buffer     | `src/algorithms/trees/construction/serialize-deserialize-tree/`                             |
| Construction | Build from Level-Order                  | SVG binary tree with level-by-level insertion | `src/algorithms/trees/construction/build-from-level-order/`                                 |

### Manipulation (16)

| Technique    | Algorithm                            | Visualizer                                    | Source Directory                                                                      |
| ------------ | ------------------------------------ | --------------------------------------------- | ------------------------------------------------------------------------------------- |
| Manipulation | Invert Binary Tree                   | SVG binary tree with child swap animation     | `src/algorithms/trees/manipulation/invert-binary-tree/`                               |
| Manipulation | Invert Binary Tree (Iterative)       | SVG binary tree with child swap animation     | `src/algorithms/trees/manipulation/invert-binary-tree-iterative/`                    |
| Manipulation | Flatten to Linked List               | SVG binary tree with right-chain formation    | `src/algorithms/trees/manipulation/flatten-to-linked-list/`                          |
| Manipulation | Flatten to Linked List (Iterative)   | SVG binary tree with right-chain formation    | `src/algorithms/trees/manipulation/flatten-to-linked-list-iterative/`                |
| Manipulation | Right Side View                      | SVG binary tree with rightmost node highlight | `src/algorithms/trees/manipulation/right-side-view/`                                 |
| Manipulation | Right Side View (Recursive)          | SVG binary tree with rightmost node highlight | `src/algorithms/trees/manipulation/right-side-view-recursive/`                       |
| Manipulation | Same Tree                            | SVG dual binary tree with node comparison     | `src/algorithms/trees/manipulation/same-tree/`                                       |
| Manipulation | Same Tree (Iterative)                | SVG dual binary tree with node comparison     | `src/algorithms/trees/manipulation/same-tree-iterative/`                             |
| Manipulation | Merge Binary Trees                   | SVG dual binary tree with merge steps         | `src/algorithms/trees/manipulation/merge-binary-trees/`                              |
| Manipulation | Merge Binary Trees (Iterative)       | SVG dual binary tree with merge steps         | `src/algorithms/trees/manipulation/merge-binary-trees-iterative/`                   |
| Manipulation | Subtree of Another Tree              | SVG binary tree with subtree matching         | `src/algorithms/trees/manipulation/subtree-of-another-tree/`                         |
| Manipulation | Lowest Common Ancestor               | SVG binary tree with ancestor path            | `src/algorithms/trees/manipulation/lowest-common-ancestor/`                          |
| Manipulation | Lowest Common Ancestor (Iterative)   | SVG binary tree with ancestor path            | `src/algorithms/trees/manipulation/lowest-common-ancestor-iterative/`                |
| Manipulation | Delete Leaves with Value             | SVG binary tree with leaf pruning steps       | `src/algorithms/trees/manipulation/delete-leaves-with-value/`                        |
| Manipulation | Distribute Coins                     | SVG binary tree with coin flow animation      | `src/algorithms/trees/manipulation/distribute-coins/`                                |
| Manipulation | Flip Equivalent Trees                | SVG dual binary tree with flip comparison     | `src/algorithms/trees/manipulation/flip-equivalent-trees/`                           |

### Advanced (10)

| Technique | Algorithm                      | Visualizer                                         | Source Directory                                                        |
| --------- | ------------------------------ | -------------------------------------------------- | ----------------------------------------------------------------------- |
| Advanced  | AVL Insert with Rotation       | SVG binary tree with rotation animation            | `src/algorithms/trees/advanced/avl-insert-rotation/`                   |
| Advanced  | Red-Black Insert               | SVG binary tree with color and rotation steps      | `src/algorithms/trees/advanced/red-black-insert/`                      |
| Advanced  | Segment Tree Range Sum         | SVG segment tree with range query highlight        | `src/algorithms/trees/advanced/segment-tree-range-sum/`                |
| Advanced  | Segment Tree Range Min         | SVG segment tree with range query highlight        | `src/algorithms/trees/advanced/segment-tree-range-min/`                |
| Advanced  | Binary Indexed Tree            | SVG BIT array with prefix sum visualization        | `src/algorithms/trees/advanced/binary-indexed-tree/`                   |
| Advanced  | Tree to Doubly Linked List     | SVG binary tree with in-order pointer rewiring     | `src/algorithms/trees/advanced/tree-to-doubly-linked-list/`            |
| Advanced  | Binary Tree Pruning            | SVG binary tree with subtree removal steps         | `src/algorithms/trees/advanced/binary-tree-pruning/`                   |
| Advanced  | N-Ary Tree Traversal           | SVG n-ary tree with child expansion                | `src/algorithms/trees/advanced/n-ary-tree-traversal/`                  |
| Advanced  | Huffman Coding Tree            | SVG Huffman tree with frequency-based construction | `src/algorithms/trees/advanced/huffman-coding-tree/`                   |
| Advanced  | Expression Tree Evaluation     | SVG expression tree with operator evaluation       | `src/algorithms/trees/advanced/expression-tree-evaluation/`            |

---

## Linked Lists (8 algorithms)

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

## Stacks & Queues (28 algorithms)

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

## Strings (32 algorithms)

Algorithms for string matching, manipulation, and comparison. Algorithms live under `src/algorithms/strings/<technique>/<algorithm>/`.

### Pattern Matching (6)

| Technique        | Algorithm            | Visualizer                                       | Source Directory                                                |
| ---------------- | -------------------- | ------------------------------------------------ | --------------------------------------------------------------- |
| Pattern Matching | KMP Search           | Text row, pattern row, failure table             | `src/algorithms/strings/pattern-matching/kmp-search/`           |
| Pattern Matching | Naive Pattern Search | Text row, pattern row, brute-force slide         | `src/algorithms/strings/pattern-matching/naive-pattern-search/` |
| Pattern Matching | Rabin-Karp Search    | Text row, pattern row, rolling hash display      | `src/algorithms/strings/pattern-matching/rabin-karp-search/`    |
| Pattern Matching | Boyer-Moore Search   | Text row, pattern row, bad character table        | `src/algorithms/strings/pattern-matching/boyer-moore-search/`   |
| Pattern Matching | Z-Algorithm          | Text row, pattern row, Z-array visualization     | `src/algorithms/strings/pattern-matching/z-algorithm/`          |
| Pattern Matching | Hamming Distance     | Text row, pattern row, position-by-position diff | `src/algorithms/strings/pattern-matching/hamming-distance/`     |

### Palindrome (3)

| Technique  | Algorithm                     | Visualizer                                  | Source Directory                                                        |
| ---------- | ----------------------------- | ------------------------------------------- | ----------------------------------------------------------------------- |
| Palindrome | Palindrome Check              | Char row with L/R pointers                  | `src/algorithms/strings/palindrome/palindrome-check/`                   |
| Palindrome | Valid Palindrome               | Char row with skip markers and L/R pointers | `src/algorithms/strings/palindrome/valid-palindrome/`                   |
| Palindrome | Longest Palindromic Substring | Char row with center expansion arcs         | `src/algorithms/strings/palindrome/longest-palindromic-substring/`      |

### Character Frequency (3)

| Technique           | Algorithm                    | Visualizer                                  | Source Directory                                                                    |
| ------------------- | ---------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------- |
| Character Frequency | First Non-Repeating Character | String row with frequency histogram         | `src/algorithms/strings/character-frequency/first-non-repeating-character/`          |
| Character Frequency | Minimum Window Substring      | String rows with sliding window bracket     | `src/algorithms/strings/character-frequency/minimum-window-substring/`               |
| Character Frequency | Character Frequency Sort      | String row with frequency-sorted output     | `src/algorithms/strings/character-frequency/character-frequency-sort/`               |

### Transformation (7)

| Technique      | Algorithm            | Visualizer                                   | Source Directory                                                       |
| -------------- | -------------------- | -------------------------------------------- | ---------------------------------------------------------------------- |
| Transformation | Reverse String       | Input/output rows with swap pointers         | `src/algorithms/strings/transformation/reverse-string/`                |
| Transformation | Reverse Words        | Input/output rows with word-level reversal   | `src/algorithms/strings/transformation/reverse-words/`                 |
| Transformation | String Compression   | Input row with run-length output building    | `src/algorithms/strings/transformation/string-compression/`            |
| Transformation | Run-Length Decoding   | Input row with expanded output building      | `src/algorithms/strings/transformation/run-length-decoding/`           |
| Transformation | String to Integer    | Input row with phase-based parsing display   | `src/algorithms/strings/transformation/string-to-integer/`             |
| Transformation | String Rotation Check | Input/output with concatenation visualization | `src/algorithms/strings/transformation/string-rotation-check/`         |
| Transformation | Longest Common Prefix | Input display with vertical column scanning  | `src/algorithms/strings/transformation/longest-common-prefix/`         |

### Trie Operations (5)

| Technique       | Algorithm            | Visualizer                                  | Source Directory                                                    |
| --------------- | -------------------- | ------------------------------------------- | ------------------------------------------------------------------- |
| Trie Operations | Trie Insert & Search | SVG trie tree with path highlighting        | `src/algorithms/strings/trie-operations/trie-insert-search/`        |
| Trie Operations | Trie Prefix Count    | SVG trie tree with count annotations        | `src/algorithms/strings/trie-operations/trie-prefix-count/`         |
| Trie Operations | Longest Word in Trie | SVG trie tree with DFS path marking         | `src/algorithms/strings/trie-operations/longest-word-in-trie/`      |
| Trie Operations | Auto-Complete Trie   | SVG trie tree with suggestion collection    | `src/algorithms/strings/trie-operations/auto-complete-trie/`        |
| Trie Operations | Aho-Corasick Search  | SVG trie tree with failure links and matches | `src/algorithms/strings/trie-operations/aho-corasick-search/`       |

### Edit Distance (8)

| Technique     | Algorithm                    | Visualizer                                | Source Directory                                                             |
| ------------- | ---------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------- |
| Edit Distance | Levenshtein Distance         | DP matrix with source/target headers      | `src/algorithms/strings/edit-distance/levenshtein-distance/`                 |
| Edit Distance | Jaro-Winkler Similarity      | DP matrix with match window visualization | `src/algorithms/strings/edit-distance/jaro-winkler-similarity/`              |
| Edit Distance | Longest Common Subsequence   | DP matrix with diagonal path tracing      | `src/algorithms/strings/edit-distance/longest-common-subsequence/`           |
| Edit Distance | Longest Common Substring     | DP matrix with contiguous diagonal path   | `src/algorithms/strings/edit-distance/longest-common-substring/`             |
| Edit Distance | Longest Repeated Substring   | DP matrix (self-comparison)               | `src/algorithms/strings/edit-distance/longest-repeated-substring/`           |
| Edit Distance | Suffix Array Construction    | DP matrix with suffix comparison display  | `src/algorithms/strings/edit-distance/suffix-array-construction/`            |
| Edit Distance | Wildcard Matching            | DP matrix with ?/* pattern matching       | `src/algorithms/strings/edit-distance/wildcard-matching/`                    |
| Edit Distance | Regular Expression Matching  | DP matrix with ./* regex matching         | `src/algorithms/strings/edit-distance/regex-matching/`                       |

---

## Matrices (20 algorithms)

Algorithms operating on 2D matrix structures. Algorithms live under `src/algorithms/matrices/<technique>/<algorithm>/`.

### Traversal (4)

| Technique | Algorithm               | Visualizer                              | Source Directory                                        |
| --------- | ----------------------- | --------------------------------------- | ------------------------------------------------------- |
| Traversal | Spiral Order            | CSS grid with boundary shrink animation | `src/algorithms/matrices/traversal/spiral-order/`       |
| Traversal | Diagonal Traversal      | CSS grid with diagonal sweep animation  | `src/algorithms/matrices/traversal/diagonal-traversal/` |
| Traversal | Zigzag Traversal        | CSS grid with zigzag path highlight     | `src/algorithms/matrices/traversal/zigzag-traversal/`   |
| Traversal | Anti-Diagonal Traversal | CSS grid with anti-diagonal sweep       | `src/algorithms/matrices/traversal/anti-diagonal/`      |

### Transformation (5)

| Technique      | Algorithm         | Visualizer                                   | Source Directory                                       |
| -------------- | ----------------- | -------------------------------------------- | ------------------------------------------------------ |
| Transformation | Rotate Matrix 90° | CSS grid with layer-by-layer rotation        | `src/algorithms/matrices/transformation/rotate-90/`    |
| Transformation | Transpose Matrix  | CSS grid with diagonal reflection            | `src/algorithms/matrices/transformation/transpose/`    |
| Transformation | Set Matrix Zeroes | CSS grid with row/column zero propagation    | `src/algorithms/matrices/transformation/set-zeroes/`   |
| Transformation | Flip Image        | CSS grid with horizontal mirror highlight    | `src/algorithms/matrices/transformation/flip-image/`   |
| Transformation | Game of Life      | CSS grid with neighbor-count state animation | `src/algorithms/matrices/transformation/game-of-life/` |

### Search (4)

| Technique | Algorithm                     | Visualizer                                  | Source Directory                                             |
| --------- | ----------------------------- | ------------------------------------------- | ------------------------------------------------------------ |
| Search    | Search 2D Matrix              | CSS grid with binary search row/column scan | `src/algorithms/matrices/search/search-2d-matrix/`           |
| Search    | Search 2D Matrix II           | CSS grid with staircase elimination         | `src/algorithms/matrices/search/search-2d-matrix-ii/`        |
| Search    | Kth Smallest in Sorted Matrix | CSS grid with binary search value narrowing | `src/algorithms/matrices/search/kth-smallest-sorted-matrix/` |
| Search    | Island Count                  | CSS grid with BFS/DFS flood-fill regions    | `src/algorithms/matrices/search/island-count/`               |

### Construction (4)

| Technique    | Algorithm         | Visualizer                              | Source Directory                                         |
| ------------ | ----------------- | --------------------------------------- | -------------------------------------------------------- |
| Construction | Spiral Matrix II  | CSS grid with outward spiral fill       | `src/algorithms/matrices/construction/spiral-matrix-ii/` |
| Construction | Toeplitz Matrix   | CSS grid with diagonal equality check   | `src/algorithms/matrices/construction/toeplitz-matrix/`  |
| Construction | Pascal's Triangle | CSS grid with row-by-row sum build      | `src/algorithms/matrices/construction/pascals-triangle/` |
| Construction | Valid Sudoku      | CSS grid with row/column/box validation | `src/algorithms/matrices/construction/valid-sudoku/`     |

### Layer Operations (3)

| Technique        | Algorithm             | Visualizer                                            | Source Directory                                                  |
| ---------------- | --------------------- | ----------------------------------------------------- | ----------------------------------------------------------------- |
| Layer Operations | Rotate Layer by Layer | CSS grid with concentric layer rotation               | `src/algorithms/matrices/layer-operations/rotate-layer-by-layer/` |
| Layer Operations | Matrix Diagonal Sum   | CSS grid with primary/secondary diagonals highlighted | `src/algorithms/matrices/layer-operations/diagonal-sum/`          |
| Layer Operations | Reshape Matrix        | CSS grid with source-to-target mapping                | `src/algorithms/matrices/layer-operations/reshape-matrix/`        |

---

## Sets (19 algorithms)

Algorithms involving set operations, generation, probabilistic membership, disjoint sets, and optimization. Algorithms live under `src/algorithms/sets/<technique>/<algorithm>/`.

### Operations (10)

| Technique  | Algorithm                | Visualizer                                          | Source Directory                                           |
| ---------- | ------------------------ | --------------------------------------------------- | ---------------------------------------------------------- |
| Operations | Set Intersection         | Array A, array B, hash set, result panels           | `src/algorithms/sets/operations/set-intersection/`         |
| Operations | Set Union                | Array A, array B, hash set, union result            | `src/algorithms/sets/operations/set-union/`                |
| Operations | Set Difference           | Array A, array B, hash set, difference result       | `src/algorithms/sets/operations/set-difference/`           |
| Operations | Set Symmetric Difference | Array A, array B, hash set, symmetric diff result   | `src/algorithms/sets/operations/set-symmetric-difference/` |
| Operations | Subset Check             | Array A, array B, hash set, boolean result          | `src/algorithms/sets/operations/subset-check/`             |
| Operations | Superset Check           | Array A, array B, hash set, boolean result          | `src/algorithms/sets/operations/superset-check/`           |
| Operations | Set Equality             | Array A, array B, hash set, boolean result          | `src/algorithms/sets/operations/set-equality/`             |
| Operations | Set Complement           | Array A, universal set, hash set, complement result | `src/algorithms/sets/operations/set-complement/`           |
| Operations | Multiset Union           | Array A, array B, frequency counters, bag union     | `src/algorithms/sets/operations/multiset-union/`           |
| Operations | Multiset Intersection    | Array A, array B, frequency counters, bag intersect | `src/algorithms/sets/operations/multiset-intersection/`    |

### Generation (4)

| Technique  | Algorithm         | Visualizer                                        | Source Directory                                    |
| ---------- | ----------------- | ------------------------------------------------- | --------------------------------------------------- |
| Generation | Power Set         | Input elements, current subset, generated subsets | `src/algorithms/sets/generation/power-set/`         |
| Generation | Cartesian Product | Input sets, generated pairs grid                  | `src/algorithms/sets/generation/cartesian-product/` |
| Generation | K-Combinations    | Input elements, current subset, k-element subsets | `src/algorithms/sets/generation/k-combinations/`    |
| Generation | Set Permutations  | Input elements, swap visualization, permutations  | `src/algorithms/sets/generation/set-permutations/`  |

### Membership (3)

| Technique  | Algorithm        | Visualizer                                       | Source Directory                                   |
| ---------- | ---------------- | ------------------------------------------------ | -------------------------------------------------- |
| Membership | Bloom Filter     | Bit array, hash positions, insert/query phases   | `src/algorithms/sets/membership/bloom-filter/`     |
| Membership | Cuckoo Filter    | Bucket array, fingerprints, eviction chain       | `src/algorithms/sets/membership/cuckoo-filter/`    |
| Membership | Count-Min Sketch | 2D counter grid, hash rows, frequency estimation | `src/algorithms/sets/membership/count-min-sketch/` |

### Disjoint Sets (1)

| Technique     | Algorithm  | Visualizer                                 | Source Directory                                |
| ------------- | ---------- | ------------------------------------------ | ----------------------------------------------- |
| Disjoint Sets | Union-Find | Parent array, rank array, component groups | `src/algorithms/sets/disjoint-sets/union-find/` |

### Optimization (1)

| Technique    | Algorithm | Visualizer                                          | Source Directory                              |
| ------------ | --------- | --------------------------------------------------- | --------------------------------------------- |
| Optimization | Set Cover | Universe, candidate sets, greedy selection progress | `src/algorithms/sets/optimization/set-cover/` |

---

## Adding New Algorithms

See the [full algorithm walkthrough](contributing.md#adding-a-new-algorithm) in the contributing guide for step-by-step instructions.

## See Also

- [Contributing](contributing.md#adding-a-new-algorithm) — how to add a new algorithm
- [Architecture](architecture.md) — registry pattern, data flow, visualizers
- [Glossary](glossary.md) — key terms (AlgorithmDefinition, ExecutionStep, Tracker)
