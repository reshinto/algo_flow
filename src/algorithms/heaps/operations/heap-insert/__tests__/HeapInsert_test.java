import java.util.Arrays;

public class HeapInsert_test {
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
        int[] result1 = HeapInsert.heapInsert(new int[]{1,3,5,7,9,8,6}, 2);
        assert isMinHeap(result1) && result1[0] == 1 : "Test 1 failed";
        assert result1.length == 8 : "Test 2 failed: length should be 8";

        int[] result2 = HeapInsert.heapInsert(new int[]{3,5,7,9}, 1);
        assert result2[0] == 1 && isMinHeap(result2) : "Test 3 failed";

        int[] result3 = HeapInsert.heapInsert(new int[]{1,3,5,7}, 100);
        assert result3[0] == 1 && isMinHeap(result3) : "Test 4 failed";

        int[] result4 = HeapInsert.heapInsert(new int[]{5}, 3);
        assert result4[0] == 3 && isMinHeap(result4) : "Test 5 failed";

        int[] result5 = HeapInsert.heapInsert(new int[]{}, 42);
        assert Arrays.equals(result5, new int[]{42}) : "Test 6 failed";

        System.out.println("All tests passed!");
    }
}
