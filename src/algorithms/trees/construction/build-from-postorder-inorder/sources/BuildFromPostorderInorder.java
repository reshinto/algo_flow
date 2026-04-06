// Build Binary Tree from Postorder + Inorder Traversal (Recursive)
// Last element of postorder is root; find root in inorder to split left/right subtrees

class TreeNode {
    int value;
    TreeNode left, right;
    TreeNode(int value) { this.value = value; }
}

class BuildFromPostorderInorder {
    public TreeNode buildFromPostorderInorder(int[] postorder, int[] inorder) {
        return build(postorder, 0, postorder.length - 1, inorder, 0, inorder.length - 1); // @step:initialize
    }

    private TreeNode build(int[] postorder, int postStart, int postEnd,
                           int[] inorder, int inStart, int inEnd) {
        if (postStart > postEnd || inStart > inEnd) return null; // @step:initialize

        int rootValue = postorder[postEnd]; // @step:select-element
        TreeNode root = new TreeNode(rootValue); // @step:build-node

        // Find root's position in inorder array
        int inorderRootIndex = inStart; // @step:partition-array
        while (inorderRootIndex <= inEnd && inorder[inorderRootIndex] != rootValue) {
            inorderRootIndex++; // @step:partition-array
        }

        int leftSubtreeSize = inorderRootIndex - inStart; // @step:partition-array

        // Recurse for left and right subtrees
        root.left = build(postorder, postStart, postStart + leftSubtreeSize - 1,
                          inorder, inStart, inorderRootIndex - 1); // @step:connect-child
        root.right = build(postorder, postStart + leftSubtreeSize, postEnd - 1,
                           inorder, inorderRootIndex + 1, inEnd); // @step:connect-child

        return root; // @step:visit
    }
}
