// Max Product Subarray — O(n) tracking both max and min products to handle negative flips
public class MaxProductSubarray {
    public static int[] maxProductSubarray(int[] inputArray) {
        int arrayLength = inputArray.length;

        if (arrayLength == 0) { // @step:initialize
            return new int[]{0, 0, 0}; // @step:initialize
        }

        int currentMax = inputArray[0]; // @step:initialize
        int currentMin = inputArray[0]; // @step:initialize
        int globalMax = inputArray[0]; // @step:initialize
        int currentStart = 0;
        int bestStart = 0;
        int bestEnd = 0;

        for (int scanIndex = 1; scanIndex < arrayLength; scanIndex++) {
            int currentElement = inputArray[scanIndex]; // @step:compare

            // When multiplying by a negative, max and min swap roles
            if (currentElement < 0) { // @step:compare
                int tempMax = currentMax; // @step:compare
                currentMax = currentMin; // @step:compare
                currentMin = tempMax; // @step:compare
            }

            // Extend or restart the subarray
            currentMax = Math.max(currentElement, currentMax * currentElement); // @step:compare
            currentMin = Math.min(currentElement, currentMin * currentElement); // @step:compare

            if (currentMax == currentElement) { // @step:compare
                currentStart = scanIndex; // @step:compare
            }

            if (currentMax > globalMax) { // @step:compare
                globalMax = currentMax; // @step:compare
                bestStart = currentStart; // @step:compare
                bestEnd = scanIndex; // @step:compare
            }
        }

        return new int[]{globalMax, bestStart, bestEnd}; // @step:complete
    }
}
