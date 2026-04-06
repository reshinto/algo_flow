// Binary Tree Pruning — remove all subtrees containing no 1s (post-order)

class BinaryNode {
    int value;
    BinaryNode left, right;
    BinaryNode(int v) { value = v; }
}

class BinaryTreePruning {
    public BinaryNode binaryTreePruning(BinaryNode root) {
        if (root == null) return null; // @step:initialize

        root.left = binaryTreePruning(root.left); // @step:traverse-left
        root.right = binaryTreePruning(root.right); // @step:traverse-right

        if (root.value == 0 && root.left == null && root.right == null) {
            return null; // @step:detach-node
        }

        return root; // @step:visit
    }
}
