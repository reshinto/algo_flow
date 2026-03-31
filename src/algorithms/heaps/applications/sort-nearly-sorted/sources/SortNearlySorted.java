// Sort Nearly Sorted — sort an array where each element is at most k positions from its sorted position
import java.util.ArrayList;
import java.util.List;

public class SortNearlySorted {
    private static void siftUp(List<Integer> arr, int currentIdx) {
        while (currentIdx > 0) {
            int parentIdx = (currentIdx - 1) / 2; // @step:sift-up
            if (arr.get(parentIdx) <= arr.get(currentIdx)) break; // @step:compare
            int swapTemp = arr.get(parentIdx); // @step:heap-swap
            arr.set(parentIdx, arr.get(currentIdx)); // @step:heap-swap
            arr.set(currentIdx, swapTemp); // @step:heap-swap
            currentIdx = parentIdx; // @step:sift-up
        }
    }

    private static void siftDown(List<Integer> arr, int parentIdx) {
        while (true) {
            int smallestIdx = parentIdx; // @step:sift-down
            int leftIdx = 2 * parentIdx + 1; // @step:sift-down
            int rightIdx = 2 * parentIdx + 2; // @step:sift-down
            if (leftIdx < arr.size() && arr.get(leftIdx) < arr.get(smallestIdx)) { // @step:compare
                smallestIdx = leftIdx; // @step:sift-down
            }
            if (rightIdx < arr.size() && arr.get(rightIdx) < arr.get(smallestIdx)) { // @step:compare
                smallestIdx = rightIdx; // @step:sift-down
            }
            if (smallestIdx == parentIdx) break; // @step:sift-down
            int swapTemp = arr.get(parentIdx); // @step:heap-swap
            arr.set(parentIdx, arr.get(smallestIdx)); // @step:heap-swap
            arr.set(smallestIdx, swapTemp); // @step:heap-swap
            parentIdx = smallestIdx; // @step:sift-down
        }
    }

    private static void heapInsert(List<Integer> arr, int value) {
        arr.add(value); // @step:heap-insert
        siftUp(arr, arr.size() - 1);
    }

    private static int heapExtract(List<Integer> arr) {
        int minValue = arr.get(0); // @step:heap-extract
        int lastIdx = arr.size() - 1; // @step:heap-extract
        arr.set(0, arr.get(lastIdx)); // @step:heap-swap
        arr.remove(lastIdx); // @step:heap-extract
        if (!arr.isEmpty()) siftDown(arr, 0); // @step:sift-down
        return minValue;
    }

    public static int[] sortNearlySorted(int[] array, int kValue) {
        List<Integer> result = new ArrayList<>(); // @step:initialize
        List<Integer> heap = new ArrayList<>(); // @step:initialize

        // Insert first k+1 elements into the min-heap
        int initialLimit = Math.min(kValue + 1, array.length);
        for (int insertIdx = 0; insertIdx < initialLimit; insertIdx++) { // @step:heap-insert
            heapInsert(heap, array[insertIdx]);
        }

        // For each remaining element, extract-min to result and insert next element
        for (int nextIdx = kValue + 1; nextIdx < array.length; nextIdx++) {
            result.add(heapExtract(heap)); // @step:heap-extract
            heapInsert(heap, array[nextIdx]); // @step:heap-insert
        }

        // Drain the remaining elements from the heap
        while (!heap.isEmpty()) {
            result.add(heapExtract(heap)); // @step:heap-extract
        }

        return result.stream().mapToInt(Integer::intValue).toArray(); // @step:complete
    }
}
