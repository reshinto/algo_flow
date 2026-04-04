import java.util.Arrays;

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
            int searchLeft = 0; // @step:find-position
            int searchRight = gappedSize - 1; // @step:find-position
            int insertPosition = centerPosition; // @step:find-position

            while (searchLeft <= searchRight) { // @step:compare
                int midPosition = (searchLeft + searchRight) / 2; // @step:compare
                Integer midValue = gappedArray[midPosition]; // @step:compare
                if (midValue == null) { // @step:compare
                    int leftScan = midPosition - 1; // @step:compare
                    while (leftScan >= searchLeft && gappedArray[leftScan] == null) leftScan--; // @step:compare
                    if (leftScan < searchLeft || gappedArray[leftScan] == null) { // @step:compare
                        searchLeft = midPosition + 1; // @step:compare
                    } else if (currentElement <= gappedArray[leftScan]) { // @step:compare
                        searchRight = leftScan; // @step:compare
                        insertPosition = leftScan; // @step:compare
                    } else {
                        searchLeft = midPosition + 1; // @step:compare
                        insertPosition = midPosition; // @step:compare
                    }
                } else if (currentElement < midValue) { // @step:compare
                    searchRight = midPosition - 1; // @step:compare
                    insertPosition = midPosition; // @step:compare
                } else {
                    searchLeft = midPosition + 1; // @step:compare
                    insertPosition = midPosition; // @step:compare
                }
            }

            // Find a gap near the insertion position and insert
            int gapPosition = insertPosition; // @step:swap
            int rightSearch = insertPosition; // @step:swap
            while (rightSearch < gappedSize && gappedArray[rightSearch] != null) rightSearch++; // @step:swap

            if (rightSearch < gappedSize) { // @step:swap
                for (int shiftPos = rightSearch; shiftPos > insertPosition; shiftPos--) { // @step:swap
                    gappedArray[shiftPos] = gappedArray[shiftPos - 1]; // @step:swap
                }
                gapPosition = insertPosition; // @step:swap
            } else {
                int leftSearch = insertPosition; // @step:swap
                while (leftSearch >= 0 && gappedArray[leftSearch] != null) leftSearch--; // @step:swap
                for (int shiftPos = leftSearch; shiftPos < insertPosition; shiftPos++) { // @step:swap
                    gappedArray[shiftPos] = gappedArray[shiftPos + 1]; // @step:swap
                }
                gapPosition = insertPosition - 1; // @step:swap
            }
            gappedArray[gapPosition] = currentElement; // @step:swap
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
