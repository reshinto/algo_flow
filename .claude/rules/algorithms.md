## Algorithm Rules

### Required Categories and Starters

- Sorting: Bubble Sort
- Searching: Binary Search
- Graph traversal: BFS
- Pathfinding: Dijkstra
- Dynamic programming: Fibonacci (memoization + tabulation)
- Array techniques: Sliding Window (max sum subarray of size K)

### Per-Algorithm Requirements

- Real algorithm source file (pure implementation, no visualization logic)
- Step generator using category-specific tracker
- Multi-language source files: TypeScript, Python, Java
- Unit tests for algorithm correctness
- Unit tests for step generation
- Pipeline story (`<AlgorithmName>Pipeline.stories.tsx`) co-located in the algorithm directory
- Educational content (all sections)
- Registry integration via self-registration

### Step Generation

- No skipped traced lines in execution flow
- Every logical operation must produce an ExecutionStep
- Each step must include: type, description, highlightedLines (per-language), variables, visualState, metrics
- Line mappings must be accurate per source file

### Educational Content Sections

- Overview (what it is)
- How It Works
- Time and Space Complexity
- Best Case and Worst Case
- Real-World Uses
- Strengths and Limitations
- When to Use It (and when not to, where relevant)
