import java.util.Arrays;

public class BuildHeapTopDown_test {
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
        int[] result1 = BuildHeapTopDown.buildHeapTopDown(new int[]{9,5,7,1,3,8,2,6,4});
        assert isMinHeap(result1) : "Test 1 failed: not a valid min-heap";
        assert result1[0] == 1 : "Test 2 failed: root should be 1";

        int[] result2 = BuildHeapTopDown.buildHeapTopDown(new int[]{1,2,3,4,5,6,7});
        assert isMinHeap(result2) && result2[0] == 1 : "Test 3 failed";

        int[] result3 = BuildHeapTopDown.buildHeapTopDown(new int[]{7,6,5,4,3,2,1});
        assert isMinHeap(result3) && result3[0] == 1 : "Test 4 failed";

        int[] result4 = BuildHeapTopDown.buildHeapTopDown(new int[]{42});
        assert Arrays.equals(result4, new int[]{42}) : "Test 5 failed";

        int[] result5 = BuildHeapTopDown.buildHeapTopDown(new int[]{5,2});
        assert result5[0] == 2 && isMinHeap(result5) : "Test 6 failed";

        System.out.println("All tests passed!");
    }
}
