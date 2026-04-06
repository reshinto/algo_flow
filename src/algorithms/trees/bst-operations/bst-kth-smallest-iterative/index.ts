import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { bstKthSmallestIterative } from "./sources/bst-kth-smallest-iterative.ts?fn";
import { generateBstKthSmallestIterativeSteps } from "./step-generator";
import type { BstKthSmallestIterativeInput } from "./step-generator";
import { bstKthSmallestIterativeEducational } from "./educational";

import typescriptSource from "./sources/bst-kth-smallest-iterative.ts?raw";
import pythonSource from "./sources/bst-kth-smallest-iterative.py?raw";
import javaSource from "./sources/BSTKthSmallestIterative.java?raw";

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

interface BSTNodeShape {
  value: number;
  left: BSTNodeShape | null;
  right: BSTNodeShape | null;
}

function executeBstKthSmallestIterative(input: BstKthSmallestIterativeInput): number {
  const nodeMap = new Map(input.nodes.map((node) => [node.id, node]));
  function toBST(id: string | null): BSTNodeShape | null {
    if (!id) return null;
    const node = nodeMap.get(id);
    if (!node) return null;
    return { value: node.value, left: toBST(node.leftChildId), right: toBST(node.rightChildId) };
  }
  const root = toBST(input.rootId);
  return bstKthSmallestIterative(root, input.kthPosition) as number;
}

const bstKthSmallestIterativeDefinition: AlgorithmDefinition<BstKthSmallestIterativeInput> = {
  meta: {
    id: ALGORITHM_ID.BST_KTH_SMALLEST_ITERATIVE!,
    name: "BST Kth Smallest (Iterative)",
    category: CATEGORY.TREES!,
    technique: "bst-operations",
    description: "Stack-based in-order traversal counting nodes to find the kth smallest value",
    timeComplexity: { best: "O(k)", average: "O(k)", worst: "O(n)" },
    spaceComplexity: "O(h)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { nodes: defaultNodes, rootId: "n4", kthPosition: 3 },
  },
  execute: executeBstKthSmallestIterative,
  generateSteps: generateBstKthSmallestIterativeSteps,
  educational: bstKthSmallestIterativeEducational,
  sources: { typescript: typescriptSource, python: pythonSource, java: javaSource },
};

registry.register(bstKthSmallestIterativeDefinition);
