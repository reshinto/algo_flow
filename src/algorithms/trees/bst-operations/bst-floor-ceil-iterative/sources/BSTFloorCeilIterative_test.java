// javac *.java && java -ea BSTFloorCeilIterative_test
public class BSTFloorCeilIterative_test {
    static BSTNode makeNode(int value, BSTNode left, BSTNode right) {
        BSTNode node = new BSTNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static BSTNode leaf(int value) { return new BSTNode(value); }

    static final int NULL_SENTINEL = Integer.MIN_VALUE;

    public static void main(String[] args) {
        BSTFloorCeilIterative bfci = new BSTFloorCeilIterative();
        BSTNode tree = makeNode(4, makeNode(2, leaf(1), leaf(3)), makeNode(6, leaf(5), leaf(7)));

        // test: exact match
        int[] result1 = bfci.bstFloorCeilIterative(tree, 3);
        assert result1[0] == 3 : "Floor for 3 failed";
        assert result1[1] == 3 : "Ceil for 3 failed";

        // test: exact match at root
        int[] result2 = bfci.bstFloorCeilIterative(tree, 4);
        assert result2[0] == 4 : "Floor for 4 failed";
        assert result2[1] == 4 : "Ceil for 4 failed";

        // test: null floor below all
        int[] result3 = bfci.bstFloorCeilIterative(tree, 0);
        assert result3[0] == NULL_SENTINEL : "Floor should be null for 0";
        assert result3[1] == 1 : "Ceil for 0 should be 1";

        // test: null tree
        int[] result4 = bfci.bstFloorCeilIterative(null, 5);
        assert result4[0] == NULL_SENTINEL : "Floor should be null for null tree";
        assert result4[1] == NULL_SENTINEL : "Ceil should be null for null tree";

        System.out.println("All tests passed!");
    }
}
