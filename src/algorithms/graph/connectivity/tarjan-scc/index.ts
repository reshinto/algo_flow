/* Tarjan's SCC algorithm registration — assembles the definition and self-registers with the algorithm registry. */

import type { AlgorithmDefinition, GraphNode, GraphEdge } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { tarjanSCC } from "./sources/tarjan-scc.ts?fn";

type AdjacencyList = Record<string, string[]>;
import { generateTarjanSccSteps } from "./step-generator";
import type { TarjanSccInput } from "./step-generator";
import { tarjanSccEducational } from "./educational";

import typescriptSource from "./sources/tarjan-scc.ts?raw";
import pythonSource from "./sources/tarjan-scc.py?raw";
import javaSource from "./sources/TarjanSCC.java?raw";

/** Positions 8 nodes in two clusters to reflect the SCC structure visually */
function sccPosition(index: number): { x: number; y: number } {
  const positions = [
    { x: 100, y: 80 },
    { x: 200, y: 40 },
    { x: 200, y: 140 },
    { x: 350, y: 80 },
    { x: 350, y: 180 },
    { x: 280, y: 300 },
    { x: 370, y: 260 },
    { x: 420, y: 340 },
  ];
  return positions[index] ?? { x: 0, y: 0 };
}

const defaultNodes: GraphNode[] = [
  { id: "A", label: "A", state: "default", position: sccPosition(0) },
  { id: "B", label: "B", state: "default", position: sccPosition(1) },
  { id: "C", label: "C", state: "default", position: sccPosition(2) },
  { id: "D", label: "D", state: "default", position: sccPosition(3) },
  { id: "E", label: "E", state: "default", position: sccPosition(4) },
  { id: "F", label: "F", state: "default", position: sccPosition(5) },
  { id: "G", label: "G", state: "default", position: sccPosition(6) },
  { id: "H", label: "H", state: "default", position: sccPosition(7) },
];

/** Directed edges forming 3 SCCs: {A,B,C}, {D,E}, {F,G,H} with cross-edges C→D and E→F */
const defaultEdges: GraphEdge[] = [
  { source: "A", target: "B", state: "default" },
  { source: "B", target: "C", state: "default" },
  { source: "C", target: "A", state: "default" },
  { source: "D", target: "E", state: "default" },
  { source: "E", target: "D", state: "default" },
  { source: "F", target: "G", state: "default" },
  { source: "G", target: "H", state: "default" },
  { source: "H", target: "F", state: "default" },
  { source: "C", target: "D", state: "default" },
  { source: "E", target: "F", state: "default" },
];

const defaultAdjacencyList: AdjacencyList = {
  A: ["B"],
  B: ["C"],
  C: ["A", "D"],
  D: ["E"],
  E: ["D", "F"],
  F: ["G"],
  G: ["H"],
  H: ["F"],
};

const defaultInput: TarjanSccInput = {
  adjacencyList: defaultAdjacencyList,
  nodeIds: ["A", "B", "C", "D", "E", "F", "G", "H"],
  nodes: defaultNodes,
  edges: defaultEdges,
};

const tarjanSccDefinition: AlgorithmDefinition<TarjanSccInput> = {
  meta: {
    id: ALGORITHM_ID.TARJAN_SCC!,
    name: "Tarjan's SCC",
    category: CATEGORY.GRAPH!,
    technique: "connectivity",
    description:
      "Finds all strongly connected components in a directed graph using a single DFS pass with discovery times and low-link values",
    timeComplexity: {
      best: "O(V+E)",
      average: "O(V+E)",
      worst: "O(V+E)",
    },
    spaceComplexity: "O(V)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput,
  },
  execute: (input: TarjanSccInput) => tarjanSCC(input.adjacencyList, input.nodeIds),
  generateSteps: generateTarjanSccSteps,
  educational: tarjanSccEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(tarjanSccDefinition);
