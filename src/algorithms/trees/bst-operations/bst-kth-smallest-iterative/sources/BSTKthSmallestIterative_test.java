// javac *.java && java -ea BSTKthSmallestIterative_test
public class BSTKthSmallestIterative_test {
    static BSTNode makeNode(int value, BSTNode left, BSTNode right) {
        BSTNode node = new BSTNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static BSTNode leaf(int value) { return new BSTNode(value); }

    public static void main(String[] args) {
        BSTKthSmallestIterative bksi = new BSTKthSmallestIterative();
        BSTNode tree = makeNode(4, makeNode(2, leaf(1), leaf(3)), makeNode(6, leaf(5), leaf(7)));

        assert bksi.bstKthSmallestIterative(tree, 1) == 1 : "1st smallest failed";
        assert bksi.bstKthSmallestIterative(tree, 2) == 2 : "2nd smallest failed";
        assert bksi.bstKthSmallestIterative(tree, 7) == 7 : "7th smallest failed";
        assert bksi.bstKthSmallestIterative(tree, 99) == -1 : "Out of range should return -1";

        System.out.println("All tests passed!");
    }
}
