/* Kahn's Algorithm registration — assembles the definition and self-registers with the algorithm registry. */

import type { AlgorithmDefinition, GraphNode, GraphEdge } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { kahnsTopologicalSort } from "./sources/kahns.ts?fn";

type AdjacencyList = Record<string, string[]>;
import { generateKahnsSteps } from "./step-generator";
import type { KahnsInput } from "./step-generator";
import { kahnsEducational } from "./educational";

import typescriptSource from "./sources/kahns.ts?raw";
import pythonSource from "./sources/kahns.py?raw";
import javaSource from "./sources/Kahns.java?raw";

/** Positions for 6 DAG nodes arranged in a layered left-to-right layout */
const NODE_POSITIONS: Record<string, { x: number; y: number }> = {
  A: { x: 50, y: 200 },
  B: { x: 175, y: 100 },
  C: { x: 175, y: 300 },
  D: { x: 300, y: 100 },
  E: { x: 300, y: 300 },
  F: { x: 425, y: 200 },
};

const defaultNodes: GraphNode[] = [
  { id: "A", label: "A", state: "default", position: NODE_POSITIONS.A! },
  { id: "B", label: "B", state: "default", position: NODE_POSITIONS.B! },
  { id: "C", label: "C", state: "default", position: NODE_POSITIONS.C! },
  { id: "D", label: "D", state: "default", position: NODE_POSITIONS.D! },
  { id: "E", label: "E", state: "default", position: NODE_POSITIONS.E! },
  { id: "F", label: "F", state: "default", position: NODE_POSITIONS.F! },
];

const defaultEdges: GraphEdge[] = [
  { source: "A", target: "B", state: "default" },
  { source: "A", target: "C", state: "default" },
  { source: "B", target: "D", state: "default" },
  { source: "C", target: "D", state: "default" },
  { source: "C", target: "E", state: "default" },
  { source: "D", target: "F", state: "default" },
  { source: "E", target: "F", state: "default" },
];

const defaultAdjacencyList: AdjacencyList = {
  A: ["B", "C"],
  B: ["D"],
  C: ["D", "E"],
  D: ["F"],
  E: ["F"],
  F: [],
};

const defaultNodeIds = ["A", "B", "C", "D", "E", "F"];

const defaultInput: KahnsInput = {
  adjacencyList: defaultAdjacencyList,
  nodeIds: defaultNodeIds,
  nodes: defaultNodes,
  edges: defaultEdges,
};

const kahnsDefinition: AlgorithmDefinition<KahnsInput> = {
  meta: {
    id: ALGORITHM_ID.KAHNS!,
    name: "Kahn's Algorithm",
    category: CATEGORY.GRAPH!,
    technique: "topological-sort",
    description:
      "A BFS-based topological sort that repeatedly removes zero in-degree vertices, producing a valid ordering for directed acyclic graphs",
    timeComplexity: {
      best: "O(V+E)",
      average: "O(V+E)",
      worst: "O(V+E)",
    },
    spaceComplexity: "O(V)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput,
  },
  execute: (input: KahnsInput) => kahnsTopologicalSort(input.adjacencyList, input.nodeIds),
  generateSteps: generateKahnsSteps,
  educational: kahnsEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(kahnsDefinition);
