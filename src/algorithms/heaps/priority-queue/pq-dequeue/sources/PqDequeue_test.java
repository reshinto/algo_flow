public class PqDequeue_test {
    private static boolean isMinHeap(int[] array) {
        int size = array.length;
        for (int parentIdx = 0; parentIdx < size / 2; parentIdx++) {
            int leftIdx = 2 * parentIdx + 1;
            int rightIdx = 2 * parentIdx + 2;
            if (leftIdx < size && array[parentIdx] > array[leftIdx]) return false;
            if (rightIdx < size && array[parentIdx] > array[rightIdx]) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        // Test 1: dequeues the minimum and returns valid min-heap
        int[] result1 = PqDequeue.pqDequeue(new int[]{1, 3, 5, 7, 9, 8, 6});
        assert isMinHeap(result1) : "Test 1 failed: remaining is not a valid min-heap";

        // Test 2: remaining length is one less than original
        assert result1.length == 6 : "Test 2 failed: expected length 6, got " + result1.length;

        // Test 3: new root is second smallest
        assert result1[0] == 3 : "Test 3 failed: expected new root 3, got " + result1[0];

        // Test 4: increase root — old root sinks, heap stays valid
        int[] result4 = PqDequeue.pqDequeue(new int[]{2, 5, 3, 10, 15, 8, 7});
        assert isMinHeap(result4) : "Test 4 failed: remaining is not a valid min-heap";

        // Test 5: two-element heap
        int[] result5 = PqDequeue.pqDequeue(new int[]{2, 5});
        assert result5.length == 1 && result5[0] == 5 : "Test 5 failed";

        // Test 6: single-element heap
        int[] result6 = PqDequeue.pqDequeue(new int[]{42});
        assert result6.length == 0 : "Test 6 failed: expected empty array";

        System.out.println("All tests passed!");
    }
}
