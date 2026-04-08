// Count Anagram Windows — O(n) sliding window with frequency map comparison
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CountAnagramWindows {
    public static int[] countAnagramWindows(int[] text, int[] pattern) {
        int patternLength = pattern.length;
        int textLength = text.length;

        if (patternLength == 0 || patternLength > textLength) { // @step:initialize
            return new int[0]; // @step:initialize
        }

        Map<Integer, Integer> patternFrequency = new HashMap<>(); // @step:initialize
        Map<Integer, Integer> windowFrequency = new HashMap<>(); // @step:initialize
        List<Integer> positions = new ArrayList<>();

        // Build pattern frequency map
        for (int patternElement : pattern) { // @step:initialize
            patternFrequency.merge(patternElement, 1, Integer::sum); // @step:initialize
        }

        // Build initial window frequency map
        for (int initIndex = 0; initIndex < patternLength; initIndex++) { // @step:move-window
            int currentElement = text[initIndex]; // @step:move-window
            windowFrequency.merge(currentElement, 1, Integer::sum); // @step:move-window
        }

        // Check first window
        if (patternFrequency.equals(windowFrequency)) { // @step:compare
            positions.add(0); // @step:compare
        }

        // Slide window across remaining positions
        for (int rightIndex = patternLength; rightIndex < textLength; rightIndex++) {
            int leftIndex = rightIndex - patternLength;
            int outgoingElement = text[leftIndex]; // @step:shrink-window
            int incomingElement = text[rightIndex]; // @step:expand-window

            // Remove outgoing element from window
            int outgoingCount = windowFrequency.get(outgoingElement) - 1; // @step:shrink-window
            if (outgoingCount == 0) { // @step:shrink-window
                windowFrequency.remove(outgoingElement); // @step:shrink-window
            } else {
                windowFrequency.put(outgoingElement, outgoingCount); // @step:shrink-window
            }

            // Add incoming element to window
            windowFrequency.merge(incomingElement, 1, Integer::sum); // @step:expand-window

            if (patternFrequency.equals(windowFrequency)) { // @step:compare
                positions.add(leftIndex + 1); // @step:compare
            }
        }

        return positions.stream().mapToInt(Integer::intValue).toArray(); // @step:complete
    }
}
