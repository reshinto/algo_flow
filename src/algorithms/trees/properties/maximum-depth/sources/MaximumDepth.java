// Maximum Depth of Binary Tree — recursive DFS returning max(left, right) + 1

class MaximumDepthNode {
    int value;
    MaximumDepthNode left, right;
    MaximumDepthNode(int value) { this.value = value; }
}

class MaximumDepth {
    public int maximumDepth(MaximumDepthNode root) {
        if (root == null) return 0; // @step:initialize

        // Recursively compute depth of left and right subtrees
        int leftDepth = maximumDepth(root.left); // @step:traverse-left
        int rightDepth = maximumDepth(root.right); // @step:traverse-right

        // Return the larger subtree depth plus 1 for the current node
        return Math.max(leftDepth, rightDepth) + 1; // @step:update-height
    }
}
