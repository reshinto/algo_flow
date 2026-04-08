public class BozoSort_test {
    public static void main(String[] args) {
        // sorts a small array using seeded PRNG
        assert java.util.Arrays.equals(
            BozoSort.bozoSort(new int[]{3, 1, 2}),
            new int[]{1, 2, 3}
        ) : "Test failed: sorts a small array using seeded PRNG";

        // handles an already sorted array
        assert java.util.Arrays.equals(
            BozoSort.bozoSort(new int[]{1, 2, 3}),
            new int[]{1, 2, 3}
        ) : "Test failed: handles an already sorted array";

        // handles a single element array
        assert java.util.Arrays.equals(
            BozoSort.bozoSort(new int[]{42}),
            new int[]{42}
        ) : "Test failed: handles a single element array";

        // handles an empty array
        assert java.util.Arrays.equals(
            BozoSort.bozoSort(new int[]{}),
            new int[]{}
        ) : "Test failed: handles an empty array";

        // produces a result with the same length as input
        assert BozoSort.bozoSort(new int[]{3, 1, 2}).length == 3 : "Test failed: result length";

        // does not mutate the original array
        int[] original = new int[]{3, 1, 2};
        int[] sorted = BozoSort.bozoSort(original);
        assert java.util.Arrays.equals(sorted, new int[]{1, 2, 3}) : "Test failed: sorted result";
        assert java.util.Arrays.equals(original, new int[]{3, 1, 2}) : "Test failed: original not mutated";

        // handles a 2-element array
        assert java.util.Arrays.equals(
            BozoSort.bozoSort(new int[]{2, 1}),
            new int[]{1, 2}
        ) : "Test failed: handles a 2-element array";

        System.out.println("All tests passed!");
    }
}
