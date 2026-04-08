import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { zigzagLevelOrder } from "./sources/zigzag-level-order.ts?fn";
import { generateZigzagLevelOrderSteps } from "./step-generator";
import type { ZigzagLevelOrderInput } from "./step-generator";
import { zigzagLevelOrderEducational } from "./educational";

import typescriptSource from "./sources/zigzag-level-order.ts?raw";
import pythonSource from "./sources/zigzag-level-order.py?raw";
import javaSource from "./sources/ZigzagLevelOrder.java?raw";
import rustSource from "./sources/zigzag-level-order.rs?raw";
import cppSource from "./sources/ZigzagLevelOrder.cpp?raw";
import goSource from "./sources/zigzag-level-order.go?raw";

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

/** Execute zigzag level-order traversal using the ?fn source */
function executeZigzagLevelOrder(input: ZigzagLevelOrderInput): number[][] {
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
  return zigzagLevelOrder(root) as number[][];
}

const zigzagLevelOrderDefinition: AlgorithmDefinition<ZigzagLevelOrderInput> = {
  meta: {
    id: ALGORITHM_ID.ZIGZAG_LEVEL_ORDER!,
    name: "Zigzag Level-Order Traversal",
    category: CATEGORY.TREES!,
    technique: "traversal",
    description:
      "BFS traversal that alternates direction per level — left-to-right then right-to-left, producing a zigzag pattern",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(w)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      nodes: defaultNodes,
      rootId: "n4",
    },
  },
  execute: executeZigzagLevelOrder,
  generateSteps: generateZigzagLevelOrderSteps,
  educational: zigzagLevelOrderEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(zigzagLevelOrderDefinition);
