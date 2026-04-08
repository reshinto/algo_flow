import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class LibrarySort {
    public static int[] librarySort(int[] inputArray) { // @step:initialize
        int arrayLength = inputArray.length; // @step:initialize
        if (arrayLength <= 1) return inputArray.clone(); // @step:initialize

        // Use a gap factor: allocate extra space for gaps between elements
        int gapFactor = 2; // @step:initialize
        int gappedSize = arrayLength * gapFactor + 1; // @step:initialize
        Integer[] gappedArray = new Integer[gappedSize]; // @step:initialize
        int filledCount = 0; // @step:initialize

        // Place the first element at the center of the gapped array
        int centerPosition = gappedSize / 2; // @step:initialize
        gappedArray[centerPosition] = inputArray[0]; // @step:initialize
        filledCount = 1; // @step:initialize

        for (int outerIndex = 1; outerIndex < arrayLength; outerIndex++) {
            int currentElement = inputArray[outerIndex]; // @step:find-position

            // Collect sorted filled values to binary search among them
            List<Integer> filledValues = new ArrayList<>(); // @step:find-position
            List<Integer> filledPositions = new ArrayList<>(); // @step:find-position
            for (int scanIndex = 0; scanIndex < gappedSize; scanIndex++) { // @step:find-position
                if (gappedArray[scanIndex] != null) {
                    filledValues.add(gappedArray[scanIndex]); // @step:find-position
                    filledPositions.add(scanIndex); // @step:find-position
                }
            }

            // Binary search in filled values to find insertion rank
            int searchLeft = 0; // @step:compare
            int searchRight = filledValues.size() - 1; // @step:compare
            int insertRank = filledValues.size(); // @step:compare

            while (searchLeft <= searchRight) { // @step:compare
                int midRank = (searchLeft + searchRight) / 2; // @step:compare
                if (currentElement < filledValues.get(midRank)) { // @step:compare
                    insertRank = midRank; // @step:compare
                    searchRight = midRank - 1; // @step:compare
                } else {
                    searchLeft = midRank + 1; // @step:compare
                }
            }

            // Determine insertion position in the gapped array
            int insertPosition; // @step:swap
            if (insertRank == 0) { // @step:swap
                insertPosition = filledPositions.get(0); // @step:swap
            } else if (insertRank >= filledPositions.size()) {
                insertPosition = filledPositions.get(filledPositions.size() - 1) + 1; // @step:swap
            } else {
                // Insert between rank-1 and rank — pick the position after the rank-1 element
                insertPosition = filledPositions.get(insertRank - 1) + 1; // @step:swap
            }

            // Clamp to valid range
            if (insertPosition >= gappedSize) insertPosition = gappedSize - 1; // @step:swap

            // Find a gap near the insertion position and insert
            int rightSearch = insertPosition; // @step:swap
            while (rightSearch < gappedSize && gappedArray[rightSearch] != null) rightSearch++; // @step:swap

            if (rightSearch < gappedSize) { // @step:swap
                for (int shiftPos = rightSearch; shiftPos > insertPosition; shiftPos--) { // @step:swap
                    gappedArray[shiftPos] = gappedArray[shiftPos - 1]; // @step:swap
                }
                gappedArray[insertPosition] = currentElement; // @step:swap
            } else {
                int leftSearch = insertPosition - 1; // @step:swap
                while (leftSearch >= 0 && gappedArray[leftSearch] != null) leftSearch--; // @step:swap
                if (leftSearch >= 0) {
                    for (int shiftPos = leftSearch; shiftPos < insertPosition - 1; shiftPos++) { // @step:swap
                        gappedArray[shiftPos] = gappedArray[shiftPos + 1]; // @step:swap
                    }
                    gappedArray[insertPosition - 1] = currentElement; // @step:swap
                }
            }
            filledCount++; // @step:swap

            // Rebalance if the array is more than half full
            if (filledCount >= gappedSize / 2) { // @step:rebalance
                Integer[] filled = Arrays.stream(gappedArray) // @step:rebalance
                    .filter(val -> val != null).toArray(Integer[]::new); // @step:rebalance
                Arrays.fill(gappedArray, null); // @step:rebalance
                int spacing = gappedSize / (filled.length + 1); // @step:rebalance
                for (int rebalanceIndex = 0; rebalanceIndex < filled.length; rebalanceIndex++) { // @step:rebalance
                    gappedArray[(rebalanceIndex + 1) * spacing] = filled[rebalanceIndex]; // @step:rebalance
                }
            }

            // @step:mark-sorted
        }

        // Collect the result in order, filtering out nulls
        return Arrays.stream(gappedArray).filter(val -> val != null) // @step:complete
            .mapToInt(Integer::intValue).toArray(); // @step:complete
    }
}
