import java.util.Arrays;

public class MergeSortedArrays_test {
    public static void main(String[] args) {
        // Basic merge
        {
            int[] result = MergeSortedArrays.mergeSortedArrays(new int[]{1, 3, 5}, new int[]{2, 4, 6});
            assert Arrays.equals(result, new int[]{1, 2, 3, 4, 5, 6}) : "Basic merge failed";
        }

        // Empty first array
        {
            int[] result = MergeSortedArrays.mergeSortedArrays(new int[]{}, new int[]{1, 2, 3});
            assert Arrays.equals(result, new int[]{1, 2, 3}) : "Empty first array failed";
        }

        // Empty second array
        {
            int[] result = MergeSortedArrays.mergeSortedArrays(new int[]{1, 2, 3}, new int[]{});
            assert Arrays.equals(result, new int[]{1, 2, 3}) : "Empty second array failed";
        }

        // Both empty
        {
            int[] result = MergeSortedArrays.mergeSortedArrays(new int[]{}, new int[]{});
            assert result.length == 0 : "Both empty failed";
        }

        // Overlapping values
        {
            int[] result = MergeSortedArrays.mergeSortedArrays(new int[]{1, 2, 4}, new int[]{2, 3, 5});
            assert Arrays.equals(result, new int[]{1, 2, 2, 3, 4, 5}) : "Overlapping values failed";
        }

        // Single elements
        {
            int[] result = MergeSortedArrays.mergeSortedArrays(new int[]{5}, new int[]{3});
            assert Arrays.equals(result, new int[]{3, 5}) : "Single elements failed";
        }

        // Default input
        {
            int[] result = MergeSortedArrays.mergeSortedArrays(new int[]{1, 3, 5, 7, 9}, new int[]{2, 4, 6, 8, 10});
            assert Arrays.equals(result, new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}) : "Default input failed";
        }

        System.out.println("All tests passed!");
    }
}
