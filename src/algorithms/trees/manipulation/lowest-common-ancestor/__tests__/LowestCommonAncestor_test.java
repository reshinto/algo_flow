// javac *.java && java -ea LowestCommonAncestor_test
public class LowestCommonAncestor_test {
    static BinaryNode makeNode(int value, BinaryNode left, BinaryNode right) {
        BinaryNode node = new BinaryNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static BinaryNode leaf(int value) { return new BinaryNode(value); }

    static BinaryNode build7NodeTree() {
        return makeNode(4,
            makeNode(2, leaf(1), leaf(3)),
            makeNode(6, leaf(5), leaf(7)));
    }

    public static void main(String[] args) {
        LowestCommonAncestor algo = new LowestCommonAncestor();

        // test: null root returns null
        assert algo.lowestCommonAncestor(null, 1, 2) == null : "Null root should return null";

        // test: root matches one target
        BinaryNode tree1 = makeNode(4, leaf(2), leaf(6));
        assert algo.lowestCommonAncestor(tree1, 4, 6).value == 4 : "Root match failed";

        // test: LCA is node 2 for targets 1 and 3
        assert algo.lowestCommonAncestor(build7NodeTree(), 1, 3).value == 2 : "LCA(1,3) should be 2";

        // test: LCA is root for opposite subtrees
        assert algo.lowestCommonAncestor(build7NodeTree(), 3, 5).value == 4 : "LCA(3,5) should be 4";

        // test: ancestor of other
        BinaryNode tree2 = makeNode(4, makeNode(2, leaf(1), null), null);
        assert algo.lowestCommonAncestor(tree2, 2, 1).value == 2 : "Ancestor of other should be 2";

        System.out.println("All tests passed!");
    }
}
