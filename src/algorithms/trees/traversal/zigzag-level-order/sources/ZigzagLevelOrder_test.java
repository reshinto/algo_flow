import java.util.List;

public class ZigzagLevelOrder_test {
    static BSTNode makeNode(int value, BSTNode left, BSTNode right) {
        BSTNode node = new BSTNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    public static void main(String[] args) {
        ZigzagLevelOrder sol = new ZigzagLevelOrder();

        // balanced 7-node BST
        BSTNode root1 = makeNode(4,
            makeNode(2, makeNode(1, null, null), makeNode(3, null, null)),
            makeNode(6, makeNode(5, null, null), makeNode(7, null, null)));
        assert sol.zigzagLevelOrder(root1).equals(List.of(List.of(4), List.of(6, 2), List.of(1, 3, 5, 7))) : "Test 1 failed";

        // null root
        assert sol.zigzagLevelOrder(null).isEmpty() : "Test 2 failed";

        // single node
        assert sol.zigzagLevelOrder(makeNode(42, null, null)).equals(List.of(List.of(42))) : "Test 3 failed";

        // two-level with both children
        BSTNode twoLevel = makeNode(1, makeNode(2, null, null), makeNode(3, null, null));
        assert sol.zigzagLevelOrder(twoLevel).equals(List.of(List.of(1), List.of(3, 2))) : "Test 4 failed";

        // left-skewed tree
        BSTNode leftSkewed = makeNode(3, makeNode(2, makeNode(1, null, null), null), null);
        assert sol.zigzagLevelOrder(leftSkewed).equals(List.of(List.of(3), List.of(2), List.of(1))) : "Test 5 failed";

        System.out.println("All tests passed!");
    }
}
