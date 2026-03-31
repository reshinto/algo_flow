// Top-K Frequent Elements (Heap) — find k most frequent elements using a min-heap of size k
import java.util.*;

public class TopKFrequentHeap {
    public static int[] topKFrequentHeap(int[] array, int kValue) {
        // Count frequencies of each element
        Map<Integer, Integer> frequencyMap = new HashMap<>(); // @step:initialize
        for (int element : array) { // @step:initialize
            frequencyMap.put(element, frequencyMap.getOrDefault(element, 0) + 1); // @step:initialize
        }
        // Min-heap: each entry is int[]{frequency, element}, heap ordered by frequency
        int[][] heap = new int[kValue][2]; // @step:initialize
        int heapSize = 0; // @step:initialize
        List<Map.Entry<Integer, Integer>> entries = new ArrayList<>(frequencyMap.entrySet()); // @step:initialize

        // Process each unique element
        for (Map.Entry<Integer, Integer> entry : entries) {
            int element = entry.getKey();
            int frequency = entry.getValue();
            if (heapSize < kValue) {
                // Heap not full — insert and sift up
                heap[heapSize][0] = frequency; // @step:heap-insert
                heap[heapSize][1] = element; // @step:heap-insert
                heapSize++; // @step:heap-insert
                int childIdx = heapSize - 1; // @step:sift-up
                while (childIdx > 0) { // @step:sift-up
                    int parentIdx = (childIdx - 1) / 2; // @step:sift-up
                    if (heap[parentIdx][0] <= heap[childIdx][0]) break; // @step:compare
                    // Swap child with parent
                    int[] tempEntry = heap[parentIdx].clone(); // @step:heap-swap
                    heap[parentIdx] = heap[childIdx]; // @step:heap-swap
                    heap[childIdx] = tempEntry; // @step:heap-swap
                    childIdx = parentIdx; // @step:sift-up
                }
            } else if (frequency > heap[0][0]) {
                // Current freq beats root (lowest in heap) — replace root and sift down
                heap[0][0] = frequency; // @step:heap-extract
                heap[0][1] = element; // @step:heap-extract
                int parentIdx = 0; // @step:sift-down
                while (true) { // @step:sift-down
                    int smallestIdx = parentIdx; // @step:sift-down
                    int leftIdx = 2 * parentIdx + 1; // @step:sift-down
                    int rightIdx = 2 * parentIdx + 2; // @step:sift-down
                    if (leftIdx < heapSize && heap[leftIdx][0] < heap[smallestIdx][0]) { // @step:compare
                        smallestIdx = leftIdx; // @step:sift-down
                    }
                    if (rightIdx < heapSize && heap[rightIdx][0] < heap[smallestIdx][0]) { // @step:compare
                        smallestIdx = rightIdx; // @step:sift-down
                    }
                    if (smallestIdx == parentIdx) break; // @step:sift-down
                    int[] tempEntry = heap[parentIdx].clone(); // @step:heap-swap
                    heap[parentIdx] = heap[smallestIdx]; // @step:heap-swap
                    heap[smallestIdx] = tempEntry; // @step:heap-swap
                    parentIdx = smallestIdx; // @step:sift-down
                }
            }
        }

        // Extract elements from the heap (the k most frequent)
        int[] result = new int[heapSize]; // @step:complete
        for (int resultIdx = 0; resultIdx < heapSize; resultIdx++) { // @step:complete
            result[resultIdx] = heap[resultIdx][1]; // @step:complete
        }
        return result; // @step:complete
    }
}
