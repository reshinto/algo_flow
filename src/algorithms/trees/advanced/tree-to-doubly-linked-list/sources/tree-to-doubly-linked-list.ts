// BST to Sorted Circular Doubly Linked List — in-place pointer manipulation

interface DLLNode {
  value: number;
  left: DLLNode | null;
  right: DLLNode | null;
}

function treeToDoublyLinkedList(root: DLLNode | null): DLLNode | null {
  if (!root) return null; // @step:initialize

  let head: DLLNode | null = null; // @step:initialize
  let tail: DLLNode | null = null; // @step:initialize

  function inorder(node: DLLNode | null): void {
    if (!node) return; // @step:initialize

    inorder(node.left); // @step:traverse-left

    // Visit: connect current node to the doubly linked list
    if (!tail) {
      head = node; // @step:visit
    } else {
      tail.right = node; // @step:visit
      node.left = tail; // @step:visit
    }
    tail = node; // @step:visit

    inorder(node.right); // @step:traverse-right
  }

  inorder(root);

  // Close the circular link
  if (head && tail) {
    tail.right = head; // @step:visit
    head.left = tail; // @step:visit
  }

  return head; // @step:complete
}
