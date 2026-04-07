import java.util.Arrays;

public class HeapDeleteArbitrary_test {
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
        int[] result1 = HeapDeleteArbitrary.heapDeleteArbitrary(new int[]{1,3,5,7,9,8,6}, 2);
        assert isMinHeap(result1) && result1.length == 6 : "Test 1 failed";

        int[] sorted1 = result1.clone(); Arrays.sort(sorted1);
        assert Arrays.equals(sorted1, new int[]{1,3,6,7,8,9}) : "Test 2 failed";

        int[] result2 = HeapDeleteArbitrary.heapDeleteArbitrary(new int[]{1,3,5,7,9,8,6}, 0);
        assert isMinHeap(result2) && result2.length == 6 && result2[0] != 1 : "Test 3 failed";

        int[] result3 = HeapDeleteArbitrary.heapDeleteArbitrary(new int[]{1,5}, 0);
        assert Arrays.equals(result3, new int[]{5}) : "Test 4 failed";

        int[] result4 = HeapDeleteArbitrary.heapDeleteArbitrary(new int[]{1,5}, 1);
        assert Arrays.equals(result4, new int[]{1}) : "Test 5 failed";

        int[] result5 = HeapDeleteArbitrary.heapDeleteArbitrary(new int[]{42}, 0);
        assert result5.length == 0 : "Test 6 failed";

        int[] result6 = HeapDeleteArbitrary.heapDeleteArbitrary(new int[]{1,10,5,15,20,8,6}, 3);
        assert isMinHeap(result6) : "Test 7 failed";

        System.out.println("All tests passed!");
    }
}
