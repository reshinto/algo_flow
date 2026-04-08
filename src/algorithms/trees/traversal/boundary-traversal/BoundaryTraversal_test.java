import java.util.List;

public class BoundaryTraversal_test {
    static BSTNode makeNode(int value, BSTNode left, BSTNode right) {
        BSTNode node = new BSTNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    public static void main(String[] args) {
        BoundaryTraversal sol = new BoundaryTraversal();

        // balanced 7-node BST
        BSTNode root1 = makeNode(4,
            makeNode(2, makeNode(1, null, null), makeNode(3, null, null)),
            makeNode(6, makeNode(5, null, null), makeNode(7, null, null)));
        assert sol.boundaryTraversal(root1).equals(List.of(4, 2, 1, 3, 5, 7, 6)) : "Test 1 failed";

        // null root
        assert sol.boundaryTraversal(null).isEmpty() : "Test 2 failed";

        // single node
        assert sol.boundaryTraversal(makeNode(42, null, null)).equals(List.of(42)) : "Test 3 failed";

        // only right child
        assert sol.boundaryTraversal(makeNode(5, null, makeNode(8, null, null))).equals(List.of(5, 8)) : "Test 4 failed";

        // only left child
        assert sol.boundaryTraversal(makeNode(5, makeNode(3, null, null), null)).equals(List.of(5, 3)) : "Test 5 failed";

        System.out.println("All tests passed!");
    }
}
