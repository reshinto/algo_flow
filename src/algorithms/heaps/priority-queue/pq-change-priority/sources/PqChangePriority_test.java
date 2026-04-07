public class PqChangePriority_test {
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
        int[] result1 = PqChangePriority.pqChangePriority(new int[]{2,5,3,10,15,8,7}, 4, 1);
        assert isMinHeap(result1) && result1[0] == 1 : "Test 1 failed";

        int[] result2 = PqChangePriority.pqChangePriority(new int[]{2,5,3,10,15,8,7}, 0, 20);
        assert isMinHeap(result2) && result2[0] == 3 : "Test 2 failed";

        int[] result3 = PqChangePriority.pqChangePriority(new int[]{1,3,5,7,9,8,6}, 6, 0);
        assert isMinHeap(result3) && result3[0] == 0 : "Test 3 failed";

        int[] result4 = PqChangePriority.pqChangePriority(new int[]{1,3,5,7,9}, 4, 100);
        assert isMinHeap(result4) : "Test 4 failed";

        int[] result5 = PqChangePriority.pqChangePriority(new int[]{2,5,3,10,15,8,7}, 2, 3);
        assert isMinHeap(result5) : "Test 5 failed";

        System.out.println("All tests passed!");
    }
}
