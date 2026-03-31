// Heap Extract Min — remove and return the minimum (root) from a min-heap, then restore heap property
import java.util.Arrays;

public class HeapExtractMin {
    public static int[] heapExtractMin(int[] heapArray) {
        int[] array = heapArray.clone(); // @step:initialize
        int extractedValue = array[0]; // @step:heap-extract
        int lastIdx = array.length - 1; // @step:heap-extract
        // Move last element to root and remove the last position
        int temp = array[0]; // @step:heap-swap
        array[0] = array[lastIdx]; // @step:heap-swap
        array[lastIdx] = temp; // @step:heap-swap
        array = Arrays.copyOf(array, array.length - 1); // @step:heap-extract
        // Sift down the new root to restore heap property
        int size = array.length;
        int parentIdx = 0; // @step:sift-down
        while (true) { // @step:sift-down
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
            // Swap parent with smallest child
            int swapTemp = array[parentIdx]; // @step:heap-swap
            array[parentIdx] = array[smallestIdx]; // @step:heap-swap
            array[smallestIdx] = swapTemp; // @step:heap-swap
            parentIdx = smallestIdx; // @step:sift-down
        }
        // Return [extractedValue, remaining heap elements]
        int[] result = new int[array.length + 1]; // @step:complete
        result[0] = extractedValue; // @step:complete
        System.arraycopy(array, 0, result, 1, array.length); // @step:complete
        return result; // @step:complete
    }
}
