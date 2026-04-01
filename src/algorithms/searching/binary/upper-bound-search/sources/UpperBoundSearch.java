public class UpperBoundSearch {
    public static int upperBoundSearch(int[] sortedArray, int targetValue) { // @step:initialize
        int lowIndex = 0; // @step:initialize
        int highIndex = sortedArray.length; // @step:initialize
        int resultIndex = sortedArray.length; // @step:initialize

        while (lowIndex < highIndex) {
            int midIndex = (lowIndex + highIndex) / 2; // @step:compare
            int midValue = sortedArray[midIndex]; // @step:compare

            if (midValue > targetValue) { // @step:compare,found
                // midValue is strictly greater — record as candidate and search left
                resultIndex = midIndex; // @step:found
                highIndex = midIndex; // @step:eliminate
            } else { // @step:eliminate
                // midValue <= target — upper bound must be to the right
                lowIndex = midIndex + 1; // @step:eliminate
            }
        }

        return resultIndex; // @step:complete
    }
}
