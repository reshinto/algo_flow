// PQ Dequeue — remove and return the highest-priority (smallest) element from a min-heap priority queue
import java.util.Arrays;

public class PqDequeue {
    public static int[] pqDequeue(int[] priorityQueue) {
        int[] queue = Arrays.copyOf(priorityQueue, priorityQueue.length); // @step:initialize
        int lastIdx = queue.length - 1; // @step:heap-extract
        // Move last element to root and remove the last position
        int temp = queue[0]; // @step:heap-swap
        queue[0] = queue[lastIdx]; // @step:heap-swap
        queue[lastIdx] = temp; // @step:heap-swap
        int[] trimmed = Arrays.copyOf(queue, lastIdx); // @step:heap-extract
        // Sift down the new root to restore heap property
        int size = trimmed.length;
        int parentIdx = 0; // @step:sift-down
        while (true) { // @step:sift-down
            int smallestIdx = parentIdx; // @step:sift-down
            int leftIdx = 2 * parentIdx + 1; // @step:sift-down
            int rightIdx = 2 * parentIdx + 2; // @step:sift-down
            // Find the smallest among parent, left child, and right child
            if (leftIdx < size && trimmed[leftIdx] < trimmed[smallestIdx]) { // @step:compare
                smallestIdx = leftIdx;
            }
            if (rightIdx < size && trimmed[rightIdx] < trimmed[smallestIdx]) { // @step:compare
                smallestIdx = rightIdx;
            }
            if (smallestIdx == parentIdx) break; // @step:sift-down
            // Swap parent with highest-priority child
            int swapTemp = trimmed[parentIdx]; // @step:heap-swap
            trimmed[parentIdx] = trimmed[smallestIdx]; // @step:heap-swap
            trimmed[smallestIdx] = swapTemp; // @step:heap-swap
            parentIdx = smallestIdx; // @step:sift-down
        }
        return trimmed; // @step:complete
    }
}
