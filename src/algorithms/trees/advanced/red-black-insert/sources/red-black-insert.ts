// Red-Black Tree Insertion — maintains balance via color rebalancing and rotations

type RBColor = "red" | "black";

interface RBNode {
  value: number;
  color: RBColor;
  left: RBNode | null;
  right: RBNode | null;
  parent: RBNode | null;
}

function redBlackInsert(values: number[]): number[] {
  let root: RBNode | null = null; // @step:initialize

  function createNode(value: number): RBNode {
    return { value, color: "red", left: null, right: null, parent: null }; // @step:insert-node
  }

  function rotateLeft(node: RBNode): void {
    const rightChild = node.right!; // @step:rotate-left
    node.right = rightChild.left;
    if (rightChild.left) rightChild.left.parent = node;
    rightChild.parent = node.parent;
    if (!node.parent) root = rightChild;
    else if (node === node.parent.left) node.parent.left = rightChild;
    else node.parent.right = rightChild;
    rightChild.left = node;
    node.parent = rightChild; // @step:rotate-left
  }

  function rotateRight(node: RBNode): void {
    const leftChild = node.left!; // @step:rotate-right
    node.left = leftChild.right;
    if (leftChild.right) leftChild.right.parent = node;
    leftChild.parent = node.parent;
    if (!node.parent) root = leftChild;
    else if (node === node.parent.right) node.parent.right = leftChild;
    else node.parent.left = leftChild;
    leftChild.right = node;
    node.parent = leftChild; // @step:rotate-right
  }

  function fixInsert(inserted: RBNode): void {
    let currentNode = inserted;
    while (currentNode.parent?.color === "red") {
      // @step:recolor-node
      const parentNode = currentNode.parent;
      const grandparent = parentNode.parent!;
      if (parentNode === grandparent.left) {
        const uncle = grandparent.right;
        if (uncle?.color === "red") {
          // Case 1: Uncle is red — recolor
          parentNode.color = "black"; // @step:recolor-node
          uncle.color = "black"; // @step:recolor-node
          grandparent.color = "red"; // @step:recolor-node
          currentNode = grandparent;
        } else {
          if (currentNode === parentNode.right) {
            // Case 2: Triangle — rotate parent
            currentNode = parentNode;
            rotateLeft(currentNode); // @step:rotate-left
          }
          // Case 3: Line — rotate grandparent
          currentNode.parent!.color = "black"; // @step:recolor-node
          grandparent.color = "red"; // @step:recolor-node
          rotateRight(grandparent); // @step:rotate-right
        }
      } else {
        const uncle = grandparent.left;
        if (uncle?.color === "red") {
          parentNode.color = "black"; // @step:recolor-node
          uncle.color = "black"; // @step:recolor-node
          grandparent.color = "red"; // @step:recolor-node
          currentNode = grandparent;
        } else {
          if (currentNode === parentNode.left) {
            currentNode = parentNode;
            rotateRight(currentNode); // @step:rotate-right
          }
          currentNode.parent!.color = "black"; // @step:recolor-node
          grandparent.color = "red"; // @step:recolor-node
          rotateLeft(grandparent); // @step:rotate-left
        }
      }
    }
    root!.color = "black"; // @step:recolor-node
  }

  function insert(value: number): void {
    const newNode = createNode(value);
    if (!root) {
      root = newNode;
      root.color = "black"; // @step:recolor-node
      return;
    }
    let currentNode: RBNode = root;
    while (true) {
      if (value < currentNode.value) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          newNode.parent = currentNode;
          break;
        }
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          currentNode.right = newNode;
          newNode.parent = currentNode;
          break;
        }
        currentNode = currentNode.right;
      }
    }
    fixInsert(newNode); // @step:recolor-node
  }

  for (const value of values) insert(value); // @step:insert-node

  const result: number[] = [];
  function inorder(node: RBNode | null): void {
    if (!node) return;
    inorder(node.left);
    result.push(node.value);
    inorder(node.right);
  }
  inorder(root);
  return result; // @step:complete
}
