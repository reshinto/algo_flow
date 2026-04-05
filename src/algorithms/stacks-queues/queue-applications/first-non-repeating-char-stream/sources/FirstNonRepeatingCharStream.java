// First Non-Repeating Char Stream — use a queue as candidate buffer and a frequency map to find the first non-repeating character at each step
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FirstNonRepeatingCharStream {
    public static List<String> firstNonRepeatingCharStream(String inputString) {
        Map<Character, Integer> freqMap = new HashMap<>(); // @step:initialize
        Deque<Character> queue = new ArrayDeque<>(); // @step:initialize
        List<String> results = new ArrayList<>(); // @step:initialize
        for (int charIdx = 0; charIdx < inputString.length(); charIdx++) {
            char currentChar = inputString.charAt(charIdx); // @step:visit
            freqMap.put(currentChar, freqMap.getOrDefault(currentChar, 0) + 1); // @step:visit
            queue.add(currentChar); // @step:enqueue
            // Remove repeated characters from the front of the queue
            while (!queue.isEmpty() && freqMap.get(queue.peek()) > 1) { // @step:dequeue
                queue.poll(); // @step:dequeue
            }
            String answer = queue.isEmpty() ? "#" : String.valueOf(queue.peek()); // @step:peek
            results.add(answer); // @step:peek
        }
        return results; // @step:complete
    }
}
