// javac *.java && java -ea BSTRangeSumIterative_test
public class BSTRangeSumIterative_test {
    static BSTNode makeNode(int value, BSTNode left, BSTNode right) {
        BSTNode node = new BSTNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static BSTNode leaf(int value) { return new BSTNode(value); }

    public static void main(String[] args) {
        BSTRangeSumIterative brsi = new BSTRangeSumIterative();
        BSTNode tree = makeNode(4, makeNode(2, leaf(1), leaf(3)), makeNode(6, leaf(5), leaf(7)));

        assert brsi.bstRangeSumIterative(tree, 3, 7) == 25 : "Range [3,7] sum failed";
        assert brsi.bstRangeSumIterative(tree, 1, 7) == 28 : "All values sum failed";
        assert brsi.bstRangeSumIterative(tree, 10, 20) == 0 : "No match should return 0";
        assert brsi.bstRangeSumIterative(null, 1, 7) == 0 : "Null tree should return 0";

        System.out.println("All tests passed!");
    }
}
