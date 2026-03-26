public class SlidingWindow {
    public static int[] maxSumSubarray(int[] inputArray, int windowSize) {
        if (inputArray.length == 0 || windowSize <= 0 || windowSize > inputArray.length) {
            return new int[]{0, 0};
        }

        int currentSum = 0;
        for (int initIndex = 0; initIndex < windowSize; initIndex++) {
            currentSum += inputArray[initIndex];
        }

        int maxSum = currentSum;
        int windowStartIndex = 0;

        for (int rightIndex = windowSize; rightIndex < inputArray.length; rightIndex++) {
            currentSum -= inputArray[rightIndex - windowSize];
            currentSum += inputArray[rightIndex];

            if (currentSum > maxSum) {
                maxSum = currentSum;
                windowStartIndex = rightIndex - windowSize + 1;
            }
        }

        return new int[]{maxSum, windowStartIndex};
    }
}
