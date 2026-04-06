// Binary Tree Tilt — post-order: tilt = abs(left sum - right sum), accumulate total tilt

class TiltNode {
    int value;
    TiltNode left, right;
    TiltNode(int value) { this.value = value; }
}

class BinaryTreeTilt {
    private int totalTilt = 0; // @step:initialize

    public int binaryTreeTilt(TiltNode root) {
        totalTilt = 0; // @step:initialize
        subtreeSum(root); // @step:initialize
        return totalTilt; // @step:complete
    }

    private int subtreeSum(TiltNode node) {
        if (node == null) return 0; // @step:initialize

        int leftSum = subtreeSum(node.left); // @step:traverse-left
        int rightSum = subtreeSum(node.right); // @step:traverse-right

        // Tilt at this node is absolute difference of left and right sums
        int nodeTilt = Math.abs(leftSum - rightSum); // @step:compute-value
        totalTilt += nodeTilt; // @step:add-to-result

        return leftSum + rightSum + node.value; // @step:update-height
    }
}
