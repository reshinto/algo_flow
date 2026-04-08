public class IsSymmetricTreeIterative_test {
    static SymmetricTreeIterativeNode makeNode(int value, SymmetricTreeIterativeNode left, SymmetricTreeIterativeNode right) {
        SymmetricTreeIterativeNode node = new SymmetricTreeIterativeNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    public static void main(String[] args) {
        IsSymmetricTreeIterative sol = new IsSymmetricTreeIterative();

        // symmetric tree
        SymmetricTreeIterativeNode root1 = makeNode(1,
            makeNode(2, makeNode(3, null, null), makeNode(4, null, null)),
            makeNode(2, makeNode(4, null, null), makeNode(3, null, null)));
        assert sol.isSymmetricTreeIterative(root1) == true : "Test 1 failed";

        // null root
        assert sol.isSymmetricTreeIterative(null) == true : "Test 2 failed";

        // single node
        assert sol.isSymmetricTreeIterative(makeNode(1, null, null)) == true : "Test 3 failed";

        // asymmetric tree
        SymmetricTreeIterativeNode root2 = makeNode(1,
            makeNode(2, null, makeNode(3, null, null)),
            makeNode(2, null, makeNode(3, null, null)));
        assert sol.isSymmetricTreeIterative(root2) == false : "Test 4 failed";

        System.out.println("All tests passed!");
    }
}
