// javac *.java && java -ea BSTRangeSum_test
public class BSTRangeSum_test {
    static BSTNode makeNode(int value, BSTNode left, BSTNode right) {
        BSTNode node = new BSTNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static BSTNode leaf(int value) { return new BSTNode(value); }

    public static void main(String[] args) {
        BSTRangeSum brs = new BSTRangeSum();
        BSTNode tree = makeNode(4, makeNode(2, leaf(1), leaf(3)), makeNode(6, leaf(5), leaf(7)));

        assert brs.bstRangeSum(tree, 2, 6) == 20 : "Range [2,6] sum failed";
        assert brs.bstRangeSum(tree, 1, 7) == 28 : "All values sum failed";
        assert brs.bstRangeSum(tree, 10, 20) == 0 : "No match should return 0";
        assert brs.bstRangeSum(tree, 4, 4) == 4 : "Single match failed";
        assert brs.bstRangeSum(null, 1, 7) == 0 : "Null tree should return 0";

        System.out.println("All tests passed!");
    }
}
