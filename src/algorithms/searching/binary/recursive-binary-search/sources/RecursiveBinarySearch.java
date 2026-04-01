public class RecursiveBinarySearch {
    public static int recursiveBinarySearch(int[] sortedArray, int targetValue) { // @step:initialize
        return searchRange(sortedArray, targetValue, 0, sortedArray.length - 1); // @step:initialize
    }

    private static int searchRange(int[] sortedArray, int targetValue, int lowIndex, int highIndex) { // @step:initialize
        if (lowIndex > highIndex) { // @step:complete
            return -1; // @step:complete
        }

        int midIndex = (lowIndex + highIndex) / 2; // @step:compare
        int midValue = sortedArray[midIndex]; // @step:compare

        if (midValue == targetValue) { // @step:compare,found
            return midIndex; // @step:found
        } else if (midValue < targetValue) { // @step:eliminate
            // Target is in the upper half
            return searchRange(sortedArray, targetValue, midIndex + 1, highIndex); // @step:eliminate
        } else { // @step:eliminate
            // Target is in the lower half
            return searchRange(sortedArray, targetValue, lowIndex, midIndex - 1); // @step:eliminate
        }
    }
}
