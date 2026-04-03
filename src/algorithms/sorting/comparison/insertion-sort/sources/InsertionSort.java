public class InsertionSort {
    public static int[] insertionSort(int[] inputArray) { // @step:initialize
        int[] sortedArray = inputArray.clone(); // @step:initialize
        int arrayLength = sortedArray.length; // @step:initialize

        for (int outerIndex = 1; outerIndex < arrayLength; outerIndex++) { // @step:outer-loop
            int currentValue = sortedArray[outerIndex]; // @step:outer-loop
            int innerIndex = outerIndex - 1; // @step:outer-loop

            // Shift elements that are greater than currentValue one position to the right
            while (innerIndex >= 0 && sortedArray[innerIndex] > currentValue) { // @step:compare
                sortedArray[innerIndex + 1] = sortedArray[innerIndex]; // @step:swap
                innerIndex--; // @step:swap
            }

            // Place currentValue in its correct sorted position
            sortedArray[innerIndex + 1] = currentValue; // @step:mark-sorted
        }

        return sortedArray; // @step:complete
    }
}
