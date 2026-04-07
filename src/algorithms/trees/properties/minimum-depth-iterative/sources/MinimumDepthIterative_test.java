public class MinimumDepthIterative_test {
    static MinimumDepthIterativeNode makeNode(int value, MinimumDepthIterativeNode left, MinimumDepthIterativeNode right) {
        MinimumDepthIterativeNode node = new MinimumDepthIterativeNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    public static void main(String[] args) {
        MinimumDepthIterative sol = new MinimumDepthIterative();

        // balanced 7-node BST
        MinimumDepthIterativeNode root1 = makeNode(4,
            makeNode(2, makeNode(1, null, null), makeNode(3, null, null)),
            makeNode(6, makeNode(5, null, null), makeNode(7, null, null)));
        assert sol.minimumDepthIterative(root1) == 3 : "Test 1 failed";

        // null root
        assert sol.minimumDepthIterative(null) == 0 : "Test 2 failed";

        // single node
        assert sol.minimumDepthIterative(makeNode(42, null, null)) == 1 : "Test 3 failed";

        // two-level tree
        assert sol.minimumDepthIterative(makeNode(1, makeNode(2, null, null), null)) == 2 : "Test 4 failed";

        System.out.println("All tests passed!");
    }
}
