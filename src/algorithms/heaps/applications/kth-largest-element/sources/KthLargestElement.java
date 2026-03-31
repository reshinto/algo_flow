// Kth Largest Element — find the kth largest element using a min-heap of size k
import java.util.ArrayList;
import java.util.List;

public class KthLargestElement {
    private static void siftUp(List<Integer> heap, int idx) {
        while (idx > 0) {
            int parentIdx = (idx - 1) / 2; // @step:sift-up
            if (heap.get(parentIdx) <= heap.get(idx)) break; // @step:compare
            int temp = heap.get(parentIdx); // @step:heap-swap
            heap.set(parentIdx, heap.get(idx)); // @step:heap-swap
            heap.set(idx, temp); // @step:heap-swap
            idx = parentIdx; // @step:sift-up
        }
    }

    private static void siftDown(List<Integer> heap, int startIdx, int size) {
        int parentIdx = startIdx; // @step:sift-down
        while (true) {
            int smallestIdx = parentIdx; // @step:sift-down
            int leftIdx = 2 * parentIdx + 1; // @step:sift-down
            int rightIdx = 2 * parentIdx + 2; // @step:sift-down
            if (leftIdx < size && heap.get(leftIdx) < heap.get(smallestIdx)) { // @step:compare
                smallestIdx = leftIdx; // @step:sift-down
            }
            if (rightIdx < size && heap.get(rightIdx) < heap.get(smallestIdx)) { // @step:compare
                smallestIdx = rightIdx; // @step:sift-down
            }
            if (smallestIdx == parentIdx) break; // @step:sift-down
            int swapTemp = heap.get(parentIdx); // @step:heap-swap
            heap.set(parentIdx, heap.get(smallestIdx)); // @step:heap-swap
            heap.set(smallestIdx, swapTemp); // @step:heap-swap
            parentIdx = smallestIdx; // @step:sift-down
        }
    }

    public static int kthLargestElement(int[] array, int kValue) {
        List<Integer> minHeap = new ArrayList<>(); // @step:initialize
        for (int element : array) {
            if (minHeap.size() < kValue) {
                minHeap.add(element); // @step:heap-insert
                siftUp(minHeap, minHeap.size() - 1); // @step:sift-up
            } else if (element > minHeap.get(0)) { // @step:compare
                minHeap.set(0, element); // @step:heap-extract
                siftDown(minHeap, 0, minHeap.size()); // @step:sift-down
            }
        }
        return minHeap.get(0); // @step:complete
    }
}
