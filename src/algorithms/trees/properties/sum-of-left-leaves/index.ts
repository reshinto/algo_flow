import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { sumOfLeftLeaves } from "./sources/sum-of-left-leaves.ts?fn";
import { generateSumOfLeftLeavesSteps } from "./step-generator";
import type { SumOfLeftLeavesInput } from "./step-generator";
import { sumOfLeftLeavesEducational } from "./educational";

import typescriptSource from "./sources/sum-of-left-leaves.ts?raw";
import pythonSource from "./sources/sum-of-left-leaves.py?raw";
import javaSource from "./sources/SumOfLeftLeaves.java?raw";

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

function executeSumOfLeftLeaves(input: SumOfLeftLeavesInput): number {
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
  return sumOfLeftLeaves(toBSTNode(input.rootId)) as number;
}

const sumOfLeftLeavesDefinition: AlgorithmDefinition<SumOfLeftLeavesInput> = {
  meta: {
    id: ALGORITHM_ID.SUM_OF_LEFT_LEAVES!,
    name: "Sum of Left Leaves",
    category: CATEGORY.TREES!,
    technique: "properties",
    description:
      "Sums the values of all left leaf nodes. A leaf is a node with no children. A left leaf is a leaf that is the left child of its parent.",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(h)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { nodes: defaultNodes, rootId: "n4" },
  },
  execute: executeSumOfLeftLeaves,
  generateSteps: generateSumOfLeftLeavesSteps,
  educational: sumOfLeftLeavesEducational,
  sources: { typescript: typescriptSource, python: pythonSource, java: javaSource },
};

registry.register(sumOfLeftLeavesDefinition);
