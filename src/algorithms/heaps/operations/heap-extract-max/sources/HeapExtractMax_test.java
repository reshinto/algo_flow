import java.util.Arrays;

public class HeapExtractMax_test {
    private static boolean isMaxHeap(int[] array) {
        int size = array.length;
        for (int parentIdx = 0; parentIdx < size / 2; parentIdx++) {
            int leftIdx = 2 * parentIdx + 1;
            int rightIdx = 2 * parentIdx + 2;
            if (leftIdx < size && array[parentIdx] < array[leftIdx]) return false;
            if (rightIdx < size && array[parentIdx] < array[rightIdx]) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        // Java returns [extractedValue, remaining...] as one array
        int[] result1 = HeapExtractMax.heapExtractMax(new int[]{9,7,8,3,5,6,1});
        assert result1[0] == 9 : "Test 1 failed: extracted value should be 9";
        int[] remaining1 = Arrays.copyOfRange(result1, 1, result1.length);
        assert isMaxHeap(remaining1) : "Test 2 failed: remaining should be max-heap";
        assert remaining1.length == 6 : "Test 3 failed: remaining length should be 6";
        assert remaining1[0] == 8 : "Test 4 failed: new root should be 8";

        int[] result2 = HeapExtractMax.heapExtractMax(new int[]{8,3});
        assert result2[0] == 8 : "Test 5 failed";
        assert result2.length == 2 && result2[1] == 3 : "Test 6 failed";

        int[] result3 = HeapExtractMax.heapExtractMax(new int[]{99});
        assert result3[0] == 99 && result3.length == 1 : "Test 7 failed";

        System.out.println("All tests passed!");
    }
}
