public class SubarrayProductLessThanK_test {
    public static void main(String[] args) {
        // Default input [10,5,2,6,1,3], threshold=100: count=16
        {
            int result = SubarrayProductLessThanK.subarrayProductLessThanK(new int[]{10, 5, 2, 6, 1, 3}, 100);
            assert result == 16 : "Expected 16, got " + result;
        }

        // Threshold 0 -> no subarrays qualify
        {
            int result = SubarrayProductLessThanK.subarrayProductLessThanK(new int[]{1, 2, 3}, 0);
            assert result == 0 : "Expected 0 for threshold=0, got " + result;
        }

        // Threshold 1 -> no subarrays qualify
        {
            int result = SubarrayProductLessThanK.subarrayProductLessThanK(new int[]{1, 2, 3}, 1);
            assert result == 0 : "Expected 0 for threshold=1, got " + result;
        }

        // Empty array
        {
            int result = SubarrayProductLessThanK.subarrayProductLessThanK(new int[]{}, 100);
            assert result == 0 : "Expected 0 for empty array, got " + result;
        }

        // [1,2,3,4], threshold=5: 5 subarrays
        {
            int result = SubarrayProductLessThanK.subarrayProductLessThanK(new int[]{1, 2, 3, 4}, 5);
            assert result == 5 : "Expected 5, got " + result;
        }

        // All ones [1,1,1], threshold=2: 6 subarrays
        {
            int result = SubarrayProductLessThanK.subarrayProductLessThanK(new int[]{1, 1, 1}, 2);
            assert result == 6 : "Expected 6, got " + result;
        }

        // Single element below threshold
        {
            int result = SubarrayProductLessThanK.subarrayProductLessThanK(new int[]{5}, 10);
            assert result == 1 : "Expected 1, got " + result;
        }

        // Single element at threshold (not strictly less)
        {
            int result = SubarrayProductLessThanK.subarrayProductLessThanK(new int[]{10}, 10);
            assert result == 0 : "Expected 0, got " + result;
        }

        System.out.println("All tests passed!");
    }
}
