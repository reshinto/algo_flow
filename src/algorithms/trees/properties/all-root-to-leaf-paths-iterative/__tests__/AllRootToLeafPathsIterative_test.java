// javac *.java && java -ea AllRootToLeafPathsIterative_test
import java.util.*;

public class AllRootToLeafPathsIterative_test {
    static PathsIterativeNode makeNode(int value, PathsIterativeNode left, PathsIterativeNode right) {
        PathsIterativeNode node = new PathsIterativeNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static PathsIterativeNode leaf(int value) { return new PathsIterativeNode(value); }

    public static void main(String[] args) {
        AllRootToLeafPathsIterative algo = new AllRootToLeafPathsIterative();

        // test: returns 4 paths for 7-node BST
        PathsIterativeNode tree1 = makeNode(4,
            makeNode(2, leaf(1), leaf(3)),
            makeNode(6, leaf(5), leaf(7)));
        List<String> paths1 = algo.allRootToLeafPathsIterative(tree1);
        assert paths1.size() == 4 : "Should have 4 paths";
        assert paths1.contains("4->2->1") : "Should contain path 4->2->1";

        // test: empty for null root
        assert algo.allRootToLeafPathsIterative(null).isEmpty() : "Null root should return empty";

        // test: single node
        List<String> paths2 = algo.allRootToLeafPathsIterative(leaf(5));
        assert paths2.equals(List.of("5")) : "Single node should return ['5']";

        System.out.println("All tests passed!");
    }
}
