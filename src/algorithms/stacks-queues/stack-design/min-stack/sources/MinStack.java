// Min Stack — maintain a main stack paired with an auxiliary min-tracking stack for O(1) getMin
import java.util.ArrayDeque;
import java.util.Deque;

public class MinStack {
    public static int minStack(int[] values) {
        Deque<Integer> mainStack = new ArrayDeque<>(); // @step:initialize
        Deque<Integer> minTracker = new ArrayDeque<>(); // @step:initialize

        for (int elementIdx = 0; elementIdx < values.length; elementIdx++) {
            int currentValue = values[elementIdx]; // @step:visit

            mainStack.push(currentValue); // @step:push

            // Maintain auxiliary min stack: duplicate current min if new value is not smaller
            if (minTracker.isEmpty() || currentValue <= minTracker.peek()) { // @step:compare
                minTracker.push(currentValue); // @step:push-auxiliary
            } else {
                minTracker.push(minTracker.peek()); // @step:push-auxiliary
            }
        }

        // The top of minTracker always holds the current minimum
        return minTracker.peek(); // @step:peek,complete
    }
}
