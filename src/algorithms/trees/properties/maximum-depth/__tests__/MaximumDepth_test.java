public class MaximumDepth_test {
    static MaximumDepthNode makeNode(int value, MaximumDepthNode left, MaximumDepthNode right) {
        MaximumDepthNode node = new MaximumDepthNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    public static void main(String[] args) {
        MaximumDepth sol = new MaximumDepth();

        // balanced 7-node BST
        MaximumDepthNode root1 = makeNode(4,
            makeNode(2, makeNode(1, null, null), makeNode(3, null, null)),
            makeNode(6, makeNode(5, null, null), makeNode(7, null, null)));
        assert sol.maximumDepth(root1) == 3 : "Test 1 failed";

        // null root
        assert sol.maximumDepth(null) == 0 : "Test 2 failed";

        // single node
        assert sol.maximumDepth(makeNode(42, null, null)) == 1 : "Test 3 failed";

        // left-skewed tree
        MaximumDepthNode skewed = makeNode(5, makeNode(4, makeNode(3, makeNode(2, makeNode(1, null, null), null), null), null), null);
        assert sol.maximumDepth(skewed) == 5 : "Test 4 failed";

        // two-level tree
        assert sol.maximumDepth(makeNode(1, makeNode(2, null, null), null)) == 2 : "Test 5 failed";

        System.out.println("All tests passed!");
    }
}
