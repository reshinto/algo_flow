// Generate Binary Numbers — use a BFS-style queue to produce binary representations of 1 through N
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

public class GenerateBinaryNumbers {
    public static List<String> generateBinaryNumbers(int count) {
        Deque<String> queue = new ArrayDeque<>(); // @step:initialize
        queue.add("1"); // @step:initialize
        List<String> result = new ArrayList<>(); // @step:initialize
        for (int generationIdx = 0; generationIdx < count; generationIdx++) {
            String current = queue.poll(); // @step:dequeue
            result.add(current); // @step:dequeue
            queue.add(current + "0"); // @step:enqueue
            queue.add(current + "1"); // @step:enqueue
        }
        return result; // @step:complete
    }
}
