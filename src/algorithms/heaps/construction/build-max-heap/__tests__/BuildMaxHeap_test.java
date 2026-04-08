import java.util.Arrays;

public class BuildMaxHeap_test {
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
        int[] result1 = BuildMaxHeap.buildMaxHeap(new int[]{9,5,7,1,3,8,2,6,4});
        assert isMaxHeap(result1) : "Test 1 failed: not a valid max-heap";
        assert result1[0] == 9 : "Test 2 failed: root should be 9";

        int[] result2 = BuildMaxHeap.buildMaxHeap(new int[]{9,7,8,5,6,3,4});
        assert isMaxHeap(result2) && result2[0] == 9 : "Test 3 failed";

        int[] result3 = BuildMaxHeap.buildMaxHeap(new int[]{1,2,3,4,5,6,7});
        assert isMaxHeap(result3) && result3[0] == 7 : "Test 4 failed";

        int[] result4 = BuildMaxHeap.buildMaxHeap(new int[]{42});
        assert Arrays.equals(result4, new int[]{42}) : "Test 5 failed";

        int[] result5 = BuildMaxHeap.buildMaxHeap(new int[]{2,5});
        assert result5[0] == 5 && isMaxHeap(result5) : "Test 6 failed";

        System.out.println("All tests passed!");
    }
}
