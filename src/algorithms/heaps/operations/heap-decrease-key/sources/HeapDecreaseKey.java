// Heap Decrease Key — decrease the value at a given index in a min-heap, then sift-up
public class HeapDecreaseKey {
    public static int[] heapDecreaseKey(int[] inputArray, int targetIndex, int newValue) {
        int[] array = inputArray.clone(); // @step:initialize

        // Update the value at targetIndex to the new (smaller) value
        array[targetIndex] = newValue; // @step:heap-update

        // Sift up to restore the min-heap property
        siftUp(array, targetIndex); // @step:sift-up

        return array; // @step:complete
    }

    private static void siftUp(int[] array, int startIndex) {
        int currentIndex = startIndex; // @step:sift-up
        while (currentIndex > 0) {
            int parentIndex = (currentIndex - 1) / 2; // @step:sift-up
            if (array[currentIndex] >= array[parentIndex]) break; // @step:compare
            // Swap current with parent — current value is smaller, move it up
            int temp = array[currentIndex]; // @step:heap-swap
            array[currentIndex] = array[parentIndex]; // @step:heap-swap
            array[parentIndex] = temp; // @step:heap-swap
            currentIndex = parentIndex; // @step:sift-up
        }
    }
}
