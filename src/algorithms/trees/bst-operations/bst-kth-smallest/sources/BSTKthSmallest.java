// BST Kth Smallest (Recursive) — in-order traversal with counter, stop at k

class BSTNode {
    int value;
    BSTNode left, right;
    BSTNode(int value) { this.value = value; }
}

class BSTKthSmallest {
    private int counter = 0; // @step:initialize
    private int result = -1;

    public int bstKthSmallest(BSTNode root, int kthPosition) {
        counter = 0; // @step:initialize
        result = -1;
        inorder(root, kthPosition);
        return result; // @step:complete
    }

    private void inorder(BSTNode node, int kthPosition) {
        if (node == null || counter >= kthPosition) return; // @step:initialize

        // Visit left subtree first (smaller values)
        inorder(node.left, kthPosition); // @step:search-node

        // Visit current node — increment counter
        counter++;
        if (counter == kthPosition) {
            result = node.value; // @step:found
            return;
        }

        // Visit right subtree (larger values)
        inorder(node.right, kthPosition); // @step:search-node
    }
}
