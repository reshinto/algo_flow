// Cartesian Tree Sort — build a min-heap Cartesian tree, then repeatedly extract the minimum root
interface CartesianNode {
  value: number;
  originalIndex: number;
  leftChild: CartesianNode | null;
  rightChild: CartesianNode | null;
}

function cartesianTreeSort(inputArray: number[]): number[] {
  // @step:initialize
  const arrayLength = inputArray.length; // @step:initialize
  if (arrayLength === 0) return []; // @step:initialize

  // Build the Cartesian tree using a stack-based O(n) construction
  // @step:build-tree
  const nodeStack: CartesianNode[] = []; // @step:build-tree

  for (let buildIndex = 0; buildIndex < arrayLength; buildIndex++) {
    const newNode: CartesianNode = {
      // @step:compare
      value: inputArray[buildIndex]!, // @step:compare
      originalIndex: buildIndex, // @step:compare
      leftChild: null, // @step:compare
      rightChild: null, // @step:compare
    };

    // Pop nodes from the stack that are larger than the new node (min-heap property)
    let lastPopped: CartesianNode | null = null; // @step:swap
    while (nodeStack.length > 0 && nodeStack[nodeStack.length - 1]!.value > newNode.value) {
      // @step:swap
      lastPopped = nodeStack.pop()!; // @step:swap
    }
    newNode.leftChild = lastPopped; // @step:swap
    if (nodeStack.length > 0) {
      nodeStack[nodeStack.length - 1]!.rightChild = newNode; // @step:swap
    }
    nodeStack.push(newNode); // @step:swap
  }

  // The root of the tree is the leftmost element in the stack (minimum value)
  let treeRoot: CartesianNode | null = nodeStack[0] ?? null; // @step:build-tree

  // Merge two Cartesian sub-trees while maintaining min-heap order
  function mergeTrees(
    leftTree: CartesianNode | null,
    rightTree: CartesianNode | null,
  ): CartesianNode | null {
    if (leftTree === null) return rightTree; // @step:extract
    if (rightTree === null) return leftTree; // @step:extract

    if (leftTree.value <= rightTree.value) {
      // @step:compare
      leftTree.rightChild = mergeTrees(leftTree.rightChild, rightTree); // @step:extract
      return leftTree; // @step:extract
    } else {
      rightTree.leftChild = mergeTrees(leftTree, rightTree.leftChild); // @step:extract
      return rightTree; // @step:extract
    }
  }

  // Repeatedly extract the minimum (root) and merge its two subtrees
  const resultArray: number[] = []; // @step:extract
  let extractPosition = 0; // @step:extract

  while (treeRoot !== null) {
    resultArray.push(treeRoot.value); // @step:mark-sorted
    extractPosition++; // @step:mark-sorted

    // Merge left and right subtrees to form the new tree without the extracted root
    treeRoot = mergeTrees(treeRoot.leftChild, treeRoot.rightChild); // @step:extract
  }

  return resultArray; // @step:complete
}
