// Heap Sort Visualization — sort using max-heap tree perspective: build heap, then extract max repeatedly
public class HeapSortVisualization {
    private static void siftDown(int[] heapArr, int heapSize, int rootIdx) {
        int parentIdx = rootIdx; // @step:sift-down
        while (true) {
            int leftIdx = 2 * parentIdx + 1; // @step:sift-down
            int rightIdx = 2 * parentIdx + 2; // @step:sift-down
            int largestIdx = parentIdx; // @step:sift-down
            if (leftIdx < heapSize && heapArr[leftIdx] > heapArr[largestIdx]) { // @step:compare
                largestIdx = leftIdx; // @step:sift-down
            }
            if (rightIdx < heapSize && heapArr[rightIdx] > heapArr[largestIdx]) { // @step:compare
                largestIdx = rightIdx; // @step:sift-down
            }
            if (largestIdx == parentIdx) break; // @step:sift-down
            int swapTemp = heapArr[parentIdx]; // @step:heap-swap
            heapArr[parentIdx] = heapArr[largestIdx]; // @step:heap-swap
            heapArr[largestIdx] = swapTemp; // @step:heap-swap
            parentIdx = largestIdx; // @step:sift-down
        }
    }

    public static int[] heapSortVisualization(int[] inputArray) {
        int[] array = inputArray.clone(); // @step:initialize
        int arrayLength = array.length; // @step:initialize

        // Build max-heap in-place
        int lastNonLeaf = arrayLength / 2 - 1;
        for (int nodeIdx = lastNonLeaf; nodeIdx >= 0; nodeIdx--) {
            siftDown(array, arrayLength, nodeIdx); // @step:sift-down
        }

        // Extract elements one by one
        for (int heapEnd = arrayLength - 1; heapEnd > 0; heapEnd--) {
            int swapTemp = array[0]; // @step:heap-swap
            array[0] = array[heapEnd]; // @step:heap-swap
            array[heapEnd] = swapTemp; // @step:heap-swap
            siftDown(array, heapEnd, 0); // @step:sift-down
        }

        return array; // @step:complete
    }
}
