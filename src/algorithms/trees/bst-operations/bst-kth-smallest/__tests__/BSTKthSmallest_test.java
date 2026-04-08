// javac *.java && java -ea BSTKthSmallest_test
public class BSTKthSmallest_test {
    static BSTNode makeNode(int value, BSTNode left, BSTNode right) {
        BSTNode node = new BSTNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static BSTNode leaf(int value) { return new BSTNode(value); }

    public static void main(String[] args) {
        BSTKthSmallest bks = new BSTKthSmallest();
        BSTNode tree = makeNode(4, makeNode(2, leaf(1), leaf(3)), makeNode(6, leaf(5), leaf(7)));

        assert bks.bstKthSmallest(tree, 1) == 1 : "1st smallest failed";
        assert bks.bstKthSmallest(tree, 3) == 3 : "3rd smallest failed";
        assert bks.bstKthSmallest(tree, 7) == 7 : "7th smallest failed";
        assert bks.bstKthSmallest(tree, 4) == 4 : "4th smallest failed";
        assert bks.bstKthSmallest(tree, 10) == -1 : "Out of range should return -1";

        System.out.println("All tests passed!");
    }
}
