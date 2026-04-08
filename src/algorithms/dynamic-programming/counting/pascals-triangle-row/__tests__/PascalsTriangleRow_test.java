// javac PascalsTriangleRow.java PascalsTriangleRow_test.java && java -ea PascalsTriangleRow_test
import java.util.Arrays;

public class PascalsTriangleRow_test {
    public static void main(String[] args) {
        assert Arrays.equals(PascalsTriangleRow.pascalsTriangleRow(0), new int[]{1}) : "row 0 should be [1]";
        assert Arrays.equals(PascalsTriangleRow.pascalsTriangleRow(1), new int[]{1, 1}) : "row 1 should be [1,1]";
        assert Arrays.equals(PascalsTriangleRow.pascalsTriangleRow(2), new int[]{1, 2, 1}) : "row 2 should be [1,2,1]";
        assert Arrays.equals(PascalsTriangleRow.pascalsTriangleRow(3), new int[]{1, 3, 3, 1}) : "row 3 check";
        assert Arrays.equals(PascalsTriangleRow.pascalsTriangleRow(4), new int[]{1, 4, 6, 4, 1}) : "row 4 check";
        assert Arrays.equals(PascalsTriangleRow.pascalsTriangleRow(8), new int[]{1, 8, 28, 56, 70, 56, 28, 8, 1}) : "row 8 check";

        int[] result6 = PascalsTriangleRow.pascalsTriangleRow(6);
        assert result6.length == 7 : "row 6 length should be 7";
        int rowSum = 0;
        for (int val : result6) rowSum += val;
        assert rowSum == 64 : "row 6 should sum to 64";

        System.out.println("All tests passed!");
    }
}
