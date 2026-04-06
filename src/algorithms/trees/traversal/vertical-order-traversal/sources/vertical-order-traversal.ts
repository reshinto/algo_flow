// Vertical-Order Traversal — BFS grouping nodes by vertical column index

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function verticalOrderTraversal(root: BSTNode | null): number[][] {
  const result: number[][] = []; // @step:initialize
  if (root === null) return result; // @step:initialize

  // Queue stores [node, column] pairs
  const queue: [BSTNode, number][] = [[root, 0]]; // @step:initialize
  const columnMap = new Map<number, number[]>(); // @step:initialize
  let minColumn = 0; // @step:initialize
  let maxColumn = 0; // @step:initialize

  while (queue.length > 0) {
    // @step:enqueue-node
    const entry = queue.shift()!; // @step:dequeue-node
    const node = entry[0]; // @step:dequeue-node
    const column = entry[1]; // @step:dequeue-node

    // Record this node's value in its column
    if (!columnMap.has(column)) {
      // @step:visit
      columnMap.set(column, []); // @step:visit
    }
    columnMap.get(column)!.push(node.value); // @step:visit

    if (column < minColumn) minColumn = column; // @step:visit
    if (column > maxColumn) maxColumn = column; // @step:visit

    if (node.left !== null) {
      // @step:enqueue-node
      queue.push([node.left, column - 1]); // @step:enqueue-node
    }
    if (node.right !== null) {
      // @step:enqueue-node
      queue.push([node.right, column + 1]); // @step:enqueue-node
    }
  }

  // Collect columns in order from leftmost to rightmost
  for (let col = minColumn; col <= maxColumn; col++) {
    // @step:visit
    const columnValues = columnMap.get(col); // @step:visit
    if (columnValues) result.push(columnValues); // @step:visit
  }

  return result; // @step:complete
}
