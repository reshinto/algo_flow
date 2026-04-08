// javac *.java && java -ea BSTSearch_test
public class BSTSearch_test {
    static BSTNode makeNode(int value, BSTNode left, BSTNode right) {
        BSTNode node = new BSTNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static BSTNode leaf(int value) { return new BSTNode(value); }

    public static void main(String[] args) {
        BSTSearch bstSearch = new BSTSearch();
        BSTNode tree = makeNode(4, makeNode(2, leaf(1), leaf(3)), makeNode(6, leaf(5), leaf(7)));

        assert bstSearch.bstSearch(tree, 5).value == 5 : "Find 5 failed";
        assert bstSearch.bstSearch(tree, 9) == null : "Missing should return null";
        assert bstSearch.bstSearch(tree, 4).value == 4 : "Find root failed";
        assert bstSearch.bstSearch(tree, 1).value == 1 : "Find leaf failed";
        assert bstSearch.bstSearch(null, 5) == null : "Null tree should return null";
        assert bstSearch.bstSearch(leaf(42), 42).value == 42 : "Single node failed";

        System.out.println("All tests passed!");
    }
}
