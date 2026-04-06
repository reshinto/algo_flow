import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { minimumDepth } from "./sources/minimum-depth.ts?fn";
import { generateMinimumDepthSteps } from "./step-generator";
import type { MinimumDepthInput } from "./step-generator";
import { minimumDepthEducational } from "./educational";

import typescriptSource from "./sources/minimum-depth.ts?raw";
import pythonSource from "./sources/minimum-depth.py?raw";
import javaSource from "./sources/MinimumDepth.java?raw";

/** Balanced 7-node BST: root=4, left subtree [2,1,3], right subtree [6,5,7] */
const defaultNodes: TreeNode[] = [
  {
    id: "n4",
    value: 4,
    parentId: null,
    leftChildId: "n2",
    rightChildId: "n6",
    state: "default",
    position: { x: 200, y: 60 },
  },
  {
    id: "n2",
    value: 2,
    parentId: "n4",
    leftChildId: "n1",
    rightChildId: "n3",
    state: "default",
    position: { x: 100, y: 160 },
  },
  {
    id: "n6",
    value: 6,
    parentId: "n4",
    leftChildId: "n5",
    rightChildId: "n7",
    state: "default",
    position: { x: 300, y: 160 },
  },
  {
    id: "n1",
    value: 1,
    parentId: "n2",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 50, y: 260 },
  },
  {
    id: "n3",
    value: 3,
    parentId: "n2",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 150, y: 260 },
  },
  {
    id: "n5",
    value: 5,
    parentId: "n6",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 250, y: 260 },
  },
  {
    id: "n7",
    value: 7,
    parentId: "n6",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 350, y: 260 },
  },
];

function executeMinimumDepth(input: MinimumDepthInput): number {
  interface BSTNode {
    value: number;
    left: BSTNode | null;
    right: BSTNode | null;
  }
  const nodeMap = new Map(input.nodes.map((node) => [node.id, node]));
  function toBSTNode(id: string | null): BSTNode | null {
    if (!id) return null;
    const node = nodeMap.get(id);
    if (!node) return null;
    return {
      value: node.value,
      left: toBSTNode(node.leftChildId),
      right: toBSTNode(node.rightChildId),
    };
  }
  return minimumDepth(toBSTNode(input.rootId)) as number;
}

const minimumDepthDefinition: AlgorithmDefinition<MinimumDepthInput> = {
  meta: {
    id: ALGORITHM_ID.MINIMUM_DEPTH!,
    name: "Minimum Depth",
    category: CATEGORY.TREES!,
    technique: "properties",
    description:
      "Recursively finds the minimum depth — shortest path from root to any leaf node. Handles single-child nodes correctly.",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(h)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { nodes: defaultNodes, rootId: "n4" },
  },
  execute: executeMinimumDepth,
  generateSteps: generateMinimumDepthSteps,
  educational: minimumDepthEducational,
  sources: { typescript: typescriptSource, python: pythonSource, java: javaSource },
};

registry.register(minimumDepthDefinition);
