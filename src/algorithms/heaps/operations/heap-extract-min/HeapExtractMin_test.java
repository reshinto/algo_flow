import java.util.Arrays;

public class HeapExtractMin_test {
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
        // Java returns [extractedValue, remaining...] as one array
        int[] result1 = HeapExtractMin.heapExtractMin(new int[]{1,3,5,7,9,8,6});
        assert result1[0] == 1 : "Test 1 failed: extracted value should be 1";
        int[] remaining1 = Arrays.copyOfRange(result1, 1, result1.length);
        assert isMinHeap(remaining1) : "Test 2 failed: remaining should be min-heap";
        assert remaining1.length == 6 : "Test 3 failed: remaining length should be 6";
        assert remaining1[0] == 3 : "Test 4 failed: new root should be 3";

        int[] result2 = HeapExtractMin.heapExtractMin(new int[]{2,5});
        assert result2[0] == 2 : "Test 5 failed";
        assert result2[1] == 5 : "Test 6 failed";

        int[] result3 = HeapExtractMin.heapExtractMin(new int[]{42});
        assert result3[0] == 42 && result3.length == 1 : "Test 7 failed";

        System.out.println("All tests passed!");
    }
}
