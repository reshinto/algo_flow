// Moving Average from Data Stream — fixed-size sliding window queue (LeetCode 346)
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

public class MovingAverageFromStream {
    public static List<Double> movingAverageFromStream(int[] values, int windowSize) {
        Deque<Integer> queue = new ArrayDeque<>(); // @step:initialize
        double runningSum = 0; // @step:initialize
        List<Double> averages = new ArrayList<>(); // @step:initialize

        for (int currentValue : values) { // @step:visit
            queue.addLast(currentValue); // @step:enqueue
            runningSum += currentValue; // @step:enqueue

            if (queue.size() > windowSize) { // @step:dequeue
                runningSum -= queue.removeFirst(); // @step:dequeue
            }

            averages.add(runningSum / queue.size()); // @step:complete
        }

        return averages; // @step:complete
    }
}
