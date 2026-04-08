import java.util.Arrays;

public class SlidingWindowMaxDeque_test {
    public static void main(String[] args) {
        // Default input [1,3,-1,-3,5,3,6,7], k=3 -> [3,3,5,5,6,7]
        {
            int[] result = SlidingWindowMaxDeque.slidingWindowMaxDeque(new int[]{1, 3, -1, -3, 5, 3, 6, 7}, 3);
            assert Arrays.equals(result, new int[]{3, 3, 5, 5, 6, 7}) : "Default input failed: " + Arrays.toString(result);
        }

        // Empty array
        {
            int[] result = SlidingWindowMaxDeque.slidingWindowMaxDeque(new int[]{}, 3);
            assert result.length == 0 : "Expected empty for empty input";
        }

        // Window exceeds array length
        {
            int[] result = SlidingWindowMaxDeque.slidingWindowMaxDeque(new int[]{1, 2}, 5);
            assert result.length == 0 : "Expected empty when window > length";
        }

        // Window equals array length
        {
            int[] result = SlidingWindowMaxDeque.slidingWindowMaxDeque(new int[]{3, 1, 4, 1, 5}, 5);
            assert Arrays.equals(result, new int[]{5}) : "Expected [5], got " + Arrays.toString(result);
        }

        // Window size 1 (identity)
        {
            int[] result = SlidingWindowMaxDeque.slidingWindowMaxDeque(new int[]{4, 2, 7, 1, 9}, 1);
            assert Arrays.equals(result, new int[]{4, 2, 7, 1, 9}) : "Window size 1 failed";
        }

        // All equal elements
        {
            int[] result = SlidingWindowMaxDeque.slidingWindowMaxDeque(new int[]{5, 5, 5, 5}, 2);
            assert Arrays.equals(result, new int[]{5, 5, 5}) : "All equal failed";
        }

        // Decreasing array [9,7,5,3,1], k=3 -> [9,7,5]
        {
            int[] result = SlidingWindowMaxDeque.slidingWindowMaxDeque(new int[]{9, 7, 5, 3, 1}, 3);
            assert Arrays.equals(result, new int[]{9, 7, 5}) : "Decreasing array failed";
        }

        // Increasing array [1,3,5,7,9], k=3 -> [5,7,9]
        {
            int[] result = SlidingWindowMaxDeque.slidingWindowMaxDeque(new int[]{1, 3, 5, 7, 9}, 3);
            assert Arrays.equals(result, new int[]{5, 7, 9}) : "Increasing array failed";
        }

        // Negative numbers [-4,-2,-5,-1,-3], k=2 -> [-2,-2,-1,-1]
        {
            int[] result = SlidingWindowMaxDeque.slidingWindowMaxDeque(new int[]{-4, -2, -5, -1, -3}, 2);
            assert Arrays.equals(result, new int[]{-2, -2, -1, -1}) : "Negative numbers failed";
        }

        System.out.println("All tests passed!");
    }
}
