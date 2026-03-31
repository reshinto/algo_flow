// Heap Increase Key — increase the value at a given index in a min-heap, then sift-down
public class HeapIncreaseKey {
    public static int[] heapIncreaseKey(int[] inputArray, int targetIndex, int newValue) {
        int[] array = inputArray.clone(); // @step:initialize

        // Update the value at targetIndex to the new (larger) value
        array[targetIndex] = newValue; // @step:heap-update

        // Sift down to restore the min-heap property
        siftDown(array, targetIndex, array.length); // @step:sift-down

        return array; // @step:complete
    }

    private static void siftDown(int[] array, int startIndex, int size) {
        int parentIndex = startIndex; // @step:sift-down
        while (true) {
            int smallestIndex = parentIndex; // @step:sift-down
            int leftIndex = 2 * parentIndex + 1; // @step:sift-down
            int rightIndex = 2 * parentIndex + 2; // @step:sift-down
            // Find the smallest among parent, left child, and right child
            if (leftIndex < size && array[leftIndex] < array[smallestIndex]) { // @step:compare
                smallestIndex = leftIndex; // @step:sift-down
            }
            if (rightIndex < size && array[rightIndex] < array[smallestIndex]) { // @step:compare
                smallestIndex = rightIndex; // @step:sift-down
            }
            if (smallestIndex == parentIndex) break; // @step:sift-down
            // Swap parent with smallest child — parent value is too large, push it down
            int temp = array[parentIndex]; // @step:heap-swap
            array[parentIndex] = array[smallestIndex]; // @step:heap-swap
            array[smallestIndex] = temp; // @step:heap-swap
            parentIndex = smallestIndex; // @step:sift-down
        }
    }
}
