public class MinRotatedArray {
    public static int minRotatedArray(int[] sortedArray) { // @step:initialize
        int lowIndex = 0; // @step:initialize
        int highIndex = sortedArray.length - 1; // @step:initialize

        while (lowIndex < highIndex) {
            int midIndex = (lowIndex + highIndex) / 2; // @step:compare
            int midValue = sortedArray[midIndex]; // @step:compare
            int highValue = sortedArray[highIndex]; // @step:compare

            if (midValue > highValue) { // @step:compare,eliminate
                // Minimum is in the right half
                lowIndex = midIndex + 1; // @step:eliminate
            } else { // @step:eliminate
                // Minimum is in the left half or at mid
                highIndex = midIndex; // @step:eliminate
            }
        }

        return sortedArray[lowIndex]; // @step:found,complete
    }
}
