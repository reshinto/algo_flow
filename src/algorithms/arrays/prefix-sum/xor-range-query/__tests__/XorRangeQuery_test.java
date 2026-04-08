import java.util.Arrays;

public class XorRangeQuery_test {
    public static void main(String[] args) {
        // result[0]=prefixXor (length+1), result[1]=queryResults
        int[][] result1 = XorRangeQuery.xorRangeQuery(new int[]{3, 5, 2, 7, 1, 4}, new int[][]{{0, 2}});
        assert result1[1][0] == 4 : "Expected 4, got " + result1[1][0];

        int[][] result2 = XorRangeQuery.xorRangeQuery(new int[]{3, 5, 2, 7, 1, 4}, new int[][]{{0, 2}, {1, 4}, {2, 5}});
        assert Arrays.equals(result2[1], new int[]{4, 1, 0});

        int[][] result3 = XorRangeQuery.xorRangeQuery(new int[]{1, 2, 3, 4}, new int[][]{{0, 3}});
        assert result3[1][0] == 4 : "Expected 4, got " + result3[1][0];

        int[][] result4 = XorRangeQuery.xorRangeQuery(new int[]{10, 20, 30, 40}, new int[][]{{2, 2}});
        assert result4[1][0] == 30 : "Expected 30, got " + result4[1][0];

        int[][] result5 = XorRangeQuery.xorRangeQuery(new int[]{5, 3, 2, 8}, new int[][]{{0, 2}});
        assert result5[1][0] == 4 : "Expected 4, got " + result5[1][0];

        int[][] result6 = XorRangeQuery.xorRangeQuery(new int[]{0, 0, 0, 0}, new int[][]{{0, 3}});
        assert result6[1][0] == 0 : "Expected 0, got " + result6[1][0];

        System.out.println("All tests passed!");
    }
}
