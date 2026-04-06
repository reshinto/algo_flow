// Path Sum — recursive DFS: check if any root-to-leaf path sums to target

class PathSumNode {
    int value;
    PathSumNode left, right;
    PathSumNode(int value) { this.value = value; }
}

class PathSum {
    public boolean pathSum(PathSumNode root, int targetSum) {
        if (root == null) return false; // @step:initialize

        // Leaf node — check if remaining sum equals node value
        if (root.left == null && root.right == null) { // @step:visit
            return root.value == targetSum; // @step:check-balance
        }

        int remaining = targetSum - root.value; // @step:compute-value

        // Recurse on left and right subtrees
        boolean foundLeft = pathSum(root.left, remaining); // @step:traverse-left
        if (foundLeft) return true; // @step:check-balance

        boolean foundRight = pathSum(root.right, remaining); // @step:traverse-right
        return foundRight; // @step:complete
    }
}
