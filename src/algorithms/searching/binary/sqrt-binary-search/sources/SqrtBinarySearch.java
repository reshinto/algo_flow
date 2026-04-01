public class SqrtBinarySearch {
    public static int sqrtBinarySearch(int targetValue) { // @step:initialize
        if (targetValue < 2) return targetValue; // @step:initialize
        int lowIndex = 1; // @step:initialize
        int highIndex = targetValue / 2; // @step:initialize
        int resultIndex = 0; // @step:initialize

        while (lowIndex <= highIndex) {
            int midIndex = (lowIndex + highIndex) / 2; // @step:compare
            long midSquared = (long) midIndex * midIndex; // @step:compare

            if (midSquared == targetValue) { // @step:compare,found
                return midIndex; // @step:found
            } else if (midSquared < targetValue) { // @step:eliminate
                // midIndex is a candidate floor — search for a larger value
                resultIndex = midIndex; // @step:eliminate
                lowIndex = midIndex + 1; // @step:eliminate
            } else { // @step:eliminate
                // midIndex is too large — search left
                highIndex = midIndex - 1; // @step:eliminate
            }
        }

        return resultIndex; // @step:complete
    }
}
