import java.util.Arrays;

public class PrefixSum_test {
    public static void main(String[] args) {
        // result[0] = prefixArray (length+1), result[1] = queryResults
        int[][] result1 = PrefixSum.prefixSum(new int[]{1, 2, 3, 4, 5}, new int[][]{{1, 3}});
        assert result1[1][0] == 9 : "Expected 9, got " + result1[1][0];

        int[][] result2 = PrefixSum.prefixSum(new int[]{2, 4, 1, 3, 5, 2}, new int[][]{{1, 3}, {0, 4}, {2, 5}});
        assert Arrays.equals(result2[1], new int[]{8, 15, 11});

        int[][] result3 = PrefixSum.prefixSum(new int[]{3, 1, 4, 1, 5, 9, 2}, new int[][]{{0, 6}});
        assert result3[1][0] == 25 : "Expected 25, got " + result3[1][0];

        int[][] result4 = PrefixSum.prefixSum(new int[]{10, 20, 30, 40}, new int[][]{{2, 2}});
        assert result4[1][0] == 30 : "Expected 30, got " + result4[1][0];

        int[][] result5 = PrefixSum.prefixSum(new int[]{}, new int[][]{});
        assert result5[0].length == 1 && result5[1].length == 0;

        int[][] result6 = PrefixSum.prefixSum(new int[]{-2, 5, -1, 3}, new int[][]{{0, 3}});
        assert result6[1][0] == 5 : "Expected 5, got " + result6[1][0];

        int[][] result7 = PrefixSum.prefixSum(new int[]{5, 3, 2, 8}, new int[][]{{0, 2}});
        assert result7[1][0] == 10 : "Expected 10, got " + result7[1][0];

        System.out.println("All tests passed!");
    }
}
