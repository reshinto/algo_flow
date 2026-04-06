// BST Floor & Ceil (Recursive) — largest value ≤ target (floor), smallest value ≥ target (ceil)

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

interface FloorCeilResult {
  floor: number | null;
  ceil: number | null;
}

function bstFloorCeil(root: BSTNode | null, target: number): FloorCeilResult {
  function findFloor(node: BSTNode | null, target: number): number | null {
    if (node === null) return null; // @step:initialize
    if (node.value === target) return node.value; // @step:found

    if (target < node.value) {
      // Target smaller than node — floor must be in left subtree
      return findFloor(node.left, target); // @step:search-node
    }
    // Target larger than node — this node is a candidate, check right
    const rightFloor = findFloor(node.right, target); // @step:search-node
    return rightFloor !== null ? rightFloor : node.value; // @step:complete
  }

  function findCeil(node: BSTNode | null, target: number): number | null {
    if (node === null) return null; // @step:initialize
    if (node.value === target) return node.value; // @step:found

    if (target > node.value) {
      // Target larger than node — ceil must be in right subtree
      return findCeil(node.right, target); // @step:search-node
    }
    // Target smaller than node — this node is a candidate, check left
    const leftCeil = findCeil(node.left, target); // @step:search-node
    return leftCeil !== null ? leftCeil : node.value; // @step:complete
  }

  return { floor: findFloor(root, target), ceil: findCeil(root, target) };
}
