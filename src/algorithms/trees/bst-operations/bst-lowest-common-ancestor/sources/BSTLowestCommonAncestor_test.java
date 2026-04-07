// javac *.java && java -ea BSTLowestCommonAncestor_test
public class BSTLowestCommonAncestor_test {
    static BSTNode makeNode(int value, BSTNode left, BSTNode right) {
        BSTNode node = new BSTNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static BSTNode leaf(int value) { return new BSTNode(value); }

    public static void main(String[] args) {
        BSTLowestCommonAncestor bstLca = new BSTLowestCommonAncestor();
        BSTNode tree = makeNode(4, makeNode(2, leaf(1), leaf(3)), makeNode(6, leaf(5), leaf(7)));

        // test: LCA of 1 and 3 is 2
        assert bstLca.bstLowestCommonAncestor(tree, 1, 3).value == 2 : "LCA(1,3) failed";

        // test: LCA of 1 and 7 is 4 (root)
        assert bstLca.bstLowestCommonAncestor(tree, 1, 7).value == 4 : "LCA(1,7) failed";

        // test: LCA of 5 and 7 is 6
        assert bstLca.bstLowestCommonAncestor(tree, 5, 7).value == 6 : "LCA(5,7) failed";

        // test: one value equals LCA
        assert bstLca.bstLowestCommonAncestor(tree, 2, 3).value == 2 : "LCA(2,3) failed";

        System.out.println("All tests passed!");
    }
}
