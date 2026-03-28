// Min Size Subarray Sum — O(n) variable sliding window to find shortest subarray with sum >= target
public class MinSizeSubarraySum {
    public static int[] minSizeSubarraySum(int[] inputArray, int target) {
        if (inputArray.length == 0 || target <= 0) { // @step:initialize
            return new int[]{0, 0}; // @step:initialize
        }

        int leftPointer = 0; // @step:initialize
        int currentSum = 0;
        int minLength = Integer.MAX_VALUE;
        int bestStartIndex = 0;

        // Expand the right boundary of the window
        for (int rightPointer = 0; rightPointer < inputArray.length; rightPointer++) {
            currentSum += inputArray[rightPointer]; // @step:expand-window

            // Shrink from the left while the sum constraint is satisfied
            while (currentSum >= target) { // @step:compare
                int windowLength = rightPointer - leftPointer + 1; // @step:compare
                if (windowLength < minLength) { // @step:compare
                    minLength = windowLength; // @step:compare
                    bestStartIndex = leftPointer; // @step:compare
                }
                currentSum -= inputArray[leftPointer]; // @step:shrink-window
                leftPointer++; // @step:shrink-window
            }
        }

        if (minLength == Integer.MAX_VALUE) {
            return new int[]{0, 0}; // @step:complete
        }
        return new int[]{minLength, bestStartIndex}; // @step:complete
    }
}
