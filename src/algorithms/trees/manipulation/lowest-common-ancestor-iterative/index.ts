import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { lowestCommonAncestorIterative } from "./sources/lowest-common-ancestor-iterative.ts?fn";
import { generateLowestCommonAncestorIterativeSteps } from "./step-generator";
import type { LowestCommonAncestorIterativeInput } from "./step-generator";
import { lowestCommonAncestorIterativeEducational } from "./educational";

import typescriptSource from "./sources/lowest-common-ancestor-iterative.ts?raw";
import pythonSource from "./sources/lowest-common-ancestor-iterative.py?raw";
import javaSource from "./sources/LowestCommonAncestorIterative.java?raw";

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

interface BinaryNode {
  value: number;
  left: BinaryNode | null;
  right: BinaryNode | null;
}

function executeLowestCommonAncestorIterative(
  input: LowestCommonAncestorIterativeInput,
): number | null {
  const nodeMap = new Map(input.nodes.map((node) => [node.id, node]));
  function toBinaryNode(id: string | null): BinaryNode | null {
    if (!id) return null;
    const node = nodeMap.get(id);
    if (!node) return null;
    return {
      value: node.value,
      left: toBinaryNode(node.leftChildId),
      right: toBinaryNode(node.rightChildId),
    };
  }
  const root = toBinaryNode(input.rootId);
  const result = lowestCommonAncestorIterative(
    root,
    input.nodeValueA,
    input.nodeValueB,
  ) as BinaryNode | null;
  return result?.value ?? null;
}

const lowestCommonAncestorIterativeDefinition: AlgorithmDefinition<LowestCommonAncestorIterativeInput> =
  {
    meta: {
      id: ALGORITHM_ID.LOWEST_COMMON_ANCESTOR_ITERATIVE!,
      name: "Lowest Common Ancestor (Iterative)",
      category: CATEGORY.TREES!,
      technique: "manipulation",
      description:
        "BFS builds a parent map, then traces ancestry chains from both target nodes until a common ancestor is found — no recursion required",
      timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
      spaceComplexity: "O(n)",
      supportedLanguages: ["typescript", "python", "java"],
      defaultInput: { nodes: defaultNodes, rootId: "n4", nodeValueA: 1, nodeValueB: 3 },
    },
    execute: executeLowestCommonAncestorIterative,
    generateSteps: generateLowestCommonAncestorIterativeSteps,
    educational: lowestCommonAncestorIterativeEducational,
    sources: { typescript: typescriptSource, python: pythonSource, java: javaSource },
  };

registry.register(lowestCommonAncestorIterativeDefinition);
