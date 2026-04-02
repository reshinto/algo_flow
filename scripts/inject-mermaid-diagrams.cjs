const fs = require('fs');

const INJECTIONS = {
  // --- SHORT PATHS ---
  "shortest-path/a-star": [
    "    \"```mermaid\\n\" +",
    "    \"flowchart LR\\n\" +",
    "    \"    S((Start)) --\\\"g=1, h=4, F=5\\\"--> A((A))\\n\" +",
    "    \"    S --\\\"g=2, h=2, F=4\\\"--> B((B))\\n\" +",
    "    \"    B --\\\"g=3, h=1, F=4\\\"--> C((C))\\n\" +",
    "    \"    C --\\\"g=4, h=0, F=4\\\"--> E((End))\\n\" +",
    "    \"    style S fill:#06b6d4,stroke:#0891b2\\n\" +",
    "    \"    style E fill:#10b981,stroke:#059669\\n\" +",
    "    \"```\\n\\n\" +"
  ],
  "shortest-path/bellman-ford-grid": [
    "    \"```mermaid\\n\" +",
    "    \"graph TD\\n\" +",
    "    \"    A((Start)) --\\\"Weight: 4\\\"--> B((B))\\n\" +",
    "    \"    A --\\\"Weight: 2\\\"--> C((C))\\n\" +",
    "    \"    C --\\\"Weight: -1\\\"--> B\\n\" +",
    "    \"    B --\\\"Weight: 3\\\"--> D((Target))\\n\" +",
    "    \"    C --\\\"Weight: 5\\\"--> D\\n\" +",
    "    \"```\\n\\n\" +"
  ],
  "shortest-path/bfs-shortest-path": [
    "    \"```mermaid\\n\" +",
    "    \"graph TD\\n\" +",
    "    \"    L0((Start/Level 0)) --- L1A((Level 1))\\n\" +",
    "    \"    L0 --- L1B((Level 1))\\n\" +",
    "    \"    L1B --- L2A((Level 2))\\n\" +",
    "    \"    L1B --- L2B((Level 2))\\n\" +",
    "    \"```\\n\\n\" +"
  ],
  "shortest-path/dijkstra-bidirectional": [
    "    \"```mermaid\\n\" +",
    "    \"flowchart LR\\n\" +",
    "    \"    SF((Start)) --\\\"Forward\\\"--> M1((Mid))\\n\" +",
    "    \"    M1 --\\\"Meeting Point\\\"--- M2((Mid))\\n\" +",
    "    \"    EF((End)) --\\\"Backward\\\"--> M2\\n\" +",
    "    \"    style SF fill:#06b6d4,stroke:#0891b2\\n\" +",
    "    \"    style EF fill:#f43f5e,stroke:#e11d48\\n\" +",
    "    \"```\\n\\n\" +"
  ],
  "shortest-path/lee-algorithm": [
    "    \"```mermaid\\n\" +",
    "    \"graph TD\\n\" +",
    "    \"    S((Start [0])) --> A((Node [1]))\\n\" +",
    "    \"    A --> B((Node [2]))\\n\" +",
    "    \"    B -.-> S\\n\" +",
    "    \"    B --> E((End [3]))\\n\" +",
    "    \"```\\n\\n\" +"
  ],

  // --- HEURISTIC ---
  "heuristic-search/best-first-tie-breaking": [
    "    \"```mermaid\\n\" +",
    "    \"graph TD\\n\" +",
    "    \"    A((Node A: f=4)) --- B((Node B: f=4))\\n\" +",
    "    \"    A --\\\"Cross-Product Tiebreaker\\\"--> B\\n\" +",
    "    \"```\\n\\n\" +"
  ],
  "heuristic-search/d-star-lite": [
    "    \"```mermaid\\n\" +",
    "    \"graph RL\\n\" +",
    "    \"    T((Target)) --> A((Expanded))\\n\" +",
    "    \"    A --> B((Current))\\n\" +",
    "    \"    C((Obstacle Detected)) -.\\\"Update RHS\\\"..-> B\\n\" +",
    "    \"```\\n\\n\" +"
  ],
  "heuristic-search/greedy-best-first": [
    "    \"```mermaid\\n\" +",
    "    \"graph TD\\n\" +",
    "    \"    Start((Start)) --\\\"h=8\\\"--> Node1((h=4))\\n\" +",
    "    \"    Start --\\\"h=6\\\"--> Node2((h=2))\\n\" +",
    "    \"    Node2 --\\\"Greedy Pick\\\"--> End((Goal: h=0))\\n\" +",
    "    \"```\\n\\n\" +"
  ],
  "heuristic-search/ida-star": [
    "    \"```mermaid\\n\" +",
    "    \"graph TD\\n\" +",
    "    \"    T1((Threshold: 5)) --> A((f=4: Search))\\n\" +",
    "    \"    A --> B((f=6: Prune, Save for next threshold))\\n\" +",
    "    \"```\\n\\n\" +"
  ],
  "heuristic-search/jump-point-search": [
    "    \"```mermaid\\n\" +",
    "    \"flowchart LR\\n\" +",
    "    \"    S((Start)) -.->|\\\"Scan Empty Space\\\"| J1((Jump Point))\\n\" +",
    "    \"    J1 --\\\"Corner Forced\\\"--> J2((Obstacle))\\n\" +",
    "    \"```\\n\\n\" +"
  ],
  "heuristic-search/weighted-a-star": [
    "    \"```mermaid\\n\" +",
    "    \"flowchart TD\\n\" +",
    "    \"    S((Start)) --\\\"f = g + (h * 2)\\\"--> P((Accelerated Path))\\n\" +",
    "    \"```\\n\\n\" +"
  ],

  // --- FLOOD FILL / BFS ---
  "flood-fill/flood-fill-bfs": [
    "    \"```mermaid\\n\" +",
    "    \"graph TD\\n\" +",
    "    \"    Center((Queue: First)) --> Top((Queue: Last))\\n\" +",
    "    \"```\\n\\n\" +"
  ],
  "flood-fill/flood-fill-dfs": [
    "    \"```mermaid\\n\" +",
    "    \"graph TD\\n\" +",
    "    \"    Center((Stack: Last In)) --> Deep((Stack: First Out))\\n\" +",
    "    \"```\\n\\n\" +"
  ],
  "flood-fill/multi-source-bfs": [
    "    \"```mermaid\\n\" +",
    "    \"graph TD\\n\" +",
    "    \"    W1((Wall 1)) --> S((Safe Zone))\\n\" +",
    "    \"    W2((Wall 2)) --> S\\n\" +",
    "    \"    W3((Wall 3)) --> S\\n\" +",
    "    \"```\\n\\n\" +"
  ],

  // --- GRAPH TRAVERSAL ---
  "graph-traversal/bfs-exploration": [
    "    \"```mermaid\\n\" +",
    "    \"graph TD\\n\" +",
    "    \"    Root((Root)) --- A((L1))\\n\" +",
    "    \"    Root --- B((L1))\\n\" +",
    "    \"    A --- C((L2))\\n\" +",
    "    \"    A --- D((L2))\\n\" +",
    "    \"```\\n\\n\" +"
  ],
  "graph-traversal/bidirectional-bfs": [
    "    \"```mermaid\\n\" +",
    "    \"flowchart LR\\n\" +",
    "    \"    S((Start)) --> WaveS((Wave 1))\\n\" +",
    "    \"    E((End)) --> WaveE((Wave 2))\\n\" +",
    "    \"    WaveS --\\\"Overlap\\\"--- WaveE\\n\" +",
    "    \"```\\n\\n\" +"
  ],
  "graph-traversal/dfs-exploration": [
    "    \"```mermaid\\n\" +",
    "    \"graph TD\\n\" +",
    "    \"    Root((Root)) --> Left((Left Deep))\\n\" +",
    "    \"    Left --> Bottom((Bottom Hit))\\n\" +",
    "    \"    Bottom -.\\\"Backtrack\\\".-> Root\\n\" +",
    "    \"```\\n\\n\" +"
  ],
  "graph-traversal/iterative-deepening-dfs": [
    "    \"```mermaid\\n\" +",
    "    \"graph TD\\n\" +",
    "    \"    Root((Limit: 1)) --> Root2((Limit: 2))\\n\" +",
    "    \"    Root2 --> L1((Level 1))\\n\" +",
    "    \"    Root2 --> L2((Level 2))\\n\" +",
    "    \"```\\n\\n\" +"
  ],
  "graph-traversal/wall-follower": [
    "    \"```mermaid\\n\" +",
    "    \"graph TD\\n\" +",
    "    \"    Robot((Robot)) --\\\"Right Wall Detected\\\"--> MoveForward((Move Forward))\\n\" +",
    "    \"    MoveForward --\\\"Wall Ahead\\\"--> TurnLeft((Turn Left))\\n\" +",
    "    \"    TurnLeft --\\\"No Wall\\\"--> TurnRight((Turn Right))\\n\" +",
    "    \"```\\n\\n\" +"
  ],

  // --- MAZE BUILDERS ---
  "maze-generation/aldous-broder": [
    "    \"```mermaid\\n\" +",
    "    \"graph TD\\n\" +",
    "    \"    Random((Random Walk)) --> HitUnvisited((Unvisited Node: Carve!))\\n\" +",
    "    \"    Random --> HitVisited((Visited Node: Ignore))\\n\" +",
    "    \"```\\n\\n\" +"
  ],
  "maze-generation/binary-tree-maze": [
    "    \"```mermaid\\n\" +",
    "    \"graph TD\\n\" +",
    "    \"    Node((Cell)) --\\\"Pick North or West\\\"--> North((North))\\n\" +",
    "    \"    Node -.-\\\"Biased Diagonal\\\".-> West((West))\\n\" +",
    "    \"```\\n\\n\" +"
  ],
  "maze-generation/ellers-maze": [
    "    \"```mermaid\\n\" +",
    "    \"flowchart TD\\n\" +",
    "    \"    R1((Row 1)) --\\\"Merge Sets\\\"--> R1A((Set A))\\n\" +",
    "    \"    R1A --\\\"Vertical Drop\\\"--> R2((Row 2))\\n\" +",
    "    \"```\\n\\n\" +"
  ],
  "maze-generation/kruskals-maze": [
    "    \"```mermaid\\n\" +",
    "    \"graph TD\\n\" +",
    "    \"    E((Wall Edge)) --\\\"Connects Set 1 to Set 2\\\"--> Connect((Knock Down))\\n\" +",
    "    \"    E --\\\"Connects Set 1 to Set 1\\\"--> Ignore((Keep Wall))\\n\" +",
    "    \"```\\n\\n\" +"
  ],
  "maze-generation/prims-maze": [
    "    \"```mermaid\\n\" +",
    "    \"flowchart LR\\n\" +",
    "    \"    Tree((Current Tree)) --- F1((Frontier 1))\\n\" +",
    "    \"    Tree --- F2((Frontier 2))\\n\" +",
    "    \"    F1 --\\\"Random Selection\\\"--> Expand((Expand Tree))\\n\" +",
    "    \"```\\n\\n\" +"
  ],
  "maze-generation/recursive-backtracker": [
    "    \"```mermaid\\n\" +",
    "    \"graph TD\\n\" +",
    "    \"    Start((Start)) --> A((Cell A))\\n\" +",
    "    \"    A --> B((Cell B))\\n\" +",
    "    \"    B --\\\"Dead End\\\"--> B\\n\" +",
    "    \"    B -.\\\"Backtrack\\\".-> A\\n\" +",
    "    \"```\\n\\n\" +"
  ],
  "maze-generation/recursive-division": [
    "    \"```mermaid\\n\" +",
    "    \"flowchart TD\\n\" +",
    "    \"    Room((Main Room)) --\\\"Horizontal Wall\\\"--> Sub1((Sub Room Top))\\n\" +",
    "    \"    Room --> Sub2((Sub Room Bot))\\n\" +",
    "    \"    Sub1 --\\\"Vertical Wall\\\"--> Sub3((Sub Room Quadrant))\\n\" +",
    "    \"```\\n\\n\" +"
  ]
};

