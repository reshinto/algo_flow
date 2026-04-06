// Sum Root to Leaf Numbers — recursive: treat root-to-leaf paths as numbers, sum them

class SumLeafNode {
    int value;
    SumLeafNode left, right;
    SumLeafNode(int value) { this.value = value; }
}

class SumRootToLeafNumbers {
    public int sumRootToLeafNumbers(SumLeafNode root) {
        return dfs(root, 0); // @step:complete
    }

    private int dfs(SumLeafNode node, int runningNumber) {
        if (node == null) return 0; // @step:initialize

        int currentNumber = runningNumber * 10 + node.value; // @step:compute-value

        // Leaf node — this path forms a complete number
        if (node.left == null && node.right == null) { // @step:visit
            return currentNumber; // @step:add-to-result
        }

        int leftSum = dfs(node.left, currentNumber); // @step:traverse-left
        int rightSum = dfs(node.right, currentNumber); // @step:traverse-right
        return leftSum + rightSum; // @step:compute-value
    }
}
