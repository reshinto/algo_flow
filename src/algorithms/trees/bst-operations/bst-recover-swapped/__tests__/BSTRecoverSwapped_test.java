// javac *.java && java -ea BSTRecoverSwapped_test
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class BSTRecoverSwapped_test {
    static BSTNode makeNode(int value, BSTNode left, BSTNode right) {
        BSTNode node = new BSTNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static BSTNode leaf(int value) { return new BSTNode(value); }

    static List<Integer> collectInorder(BSTNode root) {
        if (root == null) return new ArrayList<>();
        List<Integer> result = new ArrayList<>();
        result.addAll(collectInorder(root.left));
        result.add(root.value);
        result.addAll(collectInorder(root.right));
        return result;
    }

    public static void main(String[] args) {
        BSTRecoverSwapped brs = new BSTRecoverSwapped();

        // test: non-adjacent swapped nodes
        BSTNode invalid1 = makeNode(4, makeNode(2, leaf(1), leaf(7)), makeNode(6, leaf(5), leaf(3)));
        brs.bstRecoverSwapped(invalid1);
        assert collectInorder(invalid1).equals(Arrays.asList(1, 2, 3, 4, 5, 6, 7)) : "Non-adjacent swap failed";

        // test: adjacent swapped nodes
        BSTNode invalid2 = makeNode(4, makeNode(3, leaf(1), leaf(2)), makeNode(6, leaf(5), leaf(7)));
        brs.bstRecoverSwapped(invalid2);
        assert collectInorder(invalid2).equals(Arrays.asList(1, 2, 3, 4, 5, 6, 7)) : "Adjacent swap failed";

        // test: valid BST unchanged
        BSTNode valid = makeNode(4, makeNode(2, leaf(1), leaf(3)), makeNode(6, leaf(5), leaf(7)));
        brs.bstRecoverSwapped(valid);
        assert collectInorder(valid).equals(Arrays.asList(1, 2, 3, 4, 5, 6, 7)) : "Valid BST should not change";

        System.out.println("All tests passed!");
    }
}
