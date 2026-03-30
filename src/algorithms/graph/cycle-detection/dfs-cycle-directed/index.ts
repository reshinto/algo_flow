/* DFS Cycle Detection (Directed) registration — assembles the definition and self-registers. */

import type { AlgorithmDefinition, GraphNode, GraphEdge } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { dfsCycleDirected } from "./sources/dfs-cycle-directed.ts?fn";

import { generateDfsCycleDirectedSteps } from "./step-generator";
import type { DfsCycleDirectedInput } from "./step-generator";
import { dfsCycleDirectedEducational } from "./educational";

import typescriptSource from "./sources/dfs-cycle-directed.ts?raw";
import pythonSource from "./sources/dfs-cycle-directed.py?raw";
import javaSource from "./sources/DfsCycleDirected.java?raw";

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

/** 5-node directed graph with a cycle: A→B→C→D→B (back edge D→B), plus E→A */
const defaultNodes: GraphNode[] = [
  { id: "A", label: "A", state: "default", position: circlePosition(0, 5) },
  { id: "B", label: "B", state: "default", position: circlePosition(1, 5) },
  { id: "C", label: "C", state: "default", position: circlePosition(2, 5) },
  { id: "D", label: "D", state: "default", position: circlePosition(3, 5) },
  { id: "E", label: "E", state: "default", position: circlePosition(4, 5) },
];

const defaultEdges: GraphEdge[] = [
  { source: "A", target: "B", state: "default" },
  { source: "B", target: "C", state: "default" },
  { source: "C", target: "D", state: "default" },
  { source: "D", target: "B", state: "default" },
  { source: "E", target: "A", state: "default" },
];

const defaultAdjacencyList: Record<string, string[]> = {
  A: ["B"],
  B: ["C"],
  C: ["D"],
  D: ["B"],
  E: ["A"],
};

const defaultInput: DfsCycleDirectedInput = {
  adjacencyList: defaultAdjacencyList,
  nodeIds: ["A", "B", "C", "D", "E"],
  nodes: defaultNodes,
  edges: defaultEdges,
};

const dfsCycleDirectedDefinition: AlgorithmDefinition<DfsCycleDirectedInput> = {
  meta: {
    id: ALGORITHM_ID.DFS_CYCLE_DIRECTED!,
    name: "DFS Cycle Detection (Directed)",
    category: CATEGORY.GRAPH!,
    technique: "cycle-detection",
    description:
      "Detects cycles in a directed graph using DFS with three-color marking: white (unvisited), gray (in-stack), black (processed) — a back edge to a gray node reveals a cycle",
    timeComplexity: {
      best: "O(V+E)",
      average: "O(V+E)",
      worst: "O(V+E)",
    },
    spaceComplexity: "O(V)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput,
  },
  execute: (input: DfsCycleDirectedInput) =>
    dfsCycleDirected(input.adjacencyList, input.nodeIds) as boolean,
  generateSteps: generateDfsCycleDirectedSteps,
  educational: dfsCycleDirectedEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(dfsCycleDirectedDefinition);
