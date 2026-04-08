// javac *.java && java -ea SegmentTreeRangeMin_test
import java.util.List;

public class SegmentTreeRangeMin_test {
    public static void main(String[] args) {
        SegmentTreeRangeMin stMin = new SegmentTreeRangeMin();

        // test: range min for default input
        int[][] queries1 = {{0, 2}, {3, 5}};
        List<Integer> result1 = stMin.segmentTreeRangeMin(new int[]{2, 5, 1, 4, 9, 3}, queries1);
        assert result1.get(0) == 1 : "First query min failed";
        assert result1.get(1) == 3 : "Second query min failed";

        // test: single element query
        int[][] queries2 = {{1, 1}};
        List<Integer> result2 = stMin.segmentTreeRangeMin(new int[]{4, 2, 6}, queries2);
        assert result2.get(0) == 2 : "Single element query failed";

        // test: full range query
        int[][] queries3 = {{0, 5}};
        List<Integer> result3 = stMin.segmentTreeRangeMin(new int[]{3, 1, 4, 1, 5, 9}, queries3);
        assert result3.get(0) == 1 : "Full range query failed";

        // test: multiple queries
        int[][] queries4 = {{0, 2}, {1, 4}, {3, 4}};
        List<Integer> result4 = stMin.segmentTreeRangeMin(new int[]{10, 3, 8, 1, 7}, queries4);
        assert result4.get(0) == 3 : "Multiple queries [0] failed";
        assert result4.get(1) == 1 : "Multiple queries [1] failed";
        assert result4.get(2) == 1 : "Multiple queries [2] failed";

        System.out.println("All tests passed!");
    }
}
