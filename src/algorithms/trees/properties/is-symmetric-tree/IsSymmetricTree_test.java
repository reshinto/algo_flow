public class IsSymmetricTree_test {
    static SymmetricTreeNode makeNode(int value, SymmetricTreeNode left, SymmetricTreeNode right) {
        SymmetricTreeNode node = new SymmetricTreeNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    public static void main(String[] args) {
        IsSymmetricTree sol = new IsSymmetricTree();

        // non-symmetric BST
        SymmetricTreeNode root1 = makeNode(4,
            makeNode(2, makeNode(1, null, null), makeNode(3, null, null)),
            makeNode(6, makeNode(5, null, null), makeNode(7, null, null)));
        assert sol.isSymmetricTree(root1) == false : "Test 1 failed";

        // symmetric tree
        SymmetricTreeNode root2 = makeNode(1,
            makeNode(2, makeNode(3, null, null), makeNode(4, null, null)),
            makeNode(2, makeNode(4, null, null), makeNode(3, null, null)));
        assert sol.isSymmetricTree(root2) == true : "Test 2 failed";

        // null root
        assert sol.isSymmetricTree(null) == true : "Test 3 failed";

        // single node
        assert sol.isSymmetricTree(makeNode(1, null, null)) == true : "Test 4 failed";

        // asymmetric tree
        SymmetricTreeNode root3 = makeNode(1,
            makeNode(2, null, makeNode(3, null, null)),
            makeNode(2, null, makeNode(3, null, null)));
        assert sol.isSymmetricTree(root3) == false : "Test 5 failed";

        System.out.println("All tests passed!");
    }
}
