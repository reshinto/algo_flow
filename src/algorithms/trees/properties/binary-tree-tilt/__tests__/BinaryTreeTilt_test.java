// javac *.java && java -ea BinaryTreeTilt_test
public class BinaryTreeTilt_test {
    static TiltNode makeNode(int value, TiltNode left, TiltNode right) {
        TiltNode node = new TiltNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static TiltNode leaf(int value) { return new TiltNode(value); }

    public static void main(String[] args) {
        BinaryTreeTilt algo = new BinaryTreeTilt();

        // test: null root returns 0
        assert algo.binaryTreeTilt(null) == 0 : "Null root should return 0";

        // test: single node returns 0
        assert algo.binaryTreeTilt(leaf(1)) == 0 : "Single node should return 0";

        // test: simple 3-node tree
        assert algo.binaryTreeTilt(makeNode(1, leaf(2), leaf(3))) == 1 : "3-node tilt should be 1";

        // test: non-negative for 7-node tree
        TiltNode tree = makeNode(4, makeNode(2, leaf(1), leaf(3)), makeNode(6, leaf(5), leaf(7)));
        assert algo.binaryTreeTilt(tree) >= 0 : "Tilt should be non-negative";

        System.out.println("All tests passed!");
    }
}
