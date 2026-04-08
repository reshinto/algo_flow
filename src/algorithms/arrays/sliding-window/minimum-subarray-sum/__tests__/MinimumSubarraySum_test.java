public class MinimumSubarraySum_test {
    public static void main(String[] args) {
        // [3,-4,2,-3,-1,7,-5]: min subarray [-4,2,-3,-1] = -6 at indices [1,4]
        {
            int[] result = MinimumSubarraySum.minimumSubarraySum(new int[]{3, -4, 2, -3, -1, 7, -5});
            assert result[0] == -6 : "Expected minSum=-6, got " + result[0];
            assert result[1] == 1 : "Expected startIndex=1, got " + result[1];
            assert result[2] == 4 : "Expected endIndex=4, got " + result[2];
        }

        // All positive: single minimum element
        {
            int[] result = MinimumSubarraySum.minimumSubarraySum(new int[]{3, 1, 4, 1, 5});
            assert result[0] == 1 : "Expected minSum=1, got " + result[0];
        }

        // All negative: full array sum
        {
            int[] result = MinimumSubarraySum.minimumSubarraySum(new int[]{-1, -2, -3});
            assert result[0] == -6 : "Expected minSum=-6, got " + result[0];
            assert result[1] == 0 : "Expected startIndex=0, got " + result[1];
            assert result[2] == 2 : "Expected endIndex=2, got " + result[2];
        }

        // Single element
        {
            int[] result = MinimumSubarraySum.minimumSubarraySum(new int[]{-5});
            assert result[0] == -5 : "Expected minSum=-5, got " + result[0];
        }

        // Empty array
        {
            int[] result = MinimumSubarraySum.minimumSubarraySum(new int[]{});
            assert result[0] == 0 : "Expected minSum=0 for empty, got " + result[0];
        }

        // Single negative amid positives
        {
            int[] result = MinimumSubarraySum.minimumSubarraySum(new int[]{5, 5, -20, 5, 5});
            assert result[0] == -20 : "Expected minSum=-20, got " + result[0];
            assert result[1] == 2 : "Expected startIndex=2, got " + result[1];
            assert result[2] == 2 : "Expected endIndex=2, got " + result[2];
        }

        // All same negative
        {
            int[] result = MinimumSubarraySum.minimumSubarraySum(new int[]{-3, -3, -3});
            assert result[0] == -9 : "Expected minSum=-9, got " + result[0];
        }

        // Large negative in middle
        {
            int[] result = MinimumSubarraySum.minimumSubarraySum(new int[]{100, -200, 100});
            assert result[0] == -200 : "Expected minSum=-200, got " + result[0];
            assert result[1] == 1 : "Expected startIndex=1, got " + result[1];
            assert result[2] == 1 : "Expected endIndex=1, got " + result[2];
        }

        System.out.println("All tests passed!");
    }
}
