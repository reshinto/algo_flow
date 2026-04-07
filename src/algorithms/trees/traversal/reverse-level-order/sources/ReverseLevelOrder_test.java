import java.util.List;

public class ReverseLevelOrder_test {
    static BSTNode makeNode(int value, BSTNode left, BSTNode right) {
        BSTNode node = new BSTNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    public static void main(String[] args) {
        ReverseLevelOrder sol = new ReverseLevelOrder();

        // balanced 7-node BST
        BSTNode root1 = makeNode(4,
            makeNode(2, makeNode(1, null, null), makeNode(3, null, null)),
            makeNode(6, makeNode(5, null, null), makeNode(7, null, null)));
        assert sol.reverseLevelOrder(root1).equals(List.of(List.of(1, 3, 5, 7), List.of(2, 6), List.of(4))) : "Test 1 failed";

        // null root
        assert sol.reverseLevelOrder(null).isEmpty() : "Test 2 failed";

        // single node
        assert sol.reverseLevelOrder(makeNode(42, null, null)).equals(List.of(List.of(42))) : "Test 3 failed";

        // left-skewed tree
        BSTNode leftSkewed = makeNode(5, makeNode(4, makeNode(3, null, null), null), null);
        assert sol.reverseLevelOrder(leftSkewed).equals(List.of(List.of(3), List.of(4), List.of(5))) : "Test 4 failed";

        // right-skewed tree
        BSTNode rightSkewed = makeNode(1, null, makeNode(2, null, makeNode(3, null, null)));
        assert sol.reverseLevelOrder(rightSkewed).equals(List.of(List.of(3), List.of(2), List.of(1))) : "Test 5 failed";

        System.out.println("All tests passed!");
    }
}
