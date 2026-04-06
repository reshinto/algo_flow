// Sum of Left Leaves — recursive: sum values of all left leaf nodes

class LeftLeavesNode {
    int value;
    LeftLeavesNode left, right;
    LeftLeavesNode(int value) { this.value = value; }
}

class SumOfLeftLeaves {
    public int sumOfLeftLeaves(LeftLeavesNode root) {
        if (root == null) return 0; // @step:initialize
        return dfs(root, false); // @step:complete
    }

    private int dfs(LeftLeavesNode node, boolean isLeft) {
        if (node == null) return 0; // @step:initialize

        // Left leaf node contributes its value
        if (node.left == null && node.right == null && isLeft) { // @step:visit
            return node.value; // @step:add-to-result
        }

        int leftSum = dfs(node.left, true); // @step:traverse-left
        int rightSum = dfs(node.right, false); // @step:traverse-right
        return leftSum + rightSum; // @step:compute-value
    }
}
