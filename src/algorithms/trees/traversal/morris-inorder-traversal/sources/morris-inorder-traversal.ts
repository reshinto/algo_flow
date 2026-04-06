// Morris In-Order Traversal — O(1) space in-order traversal using temporary threading

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function morrisInorderTraversal(root: BSTNode | null): number[] {
  const result: number[] = []; // @step:initialize
  let current: BSTNode | null = root; // @step:initialize

  while (current !== null) {
    // @step:initialize
    if (current.left === null) {
      // @step:visit
      // No left child — visit current and move right
      result.push(current.value); // @step:visit
      current = current.right; // @step:traverse-right
    } else {
      // Find the inorder predecessor (rightmost node in left subtree)
      let predecessor: BSTNode = current.left; // @step:thread-node
      while (predecessor.right !== null && predecessor.right !== current) {
        // @step:thread-node
        predecessor = predecessor.right; // @step:thread-node
      }

      if (predecessor.right === null) {
        // @step:thread-node
        // Thread: make predecessor point back to current
        predecessor.right = current; // @step:thread-node
        current = current.left; // @step:traverse-left
      } else {
        // Unthread: restore predecessor's right, visit current, move right
        predecessor.right = null; // @step:unthread-node
        result.push(current.value); // @step:visit
        current = current.right; // @step:traverse-right
      }
    }
  }

  return result; // @step:complete
}
