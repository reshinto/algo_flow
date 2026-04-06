import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { cousinsInBinaryTree } from "./sources/cousins-in-binary-tree.ts?fn";
import { generateCousinsInBinaryTreeSteps } from "./step-generator";
import type { CousinsInBinaryTreeInput } from "./step-generator";
import { cousinsInBinaryTreeEducational } from "./educational";

import typescriptSource from "./sources/cousins-in-binary-tree.ts?raw";
import pythonSource from "./sources/cousins-in-binary-tree.py?raw";
import javaSource from "./sources/CousinsInBinaryTree.java?raw";

/** Balanced 7-node BST: root=4, nodes 1 and 5 are cousins (depth 2, different parents 2 and 6) */
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

function executeCousinsInBinaryTree(input: CousinsInBinaryTreeInput): boolean {
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
  return cousinsInBinaryTree(
    toBSTNode(input.rootId),
    input.nodeValueA,
    input.nodeValueB,
  ) as boolean;
}

const cousinsInBinaryTreeDefinition: AlgorithmDefinition<CousinsInBinaryTreeInput> = {
  meta: {
    id: ALGORITHM_ID.COUSINS_IN_BINARY_TREE!,
    name: "Cousins in Binary Tree",
    category: CATEGORY.TREES!,
    technique: "properties",
    description:
      "Determines if two nodes are cousins — same depth in the tree but with different parents. Uses BFS to track depth and parent for both target nodes.",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(w)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { nodes: defaultNodes, rootId: "n4", nodeValueA: 1, nodeValueB: 5 },
  },
  execute: executeCousinsInBinaryTree,
  generateSteps: generateCousinsInBinaryTreeSteps,
  educational: cousinsInBinaryTreeEducational,
  sources: { typescript: typescriptSource, python: pythonSource, java: javaSource },
};

registry.register(cousinsInBinaryTreeDefinition);
