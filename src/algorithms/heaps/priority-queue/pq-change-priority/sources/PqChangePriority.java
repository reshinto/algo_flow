// PQ Change Priority — update element priority at a given index, then restore heap order via sift-up or sift-down
import java.util.Arrays;

public class PqChangePriority {
    public static int[] pqChangePriority(int[] priorityQueue, int targetIndex, int newValue) {
        int[] queue = Arrays.copyOf(priorityQueue, priorityQueue.length); // @step:initialize
        int oldValue = queue[targetIndex]; // @step:heap-update
        queue[targetIndex] = newValue; // @step:heap-update

        if (newValue < oldValue) {
            // Priority increased (value decreased) — sift up
            int currentIdx = targetIndex; // @step:sift-up
            while (currentIdx > 0) { // @step:sift-up
                int parentIdx = (currentIdx - 1) / 2; // @step:sift-up
                if (queue[currentIdx] >= queue[parentIdx]) break; // @step:compare
                int temp = queue[currentIdx]; // @step:heap-swap
                queue[currentIdx] = queue[parentIdx]; // @step:heap-swap
                queue[parentIdx] = temp; // @step:heap-swap
                currentIdx = parentIdx; // @step:sift-up
            }
        } else {
            // Priority decreased (value increased) — sift down
            int parentIdx = targetIndex; // @step:sift-down
            int size = queue.length;
            while (true) { // @step:sift-down
                int smallestIdx = parentIdx; // @step:sift-down
                int leftIdx = 2 * parentIdx + 1; // @step:sift-down
                int rightIdx = 2 * parentIdx + 2; // @step:sift-down
                if (leftIdx < size && queue[leftIdx] < queue[smallestIdx]) { // @step:compare
                    smallestIdx = leftIdx;
                }
                if (rightIdx < size && queue[rightIdx] < queue[smallestIdx]) { // @step:compare
                    smallestIdx = rightIdx;
                }
                if (smallestIdx == parentIdx) break; // @step:sift-down
                int swapTemp = queue[parentIdx]; // @step:heap-swap
                queue[parentIdx] = queue[smallestIdx]; // @step:heap-swap
                queue[smallestIdx] = swapTemp; // @step:heap-swap
                parentIdx = smallestIdx; // @step:sift-down
            }
        }

        return queue; // @step:complete
    }
}
