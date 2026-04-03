public class BeadSort {
    public static int[] beadSort(int[] inputArray) { // @step:initialize
        int[] sourceArray = inputArray.clone(); // @step:initialize
        int arrayLength = sourceArray.length; // @step:initialize

        if (arrayLength <= 1) {
            return sourceArray; // @step:complete
        }

        int minValue = sourceArray[0]; // @step:initialize
        for (int scanIndex = 0; scanIndex < arrayLength; scanIndex++) { // @step:initialize
            if (sourceArray[scanIndex] < minValue) minValue = sourceArray[scanIndex]; // @step:initialize
        }
        int offset = minValue < 0 ? -minValue : 0; // @step:initialize
        int[] shiftedArray = new int[arrayLength]; // @step:initialize
        for (int shiftIndex = 0; shiftIndex < arrayLength; shiftIndex++) { // @step:initialize
            shiftedArray[shiftIndex] = sourceArray[shiftIndex] + offset; // @step:initialize
        }
        int maxValue = shiftedArray[0]; // @step:initialize
        for (int maxScan = 0; maxScan < arrayLength; maxScan++) { // @step:initialize
            if (shiftedArray[maxScan] > maxValue) maxValue = shiftedArray[maxScan]; // @step:initialize
        }

        if (maxValue == 0) {
            return sourceArray; // @step:complete
        }

        // Represent each number as a row of beads on an abacus
        int[][] grid = new int[arrayLength][maxValue]; // @step:initialize
        for (int rowIndex = 0; rowIndex < arrayLength; rowIndex++) { // @step:initialize
            for (int colIndex = 0; colIndex < maxValue; colIndex++) { // @step:initialize
                grid[rowIndex][colIndex] = colIndex < shiftedArray[rowIndex] ? 1 : 0; // @step:initialize
            }
        }

        // Gravity drop — for each column, count beads and stack them at the bottom
        for (int colIndex = 0; colIndex < maxValue; colIndex++) { // @step:drop-beads
            int beadCount = 0; // @step:drop-beads
            for (int rowIndex = 0; rowIndex < arrayLength; rowIndex++) { // @step:drop-beads
                beadCount += grid[rowIndex][colIndex]; // @step:drop-beads
                grid[rowIndex][colIndex] = 0; // @step:drop-beads
            }
            // Stack beads at the bottom of this column (gravity effect)
            for (int rowIndex = arrayLength - beadCount; rowIndex < arrayLength; rowIndex++) { // @step:drop-beads
                grid[rowIndex][colIndex] = 1; // @step:drop-beads
            }
        }

        // Read bead counts from each row — each row's bead count is the sorted value
        for (int rowIndex = 0; rowIndex < arrayLength; rowIndex++) { // @step:mark-sorted
            int rowBeadCount = 0; // @step:mark-sorted
            for (int colIndex = 0; colIndex < maxValue; colIndex++) { // @step:mark-sorted
                rowBeadCount += grid[rowIndex][colIndex]; // @step:mark-sorted
            }
            sourceArray[rowIndex] = rowBeadCount - offset; // @step:mark-sorted
        }

        return sourceArray; // @step:complete
    }
}
