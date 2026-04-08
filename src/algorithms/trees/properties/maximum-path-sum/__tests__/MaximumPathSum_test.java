public class MaximumPathSum_test {
    static MaxPathSumNode makeNode(int value, MaxPathSumNode left, MaxPathSumNode right) {
        MaxPathSumNode node = new MaxPathSumNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    public static void main(String[] args) {
        MaximumPathSum sol = new MaximumPathSum();

        // balanced 7-node BST: best path 3+2+4+6+7=22
        MaxPathSumNode root1 = makeNode(4,
            makeNode(2, makeNode(1, null, null), makeNode(3, null, null)),
            makeNode(6, makeNode(5, null, null), makeNode(7, null, null)));
        assert sol.maximumPathSum(root1) == 22 : "Test 1 failed";

        // single node
        assert sol.maximumPathSum(makeNode(-3, null, null)) == -3 : "Test 2 failed";

        // all negative values
        MaxPathSumNode allNeg = makeNode(-1, makeNode(-2, null, null), makeNode(-3, null, null));
        assert sol.maximumPathSum(allNeg) == -1 : "Test 3 failed";

        System.out.println("All tests passed!");
    }
}
