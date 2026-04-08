// javac *.java && java -ea NAryTreeTraversal_test
import java.util.Arrays;
import java.util.List;

public class NAryTreeTraversal_test {
    static NAryNode makeNode(int value, NAryNode... children) {
        NAryNode node = new NAryNode(value);
        for (NAryNode child : children) {
            node.children.add(child);
        }
        return node;
    }

    public static void main(String[] args) {
        NAryTreeTraversal traversal = new NAryTreeTraversal();

        // test: null root returns empty
        assert traversal.nAryTreeTraversal(null).isEmpty() : "Null root should return empty";

        // test: single node
        assert traversal.nAryTreeTraversal(makeNode(5)).equals(Arrays.asList(5)) : "Single node failed";

        // test: correct preorder
        NAryNode root = makeNode(
            1,
            makeNode(3, makeNode(5), makeNode(6)),
            makeNode(2, makeNode(7), makeNode(8)),
            makeNode(4, makeNode(9), makeNode(10))
        );
        List<Integer> result = traversal.nAryTreeTraversal(root);
        assert result.equals(Arrays.asList(1, 3, 5, 6, 2, 7, 8, 4, 9, 10)) : "Preorder failed: " + result;

        // test: root before children
        assert result.get(0) == 1 : "Root should be first";
        assert result.get(1) == 3 : "First child should be second";

        // test: flat tree
        assert traversal.nAryTreeTraversal(makeNode(42)).equals(Arrays.asList(42)) : "Flat tree failed";

        System.out.println("All tests passed!");
    }
}
