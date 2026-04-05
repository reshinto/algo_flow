// Sliding Window Maximum — find the max in each window of size k using a monotonic deque of indices
import java.util.ArrayDeque;
import java.util.Deque;

public class SlidingWindowMaximum {
    public static int[] slidingWindowMaxMonotonic(int[] nums, int windowSize) {
        Deque<Integer> monoDeque = new ArrayDeque<>(); // @step:initialize
        int[] result = new int[nums.length - windowSize + 1]; // @step:initialize
        int resultIdx = 0; // @step:initialize
        for (int elementIdx = 0; elementIdx < nums.length; elementIdx++) { // @step:visit
            // Remove indices that have fallen outside the current window
            while (!monoDeque.isEmpty() && monoDeque.peekFirst() <= elementIdx - windowSize) { // @step:dequeue
                monoDeque.pollFirst(); // @step:dequeue
            }
            // Maintain monotonic decreasing order — remove smaller elements from the rear
            while (!monoDeque.isEmpty() && nums[monoDeque.peekLast()] <= nums[elementIdx]) { // @step:maintain-monotonic
                monoDeque.pollLast(); // @step:maintain-monotonic
            }
            monoDeque.offerLast(elementIdx); // @step:enqueue
            // Once the first full window is reached, record the maximum (front of deque)
            if (elementIdx >= windowSize - 1) { // @step:peek
                result[resultIdx++] = nums[monoDeque.peekFirst()]; // @step:peek
            }
        }
        return result; // @step:complete
    }
}
