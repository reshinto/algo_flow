public class SumOfLeftLeaves_test {
    static LeftLeavesNode makeNode(int value, LeftLeavesNode left, LeftLeavesNode right) {
        LeftLeavesNode node = new LeftLeavesNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    public static void main(String[] args) {
        SumOfLeftLeaves sol = new SumOfLeftLeaves();

        // 7-node BST: left leaves are 1 and 5, sum = 6
        LeftLeavesNode root1 = makeNode(4,
            makeNode(2, makeNode(1, null, null), makeNode(3, null, null)),
            makeNode(6, makeNode(5, null, null), makeNode(7, null, null)));
        assert sol.sumOfLeftLeaves(root1) == 6 : "Test 1 failed";

        // null root
        assert sol.sumOfLeftLeaves(null) == 0 : "Test 2 failed";

        // single node
        assert sol.sumOfLeftLeaves(makeNode(1, null, null)) == 0 : "Test 3 failed";

        // single left leaf
        assert sol.sumOfLeftLeaves(makeNode(1, makeNode(5, null, null), null)) == 5 : "Test 4 failed";

        // no left leaves
        assert sol.sumOfLeftLeaves(makeNode(1, null, makeNode(2, null, null))) == 0 : "Test 5 failed";

        System.out.println("All tests passed!");
    }
}
