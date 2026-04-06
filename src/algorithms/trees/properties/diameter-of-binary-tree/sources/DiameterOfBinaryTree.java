// Diameter of Binary Tree — track max of (leftHeight + rightHeight) at each node

class DiameterNode {
    int value;
    DiameterNode left, right;
    DiameterNode(int value) { this.value = value; }
}

class DiameterOfBinaryTree {
    private int maxDiameter = 0; // @step:initialize

    public int diameterOfBinaryTree(DiameterNode root) {
        maxDiameter = 0; // @step:initialize
        computeHeight(root); // @step:initialize
        return maxDiameter; // @step:complete
    }

    private int computeHeight(DiameterNode node) {
        if (node == null) return 0; // @step:initialize

        int leftHeight = computeHeight(node.left); // @step:traverse-left
        int rightHeight = computeHeight(node.right); // @step:traverse-right

        // Update global max diameter
        maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight); // @step:update-height

        return Math.max(leftHeight, rightHeight) + 1; // @step:update-height
    }
}
