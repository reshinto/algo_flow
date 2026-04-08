// javac *.java && java -ea BinaryTreePruning_test
public class BinaryTreePruning_test {
    static BinaryNode makeNode(int value, BinaryNode left, BinaryNode right) {
        BinaryNode node = new BinaryNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static BinaryNode leaf(int value) {
        return new BinaryNode(value);
    }

    public static void main(String[] args) {
        BinaryTreePruning pruner = new BinaryTreePruning();

        // test: returns null for all-zero tree
        BinaryNode allZeros = makeNode(0, leaf(0), leaf(0));
        assert pruner.binaryTreePruning(allZeros) == null : "All zeros should return null";

        // test: returns null for single zero
        assert pruner.binaryTreePruning(leaf(0)) == null : "Single zero should return null";

        // test: keeps single one node
        BinaryNode oneNode = pruner.binaryTreePruning(leaf(1));
        assert oneNode != null && oneNode.value == 1 : "Single one node should be kept";

        // test: prunes zero-only subtrees
        BinaryNode root = makeNode(
            1,
            makeNode(0, leaf(0), leaf(0)),
            makeNode(1, leaf(0), leaf(1))
        );
        BinaryNode pruned = pruner.binaryTreePruning(root);
        assert pruned != null : "Root should not be null";
        assert pruned.left == null : "Left subtree should be pruned";
        assert pruned.right != null : "Right subtree should be kept";
        assert pruned.right.right != null && pruned.right.right.value == 1 : "Right.right should be 1";
        assert pruned.right.left == null : "Right.left should be pruned";

        // test: null input
        assert pruner.binaryTreePruning(null) == null : "Null input should return null";

        System.out.println("All tests passed!");
    }
}
