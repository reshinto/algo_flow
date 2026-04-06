// Maximum Path Sum — recursive: at each node compute max path through it, track global max

class MaxPathSumNode {
    int value;
    MaxPathSumNode left, right;
    MaxPathSumNode(int value) { this.value = value; }
}

class MaximumPathSum {
    private int globalMax; // @step:initialize

    public int maximumPathSum(MaxPathSumNode root) {
        globalMax = root != null ? root.value : Integer.MIN_VALUE; // @step:initialize
        maxGain(root); // @step:initialize
        return globalMax; // @step:complete
    }

    private int maxGain(MaxPathSumNode node) {
        if (node == null) return 0; // @step:initialize

        // Only include subtree if it contributes positively
        int leftGain = Math.max(maxGain(node.left), 0); // @step:traverse-left
        int rightGain = Math.max(maxGain(node.right), 0); // @step:traverse-right

        // Path through this node
        int pathThroughNode = node.value + leftGain + rightGain; // @step:compute-value
        globalMax = Math.max(globalMax, pathThroughNode); // @step:update-height

        // Return max gain if we continue from this node to parent
        return node.value + Math.max(leftGain, rightGain); // @step:add-to-result
    }
}
