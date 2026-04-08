import java.util.List;

public class MorrisInorderTraversal_test {
    static BSTNode makeNode(int value, BSTNode left, BSTNode right) {
        BSTNode node = new BSTNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    public static void main(String[] args) {
        MorrisInorderTraversal sol = new MorrisInorderTraversal();

        // balanced 7-node BST
        BSTNode root1 = makeNode(4,
            makeNode(2, makeNode(1, null, null), makeNode(3, null, null)),
            makeNode(6, makeNode(5, null, null), makeNode(7, null, null)));
        assert sol.morrisInorderTraversal(root1).equals(List.of(1, 2, 3, 4, 5, 6, 7)) : "Test 1 failed";

        // null root
        assert sol.morrisInorderTraversal(null).isEmpty() : "Test 2 failed";

        // single node
        assert sol.morrisInorderTraversal(makeNode(42, null, null)).equals(List.of(42)) : "Test 3 failed";

        // left-skewed tree
        BSTNode leftSkewed = makeNode(5, makeNode(4, makeNode(3, makeNode(2, makeNode(1, null, null), null), null), null), null);
        assert sol.morrisInorderTraversal(leftSkewed).equals(List.of(1, 2, 3, 4, 5)) : "Test 4 failed";

        // right-skewed tree
        BSTNode rightSkewed = makeNode(1, null, makeNode(2, null, makeNode(3, null, makeNode(4, null, makeNode(5, null, null)))));
        assert sol.morrisInorderTraversal(rightSkewed).equals(List.of(1, 2, 3, 4, 5)) : "Test 5 failed";

        System.out.println("All tests passed!");
    }
}
