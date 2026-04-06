// Build BST from Level-Order Sequence
// Insert each value from the level-order array into a BST using standard BST insertion.
// The resulting tree's level-order traversal will match the input array.

class TreeNode {
    int value;
    TreeNode left, right;
    TreeNode(int value) { this.value = value; }
}

class BuildFromLevelOrder {
    public TreeNode buildFromLevelOrder(int[] levelOrder) {
        if (levelOrder.length == 0) return null; // @step:initialize

        TreeNode root = null; // @step:initialize

        for (int value : levelOrder) { // @step:select-element
            root = bstInsert(root, value); // @step:build-node
        }

        return root; // @step:complete
    }

    private TreeNode bstInsert(TreeNode current, int value) {
        if (current == null) {
            return new TreeNode(value); // @step:build-node
        }

        if (value < current.value) {
            current.left = bstInsert(current.left, value); // @step:connect-child
        } else if (value > current.value) {
            current.right = bstInsert(current.right, value); // @step:connect-child
        }

        return current; // @step:visit
    }
}
