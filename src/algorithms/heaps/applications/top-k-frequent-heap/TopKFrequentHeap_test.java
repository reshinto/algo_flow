import java.util.Arrays;

public class TopKFrequentHeap_test {
    private static boolean contains(int[] arr, int value) {
        for (int element : arr) if (element == value) return true;
        return false;
    }

    public static void main(String[] args) {
        // Test: returns k elements
        int[] result1 = TopKFrequentHeap.topKFrequentHeap(new int[]{1,1,1,2,2,3,3,3,3,4}, 2);
        assert result1.length == 2 : "Test 1 failed: expected length 2";
        assert contains(result1, 1) : "Test 1 failed: expected 1 in result";
        assert contains(result1, 3) : "Test 1 failed: expected 3 in result";

        // Test: top-1 most frequent
        int[] result2 = TopKFrequentHeap.topKFrequentHeap(new int[]{4,4,4,4,2,2,1}, 1);
        assert result2.length == 1 && result2[0] == 4 : "Test 2 failed";

        // Test: all same
        int[] result3 = TopKFrequentHeap.topKFrequentHeap(new int[]{9,9,9,9}, 1);
        assert result3.length == 1 && result3[0] == 9 : "Test 3 failed";

        // Test: single element
        int[] result4 = TopKFrequentHeap.topKFrequentHeap(new int[]{3}, 1);
        assert result4.length == 1 && result4[0] == 3 : "Test 4 failed";

        // Test: excludes low frequency
        int[] result5 = TopKFrequentHeap.topKFrequentHeap(new int[]{1,1,1,2,2,3,3,3,3,4}, 2);
        assert !contains(result5, 4) : "Test 5 failed: 4 should not be in top 2";

        // Test: k=3 from default input
        int[] result6 = TopKFrequentHeap.topKFrequentHeap(new int[]{1,1,1,2,2,3,3,3,3,4}, 3);
        assert result6.length == 3 : "Test 6 failed: expected length 3";
        assert contains(result6, 1) && contains(result6, 2) && contains(result6, 3) : "Test 6 failed";

        System.out.println("All tests passed!");
    }
}
