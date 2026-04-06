// Lowest Common Ancestor Iterative — BFS to build parent map, then trace ancestors

interface BinaryNode {
  value: number;
  left: BinaryNode | null;
  right: BinaryNode | null;
}

function lowestCommonAncestorIterative(
  root: BinaryNode | null,
  nodeValueA: number,
  nodeValueB: number,
): BinaryNode | null {
  if (root === null) return null; // @step:initialize

  // Build parent map using BFS
  const parentMap = new Map<BinaryNode, BinaryNode | null>(); // @step:initialize
  parentMap.set(root, null); // @step:initialize
  const bfsQueue: BinaryNode[] = [root]; // @step:initialize

  // BFS until we find both target nodes
  let nodeA: BinaryNode | null = null;
  let nodeB: BinaryNode | null = null;

  while (bfsQueue.length > 0 && (nodeA === null || nodeB === null)) {
    // @step:visit
    const current = bfsQueue.shift()!; // @step:dequeue

    if (current.value === nodeValueA) nodeA = current; // @step:compare
    if (current.value === nodeValueB) nodeB = current; // @step:compare

    if (current.left !== null) {
      // @step:enqueue
      parentMap.set(current.left, current); // @step:enqueue
      bfsQueue.push(current.left); // @step:enqueue
    }
    if (current.right !== null) {
      // @step:enqueue
      parentMap.set(current.right, current); // @step:enqueue
      bfsQueue.push(current.right); // @step:enqueue
    }
  }

  if (nodeA === null || nodeB === null) return null;

  // Trace ancestors of nodeA into a set
  const ancestorsA = new Set<BinaryNode>(); // @step:visit
  let traceNode: BinaryNode | null = nodeA;
  while (traceNode !== null) {
    // @step:visit
    ancestorsA.add(traceNode); // @step:visit
    traceNode = parentMap.get(traceNode) ?? null; // @step:visit
  }

  // Walk ancestors of nodeB until we hit the first ancestor also in ancestorsA
  traceNode = nodeB;
  while (traceNode !== null) {
    // @step:visit
    if (ancestorsA.has(traceNode)) return traceNode; // @step:compare
    traceNode = parentMap.get(traceNode) ?? null; // @step:visit
  }

  return null; // @step:complete
}
