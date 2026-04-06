// Boundary Traversal — left boundary + leaf nodes + right boundary (counterclockwise)

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function isLeaf(node: BSTNode): boolean {
  return node.left === null && node.right === null;
}

function addLeftBoundary(node: BSTNode | null, result: number[]): void {
  // @step:traverse-left
  if (node === null || isLeaf(node)) return; // @step:traverse-left
  result.push(node.value); // @step:traverse-left
  if (node.left !== null) {
    // @step:traverse-left
    addLeftBoundary(node.left, result); // @step:traverse-left
  } else {
    // @step:traverse-left
    addLeftBoundary(node.right, result); // @step:traverse-left
  }
}

function addLeaves(node: BSTNode | null, result: number[]): void {
  // @step:visit
  if (node === null) return; // @step:visit
  if (isLeaf(node)) {
    // @step:visit
    result.push(node.value); // @step:visit
    return; // @step:visit
  }
  addLeaves(node.left, result); // @step:visit
  addLeaves(node.right, result); // @step:visit
}

function addRightBoundary(node: BSTNode | null, result: number[]): void {
  // @step:traverse-right
  if (node === null || isLeaf(node)) return; // @step:traverse-right
  if (node.right !== null) {
    // @step:traverse-right
    addRightBoundary(node.right, result); // @step:traverse-right
  } else {
    // @step:traverse-right
    addRightBoundary(node.left, result); // @step:traverse-right
  }
  result.push(node.value); // @step:traverse-right (added after recursion for bottom-up)
}

function boundaryTraversal(root: BSTNode | null): number[] {
  const result: number[] = []; // @step:initialize
  if (root === null) return result; // @step:initialize

  if (!isLeaf(root)) result.push(root.value); // @step:initialize

  addLeftBoundary(root.left, result); // @step:traverse-left
  addLeaves(root, result); // @step:visit
  addRightBoundary(root.right, result); // @step:traverse-right

  return result; // @step:complete
}
