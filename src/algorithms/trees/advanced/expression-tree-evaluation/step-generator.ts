/** Step generator for Expression Tree Evaluation — builds tree from postfix then evaluates. */

import type { ExecutionStep, TreeNode } from "@/types";
import { AdvancedTreeTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const EXPR_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.EXPRESSION_TREE_EVALUATION!);

export interface ExpressionTreeEvaluationInput {
  expression: string;
}

interface ExprInternalNode {
  id: string;
  token: string;
  value: number;
  leftId: string | null;
  rightId: string | null;
  parentId: string | null;
}

const OPERATORS = new Set(["+", "-", "*", "/"]);

function isOperator(token: string): boolean {
  return OPERATORS.has(token);
}

export function generateExpressionTreeEvaluationSteps(
  input: ExpressionTreeEvaluationInput,
): ExecutionStep[] {
  const { expression } = input;
  const tokens = expression.trim().split(/\s+/);
  const exprNodes = new Map<string, ExprInternalNode>();
  let nodeCounter = 0;

  const tracker = new AdvancedTreeTracker([], "eroot", EXPR_LINE_MAP);
  tracker.initialize("Expression Tree Evaluation", { expression });

  function makeId(): string {
    nodeCounter += 1;
    return `e${nodeCounter}`;
  }

  function toTreeNodes(): TreeNode[] {
    const rootNode = Array.from(exprNodes.values()).find((node) => !node.parentId);
    const rootId = rootNode?.id ?? null;

    const posMap = new Map<string, { x: number; y: number }>();
    function assignPos(nodeId: string | null, depth: number, minX: number, maxX: number): void {
      if (!nodeId) return;
      const node = exprNodes.get(nodeId);
      if (!node) return;
      const midX = (minX + maxX) / 2;
      posMap.set(nodeId, { x: midX, y: depth * 80 + 40 });
      assignPos(node.leftId, depth + 1, minX, midX);
      assignPos(node.rightId, depth + 1, midX, maxX);
    }
    assignPos(rootId, 0, 20, 480);

    return Array.from(exprNodes.values()).map((node) => ({
      id: node.id,
      value: node.value,
      parentId: node.parentId,
      leftChildId: node.leftId,
      rightChildId: node.rightId,
      childrenIds: [node.leftId, node.rightId].filter((id): id is string => id !== null),
      state: "default" as const,
      position: posMap.get(node.id) ?? { x: 200, y: 40 },
    }));
  }

  // Build phase: process postfix tokens
  const stack: string[] = [];

  for (const token of tokens) {
    if (!isOperator(token)) {
      // Operand — create leaf
      const leafId = makeId();
      exprNodes.set(leafId, {
        id: leafId,
        token,
        value: Number(token),
        leftId: null,
        rightId: null,
        parentId: null,
      });
      stack.push(leafId);

      tracker.updateNodes(toTreeNodes(), leafId);
      tracker.buildNode(leafId, Number(token), { token, isLeaf: true });
    } else {
      // Operator — pop two operands, create internal node
      const rightId = stack.pop()!;
      const leftId = stack.pop()!;

      const opId = makeId();
      exprNodes.set(opId, {
        id: opId,
        token,
        value: 0, // value computed in eval phase
        leftId,
        rightId,
        parentId: null,
      });
      exprNodes.get(leftId)!.parentId = opId;
      exprNodes.get(rightId)!.parentId = opId;

      stack.push(opId);

      tracker.updateNodes(toTreeNodes(), opId);
      tracker.buildNode(opId, 0, { token, isOperator: true });
      tracker.connectChild(opId, leftId, { side: "left" });
      tracker.connectChild(opId, rightId, { side: "right" });
    }
  }

  const rootId = stack[0] ?? null;
  if (rootId) {
    tracker.updateNodes(toTreeNodes(), rootId);
  }

  // Evaluation phase: post-order traversal
  function evaluate(nodeId: string | null): number {
    if (!nodeId) return 0;
    const node = exprNodes.get(nodeId);
    if (!node) return 0;

    if (!isOperator(node.token)) {
      tracker.visitNode(nodeId, node.value, {
        token: node.token,
        value: node.value,
        isLeaf: true,
      });
      return node.value;
    }

    const leftValue = evaluate(node.leftId);
    const rightValue = evaluate(node.rightId);

    let result = 0;
    switch (node.token) {
      case "+":
        result = leftValue + rightValue;
        break;
      case "-":
        result = leftValue - rightValue;
        break;
      case "*":
        result = leftValue * rightValue;
        break;
      case "/":
        result = Math.trunc(leftValue / rightValue);
        break;
    }

    node.value = result;
    tracker.updateNodes(toTreeNodes(), nodeId);
    tracker.visitNode(nodeId, result, {
      operator: node.token,
      leftValue,
      rightValue,
      result,
    });

    return result;
  }

  const finalResult = evaluate(rootId);

  tracker.complete({ expression, result: finalResult });

  return tracker.getSteps();
}
