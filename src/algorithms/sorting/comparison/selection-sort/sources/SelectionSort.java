public class SelectionSort {
    public static int[] selectionSort(int[] inputArray) { // @step:initialize
        int[] sortedArray = inputArray.clone(); // @step:initialize
        int arrayLength = sortedArray.length; // @step:initialize

        for (int outerIndex = 0; outerIndex < arrayLength - 1; outerIndex++) { // @step:outer-loop
            int minimumIndex = outerIndex; // @step:outer-loop

            // Scan the unsorted portion for the minimum element
            for (int innerIndex = outerIndex + 1; innerIndex < arrayLength; innerIndex++) { // @step:compare
                if (sortedArray[innerIndex] < sortedArray[minimumIndex]) { // @step:compare
                    minimumIndex = innerIndex; // @step:compare
                }
            }

            // Swap the minimum into position if it is not already there
            if (minimumIndex != outerIndex) { // @step:swap
                int temporaryValue = sortedArray[outerIndex]; // @step:swap
                sortedArray[outerIndex] = sortedArray[minimumIndex]; // @step:swap
                sortedArray[minimumIndex] = temporaryValue; // @step:swap
            }

            // The element at outerIndex is now permanently in its sorted position
            // @step:mark-sorted
        }

        return sortedArray; // @step:complete
    }
}
