public class InterpolationSearch {
    public static int interpolationSearch(int[] sortedArray, int targetValue) { // @step:initialize
        int lowIndex = 0; // @step:initialize
        int highIndex = sortedArray.length - 1; // @step:initialize

        while (lowIndex <= highIndex
                && targetValue >= sortedArray[lowIndex]
                && targetValue <= sortedArray[highIndex]) {
            int lowValue = sortedArray[lowIndex]; // @step:compare
            int highValue = sortedArray[highIndex]; // @step:compare

            // Guard against division by zero when all elements in range are equal
            if (highValue == lowValue) { // @step:compare
                if (lowValue == targetValue) {
                    return lowIndex; // @step:found
                }
                break; // @step:complete
            }

            // Interpolation formula — estimate position based on value distribution
            int positionIndex = lowIndex
                + ((targetValue - lowValue) * (highIndex - lowIndex)) / (highValue - lowValue); // @step:compare

            int positionValue = sortedArray[positionIndex]; // @step:compare

            if (positionValue == targetValue) { // @step:compare,found
                return positionIndex; // @step:found
            } else if (positionValue < targetValue) { // @step:eliminate
                lowIndex = positionIndex + 1; // @step:eliminate
            } else { // @step:eliminate
                highIndex = positionIndex - 1; // @step:eliminate
            }
        }

        return -1; // @step:complete
    }
}
