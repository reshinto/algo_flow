// javac *.java && java -ea DistributeCoins_test
public class DistributeCoins_test {
    static BinaryNode makeNode(int value, BinaryNode left, BinaryNode right) {
        BinaryNode node = new BinaryNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static BinaryNode leaf(int value) { return new BinaryNode(value); }

    public static void main(String[] args) {
        DistributeCoins algo = new DistributeCoins();

        // test: null root returns 0
        assert algo.distributeCoins(null) == 0 : "Null root should return 0";

        // test: single node with 1 coin
        assert algo.distributeCoins(leaf(1)) == 0 : "Single node with 1 coin should return 0";

        // test: two-node tree root has 2 coins
        BinaryNode tree1 = makeNode(2, leaf(0), null);
        assert algo.distributeCoins(tree1) == 1 : "Root with 2 coins and child with 0 should need 1 move";

        // test: root 3 coins two children zero
        BinaryNode tree2 = makeNode(3, leaf(0), leaf(0));
        assert algo.distributeCoins(tree2) == 2 : "Root with 3 coins and two zero children should need 2 moves";

        // test: all coins at deep leaf
        BinaryNode tree3 = makeNode(0, makeNode(0, leaf(3), null), leaf(0));
        assert algo.distributeCoins(tree3) == 4 : "All coins at deep leaf should need 4 moves";

        System.out.println("All tests passed!");
    }
}
