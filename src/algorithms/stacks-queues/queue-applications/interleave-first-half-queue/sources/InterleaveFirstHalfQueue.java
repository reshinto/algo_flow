// Interleave First Half Queue — interleave the first half of a queue with the second half using a stack
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

public class InterleaveFirstHalfQueue {
    public static List<Integer> interleaveFirstHalfQueue(int[] values) {
        Deque<Integer> queue = new ArrayDeque<>(); // @step:initialize
        for (int value : values) queue.add(value); // @step:initialize
        int halfSize = values.length / 2; // @step:initialize
        Deque<Integer> stack = new ArrayDeque<>(); // @step:initialize

        // Step 1: Dequeue first half into stack
        for (int fillIdx = 0; fillIdx < halfSize; fillIdx++) {
            stack.push(queue.poll()); // @step:push
        }

        // Step 2: Enqueue stack elements back to queue (reverses first half)
        while (!stack.isEmpty()) {
            queue.add(stack.pop()); // @step:enqueue
        }

        // Step 3: Dequeue second half and enqueue back (move original second half to rear)
        for (int rotateIdx = 0; rotateIdx < halfSize; rotateIdx++) {
            queue.add(queue.poll()); // @step:transfer
        }

        // Step 4: Dequeue first half (now at front) into stack
        for (int refillIdx = 0; refillIdx < halfSize; refillIdx++) {
            stack.push(queue.poll()); // @step:push
        }

        // Step 5: Interleave — alternately pop from stack and dequeue from queue
        List<Integer> result = new ArrayList<>(); // @step:initialize
        while (!stack.isEmpty()) {
            result.add(stack.pop()); // @step:pop
            result.add(queue.poll()); // @step:dequeue
        }
        if (!queue.isEmpty()) {
            result.add(queue.poll()); // @step:dequeue
        }

        return result; // @step:complete
    }
}
