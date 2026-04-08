import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { countCompleteTreeNodes } from "./sources/count-complete-tree-nodes.ts?fn";
import { generateCountCompleteTreeNodesSteps } from "./step-generator";
import type { CountCompleteTreeNodesInput } from "./step-generator";
import { countCompleteTreeNodesEducational } from "./educational";

import typescriptSource from "./sources/count-complete-tree-nodes.ts?raw";
import pythonSource from "./sources/count-complete-tree-nodes.py?raw";
import javaSource from "./sources/CountCompleteTreeNodes.java?raw";
import rustSource from "./sources/count-complete-tree-nodes.rs?raw";
import cppSource from "./sources/CountCompleteTreeNodes.cpp?raw";
import goSource from "./sources/count-complete-tree-nodes.go?raw";

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

function executeCountCompleteTreeNodes(input: CountCompleteTreeNodesInput): number {
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
  return countCompleteTreeNodes(toBSTNode(input.rootId)) as number;
}

const countCompleteTreeNodesDefinition: AlgorithmDefinition<CountCompleteTreeNodesInput> = {
  meta: {
    id: ALGORITHM_ID.COUNT_COMPLETE_TREE_NODES!,
    name: "Count Complete Tree Nodes",
    category: CATEGORY.TREES!,
    technique: "properties",
    description:
      "Counts nodes in a complete binary tree in O(log²n) by exploiting the property that a subtree with equal left and right heights is a perfect binary tree",
    timeComplexity: { best: "O(log²n)", average: "O(log²n)", worst: "O(log²n)" },
    spaceComplexity: "O(log n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { nodes: defaultNodes, rootId: "n4" },
  },
  execute: executeCountCompleteTreeNodes,
  generateSteps: generateCountCompleteTreeNodesSteps,
  educational: countCompleteTreeNodesEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(countCompleteTreeNodesDefinition);
