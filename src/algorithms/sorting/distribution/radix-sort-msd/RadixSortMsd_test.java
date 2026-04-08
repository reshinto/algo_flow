public class RadixSortMsd_test {
    public static void main(String[] args) {
        // sorts an unsorted array
        assert java.util.Arrays.equals(
            RadixSortMsd.radixSortMsd(new int[]{64, 34, 25, 12, 22, 11, 90}),
            new int[]{11, 12, 22, 25, 34, 64, 90}
        ) : "Test failed: sorts an unsorted array";

        // handles an already sorted array
        assert java.util.Arrays.equals(
            RadixSortMsd.radixSortMsd(new int[]{1, 2, 3, 4, 5}),
            new int[]{1, 2, 3, 4, 5}
        ) : "Test failed: handles an already sorted array";

        // handles a reverse-sorted array
        assert java.util.Arrays.equals(
            RadixSortMsd.radixSortMsd(new int[]{5, 4, 3, 2, 1}),
            new int[]{1, 2, 3, 4, 5}
        ) : "Test failed: handles a reverse-sorted array";

        // handles an array with duplicate values
        assert java.util.Arrays.equals(
            RadixSortMsd.radixSortMsd(new int[]{3, 1, 4, 1, 5, 9, 2, 6, 5}),
            new int[]{1, 1, 2, 3, 4, 5, 5, 6, 9}
        ) : "Test failed: handles an array with duplicate values";

        // handles a single element array
        assert java.util.Arrays.equals(
            RadixSortMsd.radixSortMsd(new int[]{42}),
            new int[]{42}
        ) : "Test failed: handles a single element array";

        // handles an empty array
        assert java.util.Arrays.equals(
            RadixSortMsd.radixSortMsd(new int[]{}),
            new int[]{}
        ) : "Test failed: handles an empty array";

        // handles multi-digit numbers
        assert java.util.Arrays.equals(
            RadixSortMsd.radixSortMsd(new int[]{170, 45, 75, 90, 802, 24, 2, 66}),
            new int[]{2, 24, 45, 66, 75, 90, 170, 802}
        ) : "Test failed: handles multi-digit numbers";

        // handles negative numbers using offset
        assert java.util.Arrays.equals(
            RadixSortMsd.radixSortMsd(new int[]{3, -1, 0, -5, 2}),
            new int[]{-5, -1, 0, 2, 3}
        ) : "Test failed: handles negative numbers using offset";

        // does not mutate the original array
        int[] original = new int[]{3, 1, 2};
        int[] sorted = RadixSortMsd.radixSortMsd(original);
        assert java.util.Arrays.equals(sorted, new int[]{1, 2, 3}) : "Test failed: sorted result";
        assert java.util.Arrays.equals(original, new int[]{3, 1, 2}) : "Test failed: original not mutated";

        System.out.println("All tests passed!");
    }
}
