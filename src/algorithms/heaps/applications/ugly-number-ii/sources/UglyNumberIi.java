// Ugly Number II — find the nth ugly number (only prime factors 2, 3, 5) using a min-heap
import java.util.HashSet;
import java.util.Set;
import java.util.ArrayList;
import java.util.List;

public class UglyNumberIi {
    private static void siftUp(List<Long> heap, int idx) {
        int currentIdx = idx; // @step:sift-up
        while (currentIdx > 0) {
            int parentIdx = (currentIdx - 1) / 2; // @step:sift-up
            if (heap.get(currentIdx) < heap.get(parentIdx)) { // @step:compare
                long temp = heap.get(currentIdx); // @step:heap-swap
                heap.set(currentIdx, heap.get(parentIdx)); // @step:heap-swap
                heap.set(parentIdx, temp); // @step:heap-swap
                currentIdx = parentIdx; // @step:sift-up
            } else {
                break; // @step:compare
            }
        }
    }

    private static void siftDown(List<Long> heap, int heapSize, int startIdx) {
        int parentIdx = startIdx; // @step:sift-down
        while (true) {
            int leftIdx = 2 * parentIdx + 1; // @step:sift-down
            int rightIdx = 2 * parentIdx + 2; // @step:sift-down
            int smallestIdx = parentIdx; // @step:sift-down
            if (leftIdx < heapSize && heap.get(leftIdx) < heap.get(smallestIdx)) { // @step:compare
                smallestIdx = leftIdx; // @step:sift-down
            }
            if (rightIdx < heapSize && heap.get(rightIdx) < heap.get(smallestIdx)) { // @step:compare
                smallestIdx = rightIdx; // @step:sift-down
            }
            if (smallestIdx == parentIdx) break; // @step:sift-down
            long swapTemp = heap.get(parentIdx); // @step:heap-swap
            heap.set(parentIdx, heap.get(smallestIdx)); // @step:heap-swap
            heap.set(smallestIdx, swapTemp); // @step:heap-swap
            parentIdx = smallestIdx; // @step:sift-down
        }
    }

    public static long uglyNumberIi(int nthPosition) {
        List<Long> heap = new ArrayList<>(); // @step:initialize
        heap.add(1L); // @step:initialize
        Set<Long> seen = new HashSet<>(); // @step:initialize
        seen.add(1L); // @step:initialize
        long[] primeFactors = {2L, 3L, 5L}; // @step:initialize
        long currentUgly = 1L; // @step:initialize

        for (int iteration = 0; iteration < nthPosition; iteration++) {
            currentUgly = heap.get(0); // @step:heap-extract
            heap.set(0, heap.get(heap.size() - 1)); // @step:heap-extract
            heap.remove(heap.size() - 1); // @step:heap-extract
            siftDown(heap, heap.size(), 0); // @step:sift-down
            for (long factor : primeFactors) {
                long candidate = currentUgly * factor; // @step:heap-insert
                if (!seen.contains(candidate)) {
                    seen.add(candidate); // @step:heap-insert
                    heap.add(candidate); // @step:heap-insert
                    siftUp(heap, heap.size() - 1); // @step:sift-up
                }
            }
        }

        return currentUgly; // @step:complete
    }
}
