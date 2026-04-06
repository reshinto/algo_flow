// N-ary Tree Traversal — preorder visit using childrenIds array

interface NAryNode {
  value: number;
  children: NAryNode[];
}

function nAryTreeTraversal(root: NAryNode | null): number[] {
  const result: number[] = []; // @step:initialize

  function preorder(node: NAryNode | null): void {
    if (!node) return; // @step:initialize

    result.push(node.value); // @step:visit

    for (const child of node.children) {
      preorder(child); // @step:traverse-next
    }
  }

  preorder(root); // @step:initialize
  return result; // @step:complete
}
