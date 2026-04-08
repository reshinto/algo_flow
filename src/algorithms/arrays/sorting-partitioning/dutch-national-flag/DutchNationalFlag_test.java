import java.util.Arrays;

public class DutchNationalFlag_test {
    public static void main(String[] args) {
        // Mixed array
        {
            int[] result = DutchNationalFlag.dutchNationalFlag(new int[]{2, 0, 1, 2, 1, 0});
            assert Arrays.equals(result, new int[]{0, 0, 1, 1, 2, 2}) : "Mixed array failed";
        }

        // Already sorted
        {
            int[] result = DutchNationalFlag.dutchNationalFlag(new int[]{0, 0, 1, 1, 2, 2});
            assert Arrays.equals(result, new int[]{0, 0, 1, 1, 2, 2}) : "Already sorted failed";
        }

        // Reverse sorted
        {
            int[] result = DutchNationalFlag.dutchNationalFlag(new int[]{2, 2, 1, 1, 0, 0});
            assert Arrays.equals(result, new int[]{0, 0, 1, 1, 2, 2}) : "Reverse sorted failed";
        }

        // All zeros
        {
            int[] result = DutchNationalFlag.dutchNationalFlag(new int[]{0, 0, 0});
            assert Arrays.equals(result, new int[]{0, 0, 0}) : "All zeros failed";
        }

        // All ones
        {
            int[] result = DutchNationalFlag.dutchNationalFlag(new int[]{1, 1, 1});
            assert Arrays.equals(result, new int[]{1, 1, 1}) : "All ones failed";
        }

        // All twos
        {
            int[] result = DutchNationalFlag.dutchNationalFlag(new int[]{2, 2, 2});
            assert Arrays.equals(result, new int[]{2, 2, 2}) : "All twos failed";
        }

        // Empty array
        {
            int[] result = DutchNationalFlag.dutchNationalFlag(new int[]{});
            assert result.length == 0 : "Empty array failed";
        }

        // Default input [2,0,1,2,1,0,0,2,1]
        {
            int[] result = DutchNationalFlag.dutchNationalFlag(new int[]{2, 0, 1, 2, 1, 0, 0, 2, 1});
            assert Arrays.equals(result, new int[]{0, 0, 0, 1, 1, 1, 2, 2, 2}) : "Default input failed";
        }

        System.out.println("All tests passed!");
    }
}
