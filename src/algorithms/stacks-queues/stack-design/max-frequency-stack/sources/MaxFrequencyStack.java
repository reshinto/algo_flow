// Max Frequency Stack — pop the most frequent element using a frequency map and stack-of-stacks
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MaxFrequencyStack {
    public static List<Integer> maxFrequencyStack(int[] values) {
        Map<Integer, Integer> freqMap = new HashMap<>(); // @step:initialize
        Map<Integer, Deque<Integer>> freqStacks = new HashMap<>(); // @step:initialize
        int maxFrequency = 0; // @step:initialize
        List<Integer> popResults = new ArrayList<>(); // @step:initialize

        // Push phase: update frequency map and push each value onto its frequency-level stack
        for (int elementIdx = 0; elementIdx < values.length; elementIdx++) {
            int currentValue = values[elementIdx]; // @step:visit
            int currentFreq = freqMap.getOrDefault(currentValue, 0) + 1; // @step:compare
            freqMap.put(currentValue, currentFreq); // @step:compare
            if (currentFreq > maxFrequency) { // @step:compare
                maxFrequency = currentFreq; // @step:compare
            }
            freqStacks.computeIfAbsent(currentFreq, k -> new ArrayDeque<>()).push(currentValue); // @step:push
        }

        // Pop phase: always pop from the highest-frequency stack
        while (maxFrequency > 0) { // @step:pop
            Deque<Integer> topStack = freqStacks.get(maxFrequency); // @step:pop
            int popped = topStack.pop(); // @step:pop
            freqMap.put(popped, freqMap.get(popped) - 1); // @step:pop
            if (topStack.isEmpty()) { // @step:pop
                maxFrequency--; // @step:pop
            }
            popResults.add(popped); // @step:pop
        }

        return popResults; // @step:complete
    }
}
