import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { pathSum } from "./sources/path-sum.ts?fn";
import { generatePathSumSteps } from "./step-generator";
import type { PathSumInput } from "./step-generator";
import { pathSumEducational } from "./educational";

import typescriptSource from "./sources/path-sum.ts?raw";
import pythonSource from "./sources/path-sum.py?raw";
import javaSource from "./sources/PathSum.java?raw";
import rustSource from "./sources/path-sum.rs?raw";
import cppSource from "./sources/PathSum.cpp?raw";
import goSource from "./sources/path-sum.go?raw";

/** Balanced 7-node BST: root=4, left subtree [2,1,3], right subtree [6,5,7]. Path 4→2→1 sums to 7. */
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

function executePathSum(input: PathSumInput): boolean {
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
  return pathSum(toBSTNode(input.rootId), input.targetSum) as boolean;
}

const pathSumDefinition: AlgorithmDefinition<PathSumInput> = {
  meta: {
    id: ALGORITHM_ID.PATH_SUM!,
    name: "Path Sum",
    category: CATEGORY.TREES!,
    technique: "properties",
    description:
      "Checks if any root-to-leaf path in the tree sums to the target value using recursive DFS with running subtraction",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(h)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { nodes: defaultNodes, rootId: "n4", targetSum: 7 },
  },
  execute: executePathSum,
  generateSteps: generatePathSumSteps,
  educational: pathSumEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(pathSumDefinition);
