// javac *.java && java -ea FlipEquivalentTrees_test
public class FlipEquivalentTrees_test {
    static BinaryNode makeNode(int value, BinaryNode left, BinaryNode right) {
        BinaryNode node = new BinaryNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static BinaryNode leaf(int value) { return new BinaryNode(value); }

    public static void main(String[] args) {
        FlipEquivalentTrees algo = new FlipEquivalentTrees();

        // test: two null trees
        assert algo.flipEquivalentTrees(null, null) == true : "Two nulls should be true";

        // test: one null tree
        assert algo.flipEquivalentTrees(leaf(1), null) == false : "One null should be false";
        assert algo.flipEquivalentTrees(null, leaf(1)) == false : "One null should be false";

        // test: identical trees
        assert algo.flipEquivalentTrees(
            makeNode(1, leaf(2), leaf(3)),
            makeNode(1, leaf(2), leaf(3))) == true : "Identical trees should be true";

        // test: flipped at root
        assert algo.flipEquivalentTrees(
            makeNode(1, leaf(2), leaf(3)),
            makeNode(1, leaf(3), leaf(2))) == true : "Flipped at root should be true";

        // test: different root values
        assert algo.flipEquivalentTrees(leaf(1), leaf(2)) == false : "Different root values should be false";

        // test: different leaf values
        assert algo.flipEquivalentTrees(
            makeNode(1, leaf(2), leaf(3)),
            makeNode(1, leaf(9), leaf(3))) == false : "Different leaf values should be false";

        System.out.println("All tests passed!");
    }
}
