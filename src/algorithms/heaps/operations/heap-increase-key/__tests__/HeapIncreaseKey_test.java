import java.util.Arrays;

public class HeapIncreaseKey_test {
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
    private static boolean contains(int[] arr, int val) {
        for (int element : arr) if (element == val) return true;
        return false;
    }

    public static void main(String[] args) {
        int[] result1 = HeapIncreaseKey.heapIncreaseKey(new int[]{1,3,5,7,9,8,6}, 1, 10);
        assert isMinHeap(result1) : "Test 1 failed";
        assert contains(result1, 10) && !contains(result1, 3) : "Test 2 failed";

        int[] result2 = HeapIncreaseKey.heapIncreaseKey(new int[]{1,3,5,7,9,8,6}, 1, 5);
        assert isMinHeap(result2) && result2[1] == 5 : "Test 3 failed";

        int[] result3 = HeapIncreaseKey.heapIncreaseKey(new int[]{1,3,5,7,9,8,6}, 0, 20);
        assert isMinHeap(result3) && result3[0] != 20 : "Test 4 failed";

        int[] result4 = HeapIncreaseKey.heapIncreaseKey(new int[]{1,3,5,7,9,8,6}, 6, 100);
        assert isMinHeap(result4) && contains(result4, 100) : "Test 5 failed";

        int[] result5 = HeapIncreaseKey.heapIncreaseKey(new int[]{5}, 0, 10);
        assert Arrays.equals(result5, new int[]{10}) : "Test 6 failed";

        System.out.println("All tests passed!");
    }
}
