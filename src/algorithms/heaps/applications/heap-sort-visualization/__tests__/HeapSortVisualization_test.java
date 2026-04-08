import java.util.Arrays;

public class HeapSortVisualization_test {
    public static void main(String[] args) {
        // Test: sorts the default input
        assert Arrays.equals(HeapSortVisualization.heapSortVisualization(new int[]{9, 5, 7, 1, 3, 8, 2, 6, 4}),
            new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9}) : "Test 1 failed";

        // Test: already sorted
        assert Arrays.equals(HeapSortVisualization.heapSortVisualization(new int[]{1, 2, 3, 4, 5}),
            new int[]{1, 2, 3, 4, 5}) : "Test 2 failed";

        // Test: reverse sorted
        assert Arrays.equals(HeapSortVisualization.heapSortVisualization(new int[]{5, 4, 3, 2, 1}),
            new int[]{1, 2, 3, 4, 5}) : "Test 3 failed";

        // Test: duplicates
        assert Arrays.equals(HeapSortVisualization.heapSortVisualization(new int[]{3, 1, 4, 1, 5, 9, 2, 6, 5}),
            new int[]{1, 1, 2, 3, 4, 5, 5, 6, 9}) : "Test 4 failed";

        // Test: single element
        assert Arrays.equals(HeapSortVisualization.heapSortVisualization(new int[]{42}),
            new int[]{42}) : "Test 5 failed";

        // Test: empty array
        assert Arrays.equals(HeapSortVisualization.heapSortVisualization(new int[]{}),
            new int[]{}) : "Test 6 failed";

        // Test: two elements
        assert Arrays.equals(HeapSortVisualization.heapSortVisualization(new int[]{2, 1}),
            new int[]{1, 2}) : "Test 7 failed";

        // Test: negative values
        assert Arrays.equals(HeapSortVisualization.heapSortVisualization(new int[]{-3, 1, -5, 4, 0}),
            new int[]{-5, -3, 0, 1, 4}) : "Test 8 failed";

        System.out.println("All tests passed!");
    }
}
