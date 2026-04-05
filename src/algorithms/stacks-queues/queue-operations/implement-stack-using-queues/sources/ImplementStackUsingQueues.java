// Implement Stack Using Queues — use one queue to emulate LIFO stack behaviour (LeetCode 225)
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

public class ImplementStackUsingQueues {
    public static List<Integer> implementStackUsingQueues(int[] values) {
        Deque<Integer> queue = new ArrayDeque<>(); // @step:initialize
        List<Integer> popResults = new ArrayList<>(); // @step:initialize

        // Push phase — enqueue each value, then rotate all prior elements behind it
        for (int elementIdx = 0; elementIdx < values.length; elementIdx++) {
            int currentValue = values[elementIdx]; // @step:visit
            queue.addLast(currentValue); // @step:enqueue
            // Rotate: move every element that was there before the new one to the back
            for (int rotationIdx = 0; rotationIdx < queue.size() - 1; rotationIdx++) {
                int transferred = queue.removeFirst(); // @step:transfer
                queue.addLast(transferred); // @step:transfer
            }
        }

        // Pop phase — front of queue is always the most-recently pushed element (LIFO)
        while (!queue.isEmpty()) {
            int poppedValue = queue.removeFirst(); // @step:dequeue
            popResults.add(poppedValue); // @step:dequeue
        }

        return popResults; // @step:complete
    }
}
