// Merge K Sorted Arrays — merge k sorted arrays into one sorted array using a min-heap
import java.util.*;

public class MergeKSortedArrays {
    public static int[] mergeKSortedArrays(int[][] arrays) {
        List<Integer> result = new ArrayList<>(); // @step:initialize
        // Min-heap entries: int[]{value, arrayIndex, elementIndex}
        List<int[]> heap = new ArrayList<>(); // @step:initialize

        // Insert first element of each array into the heap
        for (int arrayIndex = 0; arrayIndex < arrays.length; arrayIndex++) { // @step:initialize
            if (arrays[arrayIndex].length > 0) { // @step:initialize
                heap.add(new int[]{arrays[arrayIndex][0], arrayIndex, 0}); // @step:heap-insert
            }
        }

        // Build initial min-heap using sift-up for each inserted element
        for (int insertedIdx = 1; insertedIdx < heap.size(); insertedIdx++) { // @step:sift-up
            int childIdx = insertedIdx; // @step:sift-up
            while (childIdx > 0) { // @step:sift-up
                int parentIdx = (childIdx - 1) / 2; // @step:sift-up
                if (heap.get(parentIdx)[0] <= heap.get(childIdx)[0]) break; // @step:compare
                int[] tempEntry = heap.get(parentIdx); // @step:heap-swap
                heap.set(parentIdx, heap.get(childIdx)); // @step:heap-swap
                heap.set(childIdx, tempEntry); // @step:heap-swap
                childIdx = parentIdx; // @step:sift-up
            }
        }

        // Extract min and insert next element from the same array
        while (!heap.isEmpty()) {
            int[] root = heap.get(0); // @step:heap-extract
            int minValue = root[0]; // @step:heap-extract
            int arrayIndex = root[1]; // @step:heap-extract
            int elementIndex = root[2]; // @step:heap-extract
            result.add(minValue); // @step:heap-extract

            int nextElementIndex = elementIndex + 1; // @step:heap-extract
            if (nextElementIndex < arrays[arrayIndex].length) {
                // Replace root with next element from the same array
                heap.set(0, new int[]{arrays[arrayIndex][nextElementIndex], arrayIndex, nextElementIndex}); // @step:heap-insert
            } else {
                // No more elements in this array — remove root by moving last to root
                int[] lastEntry = heap.remove(heap.size() - 1); // @step:heap-extract
                if (!heap.isEmpty()) {
                    heap.set(0, lastEntry); // @step:heap-extract
                }
            }

            // Sift down the root to restore heap property
            if (heap.size() > 1) {
                int parentIdx = 0; // @step:sift-down
                while (true) { // @step:sift-down
                    int smallestIdx = parentIdx; // @step:sift-down
                    int leftIdx = 2 * parentIdx + 1; // @step:sift-down
                    int rightIdx = 2 * parentIdx + 2; // @step:sift-down
                    if (leftIdx < heap.size() && heap.get(leftIdx)[0] < heap.get(smallestIdx)[0]) { // @step:compare
                        smallestIdx = leftIdx; // @step:sift-down
                    }
                    if (rightIdx < heap.size() && heap.get(rightIdx)[0] < heap.get(smallestIdx)[0]) { // @step:compare
                        smallestIdx = rightIdx; // @step:sift-down
                    }
                    if (smallestIdx == parentIdx) break; // @step:sift-down
                    int[] tempEntry = heap.get(parentIdx); // @step:heap-swap
                    heap.set(parentIdx, heap.get(smallestIdx)); // @step:heap-swap
                    heap.set(smallestIdx, tempEntry); // @step:heap-swap
                    parentIdx = smallestIdx; // @step:sift-down
                }
            }
        }

        return result.stream().mapToInt(Integer::intValue).toArray(); // @step:complete
    }
}
