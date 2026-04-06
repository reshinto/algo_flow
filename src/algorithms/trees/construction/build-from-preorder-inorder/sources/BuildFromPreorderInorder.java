// Build Binary Tree from Preorder + Inorder Traversal (Recursive)
// First element of preorder is root; find root in inorder to split left/right subtrees

class TreeNode {
    int value;
    TreeNode left, right;
    TreeNode(int value) { this.value = value; }
}

class BuildFromPreorderInorder {
    public TreeNode buildFromPreorderInorder(int[] preorder, int[] inorder) {
        return build(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1); // @step:initialize
    }

    private TreeNode build(int[] preorder, int preStart, int preEnd,
                           int[] inorder, int inStart, int inEnd) {
        if (preStart > preEnd || inStart > inEnd) return null; // @step:initialize

        int rootValue = preorder[preStart]; // @step:select-element
        TreeNode root = new TreeNode(rootValue); // @step:build-node

        // Find root position in inorder array
        int inorderRootIndex = inStart; // @step:partition-array
        while (inorderRootIndex <= inEnd && inorder[inorderRootIndex] != rootValue) {
            inorderRootIndex++; // @step:partition-array
        }

        int leftSubtreeSize = inorderRootIndex - inStart; // @step:partition-array

        // Recurse for left and right subtrees
        root.left = build(preorder, preStart + 1, preStart + leftSubtreeSize,
                          inorder, inStart, inorderRootIndex - 1); // @step:connect-child
        root.right = build(preorder, preStart + leftSubtreeSize + 1, preEnd,
                           inorder, inorderRootIndex + 1, inEnd); // @step:connect-child

        return root; // @step:visit
    }
}
