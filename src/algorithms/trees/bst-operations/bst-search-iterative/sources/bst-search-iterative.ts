// BST Search (Iterative) — while loop binary search, no recursion

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function bstSearchIterative(root: BSTNode | null, target: number): BSTNode | null {
  let current = root; // @step:initialize

  while (current !== null) {
    if (current.value === target) return current; // @step:found

    if (target < current.value) {
      // Target is smaller — move left
      current = current.left; // @step:search-node
    } else {
      // Target is larger — move right
      current = current.right; // @step:search-node
    }
  }

  return null; // @step:complete
}
