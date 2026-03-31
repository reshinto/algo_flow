// Heap Extract Max — remove and return the maximum (root) from a max-heap, then restore heap property
import java.util.Arrays;

public class HeapExtractMax {
    public static int[] heapExtractMax(int[] heapArray) {
        int[] array = heapArray.clone(); // @step:initialize
        int extractedValue = array[0]; // @step:heap-extract
        int lastIdx = array.length - 1; // @step:heap-extract
        // Move last element to root and remove the last position
        int temp = array[0]; // @step:heap-swap
        array[0] = array[lastIdx]; // @step:heap-swap
        array[lastIdx] = temp; // @step:heap-swap
        array = Arrays.copyOf(array, array.length - 1); // @step:heap-extract
        // Sift down the new root to restore max-heap property
        int size = array.length;
        int parentIdx = 0; // @step:sift-down
        while (true) { // @step:sift-down
            int largestIdx = parentIdx; // @step:sift-down
            int leftIdx = 2 * parentIdx + 1; // @step:sift-down
            int rightIdx = 2 * parentIdx + 2; // @step:sift-down
            // Find the largest among parent, left child, and right child
            if (leftIdx < size && array[leftIdx] > array[largestIdx]) { // @step:sift-down
                largestIdx = leftIdx; // @step:sift-down
            }
            if (rightIdx < size && array[rightIdx] > array[largestIdx]) { // @step:sift-down
                largestIdx = rightIdx; // @step:sift-down
            }
            if (largestIdx == parentIdx) break; // @step:sift-down
            // Swap parent with largest child
            int swapTemp = array[parentIdx]; // @step:heap-swap
            array[parentIdx] = array[largestIdx]; // @step:heap-swap
            array[largestIdx] = swapTemp; // @step:heap-swap
            parentIdx = largestIdx; // @step:sift-down
        }
        // Return [extractedValue, remaining heap elements]
        int[] result = new int[array.length + 1]; // @step:complete
        result[0] = extractedValue; // @step:complete
        System.arraycopy(array, 0, result, 1, array.length); // @step:complete
        return result; // @step:complete
    }
}
