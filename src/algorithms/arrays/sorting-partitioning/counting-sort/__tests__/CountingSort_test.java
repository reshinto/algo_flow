import java.util.Arrays;

public class CountingSort_test {
    public static void main(String[] args) {
        // Basic unsorted array
        {
            int[] result = CountingSort.countingSort(new int[]{3, 1, 4, 1, 5, 9, 2, 6});
            assert Arrays.equals(result, new int[]{1, 1, 2, 3, 4, 5, 6, 9}) : "Basic sort failed";
        }

        // Already sorted
        {
            int[] result = CountingSort.countingSort(new int[]{1, 2, 3, 4, 5});
            assert Arrays.equals(result, new int[]{1, 2, 3, 4, 5}) : "Already sorted failed";
        }

        // Reverse sorted
        {
            int[] result = CountingSort.countingSort(new int[]{5, 4, 3, 2, 1});
            assert Arrays.equals(result, new int[]{1, 2, 3, 4, 5}) : "Reverse sorted failed";
        }

        // All same elements
        {
            int[] result = CountingSort.countingSort(new int[]{3, 3, 3, 3});
            assert Arrays.equals(result, new int[]{3, 3, 3, 3}) : "All same elements failed";
        }

        // Single element
        {
            int[] result = CountingSort.countingSort(new int[]{7});
            assert Arrays.equals(result, new int[]{7}) : "Single element failed";
        }

        // Empty array
        {
            int[] result = CountingSort.countingSort(new int[]{});
            assert result.length == 0 : "Empty array should return empty";
        }

        // Duplicates
        {
            int[] result = CountingSort.countingSort(new int[]{4, 2, 2, 8, 3, 3, 1});
            assert Arrays.equals(result, new int[]{1, 2, 2, 3, 3, 4, 8}) : "Duplicates failed";
        }

        // Default input
        {
            int[] result = CountingSort.countingSort(new int[]{4, 2, 2, 8, 3, 3, 1, 7, 5});
            assert Arrays.equals(result, new int[]{1, 2, 2, 3, 3, 4, 5, 7, 8}) : "Default input failed";
        }

        System.out.println("All tests passed!");
    }
}
