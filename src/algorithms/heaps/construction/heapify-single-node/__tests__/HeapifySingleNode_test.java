import java.util.Arrays;

public class HeapifySingleNode_test {
    private static boolean isPathValid(int[] array, int startIdx) {
        int size = array.length;
        int parentIdx = startIdx;
        while (true) {
            int leftIdx = 2 * parentIdx + 1;
            int rightIdx = 2 * parentIdx + 2;
            if (leftIdx >= size) break;
            if (array[parentIdx] > array[leftIdx]) return false;
            if (rightIdx < size && array[parentIdx] > array[rightIdx]) return false;
            int smallestChild = (rightIdx < size && array[rightIdx] < array[leftIdx]) ? rightIdx : leftIdx;
            parentIdx = smallestChild;
        }
        return true;
    }

    public static void main(String[] args) {
        int[] result1 = HeapifySingleNode.heapifySingleNode(new int[]{9,1,7,2,3,8,5,6,4}, 0);
        assert isPathValid(result1, 0) : "Test 1 failed: path not valid";
        assert result1[0] == 1 : "Test 2 failed: root should be 1";

        int[] result2 = HeapifySingleNode.heapifySingleNode(new int[]{1,9,2,3,4,5,6}, 1);
        assert isPathValid(result2, 1) : "Test 3 failed";

        int[] result3 = HeapifySingleNode.heapifySingleNode(new int[]{1,2,3,4,5,6,7}, 0);
        assert Arrays.equals(result3, new int[]{1,2,3,4,5,6,7}) : "Test 4 failed: no-op expected";

        int[] result4 = HeapifySingleNode.heapifySingleNode(new int[]{42}, 0);
        assert Arrays.equals(result4, new int[]{42}) : "Test 5 failed";

        int[] result5 = HeapifySingleNode.heapifySingleNode(new int[]{1,2,3,4,5}, 4);
        assert Arrays.equals(result5, new int[]{1,2,3,4,5}) : "Test 6 failed: leaf no-op";

        System.out.println("All tests passed!");
    }
}
