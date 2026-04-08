import java.util.List;

public class VerticalOrderTraversal_test {
    static BSTNode makeNode(int value, BSTNode left, BSTNode right) {
        BSTNode node = new BSTNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    public static void main(String[] args) {
        VerticalOrderTraversal sol = new VerticalOrderTraversal();

        // balanced 7-node BST: col -2:[1], col -1:[2], col 0:[4,3,5], col 1:[6], col 2:[7]
        BSTNode root1 = makeNode(4,
            makeNode(2, makeNode(1, null, null), makeNode(3, null, null)),
            makeNode(6, makeNode(5, null, null), makeNode(7, null, null)));
        assert sol.verticalOrderTraversal(root1).equals(List.of(List.of(1), List.of(2), List.of(4, 3, 5), List.of(6), List.of(7))) : "Test 1 failed";

        // null root
        assert sol.verticalOrderTraversal(null).isEmpty() : "Test 2 failed";

        // single node
        assert sol.verticalOrderTraversal(makeNode(42, null, null)).equals(List.of(List.of(42))) : "Test 3 failed";

        // right-skewed tree
        BSTNode rightSkewed = makeNode(1, null, makeNode(2, null, makeNode(3, null, null)));
        assert sol.verticalOrderTraversal(rightSkewed).equals(List.of(List.of(1), List.of(2), List.of(3))) : "Test 4 failed";

        // left child
        assert sol.verticalOrderTraversal(makeNode(5, makeNode(3, null, null), null)).equals(List.of(List.of(3), List.of(5))) : "Test 5 failed";

        System.out.println("All tests passed!");
    }
}
