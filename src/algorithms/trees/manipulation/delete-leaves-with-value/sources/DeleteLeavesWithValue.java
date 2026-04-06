// Delete Leaves With Value — post-order recursive: remove leaf if value matches target

class BinaryNode {
    int value;
    BinaryNode left, right;
    BinaryNode(int value) { this.value = value; }
}

class DeleteLeavesWithValue {
    public BinaryNode deleteLeavesWithValue(BinaryNode root, int targetValue) {
        if (root == null) return null; // @step:initialize

        // Recursively process children first (post-order)
        root.left = deleteLeavesWithValue(root.left, targetValue); // @step:traverse-left
        root.right = deleteLeavesWithValue(root.right, targetValue); // @step:traverse-right

        // Check if the current node is now a leaf with the target value
        if (root.left == null && root.right == null && root.value == targetValue) { // @step:compare
            return null; // @step:delete-node
        }

        return root; // @step:visit
    }
}
