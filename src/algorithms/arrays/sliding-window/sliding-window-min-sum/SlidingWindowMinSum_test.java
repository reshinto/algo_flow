import java.util.Arrays;

public class SlidingWindowMinSum_test {
    public static void main(String[] args) {
        // Default input k=3: min window [4,2,1]=7 at index 0
        {
            int[] result = SlidingWindowMinSum.minSumSubarray(new int[]{4, 2, 1, 7, 8, 1, 2, 8, 1, 0}, 3);
            assert result[0] == 7 : "Expected minSum=7, got " + result[0];
            assert result[1] == 0 : "Expected startIndex=0, got " + result[1];
        }

        // Window at start
        {
            int[] result = SlidingWindowMinSum.minSumSubarray(new int[]{1, 2, 3, 8, 9, 10}, 3);
            assert result[0] == 6 : "Expected minSum=6, got " + result[0];
            assert result[1] == 0 : "Expected startIndex=0, got " + result[1];
        }

        // Window at end
        {
            int[] result = SlidingWindowMinSum.minSumSubarray(new int[]{10, 9, 8, 1, 2, 3}, 3);
            assert result[0] == 6 : "Expected minSum=6, got " + result[0];
            assert result[1] == 3 : "Expected startIndex=3, got " + result[1];
        }

        // Empty array
        {
            int[] result = SlidingWindowMinSum.minSumSubarray(new int[]{}, 3);
            assert result[0] == 0 : "Expected minSum=0 for empty, got " + result[0];
        }

        // Window size exceeds length
        {
            int[] result = SlidingWindowMinSum.minSumSubarray(new int[]{1, 2}, 5);
            assert result[0] == 0 : "Expected minSum=0 when window > length, got " + result[0];
        }

        // Negative numbers k=2: min window [-3,-5]=-8 at index 1
        {
            int[] result = SlidingWindowMinSum.minSumSubarray(new int[]{-1, -3, -5, -2, -1, -4}, 2);
            assert result[0] == -8 : "Expected minSum=-8, got " + result[0];
            assert result[1] == 1 : "Expected startIndex=1, got " + result[1];
        }

        // Window size 1
        {
            int[] result = SlidingWindowMinSum.minSumSubarray(new int[]{4, 1, 7, 2, 9}, 1);
            assert result[0] == 1 : "Expected minSum=1, got " + result[0];
            assert result[1] == 1 : "Expected startIndex=1, got " + result[1];
        }

        System.out.println("All tests passed!");
    }
}
