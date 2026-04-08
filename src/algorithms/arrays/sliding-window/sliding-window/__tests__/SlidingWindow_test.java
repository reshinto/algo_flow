public class SlidingWindow_test {
    public static void main(String[] args) {
        // Basic array [2,1,5,1,3,2], k=3: max window [5,1,3]=9 at index 2
        {
            int[] result = SlidingWindow.maxSumSubarray(new int[]{2, 1, 5, 1, 3, 2}, 3);
            assert result[0] == 9 : "Expected maxSum=9, got " + result[0];
            assert result[1] == 2 : "Expected startIndex=2, got " + result[1];
        }

        // Window at start
        {
            int[] result = SlidingWindow.maxSumSubarray(new int[]{10, 9, 8, 1, 2, 3}, 3);
            assert result[0] == 27 : "Expected maxSum=27, got " + result[0];
            assert result[1] == 0 : "Expected startIndex=0, got " + result[1];
        }

        // Window at end
        {
            int[] result = SlidingWindow.maxSumSubarray(new int[]{1, 2, 3, 8, 9, 10}, 3);
            assert result[0] == 27 : "Expected maxSum=27, got " + result[0];
            assert result[1] == 3 : "Expected startIndex=3, got " + result[1];
        }

        // Empty array
        {
            int[] result = SlidingWindow.maxSumSubarray(new int[]{}, 3);
            assert result[0] == 0 : "Expected maxSum=0 for empty, got " + result[0];
        }

        // Window exceeds length
        {
            int[] result = SlidingWindow.maxSumSubarray(new int[]{1, 2}, 5);
            assert result[0] == 0 : "Expected maxSum=0 when window > length, got " + result[0];
        }

        // Default algorithm input k=3: max window [8,4,3]=15 at index 6
        {
            int[] result = SlidingWindow.maxSumSubarray(new int[]{2, 1, 5, 1, 3, 2, 8, 4, 3, 5}, 3);
            assert result[0] == 15 : "Expected maxSum=15, got " + result[0];
            assert result[1] == 6 : "Expected startIndex=6, got " + result[1];
        }

        System.out.println("All tests passed!");
    }
}
