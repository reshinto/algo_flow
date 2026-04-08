public class IsBalancedTreeIterative_test {
    static BalancedTreeIterativeNode makeNode(int value, BalancedTreeIterativeNode left, BalancedTreeIterativeNode right) {
        BalancedTreeIterativeNode node = new BalancedTreeIterativeNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    public static void main(String[] args) {
        IsBalancedTreeIterative sol = new IsBalancedTreeIterative();

        // balanced 7-node BST
        BalancedTreeIterativeNode root1 = makeNode(4,
            makeNode(2, makeNode(1, null, null), makeNode(3, null, null)),
            makeNode(6, makeNode(5, null, null), makeNode(7, null, null)));
        assert sol.isBalancedTreeIterative(root1) == true : "Test 1 failed";

        // null root
        assert sol.isBalancedTreeIterative(null) == true : "Test 2 failed";

        // single node
        assert sol.isBalancedTreeIterative(makeNode(1, null, null)) == true : "Test 3 failed";

        // unbalanced tree
        BalancedTreeIterativeNode unbalanced = makeNode(1, makeNode(2, makeNode(3, makeNode(4, null, null), null), null), null);
        assert sol.isBalancedTreeIterative(unbalanced) == false : "Test 4 failed";

        System.out.println("All tests passed!");
    }
}
