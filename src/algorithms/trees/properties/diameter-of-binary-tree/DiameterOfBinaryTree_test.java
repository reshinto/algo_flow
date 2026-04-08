public class DiameterOfBinaryTree_test {
    static DiameterNode makeNode(int value, DiameterNode left, DiameterNode right) {
        DiameterNode node = new DiameterNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    public static void main(String[] args) {
        DiameterOfBinaryTree sol = new DiameterOfBinaryTree();

        // balanced 7-node BST: diameter is 4
        DiameterNode root1 = makeNode(4,
            makeNode(2, makeNode(1, null, null), makeNode(3, null, null)),
            makeNode(6, makeNode(5, null, null), makeNode(7, null, null)));
        assert sol.diameterOfBinaryTree(root1) == 4 : "Test 1 failed";

        // null root
        assert sol.diameterOfBinaryTree(null) == 0 : "Test 2 failed";

        // single node
        assert sol.diameterOfBinaryTree(makeNode(1, null, null)) == 0 : "Test 3 failed";

        // two-node tree
        assert sol.diameterOfBinaryTree(makeNode(1, makeNode(2, null, null), null)) == 1 : "Test 4 failed";

        // skewed tree
        DiameterNode skewed = makeNode(1, makeNode(2, makeNode(3, makeNode(4, null, null), null), null), null);
        assert sol.diameterOfBinaryTree(skewed) == 3 : "Test 5 failed";

        System.out.println("All tests passed!");
    }
}
