public class SearchRotatedArray {
    public static int searchRotatedArray(int[] sortedArray, int targetValue) { // @step:initialize
        int lowIndex = 0; // @step:initialize
        int highIndex = sortedArray.length - 1; // @step:initialize

        while (lowIndex <= highIndex) {
            int midIndex = (lowIndex + highIndex) / 2; // @step:compare
            int midValue = sortedArray[midIndex]; // @step:compare

            if (midValue == targetValue) { // @step:compare,found
                return midIndex; // @step:found
            }

            // Determine which half is sorted
            int lowValue = sortedArray[lowIndex]; // @step:compare
            if (lowValue <= midValue) { // @step:compare
                // Left half is sorted
                if (lowValue <= targetValue && targetValue < midValue) { // @step:eliminate
                    // Target is within the sorted left half
                    highIndex = midIndex - 1; // @step:eliminate
                } else { // @step:eliminate
                    // Target is in the right half
                    lowIndex = midIndex + 1; // @step:eliminate
                }
            } else { // @step:compare
                // Right half is sorted
                int highValue = sortedArray[highIndex];
                if (midValue < targetValue && targetValue <= highValue) { // @step:eliminate
                    // Target is within the sorted right half
                    lowIndex = midIndex + 1; // @step:eliminate
                } else { // @step:eliminate
                    // Target is in the left half
                    highIndex = midIndex - 1; // @step:eliminate
                }
            }
        }

        return -1; // @step:complete
    }
}
