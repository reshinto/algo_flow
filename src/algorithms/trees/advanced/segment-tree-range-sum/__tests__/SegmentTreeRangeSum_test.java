// javac *.java && java -ea SegmentTreeRangeSum_test
import java.util.List;

public class SegmentTreeRangeSum_test {
    public static void main(String[] args) {
        SegmentTreeRangeSum stSum = new SegmentTreeRangeSum();

        // test: default input
        int[][] queries1 = {{1, 3}, {0, 5}};
        List<Integer> result1 = stSum.segmentTreeRangeSum(new int[]{1, 3, 5, 7, 9, 11}, queries1);
        assert result1.get(0) == 15 : "First range sum failed: " + result1.get(0);
        assert result1.get(1) == 36 : "Second range sum failed: " + result1.get(1);

        // test: single element
        int[][] queries2 = {{1, 1}};
        List<Integer> result2 = stSum.segmentTreeRangeSum(new int[]{4, 2, 6}, queries2);
        assert result2.get(0) == 2 : "Single element failed";

        // test: full range
        int[][] queries3 = {{0, 4}};
        List<Integer> result3 = stSum.segmentTreeRangeSum(new int[]{1, 2, 3, 4, 5}, queries3);
        assert result3.get(0) == 15 : "Full range failed";

        // test: multiple queries
        int[][] queries4 = {{0, 1}, {2, 4}, {1, 3}};
        List<Integer> result4 = stSum.segmentTreeRangeSum(new int[]{10, 20, 30, 40, 50}, queries4);
        assert result4.get(0) == 30 : "Multiple [0] failed";
        assert result4.get(1) == 120 : "Multiple [1] failed";
        assert result4.get(2) == 90 : "Multiple [2] failed";

        System.out.println("All tests passed!");
    }
}
