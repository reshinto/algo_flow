import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { bstInorderIterative } from "./sources/bst-inorder-iterative.ts?fn";
import { generateBstInorderIterativeSteps } from "./step-generator";
import type { BstInorderIterativeInput } from "./step-generator";
import { bstInorderIterativeEducational } from "./educational";

import typescriptSource from "./sources/bst-inorder-iterative.ts?raw";
import pythonSource from "./sources/bst-inorder-iterative.py?raw";
import javaSource from "./sources/BSTInorderIterative.java?raw";

/** Build a balanced 7-node BST: [4,2,6,1,3,5,7] */
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

/** Execute iterative BST in-order using the ?fn source — visits nodes in ascending order */
function executeBstInorderIterative(input: BstInorderIterativeInput): number[] {
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
  const root = toBSTNode(input.rootId);
  return bstInorderIterative(root) as number[];
}

const bstInorderIterativeDefinition: AlgorithmDefinition<BstInorderIterativeInput> = {
  meta: {
    id: ALGORITHM_ID.BST_INORDER_ITERATIVE!,
    name: "BST In-Order Traversal (Iterative)",
    category: CATEGORY.TREES!,
    technique: "traversal",
    description:
      "An iterative LNR traversal using an explicit stack — visits nodes in ascending sorted order without recursion",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(h)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      nodes: defaultNodes,
      rootId: "n4",
    },
  },
  execute: executeBstInorderIterative,
  generateSteps: generateBstInorderIterativeSteps,
  educational: bstInorderIterativeEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(bstInorderIterativeDefinition);
