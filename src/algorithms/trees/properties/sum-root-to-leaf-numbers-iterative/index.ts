import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { sumRootToLeafNumbersIterative } from "./sources/sum-root-to-leaf-numbers-iterative.ts?fn";
import { generateSumRootToLeafNumbersIterativeSteps } from "./step-generator";
import type { SumRootToLeafNumbersIterativeInput } from "./step-generator";
import { sumRootToLeafNumbersIterativeEducational } from "./educational";

import typescriptSource from "./sources/sum-root-to-leaf-numbers-iterative.ts?raw";
import pythonSource from "./sources/sum-root-to-leaf-numbers-iterative.py?raw";
import javaSource from "./sources/SumRootToLeafNumbersIterative.java?raw";
import rustSource from "./sources/sum-root-to-leaf-numbers-iterative.rs?raw";
import cppSource from "./sources/SumRootToLeafNumbersIterative.cpp?raw";
import goSource from "./sources/sum-root-to-leaf-numbers-iterative.go?raw";

/** Balanced 7-node BST: root=4, left subtree [2,1,3], right subtree [6,5,7]. Paths: 421+423+465+467=1776. */
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

function executeSumRootToLeafNumbersIterative(input: SumRootToLeafNumbersIterativeInput): number {
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
  return sumRootToLeafNumbersIterative(toBSTNode(input.rootId)) as number;
}

const sumRootToLeafNumbersIterativeDefinition: AlgorithmDefinition<SumRootToLeafNumbersIterativeInput> =
  {
    meta: {
      id: ALGORITHM_ID.SUM_ROOT_TO_LEAF_NUMBERS_ITERATIVE!,
      name: "Sum Root to Leaf Numbers (Iterative)",
      category: CATEGORY.TREES!,
      technique: "properties",
      description:
        "Iterative stack-based number formation — each stack entry carries the node and its running decimal number",
      timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
      spaceComplexity: "O(h)",
      supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
      defaultInput: { nodes: defaultNodes, rootId: "n4" },
    },
    execute: executeSumRootToLeafNumbersIterative,
    generateSteps: generateSumRootToLeafNumbersIterativeSteps,
    educational: sumRootToLeafNumbersIterativeEducational,
    sources: {
      typescript: typescriptSource,
      python: pythonSource,
      java: javaSource,
      rust: rustSource,
      cpp: cppSource,
      go: goSource,
    },
  };

registry.register(sumRootToLeafNumbersIterativeDefinition);
