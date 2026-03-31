// Find Median from Data Stream — maintain running median using two heaps
// maxHeap stores the lower half (root = largest of lower half)
// minHeap stores the upper half (root = smallest of upper half)
import java.util.ArrayList;
import java.util.List;

public class FindMedianStream {
    private static void siftUpMax(List<Integer> heap, int idx) {
        while (idx > 0) {
            int parentIdx = (idx - 1) / 2; // @step:sift-up
            if (heap.get(parentIdx) >= heap.get(idx)) break; // @step:compare
            int temp = heap.get(parentIdx); // @step:heap-swap
            heap.set(parentIdx, heap.get(idx)); // @step:heap-swap
            heap.set(idx, temp); // @step:heap-swap
            idx = parentIdx; // @step:sift-up
        }
    }

    private static void siftDownMax(List<Integer> heap, int startIdx) {
        int parentIdx = startIdx; // @step:sift-down
        int heapSize = heap.size();
        while (true) {
            int largestIdx = parentIdx; // @step:sift-down
            int leftIdx = 2 * parentIdx + 1; // @step:sift-down
            int rightIdx = 2 * parentIdx + 2; // @step:sift-down
            if (leftIdx < heapSize && heap.get(leftIdx) > heap.get(largestIdx)) { // @step:compare
                largestIdx = leftIdx; // @step:sift-down
            }
            if (rightIdx < heapSize && heap.get(rightIdx) > heap.get(largestIdx)) { // @step:compare
                largestIdx = rightIdx; // @step:sift-down
            }
            if (largestIdx == parentIdx) break; // @step:sift-down
            int swapTemp = heap.get(parentIdx); // @step:heap-swap
            heap.set(parentIdx, heap.get(largestIdx)); // @step:heap-swap
            heap.set(largestIdx, swapTemp); // @step:heap-swap
            parentIdx = largestIdx; // @step:sift-down
        }
    }

    private static void siftUpMin(List<Integer> heap, int idx) {
        while (idx > 0) {
            int parentIdx = (idx - 1) / 2; // @step:sift-up
            if (heap.get(parentIdx) <= heap.get(idx)) break; // @step:compare
            int temp = heap.get(parentIdx); // @step:heap-swap
            heap.set(parentIdx, heap.get(idx)); // @step:heap-swap
            heap.set(idx, temp); // @step:heap-swap
            idx = parentIdx; // @step:sift-up
        }
    }

    private static void siftDownMin(List<Integer> heap, int startIdx) {
        int parentIdx = startIdx; // @step:sift-down
        int heapSize = heap.size();
        while (true) {
            int smallestIdx = parentIdx; // @step:sift-down
            int leftIdx = 2 * parentIdx + 1; // @step:sift-down
            int rightIdx = 2 * parentIdx + 2; // @step:sift-down
            if (leftIdx < heapSize && heap.get(leftIdx) < heap.get(smallestIdx)) { // @step:compare
                smallestIdx = leftIdx; // @step:sift-down
            }
            if (rightIdx < heapSize && heap.get(rightIdx) < heap.get(smallestIdx)) { // @step:compare
                smallestIdx = rightIdx; // @step:sift-down
            }
            if (smallestIdx == parentIdx) break; // @step:sift-down
            int swapTemp = heap.get(parentIdx); // @step:heap-swap
            heap.set(parentIdx, heap.get(smallestIdx)); // @step:heap-swap
            heap.set(smallestIdx, swapTemp); // @step:heap-swap
            parentIdx = smallestIdx; // @step:sift-down
        }
    }

    public static List<Double> findMedianStream(int[] stream) {
        List<Integer> maxHeap = new ArrayList<>(); // @step:initialize
        List<Integer> minHeap = new ArrayList<>(); // @step:initialize
        List<Double> medians = new ArrayList<>(); // @step:initialize

        for (int num : stream) {
            if (maxHeap.isEmpty() || num <= maxHeap.get(0)) {
                maxHeap.add(num); // @step:heap-insert
                siftUpMax(maxHeap, maxHeap.size() - 1); // @step:sift-up
            } else {
                minHeap.add(num); // @step:heap-insert
                siftUpMin(minHeap, minHeap.size() - 1); // @step:sift-up
            }

            if (maxHeap.size() > minHeap.size() + 1) {
                int extracted = maxHeap.get(0); // @step:heap-extract
                maxHeap.set(0, maxHeap.get(maxHeap.size() - 1)); // @step:heap-extract
                maxHeap.remove(maxHeap.size() - 1); // @step:heap-extract
                siftDownMax(maxHeap, 0); // @step:sift-down
                minHeap.add(extracted); // @step:heap-insert
                siftUpMin(minHeap, minHeap.size() - 1); // @step:sift-up
            } else if (minHeap.size() > maxHeap.size()) {
                int extracted = minHeap.get(0); // @step:heap-extract
                minHeap.set(0, minHeap.get(minHeap.size() - 1)); // @step:heap-extract
                minHeap.remove(minHeap.size() - 1); // @step:heap-extract
                siftDownMin(minHeap, 0); // @step:sift-down
                maxHeap.add(extracted); // @step:heap-insert
                siftUpMax(maxHeap, maxHeap.size() - 1); // @step:sift-up
            }

            double median;
            if (maxHeap.size() == minHeap.size()) {
                median = (maxHeap.get(0) + minHeap.get(0)) / 2.0; // @step:complete
            } else {
                median = maxHeap.get(0); // @step:complete
            }
            medians.add(median);
        }

        return medians; // @step:complete
    }
}
