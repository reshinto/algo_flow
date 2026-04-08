import java.util.Arrays;

public class HeapDecreaseKey_test {
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
        int[] result1 = HeapDecreaseKey.heapDecreaseKey(new int[]{1,5,3,7,9,8,6}, 3, 2);
        assert isMinHeap(result1) : "Test 1 failed";
        assert contains(result1, 2) && !contains(result1, 7) : "Test 2 failed";

        int[] result2 = HeapDecreaseKey.heapDecreaseKey(new int[]{1,5,3,7,9,8,6}, 3, 6);
        assert isMinHeap(result2) && result2[3] == 6 : "Test 3 failed";

        int[] result3 = HeapDecreaseKey.heapDecreaseKey(new int[]{1,5,3,7,9,8,6}, 0, -1);
        assert isMinHeap(result3) && result3[0] == -1 : "Test 4 failed";

        int[] result4 = HeapDecreaseKey.heapDecreaseKey(new int[]{1,3,5,7,9,8,6}, 6, 0);
        assert isMinHeap(result4) && result4[0] == 0 : "Test 5 failed";

        int[] result5 = HeapDecreaseKey.heapDecreaseKey(new int[]{10}, 0, 5);
        assert Arrays.equals(result5, new int[]{5}) : "Test 6 failed";

        System.out.println("All tests passed!");
    }
}
