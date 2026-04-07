public class OddEvenMergeSort_test {
    public static void main(String[] args) {
        // sorts an unsorted array
        assert java.util.Arrays.equals(
            OddEvenMergeSort.oddEvenMergeSort(new int[]{6, 3, 8, 1, 7, 2, 5, 4}),
            new int[]{1, 2, 3, 4, 5, 6, 7, 8}
        ) : "Test failed: sorts an unsorted array";

        // handles an already sorted array
        assert java.util.Arrays.equals(
            OddEvenMergeSort.oddEvenMergeSort(new int[]{1, 2, 3, 4, 5}),
            new int[]{1, 2, 3, 4, 5}
        ) : "Test failed: handles an already sorted array";

        // handles a reverse-sorted array
        assert java.util.Arrays.equals(
            OddEvenMergeSort.oddEvenMergeSort(new int[]{5, 4, 3, 2, 1}),
            new int[]{1, 2, 3, 4, 5}
        ) : "Test failed: handles a reverse-sorted array";

        // handles an array with duplicate values
        assert java.util.Arrays.equals(
            OddEvenMergeSort.oddEvenMergeSort(new int[]{3, 1, 4, 1, 5, 9, 2, 6, 5}),
            new int[]{1, 1, 2, 3, 4, 5, 5, 6, 9}
        ) : "Test failed: handles an array with duplicate values";

        // handles a single element array
        assert java.util.Arrays.equals(
            OddEvenMergeSort.oddEvenMergeSort(new int[]{42}),
            new int[]{42}
        ) : "Test failed: handles a single element array";

        // handles an empty array
        assert java.util.Arrays.equals(
            OddEvenMergeSort.oddEvenMergeSort(new int[]{}),
            new int[]{}
        ) : "Test failed: handles an empty array";

        // handles an array with negative numbers
        assert java.util.Arrays.equals(
            OddEvenMergeSort.oddEvenMergeSort(new int[]{3, -1, 0, -5, 2}),
            new int[]{-5, -1, 0, 2, 3}
        ) : "Test failed: handles an array with negative numbers";

        // does not mutate the original array
        int[] original = new int[]{4, 2, 3, 1};
        int[] sorted = OddEvenMergeSort.oddEvenMergeSort(original);
        assert java.util.Arrays.equals(sorted, new int[]{1, 2, 3, 4}) : "Test failed: sorted result";
        assert java.util.Arrays.equals(original, new int[]{4, 2, 3, 1}) : "Test failed: original not mutated";

        System.out.println("All tests passed!");
    }
}
