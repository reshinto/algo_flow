public class QuickSort3Way_test {
    public static void main(String[] args) {
        // sorts an unsorted array
        assert java.util.Arrays.equals(
            QuickSort3Way.quickSort3Way(new int[]{64, 34, 25, 12, 22, 11, 90}),
            new int[]{11, 12, 22, 25, 34, 64, 90}
        ) : "Test failed: sorts an unsorted array";

        // handles an already sorted array
        assert java.util.Arrays.equals(
            QuickSort3Way.quickSort3Way(new int[]{1, 2, 3, 4, 5}),
            new int[]{1, 2, 3, 4, 5}
        ) : "Test failed: handles an already sorted array";

        // handles a reverse-sorted array
        assert java.util.Arrays.equals(
            QuickSort3Way.quickSort3Way(new int[]{5, 4, 3, 2, 1}),
            new int[]{1, 2, 3, 4, 5}
        ) : "Test failed: handles a reverse-sorted array";

        // handles an array with many duplicates (3-way specialization)
        assert java.util.Arrays.equals(
            QuickSort3Way.quickSort3Way(new int[]{3, 3, 3, 3, 3}),
            new int[]{3, 3, 3, 3, 3}
        ) : "Test failed: handles an array with many duplicates";

        // handles an array with some duplicate values
        assert java.util.Arrays.equals(
            QuickSort3Way.quickSort3Way(new int[]{3, 1, 4, 1, 5, 9, 2, 6, 5}),
            new int[]{1, 1, 2, 3, 4, 5, 5, 6, 9}
        ) : "Test failed: handles an array with some duplicate values";

        // handles a single element array
        assert java.util.Arrays.equals(
            QuickSort3Way.quickSort3Way(new int[]{42}),
            new int[]{42}
        ) : "Test failed: handles a single element array";

        // handles an empty array
        assert java.util.Arrays.equals(
            QuickSort3Way.quickSort3Way(new int[]{}),
            new int[]{}
        ) : "Test failed: handles an empty array";

        // handles an array with negative numbers
        assert java.util.Arrays.equals(
            QuickSort3Way.quickSort3Way(new int[]{3, -1, 0, -5, 2}),
            new int[]{-5, -1, 0, 2, 3}
        ) : "Test failed: handles an array with negative numbers";

        // does not mutate the original array
        int[] original = new int[]{3, 1, 2};
        int[] sorted = QuickSort3Way.quickSort3Way(original);
        assert java.util.Arrays.equals(sorted, new int[]{1, 2, 3}) : "Test failed: sorted result";
        assert java.util.Arrays.equals(original, new int[]{3, 1, 2}) : "Test failed: original not mutated";

        System.out.println("All tests passed!");
    }
}
