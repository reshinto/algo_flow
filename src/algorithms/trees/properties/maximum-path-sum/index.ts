import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { maximumPathSum } from "./sources/maximum-path-sum.ts?fn";
import { generateMaximumPathSumSteps } from "./step-generator";
import type { MaximumPathSumInput } from "./step-generator";
import { maximumPathSumEducational } from "./educational";

import typescriptSource from "./sources/maximum-path-sum.ts?raw";
import pythonSource from "./sources/maximum-path-sum.py?raw";
import javaSource from "./sources/MaximumPathSum.java?raw";
import rustSource from "./sources/maximum-path-sum.rs?raw";
import cppSource from "./sources/MaximumPathSum.cpp?raw";
import goSource from "./sources/maximum-path-sum.go?raw";

/** Balanced 7-node BST: root=4, left subtree [2,1,3], right subtree [6,5,7]. Max path is 3+2+4+6+7=22. */
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

function executeMaximumPathSum(input: MaximumPathSumInput): number {
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
  return maximumPathSum(toBSTNode(input.rootId)) as number;
}

const maximumPathSumDefinition: AlgorithmDefinition<MaximumPathSumInput> = {
  meta: {
    id: ALGORITHM_ID.MAXIMUM_PATH_SUM!,
    name: "Maximum Path Sum",
    category: CATEGORY.TREES!,
    technique: "properties",
    description:
      "Finds the maximum sum path between any two nodes. At each node it computes leftGain + node + rightGain and tracks the global maximum.",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(h)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { nodes: defaultNodes, rootId: "n4" },
  },
  execute: executeMaximumPathSum,
  generateSteps: generateMaximumPathSumSteps,
  educational: maximumPathSumEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(maximumPathSumDefinition);
