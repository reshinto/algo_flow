public class IsBalancedTree_test {
    static BalancedTreeNode makeNode(int value, BalancedTreeNode left, BalancedTreeNode right) {
        BalancedTreeNode node = new BalancedTreeNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    public static void main(String[] args) {
        IsBalancedTree sol = new IsBalancedTree();

        // balanced 7-node BST
        BalancedTreeNode root1 = makeNode(4,
            makeNode(2, makeNode(1, null, null), makeNode(3, null, null)),
            makeNode(6, makeNode(5, null, null), makeNode(7, null, null)));
        assert sol.isBalancedTree(root1) == true : "Test 1 failed";

        // null root
        assert sol.isBalancedTree(null) == true : "Test 2 failed";

        // single node
        assert sol.isBalancedTree(makeNode(1, null, null)) == true : "Test 3 failed";

        // unbalanced tree
        BalancedTreeNode unbalanced = makeNode(1, makeNode(2, makeNode(3, makeNode(4, null, null), null), null), null);
        assert sol.isBalancedTree(unbalanced) == false : "Test 4 failed";

        // two-node tree
        assert sol.isBalancedTree(makeNode(1, makeNode(2, null, null), null)) == true : "Test 5 failed";

        System.out.println("All tests passed!");
    }
}
