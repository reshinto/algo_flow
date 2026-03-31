// Heap Delete Arbitrary — remove a node at any index from a min-heap in O(log n)
public class HeapDeleteArbitrary {
    public static int[] heapDeleteArbitrary(int[] inputArray, int targetIndex) {
        int size = inputArray.length; // @step:initialize
        int[] array = java.util.Arrays.copyOf(inputArray, size); // @step:initialize
        int lastIndex = size - 1; // @step:initialize

        // Replace target with the last element, then shrink the heap
        array[targetIndex] = array[lastIndex]; // @step:heap-extract
        int[] shrunk = java.util.Arrays.copyOf(array, lastIndex); // @step:heap-extract

        if (targetIndex >= shrunk.length) return shrunk; // @step:complete

        int parentIndex = (targetIndex - 1) / 2; // @step:sift-up

        // If new value is smaller than its parent, sift up; otherwise sift down
        if (targetIndex > 0 && shrunk[targetIndex] < shrunk[parentIndex]) { // @step:sift-up
            siftUp(shrunk, targetIndex); // @step:sift-up
        } else {
            siftDown(shrunk, targetIndex, shrunk.length); // @step:sift-down
        }

        return shrunk; // @step:complete
    }

    private static void siftUp(int[] array, int startIndex) {
        int currentIndex = startIndex; // @step:sift-up
        while (currentIndex > 0) {
            int parentIndex = (currentIndex - 1) / 2; // @step:sift-up
            if (array[currentIndex] >= array[parentIndex]) break; // @step:compare
            // Swap current with parent
            int temp = array[currentIndex]; // @step:heap-swap
            array[currentIndex] = array[parentIndex]; // @step:heap-swap
            array[parentIndex] = temp; // @step:heap-swap
            currentIndex = parentIndex; // @step:sift-up
        }
    }

    private static void siftDown(int[] array, int startIndex, int size) {
        int parentIndex = startIndex; // @step:sift-down
        while (true) {
            int smallestIndex = parentIndex; // @step:sift-down
            int leftIndex = 2 * parentIndex + 1; // @step:sift-down
            int rightIndex = 2 * parentIndex + 2; // @step:sift-down
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
