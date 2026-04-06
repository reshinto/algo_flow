// BST Floor & Ceil (Iterative) — while loop, track best floor/ceil candidates

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

interface FloorCeilResult {
  floor: number | null;
  ceil: number | null;
}

function bstFloorCeilIterative(root: BSTNode | null, target: number): FloorCeilResult {
  let floorValue: number | null = null; // @step:initialize
  let ceilValue: number | null = null;
  let current = root;

  while (current !== null) {
    if (current.value === target) {
      // Exact match is both floor and ceil
      return { floor: current.value, ceil: current.value }; // @step:found
    }

    if (target < current.value) {
      // Current node is a ceil candidate — go left for smaller ceil
      ceilValue = current.value; // @step:search-node
      current = current.left;
    } else {
      // Current node is a floor candidate — go right for larger floor
      floorValue = current.value; // @step:search-node
      current = current.right;
    }
  }

  return { floor: floorValue, ceil: ceilValue }; // @step:complete
}
