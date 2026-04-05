// Implement Queue Using Stacks — use two stacks to emulate FIFO queue behaviour (LeetCode 232)
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

public class ImplementQueueUsingStacks {
    public static List<Integer> implementQueueUsingStacks(int[] values) {
        Deque<Integer> inputStack = new ArrayDeque<>(); // @step:initialize
        Deque<Integer> outputStack = new ArrayDeque<>(); // @step:initialize
        List<Integer> dequeueResults = new ArrayList<>(); // @step:initialize

        // Push phase — enqueue all values into the input stack
        for (int elementIdx = 0; elementIdx < values.length; elementIdx++) {
            int currentValue = values[elementIdx]; // @step:visit
            inputStack.push(currentValue); // @step:push
        }

        // Dequeue phase — transfer when output stack is empty, then pop
        while (!inputStack.isEmpty() || !outputStack.isEmpty()) {
            if (outputStack.isEmpty()) {
                // Transfer all elements from input stack to output stack
                while (!inputStack.isEmpty()) {
                    int transferredValue = inputStack.pop(); // @step:transfer
                    outputStack.push(transferredValue); // @step:transfer
                }
            }
            int dequeuedValue = outputStack.pop(); // @step:pop
            dequeueResults.add(dequeuedValue); // @step:pop
        }

        return dequeueResults; // @step:complete
    }
}
