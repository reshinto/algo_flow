public class MinSizeSubarraySum_test {
    public static void main(String[] args) {
        int[] result;

        result = MinSizeSubarraySum.minSizeSubarraySum(new int[]{2, 3, 1, 2, 4, 3}, 7);
        assert result[0] == 2 && result[1] == 4 : "Expected [2, 4], got [" + result[0] + ", " + result[1] + "]";

        result = MinSizeSubarraySum.minSizeSubarraySum(new int[]{1, 4, 4}, 4);
        assert result[0] == 1 : "Expected minLength=1, got " + result[0];

        result = MinSizeSubarraySum.minSizeSubarraySum(new int[]{1, 1, 1, 1}, 10);
        assert result[0] == 0 : "Expected minLength=0, got " + result[0];

        result = MinSizeSubarraySum.minSizeSubarraySum(new int[]{1, 2, 3}, 6);
        assert result[0] == 3 && result[1] == 0 : "Expected [3, 0], got [" + result[0] + ", " + result[1] + "]";

        result = MinSizeSubarraySum.minSizeSubarraySum(new int[]{}, 7);
        assert result[0] == 0 : "Expected minLength=0, got " + result[0];

        result = MinSizeSubarraySum.minSizeSubarraySum(new int[]{1, 2, 3}, 0);
        assert result[0] == 0 : "Expected minLength=0, got " + result[0];

        result = MinSizeSubarraySum.minSizeSubarraySum(new int[]{7}, 7);
        assert result[0] == 1 && result[1] == 0 : "Expected [1, 0], got [" + result[0] + ", " + result[1] + "]";

        result = MinSizeSubarraySum.minSizeSubarraySum(new int[]{3, 3, 3, 3}, 6);
        assert result[0] == 2 : "Expected minLength=2, got " + result[0];

        result = MinSizeSubarraySum.minSizeSubarraySum(new int[]{100, 1, 1, 1, 1}, 100);
        assert result[0] == 1 && result[1] == 0 : "Expected [1, 0], got [" + result[0] + ", " + result[1] + "]";

        System.out.println("All tests passed!");
    }
}
