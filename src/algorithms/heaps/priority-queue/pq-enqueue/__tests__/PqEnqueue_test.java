public class PqEnqueue_test {
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
        // Test 1: enqueue into empty queue
        int[] result1 = PqEnqueue.pqEnqueue(new int[]{}, 5);
        assert result1.length == 1 && result1[0] == 5 : "Test 1 failed";

        // Test 2: enqueue larger value — heap stays valid, length increases
        int[] result2 = PqEnqueue.pqEnqueue(new int[]{1, 3, 5, 7, 9, 8, 6}, 10);
        assert isMinHeap(result2) && result2.length == 8 : "Test 2 failed";

        // Test 3: enqueue smaller value — bubbles to root
        int[] result3 = PqEnqueue.pqEnqueue(new int[]{1, 3, 5, 7, 9, 8, 6}, 0);
        assert isMinHeap(result3) && result3[0] == 0 : "Test 3 failed";

        // Test 4: enqueue new minimum into larger heap
        int[] result4 = PqEnqueue.pqEnqueue(new int[]{2, 5, 3, 10, 15, 8, 7}, 1);
        assert isMinHeap(result4) && result4[0] == 1 : "Test 4 failed";

        // Test 5: single-element queue, enqueue smaller
        int[] result5 = PqEnqueue.pqEnqueue(new int[]{5}, 2);
        assert result5.length == 2 && result5[0] == 2 : "Test 5 failed";

        // Test 6: preserves length increment
        int[] result6 = PqEnqueue.pqEnqueue(new int[]{1, 3, 5, 7, 9}, 4);
        assert result6.length == 6 : "Test 6 failed";

        System.out.println("All tests passed!");
    }
}
