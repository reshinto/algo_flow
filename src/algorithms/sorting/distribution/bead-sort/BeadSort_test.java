public class BeadSort_test {
    public static void main(String[] args) {
        assert java.util.Arrays.equals(
            BeadSort.beadSort(new int[]{64, 34, 25, 12, 22, 11, 90}),
            new int[]{11, 12, 22, 25, 34, 64, 90}
        ) : "Test failed: sorts an unsorted array";

        assert java.util.Arrays.equals(
            BeadSort.beadSort(new int[]{1, 2, 3, 4, 5}),
            new int[]{1, 2, 3, 4, 5}
        ) : "Test failed: handles an already sorted array";

        assert java.util.Arrays.equals(
            BeadSort.beadSort(new int[]{5, 4, 3, 2, 1}),
            new int[]{1, 2, 3, 4, 5}
        ) : "Test failed: handles a reverse-sorted array";

        assert java.util.Arrays.equals(
            BeadSort.beadSort(new int[]{3, 1, 4, 1, 5, 9, 2, 6, 5}),
            new int[]{1, 1, 2, 3, 4, 5, 5, 6, 9}
        ) : "Test failed: handles an array with duplicate values";

        assert java.util.Arrays.equals(
            BeadSort.beadSort(new int[]{42}),
            new int[]{42}
        ) : "Test failed: handles a single element array";

        assert java.util.Arrays.equals(
            BeadSort.beadSort(new int[]{}),
            new int[]{}
        ) : "Test failed: handles an empty array";

        assert java.util.Arrays.equals(
            BeadSort.beadSort(new int[]{7, 7, 7, 7}),
            new int[]{7, 7, 7, 7}
        ) : "Test failed: handles all identical elements";

        assert java.util.Arrays.equals(
            BeadSort.beadSort(new int[]{0, 0, 0}),
            new int[]{0, 0, 0}
        ) : "Test failed: handles array with all zeros";

        assert java.util.Arrays.equals(
            BeadSort.beadSort(new int[]{3, -1, 0, -5, 2}),
            new int[]{-5, -1, 0, 2, 3}
        ) : "Test failed: handles negative numbers";

        int[] original = new int[]{3, 1, 2};
        int[] sorted = BeadSort.beadSort(original);
        assert java.util.Arrays.equals(sorted, new int[]{1, 2, 3}) : "Test failed: sorted result";
        assert java.util.Arrays.equals(original, new int[]{3, 1, 2}) : "Test failed: original not mutated";

        System.out.println("All tests passed!");
    }
}
