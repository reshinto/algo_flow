/* DFS Cycle Detection (Undirected) registration — assembles the definition and self-registers. */

import type { AlgorithmDefinition, GraphNode, GraphEdge } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { dfsCycleUndirected } from "./sources/dfs-cycle-undirected.ts?fn";

import { generateDfsCycleUndirectedSteps } from "./step-generator";
import type { DfsCycleUndirectedInput } from "./step-generator";
import { dfsCycleUndirectedEducational } from "./educational";

import typescriptSource from "./sources/dfs-cycle-undirected.ts?raw";
import pythonSource from "./sources/dfs-cycle-undirected.py?raw";
import javaSource from "./sources/DfsCycleUndirected.java?raw";

const CIRCLE_RADIUS = 150;
const CENTER_X = 200;
const CENTER_Y = 200;

function circlePosition(index: number, totalNodes: number): { x: number; y: number } {
  const angle = (2 * Math.PI * index) / totalNodes - Math.PI / 2;
  return {
    x: Math.round(CENTER_X + CIRCLE_RADIUS * Math.cos(angle)),
    y: Math.round(CENTER_Y + CIRCLE_RADIUS * Math.sin(angle)),
  };
}

/** 5-node undirected graph with a cycle: A—B—C—D—A, plus isolated edge D—E */
const defaultNodes: GraphNode[] = [
  { id: "A", label: "A", state: "default", position: circlePosition(0, 5) },
  { id: "B", label: "B", state: "default", position: circlePosition(1, 5) },
  { id: "C", label: "C", state: "default", position: circlePosition(2, 5) },
  { id: "D", label: "D", state: "default", position: circlePosition(3, 5) },
  { id: "E", label: "E", state: "default", position: circlePosition(4, 5) },
];

/** Edges in both directions for undirected rendering */
const defaultEdges: GraphEdge[] = [
  { source: "A", target: "B", state: "default" },
  { source: "B", target: "A", state: "default" },
  { source: "B", target: "C", state: "default" },
  { source: "C", target: "B", state: "default" },
  { source: "C", target: "D", state: "default" },
  { source: "D", target: "C", state: "default" },
  { source: "D", target: "A", state: "default" },
  { source: "A", target: "D", state: "default" },
  { source: "D", target: "E", state: "default" },
  { source: "E", target: "D", state: "default" },
];

const defaultAdjacencyList: Record<string, string[]> = {
  A: ["B", "D"],
  B: ["A", "C"],
  C: ["B", "D"],
  D: ["C", "A", "E"],
  E: ["D"],
};

const defaultInput: DfsCycleUndirectedInput = {
  adjacencyList: defaultAdjacencyList,
  nodeIds: ["A", "B", "C", "D", "E"],
  nodes: defaultNodes,
  edges: defaultEdges,
};

const dfsCycleUndirectedDefinition: AlgorithmDefinition<DfsCycleUndirectedInput> = {
  meta: {
    id: ALGORITHM_ID.DFS_CYCLE_UNDIRECTED!,
    name: "DFS Cycle Detection (Undirected)",
    category: CATEGORY.GRAPH!,
    technique: "cycle-detection",
    description:
      "Detects cycles in an undirected graph using DFS with parent tracking — a back edge to any already-visited node other than the direct parent reveals a cycle",
    timeComplexity: {
      best: "O(V+E)",
      average: "O(V+E)",
      worst: "O(V+E)",
    },
    spaceComplexity: "O(V)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput,
  },
  execute: (input: DfsCycleUndirectedInput) =>
    dfsCycleUndirected(input.adjacencyList, input.nodeIds) as boolean,
  generateSteps: generateDfsCycleUndirectedSteps,
  educational: dfsCycleUndirectedEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(dfsCycleUndirectedDefinition);
