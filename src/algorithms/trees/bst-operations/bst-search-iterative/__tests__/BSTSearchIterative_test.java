// javac *.java && java -ea BSTSearchIterative_test
public class BSTSearchIterative_test {
    static BSTNode makeNode(int value, BSTNode left, BSTNode right) {
        BSTNode node = new BSTNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static BSTNode leaf(int value) { return new BSTNode(value); }

    public static void main(String[] args) {
        BSTSearchIterative bstSI = new BSTSearchIterative();
        BSTNode tree = makeNode(4, makeNode(2, leaf(1), leaf(3)), makeNode(6, leaf(5), leaf(7)));

        assert bstSI.bstSearchIterative(tree, 6).value == 6 : "Find 6 failed";
        assert bstSI.bstSearchIterative(tree, 10) == null : "Missing should return null";
        assert bstSI.bstSearchIterative(tree, 4).value == 4 : "Find root failed";
        assert bstSI.bstSearchIterative(null, 5) == null : "Null tree should return null";
        assert bstSI.bstSearchIterative(tree, 1).value == 1 : "Find left leaf failed";

        System.out.println("All tests passed!");
    }
}
