// Heap Replace Root — replace the root with a new value and sift-down (more efficient than extract+insert)
public class HeapReplaceRoot {
    public static int[] heapReplaceRoot(int[] inputArray, int newValue) {
        int[] array = inputArray.clone(); // @step:initialize
        int replacedValue = array[0]; // @step:initialize

        // Place the new value at the root
        array[0] = newValue; // @step:heap-update

        // Sift down to restore the min-heap property
        siftDown(array, 0, array.length); // @step:sift-down

        // Return [replacedValue, ...newHeap] encoded as array for simplicity
        int[] result = new int[array.length + 1]; // @step:complete
        result[0] = replacedValue; // @step:complete
        System.arraycopy(array, 0, result, 1, array.length); // @step:complete
        return result; // @step:complete
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
            // Swap parent with smallest child
            int temp = array[parentIndex]; // @step:heap-swap
            array[parentIndex] = array[smallestIndex]; // @step:heap-swap
            array[smallestIndex] = temp; // @step:heap-swap
            parentIndex = smallestIndex; // @step:sift-down
        }
    }
}
