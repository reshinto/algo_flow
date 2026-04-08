public class MinimumDepth_test {
    static MinimumDepthNode makeNode(int value, MinimumDepthNode left, MinimumDepthNode right) {
        MinimumDepthNode node = new MinimumDepthNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    public static void main(String[] args) {
        MinimumDepth sol = new MinimumDepth();

        // balanced 7-node BST
        MinimumDepthNode root1 = makeNode(4,
            makeNode(2, makeNode(1, null, null), makeNode(3, null, null)),
            makeNode(6, makeNode(5, null, null), makeNode(7, null, null)));
        assert sol.minimumDepth(root1) == 3 : "Test 1 failed";

        // null root
        assert sol.minimumDepth(null) == 0 : "Test 2 failed";

        // single node
        assert sol.minimumDepth(makeNode(42, null, null)) == 1 : "Test 3 failed";

        // single-child not a leaf
        MinimumDepthNode singleChild = makeNode(1, null, makeNode(2, null, makeNode(3, null, null)));
        assert sol.minimumDepth(singleChild) == 3 : "Test 4 failed";

        // two-level tree
        assert sol.minimumDepth(makeNode(1, makeNode(2, null, null), null)) == 2 : "Test 5 failed";

        System.out.println("All tests passed!");
    }
}
