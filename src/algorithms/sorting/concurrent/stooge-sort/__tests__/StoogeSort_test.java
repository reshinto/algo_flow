public class StoogeSort_test {
    public static void main(String[] args) {
        assert java.util.Arrays.equals(
            StoogeSort.stoogeSort(new int[]{5, 3, 1, 4, 2}),
            new int[]{1, 2, 3, 4, 5}
        ) : "Test failed: sorts an unsorted array";

        assert java.util.Arrays.equals(
            StoogeSort.stoogeSort(new int[]{1, 2, 3}),
            new int[]{1, 2, 3}
        ) : "Test failed: handles an already sorted array";

        assert java.util.Arrays.equals(
            StoogeSort.stoogeSort(new int[]{3, 2, 1}),
            new int[]{1, 2, 3}
        ) : "Test failed: handles a reverse-sorted array";

        assert java.util.Arrays.equals(
            StoogeSort.stoogeSort(new int[]{3, 1, 2, 1, 3}),
            new int[]{1, 1, 2, 3, 3}
        ) : "Test failed: handles an array with duplicate values";

        assert java.util.Arrays.equals(
            StoogeSort.stoogeSort(new int[]{42}),
            new int[]{42}
        ) : "Test failed: handles a single element array";

        assert java.util.Arrays.equals(
            StoogeSort.stoogeSort(new int[]{}),
            new int[]{}
        ) : "Test failed: handles an empty array";

        assert java.util.Arrays.equals(
            StoogeSort.stoogeSort(new int[]{3, -1, 2}),
            new int[]{-1, 2, 3}
        ) : "Test failed: handles an array with negative numbers";

        int[] original = new int[]{5, 3, 1, 4, 2};
        int[] sorted = StoogeSort.stoogeSort(original);
        assert java.util.Arrays.equals(sorted, new int[]{1, 2, 3, 4, 5}) : "Test failed: sorted result";
        assert java.util.Arrays.equals(original, new int[]{5, 3, 1, 4, 2}) : "Test failed: original not mutated";

        System.out.println("All tests passed!");
    }
}
