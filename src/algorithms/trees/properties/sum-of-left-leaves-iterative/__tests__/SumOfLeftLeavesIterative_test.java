public class SumOfLeftLeavesIterative_test {
    static LeftLeavesIterativeNode makeNode(int value, LeftLeavesIterativeNode left, LeftLeavesIterativeNode right) {
        LeftLeavesIterativeNode node = new LeftLeavesIterativeNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    public static void main(String[] args) {
        SumOfLeftLeavesIterative sol = new SumOfLeftLeavesIterative();

        // 7-node BST: left leaves are 1 and 5, sum = 6
        LeftLeavesIterativeNode root1 = makeNode(4,
            makeNode(2, makeNode(1, null, null), makeNode(3, null, null)),
            makeNode(6, makeNode(5, null, null), makeNode(7, null, null)));
        assert sol.sumOfLeftLeavesIterative(root1) == 6 : "Test 1 failed";

        // null root
        assert sol.sumOfLeftLeavesIterative(null) == 0 : "Test 2 failed";

        // single node
        assert sol.sumOfLeftLeavesIterative(makeNode(1, null, null)) == 0 : "Test 3 failed";

        // single left leaf
        assert sol.sumOfLeftLeavesIterative(makeNode(1, makeNode(5, null, null), null)) == 5 : "Test 4 failed";

        System.out.println("All tests passed!");
    }
}
