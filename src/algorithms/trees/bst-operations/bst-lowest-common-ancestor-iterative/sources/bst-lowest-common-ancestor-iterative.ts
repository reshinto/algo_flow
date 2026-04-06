// BST Lowest Common Ancestor (Iterative) — while loop split point search

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function bstLowestCommonAncestorIterative(
  root: BSTNode | null,
  nodeValueA: number,
  nodeValueB: number,
): BSTNode | null {
  let current = root; // @step:initialize

  while (current !== null) {
    if (nodeValueA < current.value && nodeValueB < current.value) {
      // Both values are smaller — move to left subtree
      current = current.left; // @step:search-node
    } else if (nodeValueA > current.value && nodeValueB > current.value) {
      // Both values are larger — move to right subtree
      current = current.right; // @step:search-node
    } else {
      // Values split across current (or one equals current) — found LCA
      return current; // @step:found
    }
  }

  return null; // @step:complete
}
