// Kth Smallest Element — find the kth smallest element using a max-heap of size k
import java.util.ArrayList;
import java.util.List;

public class KthSmallestElement {
    private static void siftUp(List<Integer> heap, int idx) {
        while (idx > 0) {
            int parentIdx = (idx - 1) / 2; // @step:sift-up
            if (heap.get(parentIdx) >= heap.get(idx)) break; // @step:compare
            int temp = heap.get(parentIdx); // @step:heap-swap
            heap.set(parentIdx, heap.get(idx)); // @step:heap-swap
            heap.set(idx, temp); // @step:heap-swap
            idx = parentIdx; // @step:sift-up
        }
    }

    private static void siftDown(List<Integer> heap, int startIdx, int size) {
        int parentIdx = startIdx; // @step:sift-down
        while (true) {
            int largestIdx = parentIdx; // @step:sift-down
            int leftIdx = 2 * parentIdx + 1; // @step:sift-down
            int rightIdx = 2 * parentIdx + 2; // @step:sift-down
            if (leftIdx < size && heap.get(leftIdx) > heap.get(largestIdx)) { // @step:compare
                largestIdx = leftIdx; // @step:sift-down
            }
            if (rightIdx < size && heap.get(rightIdx) > heap.get(largestIdx)) { // @step:compare
                largestIdx = rightIdx; // @step:sift-down
            }
            if (largestIdx == parentIdx) break; // @step:sift-down
            int swapTemp = heap.get(parentIdx); // @step:heap-swap
            heap.set(parentIdx, heap.get(largestIdx)); // @step:heap-swap
            heap.set(largestIdx, swapTemp); // @step:heap-swap
            parentIdx = largestIdx; // @step:sift-down
        }
    }

    public static int kthSmallestElement(int[] array, int kValue) {
        List<Integer> maxHeap = new ArrayList<>(); // @step:initialize
        for (int element : array) {
            if (maxHeap.size() < kValue) {
                maxHeap.add(element); // @step:heap-insert
                siftUp(maxHeap, maxHeap.size() - 1); // @step:sift-up
            } else if (element < maxHeap.get(0)) { // @step:compare
                maxHeap.set(0, element); // @step:heap-extract
                siftDown(maxHeap, 0, maxHeap.size()); // @step:sift-down
            }
        }
        return maxHeap.get(0); // @step:complete
    }
}
