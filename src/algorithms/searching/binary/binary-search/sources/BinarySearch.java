public class BinarySearch {
    public static int binarySearch(int[] sortedArray, int targetValue) { // @step:initialize
        int lowIndex = 0; // @step:initialize
        int highIndex = sortedArray.length - 1; // @step:initialize

        while (lowIndex <= highIndex) {
            int midIndex = (lowIndex + highIndex) / 2; // @step:compare
            int midValue = sortedArray[midIndex]; // @step:compare

            if (midValue == targetValue) { // @step:compare,found
                return midIndex; // @step:found
            } else if (midValue < targetValue) { // @step:eliminate
                // Target is in the upper half
                lowIndex = midIndex + 1; // @step:eliminate
            } else { // @step:eliminate
                // Target is in the lower half
                highIndex = midIndex - 1; // @step:eliminate
            }
        }

        return -1; // @step:complete
    }
}
