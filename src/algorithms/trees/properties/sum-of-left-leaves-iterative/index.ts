import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { sumOfLeftLeavesIterative } from "./sources/sum-of-left-leaves-iterative.ts?fn";
import { generateSumOfLeftLeavesIterativeSteps } from "./step-generator";
import type { SumOfLeftLeavesIterativeInput } from "./step-generator";
import { sumOfLeftLeavesIterativeEducational } from "./educational";

import typescriptSource from "./sources/sum-of-left-leaves-iterative.ts?raw";
import pythonSource from "./sources/sum-of-left-leaves-iterative.py?raw";
import javaSource from "./sources/SumOfLeftLeavesIterative.java?raw";
import rustSource from "./sources/sum-of-left-leaves-iterative.rs?raw";
import cppSource from "./sources/SumOfLeftLeavesIterative.cpp?raw";
import goSource from "./sources/sum-of-left-leaves-iterative.go?raw";

/** Balanced 7-node BST: root=4, left leaves are 1 and 5 (sum=6) */
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

function executeSumOfLeftLeavesIterative(input: SumOfLeftLeavesIterativeInput): number {
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
  return sumOfLeftLeavesIterative(toBSTNode(input.rootId)) as number;
}

const sumOfLeftLeavesIterativeDefinition: AlgorithmDefinition<SumOfLeftLeavesIterativeInput> = {
  meta: {
    id: ALGORITHM_ID.SUM_OF_LEFT_LEAVES_ITERATIVE!,
    name: "Sum of Left Leaves (Iterative)",
    category: CATEGORY.TREES!,
    technique: "properties",
    description:
      "Stack-based DFS that tracks whether each node was reached as a left child to identify left leaves",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(h)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { nodes: defaultNodes, rootId: "n4" },
  },
  execute: executeSumOfLeftLeavesIterative,
  generateSteps: generateSumOfLeftLeavesIterativeSteps,
  educational: sumOfLeftLeavesIterativeEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(sumOfLeftLeavesIterativeDefinition);
