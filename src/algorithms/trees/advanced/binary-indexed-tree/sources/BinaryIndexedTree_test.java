// javac *.java && java -ea BinaryIndexedTree_test
import java.util.List;

public class BinaryIndexedTree_test {
    public static void main(String[] args) {
        BinaryIndexedTree bit = new BinaryIndexedTree();

        // test: range sums for default input
        int[][] queries1 = {{0, 4}, {2, 6}};
        List<Integer> result1 = bit.binaryIndexedTree(new int[]{3, 2, 4, 5, 1, 1, 5, 3}, queries1);
        assert result1.get(0) == 15 : "First range sum failed";
        assert result1.get(1) == 16 : "Second range sum failed";

        // test: single element query
        int[][] queries2 = {{1, 1}};
        List<Integer> result2 = bit.binaryIndexedTree(new int[]{10, 20, 30}, queries2);
        assert result2.get(0) == 20 : "Single element query failed";

        // test: full range query
        int[][] queries3 = {{0, 4}};
        List<Integer> result3 = bit.binaryIndexedTree(new int[]{1, 2, 3, 4, 5}, queries3);
        assert result3.get(0) == 15 : "Full range query failed";

        // test: multiple queries
        int[][] queries4 = {{0, 2}, {1, 4}, {2, 3}};
        List<Integer> result4 = bit.binaryIndexedTree(new int[]{5, 3, 2, 8, 1}, queries4);
        assert result4.get(0) == 10 : "Multiple queries [0]: " + result4.get(0);
        assert result4.get(1) == 14 : "Multiple queries [1]: " + result4.get(1);
        assert result4.get(2) == 10 : "Multiple queries [2]: " + result4.get(2);

        System.out.println("All tests passed!");
    }
}
