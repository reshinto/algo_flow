// Right Side View Recursive — DFS: visit right child first, record first node seen at each depth

interface BinaryNode {
  value: number;
  left: BinaryNode | null;
  right: BinaryNode | null;
}

function rightSideViewRecursive(root: BinaryNode | null): number[] {
  const result: number[] = []; // @step:initialize

  function dfs(node: BinaryNode | null, depth: number): void {
    if (node === null) return; // @step:initialize

    // First node encountered at this depth is visible from the right
    if (depth === result.length) {
      // @step:visit
      result.push(node.value); // @step:collect-element
    }

    // Visit right child first to ensure rightmost value is recorded first
    dfs(node.right, depth + 1); // @step:traverse-right
    dfs(node.left, depth + 1); // @step:traverse-left
  }

  dfs(root, 0); // @step:initialize
  return result; // @step:complete
}
