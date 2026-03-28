// Max Consecutive Ones III — O(n) variable sliding window with at most k zero-flips
public class MaxConsecutiveOnes {
    public static int[] maxConsecutiveOnes(int[] inputArray, int maxFlips) {
        if (inputArray.length == 0) { // @step:initialize
            return new int[]{0, 0}; // @step:initialize
        }

        int leftPointer = 0; // @step:initialize
        int zeroCount = 0;
        int maxLength = 0;
        int bestStartIndex = 0;

        // Expand the right boundary of the window
        for (int rightPointer = 0; rightPointer < inputArray.length; rightPointer++) {
            if (inputArray[rightPointer] == 0) {
                zeroCount++; // @step:expand-window
            }

            // Shrink from left when zero count exceeds the allowed flips
            while (zeroCount > maxFlips) { // @step:compare
                if (inputArray[leftPointer] == 0) {
                    zeroCount--; // @step:shrink-window
                }
                leftPointer++; // @step:shrink-window
            }

            int windowLength = rightPointer - leftPointer + 1; // @step:compare
            if (windowLength > maxLength) { // @step:compare
                maxLength = windowLength; // @step:compare
                bestStartIndex = leftPointer; // @step:compare
            }
        }

        return new int[]{maxLength, bestStartIndex}; // @step:complete
    }
}
