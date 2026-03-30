/* Connected Components algorithm registration — assembles the definition and self-registers with the algorithm registry. */

import type { AlgorithmDefinition, GraphNode, GraphEdge } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { connectedComponents } from "./sources/connected-components.ts?fn";

type AdjacencyList = Record<string, string[]>;
import { generateConnectedComponentsSteps } from "./step-generator";
import type { ConnectedComponentsInput } from "./step-generator";
import { connectedComponentsEducational } from "./educational";

import typescriptSource from "./sources/connected-components.ts?raw";
import pythonSource from "./sources/connected-components.py?raw";
import javaSource from "./sources/ConnectedComponents.java?raw";

/** Positions 8 nodes in two stacked rows of 4 for a compact multi-component layout */
function rowPosition(index: number): { x: number; y: number } {
  const nodesPerRow = 4;
  const rowIndex = Math.floor(index / nodesPerRow);
  const colIndex = index % nodesPerRow;
  return {
    x: 80 + colIndex * 110,
    y: 100 + rowIndex * 160,
  };
}

const defaultNodes: GraphNode[] = [
  { id: "A", label: "A", state: "default", position: rowPosition(0) },
  { id: "B", label: "B", state: "default", position: rowPosition(1) },
  { id: "C", label: "C", state: "default", position: rowPosition(2) },
  { id: "D", label: "D", state: "default", position: rowPosition(4) },
  { id: "E", label: "E", state: "default", position: rowPosition(5) },
  { id: "F", label: "F", state: "default", position: rowPosition(6) },
  { id: "G", label: "G", state: "default", position: rowPosition(7) },
  { id: "H", label: "H", state: "default", position: { x: 415, y: 260 } },
];

/** Undirected edges — both directions required in defaultEdges for the visualizer */
const defaultEdges: GraphEdge[] = [
  { source: "A", target: "B", state: "default" },
  { source: "B", target: "A", state: "default" },
  { source: "B", target: "C", state: "default" },
  { source: "C", target: "B", state: "default" },
  { source: "D", target: "E", state: "default" },
  { source: "E", target: "D", state: "default" },
  { source: "F", target: "G", state: "default" },
  { source: "G", target: "F", state: "default" },
  { source: "G", target: "H", state: "default" },
  { source: "H", target: "G", state: "default" },
];

const defaultAdjacencyList: AdjacencyList = {
  A: ["B"],
  B: ["A", "C"],
  C: ["B"],
  D: ["E"],
  E: ["D"],
  F: ["G"],
  G: ["F", "H"],
  H: ["G"],
};

const defaultNodeIds = ["A", "B", "C", "D", "E", "F", "G", "H"];

const defaultInput: ConnectedComponentsInput = {
  adjacencyList: defaultAdjacencyList,
  nodeIds: defaultNodeIds,
  nodes: defaultNodes,
  edges: defaultEdges,
};

const connectedComponentsDefinition: AlgorithmDefinition<ConnectedComponentsInput> = {
  meta: {
    id: ALGORITHM_ID.CONNECTED_COMPONENTS!,
    name: "Connected Components",
    category: CATEGORY.GRAPH!,
    technique: "connectivity",
    description:
      "Partitions an undirected graph into its maximally connected subgraphs using a BFS sweep over all unvisited nodes",
    timeComplexity: {
      best: "O(V+E)",
      average: "O(V+E)",
      worst: "O(V+E)",
    },
    spaceComplexity: "O(V)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput,
  },
  execute: (input: ConnectedComponentsInput) =>
    connectedComponents(input.adjacencyList, input.nodeIds),
  generateSteps: generateConnectedComponentsSteps,
  educational: connectedComponentsEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(connectedComponentsDefinition);
