// Heapify Single Node — demonstrate sift-down on a single subtree root to its correct position
public class HeapifySingleNode {
    public static int[] heapifySingleNode(int[] inputArray, int targetIndex) {
        int[] array = inputArray.clone(); // @step:initialize
        int size = array.length; // @step:initialize
        siftDown(array, targetIndex, size); // @step:sift-down
        return array; // @step:complete
    }

    private static void siftDown(int[] array, int startIdx, int size) {
        int parentIdx = startIdx; // @step:sift-down
        while (true) {
            int smallestIdx = parentIdx; // @step:sift-down
            int leftIdx = 2 * parentIdx + 1; // @step:sift-down
            int rightIdx = 2 * parentIdx + 2; // @step:sift-down
            // Find the smallest among parent, left child, and right child
            if (leftIdx < size && array[leftIdx] < array[smallestIdx]) { // @step:sift-down
                smallestIdx = leftIdx; // @step:sift-down
            }
            if (rightIdx < size && array[rightIdx] < array[smallestIdx]) { // @step:sift-down
                smallestIdx = rightIdx; // @step:sift-down
            }
            if (smallestIdx == parentIdx) break; // @step:sift-down
            // Swap parent with the smallest child
            int temp = array[parentIdx]; // @step:heap-swap
            array[parentIdx] = array[smallestIdx]; // @step:heap-swap
            array[smallestIdx] = temp; // @step:heap-swap
            parentIdx = smallestIdx; // @step:sift-down
        }
    }
}
