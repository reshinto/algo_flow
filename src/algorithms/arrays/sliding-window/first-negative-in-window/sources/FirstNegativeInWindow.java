// First Negative in Window — O(n) using a deque to track negative indices
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

public class FirstNegativeInWindow {
    public static int[] firstNegativeInWindow(int[] inputArray, int windowSize) {
        int arrayLength = inputArray.length;

        if (arrayLength == 0 || windowSize <= 0 || windowSize > arrayLength) { // @step:initialize
            return new int[0]; // @step:initialize
        }

        // Deque stores indices of negative numbers in current window
        Deque<Integer> negativeIndices = new ArrayDeque<>(); // @step:initialize
        List<Integer> result = new ArrayList<>();

        // Process first window
        for (int initIndex = 0; initIndex < windowSize; initIndex++) { // @step:move-window
            if (inputArray[initIndex] < 0) { // @step:move-window
                negativeIndices.addLast(initIndex); // @step:move-window
            }
        }

        // Record result for first window
        result.add(negativeIndices.isEmpty() ? 0 : inputArray[negativeIndices.peekFirst()]); // @step:compare

        // Slide window across remaining positions
        for (int rightIndex = windowSize; rightIndex < arrayLength; rightIndex++) {
            int leftIndex = rightIndex - windowSize;

            // Remove indices that are out of current window
            if (!negativeIndices.isEmpty() && negativeIndices.peekFirst() <= leftIndex) { // @step:shrink-window
                negativeIndices.pollFirst(); // @step:shrink-window
            }

            // Add new element if negative
            if (inputArray[rightIndex] < 0) { // @step:expand-window
                negativeIndices.addLast(rightIndex); // @step:expand-window
            }

            // Record first negative in current window (or 0 if none)
            result.add(negativeIndices.isEmpty() ? 0 : inputArray[negativeIndices.peekFirst()]); // @step:compare
        }

        return result.stream().mapToInt(Integer::intValue).toArray(); // @step:complete
    }
}
