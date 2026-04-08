import java.util.Arrays;

public class RemoveDuplicates_test {
    public static void main(String[] args) {
        // Basic sorted array [1,1,2,2,3]: unique=[1,2,3]
        {
            int[] result = RemoveDuplicates.removeDuplicates(new int[]{1, 1, 2, 2, 3});
            // result[0] = uniqueCount, result[1..] = unique elements
            assert result[0] == 3 : "Expected uniqueCount=3, got " + result[0];
            assert result[1] == 1 && result[2] == 2 && result[3] == 3 : "Expected [1,2,3]";
        }

        // No duplicates
        {
            int[] result = RemoveDuplicates.removeDuplicates(new int[]{1, 2, 3, 4, 5});
            assert result[0] == 5 : "Expected uniqueCount=5, got " + result[0];
        }

        // All same [7,7,7,7] -> 1 unique
        {
            int[] result = RemoveDuplicates.removeDuplicates(new int[]{7, 7, 7, 7});
            assert result[0] == 1 : "Expected uniqueCount=1, got " + result[0];
            assert result[1] == 7 : "Expected result[0]=7, got " + result[1];
        }

        // Single element
        {
            int[] result = RemoveDuplicates.removeDuplicates(new int[]{42});
            assert result[0] == 1 : "Expected uniqueCount=1, got " + result[0];
        }

        // Empty array
        {
            int[] result = RemoveDuplicates.removeDuplicates(new int[]{});
            assert result[0] == 0 : "Expected uniqueCount=0 for empty, got " + result[0];
        }

        // Default input [1,1,2,2,3,4,4,5]
        {
            int[] result = RemoveDuplicates.removeDuplicates(new int[]{1, 1, 2, 2, 3, 4, 4, 5});
            assert result[0] == 5 : "Expected uniqueCount=5, got " + result[0];
            assert Arrays.equals(Arrays.copyOfRange(result, 1, 6), new int[]{1, 2, 3, 4, 5}) : "Default input failed";
        }

        System.out.println("All tests passed!");
    }
}
