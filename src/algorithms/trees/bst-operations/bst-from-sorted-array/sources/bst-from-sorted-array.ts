// BST From Sorted Array (Recursive) — pick middle as root, recurse on halves

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function bstFromSortedArray(sortedArray: number[]): BSTNode | null {
  function buildBST(leftIndex: number, rightIndex: number): BSTNode | null {
    if (leftIndex > rightIndex) return null; // @step:initialize

    // Pick the middle element as root to keep the tree balanced
    const midIndex = Math.floor((leftIndex + rightIndex) / 2); // @step:build-node
    const midValue = sortedArray[midIndex];
    if (midValue === undefined) return null;

    const node: BSTNode = { value: midValue, left: null, right: null };

    // Recursively build left and right subtrees
    node.left = buildBST(leftIndex, midIndex - 1); // @step:connect-child
    node.right = buildBST(midIndex + 1, rightIndex); // @step:connect-child

    return node; // @step:complete
  }

  return buildBST(0, sortedArray.length - 1);
}
