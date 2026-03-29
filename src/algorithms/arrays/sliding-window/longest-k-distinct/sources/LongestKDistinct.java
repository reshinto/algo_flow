// Longest K-Distinct — O(n) variable sliding window with at-most K distinct elements
import java.util.HashMap;
import java.util.Map;

public class LongestKDistinct {
    public static int[] longestKDistinct(int[] inputArray, int maxDistinct) {
        int arrayLength = inputArray.length;

        if (arrayLength == 0 || maxDistinct <= 0) { // @step:initialize
            return new int[]{0, 0}; // @step:initialize
        }

        Map<Integer, Integer> frequencyMap = new HashMap<>(); // @step:initialize
        int windowStart = 0;
        int maxLength = 0;
        int bestStart = 0;

        for (int windowEnd = 0; windowEnd < arrayLength; windowEnd++) {
            int incomingElement = inputArray[windowEnd]; // @step:expand-window
            frequencyMap.merge(incomingElement, 1, Integer::sum); // @step:expand-window

            // Shrink from the left while distinct count exceeds maxDistinct
            while (frequencyMap.size() > maxDistinct) {
                int outgoingElement = inputArray[windowStart]; // @step:shrink-window
                int outgoingCount = frequencyMap.get(outgoingElement) - 1; // @step:shrink-window
                if (outgoingCount == 0) { // @step:shrink-window
                    frequencyMap.remove(outgoingElement); // @step:shrink-window
                } else {
                    frequencyMap.put(outgoingElement, outgoingCount); // @step:shrink-window
                }
                windowStart++; // @step:shrink-window
            }

            int currentLength = windowEnd - windowStart + 1; // @step:compare
            if (currentLength > maxLength) { // @step:compare
                maxLength = currentLength; // @step:compare
                bestStart = windowStart; // @step:compare
            }
        }

        return new int[]{maxLength, bestStart}; // @step:complete
    }
}
