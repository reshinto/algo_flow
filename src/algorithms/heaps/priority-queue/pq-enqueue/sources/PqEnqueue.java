// PQ Enqueue — insert an element into a min-heap-based priority queue and restore heap order via sift-up
import java.util.Arrays;

public class PqEnqueue {
    public static int[] pqEnqueue(int[] priorityQueue, int value) {
        int[] queue = Arrays.copyOf(priorityQueue, priorityQueue.length + 1); // @step:initialize
        queue[queue.length - 1] = value; // @step:heap-insert
        int currentIdx = queue.length - 1; // @step:heap-insert
        // Sift up: bubble the new element toward the root until heap property holds
        while (currentIdx > 0) { // @step:sift-up
            int parentIdx = (currentIdx - 1) / 2; // @step:sift-up
            if (queue[currentIdx] >= queue[parentIdx]) break; // @step:compare
            // New element has higher priority (smaller value) — swap with parent
            int temp = queue[currentIdx]; // @step:heap-swap
            queue[currentIdx] = queue[parentIdx]; // @step:heap-swap
            queue[parentIdx] = temp; // @step:heap-swap
            currentIdx = parentIdx; // @step:sift-up
        }
        return queue; // @step:complete
    }
}
