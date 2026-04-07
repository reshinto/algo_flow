// javac *.java && java -ea BSTLowestCommonAncestorIterative_test
public class BSTLowestCommonAncestorIterative_test {
    static BSTNode makeNode(int value, BSTNode left, BSTNode right) {
        BSTNode node = new BSTNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static BSTNode leaf(int value) { return new BSTNode(value); }

    public static void main(String[] args) {
        BSTLowestCommonAncestorIterative bstLcaIter = new BSTLowestCommonAncestorIterative();
        BSTNode tree = makeNode(4, makeNode(2, leaf(1), leaf(3)), makeNode(6, leaf(5), leaf(7)));

        assert bstLcaIter.bstLowestCommonAncestorIterative(tree, 1, 3).value == 2 : "LCA(1,3) failed";
        assert bstLcaIter.bstLowestCommonAncestorIterative(tree, 5, 7).value == 6 : "LCA(5,7) failed";
        assert bstLcaIter.bstLowestCommonAncestorIterative(tree, 1, 7).value == 4 : "LCA(1,7) failed";

        System.out.println("All tests passed!");
    }
}
