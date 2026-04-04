public class BinaryInsertionSort {
    public static int[] binaryInsertionSort(int[] inputArray) { // @step:initialize
        int[] sortedArray = inputArray.clone(); // @step:initialize
        int arrayLength = sortedArray.length; // @step:initialize

        for (int outerIndex = 1; outerIndex < arrayLength; outerIndex++) {
            int currentElement = sortedArray[outerIndex]; // @step:binary-search
            int searchLeft = 0; // @step:binary-search
            int searchRight = outerIndex - 1; // @step:binary-search

            // Binary search for the correct insertion position
            while (searchLeft <= searchRight) { // @step:compare
                int midIndex = (searchLeft + searchRight) / 2; // @step:compare
                if (currentElement < sortedArray[midIndex]) { // @step:compare
                    searchRight = midIndex - 1; // @step:compare
                } else {
                    searchLeft = midIndex + 1; // @step:compare
                }
            }

            // Shift elements right to make room for currentElement
            int shiftIndex = outerIndex - 1; // @step:swap
            while (shiftIndex >= searchLeft) { // @step:swap
                sortedArray[shiftIndex + 1] = sortedArray[shiftIndex]; // @step:swap
                shiftIndex--; // @step:swap
            }
            sortedArray[searchLeft] = currentElement; // @step:swap

            // Element is now in its sorted position within the sorted prefix
            // @step:mark-sorted
        }

        return sortedArray; // @step:complete
    }
}
