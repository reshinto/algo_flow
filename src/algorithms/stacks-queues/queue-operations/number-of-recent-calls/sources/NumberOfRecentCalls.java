// Number of Recent Calls — count calls in a 3000ms sliding window using a queue (LeetCode 933)
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

public class NumberOfRecentCalls {
    public static List<Integer> numberOfRecentCalls(int[] timestamps) {
        Deque<Integer> queue = new ArrayDeque<>(); // @step:initialize
        List<Integer> results = new ArrayList<>(); // @step:initialize

        for (int timestampIdx = 0; timestampIdx < timestamps.length; timestampIdx++) {
            int currentTimestamp = timestamps[timestampIdx]; // @step:visit

            queue.addLast(currentTimestamp); // @step:enqueue

            // Remove timestamps outside the 3000ms window
            while (queue.peekFirst() < currentTimestamp - 3000) { // @step:dequeue
                queue.pollFirst(); // @step:dequeue
            }

            results.add(queue.size()); // @step:complete
        }

        return results; // @step:complete
    }
}
