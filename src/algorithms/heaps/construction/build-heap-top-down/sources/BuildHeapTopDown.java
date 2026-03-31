// Build Heap Top-Down — build a min-heap by inserting elements one-by-one with sift-up
import java.util.ArrayList;
import java.util.List;

public class BuildHeapTopDown {
    public static int[] buildHeapTopDown(int[] inputArray) {
        List<Integer> heap = new ArrayList<>(); // @step:initialize
        // Insert each element at the end and restore heap property by sifting up
        for (int insertIdx = 0; insertIdx < inputArray.length; insertIdx++) { // @step:heap-insert
            heap.add(inputArray[insertIdx]); // @step:heap-insert
            siftUp(heap, heap.size() - 1); // @step:sift-up
        }
        return heap.stream().mapToInt(Integer::intValue).toArray(); // @step:complete
    }

    private static void siftUp(List<Integer> heap, int startIdx) {
        int childIdx = startIdx; // @step:sift-up
        while (childIdx > 0) {
            int parentIdx = (childIdx - 1) / 2; // @step:sift-up
            // If child is smaller than parent, swap to restore min-heap property
            if (heap.get(childIdx) < heap.get(parentIdx)) { // @step:sift-up
                int temp = heap.get(childIdx); // @step:heap-swap
                heap.set(childIdx, heap.get(parentIdx)); // @step:heap-swap
                heap.set(parentIdx, temp); // @step:heap-swap
                childIdx = parentIdx; // @step:sift-up
            } else {
                break; // @step:sift-up
            }
        }
    }
}
