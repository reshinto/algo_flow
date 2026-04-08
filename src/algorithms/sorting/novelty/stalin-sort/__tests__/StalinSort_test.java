public class StalinSort_test {
    public static void main(String[] args) {
        // eliminates out-of-order elements from [3, 1, 2]
        // 3 survives (first), 1 < 3 eliminated, 2 < 3 eliminated -> [3]
        assert java.util.Arrays.equals(
            StalinSort.stalinSort(new int[]{3, 1, 2}),
            new int[]{3}
        ) : "Test failed: eliminates out-of-order elements";

        // keeps all elements when array is already sorted
        assert java.util.Arrays.equals(
            StalinSort.stalinSort(new int[]{1, 2, 3, 4, 5}),
            new int[]{1, 2, 3, 4, 5}
        ) : "Test failed: keeps all elements when already sorted";

        // reduces a reverse-sorted array to its first element
        assert java.util.Arrays.equals(
            StalinSort.stalinSort(new int[]{5, 4, 3, 2, 1}),
            new int[]{5}
        ) : "Test failed: reduces reverse-sorted to first element";

        // handles an array with partial order
        assert java.util.Arrays.equals(
            StalinSort.stalinSort(new int[]{3, 1, 4, 2, 5}),
            new int[]{3, 4, 5}
        ) : "Test failed: handles partial order";

        // handles an array with equal elements
        assert java.util.Arrays.equals(
            StalinSort.stalinSort(new int[]{2, 2, 2, 2}),
            new int[]{2, 2, 2, 2}
        ) : "Test failed: handles equal elements";

        // handles a single element array
        assert java.util.Arrays.equals(
            StalinSort.stalinSort(new int[]{42}),
            new int[]{42}
        ) : "Test failed: handles a single element array";

        // handles an empty array
        assert java.util.Arrays.equals(
            StalinSort.stalinSort(new int[]{}),
            new int[]{}
        ) : "Test failed: handles an empty array";

        // handles an array with duplicate max values
        assert java.util.Arrays.equals(
            StalinSort.stalinSort(new int[]{5, 3, 5}),
            new int[]{5, 5}
        ) : "Test failed: handles duplicate max values";

        // does not mutate the original array
        int[] original = new int[]{3, 1, 2};
        int[] result = StalinSort.stalinSort(original);
        assert java.util.Arrays.equals(result, new int[]{3}) : "Test failed: result";
        assert java.util.Arrays.equals(original, new int[]{3, 1, 2}) : "Test failed: original not mutated";

        System.out.println("All tests passed!");
    }
}