const basePath = "./src/algorithms/pathfinding";

for (const [key, lines] of Object.entries(INJECTIONS)) {
  const filePath = `${basePath}/${key}/educational.ts`;
  if (!fs.existsSync(filePath)) {
    console.log(`Missing file: ${filePath}`);
    continue;
  }

  let code = fs.readFileSync(filePath, 'utf8');
  
  // Try to inject at the end of "howItWorks:" value.
  // We'll search for "timeAndSpaceComplexity" and insert right before it.
  
  if (code.includes('timeAndSpaceComplexity:')) {
    const parts = code.split('timeAndSpaceComplexity:');
    
    // Check if the mermaid block is already there
    if (!parts[0].includes('```mermaid')) {
       // Append the diagram to the end of howItWorks string, which is parts[0]
       // parts[0] usually ends with `",\n\n  timeAndSpaceComplexity:`
       
       let head = parts[0].trimRight();
       if (head.endsWith('",') || head.endsWith('`,')) {
          head = head.slice(0, -2); // remove `,` and `"`
          const delimiter = parts[0].trimRight().slice(-2, -1); // get the quote character (" or `)
          
          head += "\\n\\n\" +\n";
          head += lines.join("\n") + "\n";
          head += "    " + delimiter + ",\n\n  ";
          
          const newCode = head + "timeAndSpaceComplexity:" + parts[1];
          fs.writeFileSync(filePath, newCode);
       }
    }
  }
}

console.log("Injections complete.");
