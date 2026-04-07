import java.util.List;

public class TreeDiagonalTraversal_test {
    static BSTNode makeNode(int value, BSTNode left, BSTNode right) {
        BSTNode node = new BSTNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    public static void main(String[] args) {
        TreeDiagonalTraversal sol = new TreeDiagonalTraversal();

        // balanced 7-node BST
        BSTNode root1 = makeNode(4,
            makeNode(2, makeNode(1, null, null), makeNode(3, null, null)),
            makeNode(6, makeNode(5, null, null), makeNode(7, null, null)));
        assert sol.treeDiagonalTraversal(root1).equals(List.of(List.of(4, 6, 7), List.of(2, 5, 3), List.of(1))) : "Test 1 failed";

        // null root
        assert sol.treeDiagonalTraversal(null).isEmpty() : "Test 2 failed";

        // single node
        assert sol.treeDiagonalTraversal(makeNode(42, null, null)).equals(List.of(List.of(42))) : "Test 3 failed";

        // right-skewed tree
        BSTNode rightSkewed = makeNode(1, null, makeNode(2, null, makeNode(3, null, null)));
        assert sol.treeDiagonalTraversal(rightSkewed).equals(List.of(List.of(1, 2, 3))) : "Test 4 failed";

        // left-skewed tree
        BSTNode leftSkewed = makeNode(3, makeNode(2, makeNode(1, null, null), null), null);
        assert sol.treeDiagonalTraversal(leftSkewed).equals(List.of(List.of(3), List.of(2), List.of(1))) : "Test 5 failed";

        System.out.println("All tests passed!");
    }
}
