// Sliding Window — O(n) max-sum subarray by sliding instead of recomputing
public class SlidingWindow {
    public static int[] maxSumSubarray(int[] inputArray, int windowSize) {
        if (inputArray.length == 0 || windowSize <= 0 || windowSize > inputArray.length) { // @step:initialize
            return new int[]{0, 0}; // @step:initialize
        }

        // Compute the sum of the first window as the baseline
        int currentSum = 0; // @step:move-window
        for (int initIndex = 0; initIndex < windowSize; initIndex++) { // @step:move-window
            currentSum += inputArray[initIndex]; // @step:move-window
        }

        int maxSum = currentSum;
        int windowStartIndex = 0;

        // Slide the window: subtract left element, add right element
        for (int rightIndex = windowSize; rightIndex < inputArray.length; rightIndex++) {
            currentSum -= inputArray[rightIndex - windowSize]; // @step:shrink-window
            currentSum += inputArray[rightIndex]; // @step:expand-window

            if (currentSum > maxSum) { // @step:compare
                maxSum = currentSum; // @step:compare
                windowStartIndex = rightIndex - windowSize + 1; // @step:compare
            }
        }

        return new int[]{maxSum, windowStartIndex}; // @step:complete
    }
}
