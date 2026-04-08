public class BogoSort_test {
    public static void main(String[] args) {
        // sorts a small array using seeded PRNG
        assert java.util.Arrays.equals(
            BogoSort.bogoSort(new int[]{3, 1, 2}),
            new int[]{1, 2, 3}
        ) : "Test failed: sorts a small array using seeded PRNG";

        // handles an already sorted array
        assert java.util.Arrays.equals(
            BogoSort.bogoSort(new int[]{1, 2, 3}),
            new int[]{1, 2, 3}
        ) : "Test failed: handles an already sorted array";

        // handles a single element array
        assert java.util.Arrays.equals(
            BogoSort.bogoSort(new int[]{42}),
            new int[]{42}
        ) : "Test failed: handles a single element array";

        // handles an empty array
        assert java.util.Arrays.equals(
            BogoSort.bogoSort(new int[]{}),
            new int[]{}
        ) : "Test failed: handles an empty array";

        // does not mutate the original array
        int[] original = new int[]{3, 1, 2};
        int[] sorted = BogoSort.bogoSort(original);
        assert java.util.Arrays.equals(sorted, new int[]{1, 2, 3}) : "Test failed: sorted result";
        assert java.util.Arrays.equals(original, new int[]{3, 1, 2}) : "Test failed: original not mutated";

        // produces a sorted result within cap
        int[] twoElement = BogoSort.bogoSort(new int[]{2, 1});
        assert twoElement.length == 2 : "Test failed: length should be 2";
        assert twoElement[0] <= twoElement[1] : "Test failed: result should be sorted";

        System.out.println("All tests passed!");
    }
}
