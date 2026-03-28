// Sliding Window Min Sum — O(n) minimum-sum subarray of fixed size
public class SlidingWindowMinSum {
    public static int[] minSumSubarray(int[] inputArray, int windowSize) {
        if (inputArray.length == 0 || windowSize <= 0 || windowSize > inputArray.length) { // @step:initialize
            return new int[]{0, 0}; // @step:initialize
        }

        // Compute the sum of the first window as the baseline
        int currentSum = 0; // @step:move-window
        for (int initIndex = 0; initIndex < windowSize; initIndex++) { // @step:move-window
            currentSum += inputArray[initIndex]; // @step:move-window
        }

        int minSum = currentSum;
        int windowStartIndex = 0;

        // Slide the window: subtract left element, add right element
        for (int rightIndex = windowSize; rightIndex < inputArray.length; rightIndex++) {
            currentSum -= inputArray[rightIndex - windowSize]; // @step:shrink-window
            currentSum += inputArray[rightIndex]; // @step:expand-window

            if (currentSum < minSum) { // @step:compare
                minSum = currentSum; // @step:compare
                windowStartIndex = rightIndex - windowSize + 1; // @step:compare
            }
        }

        return new int[]{minSum, windowStartIndex}; // @step:complete
    }
}
