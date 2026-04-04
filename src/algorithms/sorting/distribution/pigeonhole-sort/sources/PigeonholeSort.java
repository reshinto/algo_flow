public class PigeonholeSort {
    public static int[] pigeonholeSort(int[] inputArray) { // @step:initialize
        if (inputArray.length == 0) return new int[0]; // @step:initialize
        int[] workingArray = inputArray.clone(); // @step:initialize
        int arrayLength = workingArray.length; // @step:initialize

        int minValue = workingArray[0]; // @step:initialize
        int maxValue = workingArray[0]; // @step:initialize
        for (int scanIndex = 1; scanIndex < arrayLength; scanIndex++) { // @step:initialize
            if (workingArray[scanIndex] < minValue) minValue = workingArray[scanIndex]; // @step:initialize
            if (workingArray[scanIndex] > maxValue) maxValue = workingArray[scanIndex]; // @step:initialize
        }
        int holeCount = maxValue - minValue + 1; // @step:initialize

        // Create one pigeonhole per distinct value in range
        int[] holes = new int[holeCount]; // @step:initialize

        // Place each element into its corresponding pigeonhole
        for (int placeIndex = 0; placeIndex < arrayLength; placeIndex++) { // @step:place
            int holePosition = workingArray[placeIndex] - minValue; // @step:place
            holes[holePosition]++; // @step:place
        }

        // Collect elements back from pigeonholes in ascending order
        int writeIndex = 0; // @step:collect
        for (int holeIndex = 0; holeIndex < holeCount; holeIndex++) { // @step:collect
            while (holes[holeIndex] > 0) { // @step:collect
                workingArray[writeIndex] = holeIndex + minValue; // @step:collect
                writeIndex++; // @step:collect
                holes[holeIndex]--; // @step:collect
            }
        }

        // @step:mark-sorted
        return workingArray; // @step:complete
    }
}
