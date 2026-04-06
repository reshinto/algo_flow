// Diagonal Traversal — group nodes by diagonal (right = same diagonal, left = next diagonal)

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function treeDiagonalTraversal(root: BSTNode | null): number[][] {
  const result: number[][] = []; // @step:initialize
  if (root === null) return result; // @step:initialize

  // Queue of [node, diagonal] pairs
  const queue: [BSTNode, number][] = [[root, 0]]; // @step:initialize
  const diagonalMap = new Map<number, number[]>(); // @step:initialize
  let maxDiagonal = 0; // @step:initialize

  while (queue.length > 0) {
    // @step:enqueue-node
    const entry = queue.shift()!; // @step:dequeue-node
    const node = entry[0]; // @step:dequeue-node
    const diagonal = entry[1]; // @step:dequeue-node

    if (!diagonalMap.has(diagonal)) {
      // @step:visit
      diagonalMap.set(diagonal, []); // @step:visit
    }
    diagonalMap.get(diagonal)!.push(node.value); // @step:visit

    if (diagonal > maxDiagonal) maxDiagonal = diagonal; // @step:visit

    // Right child stays on same diagonal
    if (node.right !== null) {
      // @step:traverse-right
      queue.push([node.right, diagonal]); // @step:traverse-right
    }
    // Left child moves to next diagonal
    if (node.left !== null) {
      // @step:traverse-left
      queue.push([node.left, diagonal + 1]); // @step:traverse-left
    }
  }

  // Collect diagonals in order
  for (let diag = 0; diag <= maxDiagonal; diag++) {
    // @step:visit
    const diagonalValues = diagonalMap.get(diag); // @step:visit
    if (diagonalValues) result.push(diagonalValues); // @step:visit
  }

  return result; // @step:complete
}
