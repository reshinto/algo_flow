import java.util.Arrays;

public class MoveZeros_test {
    public static void main(String[] args) {
        // Moves zeros to end
        {
            int[] result = MoveZeros.moveZeros(new int[]{0, 1, 0, 3, 12});
            assert Arrays.equals(result, new int[]{1, 3, 12, 0, 0}) : "Basic case failed";
        }

        // No zeros -> unchanged
        {
            int[] result = MoveZeros.moveZeros(new int[]{1, 2, 3, 4, 5});
            assert Arrays.equals(result, new int[]{1, 2, 3, 4, 5}) : "No zeros failed";
        }

        // All zeros
        {
            int[] result = MoveZeros.moveZeros(new int[]{0, 0, 0});
            assert Arrays.equals(result, new int[]{0, 0, 0}) : "All zeros failed";
        }

        // Empty array
        {
            int[] result = MoveZeros.moveZeros(new int[]{});
            assert result.length == 0 : "Empty array failed";
        }

        // Zeros at start
        {
            int[] result = MoveZeros.moveZeros(new int[]{0, 0, 1, 2});
            assert Arrays.equals(result, new int[]{1, 2, 0, 0}) : "Zeros at start failed";
        }

        // Default input [0,1,0,3,12,0,5]
        {
            int[] result = MoveZeros.moveZeros(new int[]{0, 1, 0, 3, 12, 0, 5});
            assert Arrays.equals(result, new int[]{1, 3, 12, 5, 0, 0, 0}) : "Default input failed";
        }

        System.out.println("All tests passed!");
    }
}
