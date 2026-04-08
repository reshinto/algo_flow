import java.util.Arrays;

public class HeapReplaceRoot_test {
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
        // Java returns [replacedValue, ...newHeap] as one array
        int[] result1 = HeapReplaceRoot.heapReplaceRoot(new int[]{1,3,5,7,9,8,6}, 10);
        assert result1[0] == 1 : "Test 1 failed: replaced value should be 1";
        int[] newHeap1 = Arrays.copyOfRange(result1, 1, result1.length);
        assert isMinHeap(newHeap1) : "Test 2 failed: new heap should be valid min-heap";
        assert contains(newHeap1, 10) && !contains(newHeap1, 1) : "Test 3 failed";

        int[] result2 = HeapReplaceRoot.heapReplaceRoot(new int[]{1,3,5,7,9,8,6}, 2);
        assert result2[0] == 1 : "Test 4 failed";
        assert result2[1] == 2 : "Test 5 failed: new root should be 2";

        int[] result3 = HeapReplaceRoot.heapReplaceRoot(new int[]{42}, 7);
        assert result3[0] == 42 && result3[1] == 7 : "Test 6 failed";

        System.out.println("All tests passed!");
    }
}
