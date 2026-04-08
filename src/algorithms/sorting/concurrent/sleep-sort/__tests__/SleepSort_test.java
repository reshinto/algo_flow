public class SleepSort_test {
    public static void main(String[] args) {
        assert java.util.Arrays.equals(
            SleepSort.sleepSort(new int[]{5, 3, 8, 1, 4, 2, 7, 6}),
            new int[]{1, 2, 3, 4, 5, 6, 7, 8}
        ) : "Test failed: sorts an unsorted array";

        assert java.util.Arrays.equals(
            SleepSort.sleepSort(new int[]{1, 2, 3, 4, 5}),
            new int[]{1, 2, 3, 4, 5}
        ) : "Test failed: handles an already sorted array";

        assert java.util.Arrays.equals(
            SleepSort.sleepSort(new int[]{5, 4, 3, 2, 1}),
            new int[]{1, 2, 3, 4, 5}
        ) : "Test failed: handles a reverse-sorted array";

        assert java.util.Arrays.equals(
            SleepSort.sleepSort(new int[]{3, 1, 4, 1, 5, 9, 2, 6}),
            new int[]{1, 1, 2, 3, 4, 5, 6, 9}
        ) : "Test failed: handles an array with duplicate values";

        assert java.util.Arrays.equals(
            SleepSort.sleepSort(new int[]{42}),
            new int[]{42}
        ) : "Test failed: handles a single element array";

        assert java.util.Arrays.equals(
            SleepSort.sleepSort(new int[]{}),
            new int[]{}
        ) : "Test failed: handles an empty array";

        int[] original = new int[]{3, 1, 2};
        int[] sorted = SleepSort.sleepSort(original);
        assert java.util.Arrays.equals(sorted, new int[]{1, 2, 3}) : "Test failed: sorted result";
        assert java.util.Arrays.equals(original, new int[]{3, 1, 2}) : "Test failed: original not mutated";

        System.out.println("All tests passed!");
    }
}
