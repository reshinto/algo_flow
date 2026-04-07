// javac *.java && java -ea BSTFloorCeil_test
public class BSTFloorCeil_test {
    static BSTNode makeNode(int value, BSTNode left, BSTNode right) {
        BSTNode node = new BSTNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static BSTNode leaf(int value) { return new BSTNode(value); }

    // int[] result: [0]=floor (Integer.MIN_VALUE = null), [1]=ceil (Integer.MIN_VALUE = null)
    static final int NULL_SENTINEL = Integer.MIN_VALUE;

    public static void main(String[] args) {
        BSTFloorCeil bfc = new BSTFloorCeil();
        BSTNode tree = makeNode(4, makeNode(2, leaf(1), leaf(3)), makeNode(6, leaf(5), leaf(7)));

        // test: exact match for existing value
        int[] result1 = bfc.bstFloorCeil(tree, 5);
        assert result1[0] == 5 : "Floor for 5 failed";
        assert result1[1] == 5 : "Ceil for 5 failed";

        // test: null floor for value below all
        int[] result2 = bfc.bstFloorCeil(tree, 0);
        assert result2[0] == NULL_SENTINEL : "Floor should be null for 0";
        assert result2[1] == 1 : "Ceil for 0 should be 1";

        // test: null ceil for value above all
        int[] result3 = bfc.bstFloorCeil(tree, 8);
        assert result3[0] == 7 : "Floor for 8 should be 7";
        assert result3[1] == NULL_SENTINEL : "Ceil should be null for 8";

        // test: null tree
        int[] result4 = bfc.bstFloorCeil(null, 5);
        assert result4[0] == NULL_SENTINEL : "Floor should be null for null tree";
        assert result4[1] == NULL_SENTINEL : "Ceil should be null for null tree";

        System.out.println("All tests passed!");
    }
}
