// Serialize and Deserialize Binary Tree (BFS / Level-Order)
// Serialization: BFS level-by-level, null nodes represented as "null"
// Deserialization: parse the string back into a tree using a queue

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function serializeTree(root: TreeNode | null): string {
  if (root === null) return "null"; // @step:initialize

  const queue: (TreeNode | null)[] = [root]; // @step:initialize
  const parts: string[] = []; // @step:initialize

  while (queue.length > 0) {
    // @step:search-node
    const node = queue.shift()!; // @step:search-node

    if (node === null) {
      parts.push("null"); // @step:visit
    } else {
      parts.push(String(node.value)); // @step:visit
      queue.push(node.left); // @step:build-node
      queue.push(node.right); // @step:build-node
    }
  }

  return parts.join(","); // @step:complete
}

function deserializeTree(data: string): TreeNode | null {
  if (data === "null" || data === "") return null; // @step:initialize

  const parts = data.split(","); // @step:initialize
  const firstValue = parts[0]; // @step:select-element
  if (firstValue === undefined || firstValue === "null") return null;

  const root: TreeNode = { value: parseInt(firstValue, 10), left: null, right: null }; // @step:build-node
  const queue: TreeNode[] = [root]; // @step:initialize
  let partIndex = 1; // @step:initialize

  while (queue.length > 0 && partIndex < parts.length) {
    // @step:search-node
    const currentNode = queue.shift()!; // @step:search-node

    const leftValue = parts[partIndex]; // @step:select-element
    partIndex++; // @step:select-element

    if (leftValue !== undefined && leftValue !== "null") {
      const leftNode: TreeNode = { value: parseInt(leftValue, 10), left: null, right: null }; // @step:build-node
      currentNode.left = leftNode; // @step:connect-child
      queue.push(leftNode); // @step:visit
    }

    const rightValue = parts[partIndex]; // @step:select-element
    partIndex++; // @step:select-element

    if (rightValue !== undefined && rightValue !== "null") {
      const rightNode: TreeNode = { value: parseInt(rightValue, 10), left: null, right: null }; // @step:build-node
      currentNode.right = rightNode; // @step:connect-child
      queue.push(rightNode); // @step:visit
    }
  }

  return root; // @step:complete
}
