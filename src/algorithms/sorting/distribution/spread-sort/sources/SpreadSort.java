import java.util.ArrayList;
import java.util.List;

public class SpreadSort {
    public static int[] spreadSort(int[] inputArray) { // @step:initialize
        int[] sortedArray = inputArray.clone(); // @step:initialize
        int arrayLength = sortedArray.length; // @step:initialize

        if (arrayLength <= 1) {
            return sortedArray; // @step:complete
        }

        int minValue = sortedArray[0]; // @step:initialize
        int maxValue = sortedArray[0]; // @step:initialize
        for (int scanIndex = 0; scanIndex < arrayLength; scanIndex++) { // @step:initialize
            if (sortedArray[scanIndex] < minValue) minValue = sortedArray[scanIndex]; // @step:initialize
            if (sortedArray[scanIndex] > maxValue) maxValue = sortedArray[scanIndex]; // @step:initialize
        }

        if (minValue == maxValue) {
            return sortedArray; // @step:complete
        }

        int binCount = Math.max(2, (int) Math.ceil(Math.sqrt(arrayLength))); // @step:initialize
        List<List<Integer>> bins = new ArrayList<>(); // @step:initialize
        for (int binInit = 0; binInit < binCount; binInit++) { // @step:initialize
            bins.add(new ArrayList<>()); // @step:initialize
        }
        int valueRange = maxValue - minValue + 1; // @step:initialize

        // Distribute elements into bins based on value
        for (int distributeIndex = 0; distributeIndex < arrayLength; distributeIndex++) { // @step:distribute
            int normalizedOffset = sortedArray[distributeIndex] - minValue; // @step:distribute
            int binIndex = Math.min((int) Math.floor((double) normalizedOffset / valueRange * binCount), binCount - 1); // @step:distribute
            bins.get(binIndex).add(sortedArray[distributeIndex]); // @step:distribute
        }

        // Process each bin — insertion sort for small bins
        int writeIndex = 0; // @step:compare
        for (int binIndex = 0; binIndex < binCount; binIndex++) { // @step:compare
            List<Integer> currentBin = bins.get(binIndex); // @step:compare
            if (currentBin.isEmpty()) continue; // @step:compare

            // Insertion sort within the bin
            for (int outerIndex = 1; outerIndex < currentBin.size(); outerIndex++) { // @step:compare
                int currentValue = currentBin.get(outerIndex); // @step:compare
                int insertPosition = outerIndex - 1; // @step:compare
                while (insertPosition >= 0 && currentBin.get(insertPosition) > currentValue) { // @step:compare
                    currentBin.set(insertPosition + 1, currentBin.get(insertPosition)); // @step:swap
                    insertPosition--; // @step:swap
                }
                currentBin.set(insertPosition + 1, currentValue); // @step:swap
            }

            // Write sorted bin back to the main array
            for (int binValue : currentBin) { // @step:mark-sorted
                sortedArray[writeIndex] = binValue; // @step:mark-sorted
                writeIndex++; // @step:mark-sorted
            }
        }

        return sortedArray; // @step:complete
    }
}
