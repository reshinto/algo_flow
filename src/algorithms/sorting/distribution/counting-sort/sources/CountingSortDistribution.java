public class CountingSortDistribution {
    public static int[] countingSortDistribution(int[] inputArray) { // @step:initialize
        if (inputArray.length == 0) return new int[0]; // @step:initialize
        int[] workingArray = inputArray.clone(); // @step:initialize
        int arrayLength = workingArray.length; // @step:initialize

        // Find the range of values
        int minValue = workingArray[0]; // @step:initialize
        int maxValue = workingArray[0]; // @step:initialize
        for (int scanIndex = 1; scanIndex < arrayLength; scanIndex++) { // @step:initialize
            if (workingArray[scanIndex] < minValue) minValue = workingArray[scanIndex]; // @step:initialize
            if (workingArray[scanIndex] > maxValue) maxValue = workingArray[scanIndex]; // @step:initialize
        }

        int valueRange = maxValue - minValue + 1; // @step:initialize
        int[] countArray = new int[valueRange]; // @step:initialize

        // Count occurrences of each value
        for (int countIndex = 0; countIndex < arrayLength; countIndex++) { // @step:count
            int bucketPosition = workingArray[countIndex] - minValue; // @step:count
            countArray[bucketPosition]++; // @step:count
        }

        // Place elements back into the array in sorted order
        int writeIndex = 0; // @step:place
        for (int valueIndex = 0; valueIndex < valueRange; valueIndex++) { // @step:place
            while (countArray[valueIndex] > 0) { // @step:place
                workingArray[writeIndex] = valueIndex + minValue; // @step:place
                writeIndex++; // @step:place
                countArray[valueIndex]--; // @step:place
            }
        }

        // @step:mark-sorted
        return workingArray; // @step:complete
    }
}
