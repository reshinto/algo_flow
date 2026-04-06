// BST Iterator — stack-based controlled in-order traversal (hasNext/next interface)

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

class BSTIterator {
  private stack: BSTNode[] = []; // @step:initialize

  constructor(root: BSTNode | null) {
    this.pushLeft(root); // @step:initialize
  }

  private pushLeft(node: BSTNode | null): void {
    while (node !== null) {
      this.stack.push(node); // @step:search-node
      node = node.left;
    }
  }

  hasNext(): boolean {
    return this.stack.length > 0; // @step:search-node
  }

  next(): number {
    const node = this.stack.pop()!; // @step:found
    this.pushLeft(node.right);
    return node.value;
  }
}

// Convenience function to collect all values via iterator
function bstIterator(root: BSTNode | null): number[] {
  const iterator = new BSTIterator(root); // @step:initialize
  const result: number[] = [];

  while (iterator.hasNext()) {
    result.push(iterator.next()); // @step:found
  }

  return result; // @step:complete
}
