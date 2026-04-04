public class TimSort {
    private static final int MIN_RUN_SIZE = 4;

    private static void insertionSortRun(int[] sortedArray, int runStart, int runEnd) { // @step:insertion-pass
        for (int outerIndex = runStart + 1; outerIndex <= runEnd; outerIndex++) { // @step:insertion-pass
            int currentValue = sortedArray[outerIndex]; // @step:insertion-pass
            int innerIndex = outerIndex - 1; // @step:insertion-pass

            while (innerIndex >= runStart && sortedArray[innerIndex] > currentValue) { // @step:compare
                sortedArray[innerIndex + 1] = sortedArray[innerIndex]; // @step:swap
                innerIndex--; // @step:swap
            }
            sortedArray[innerIndex + 1] = currentValue; // @step:swap
        }
    }

    private static void mergeRuns(int[] sortedArray, int leftStart, int midPoint, int rightEnd) { // @step:merge
        int leftSize = midPoint - leftStart + 1; // @step:merge
        int rightSize = rightEnd - midPoint; // @step:merge
        int[] leftSlice = new int[leftSize]; // @step:merge
        int[] rightSlice = new int[rightSize]; // @step:merge

        System.arraycopy(sortedArray, leftStart, leftSlice, 0, leftSize); // @step:merge
        System.arraycopy(sortedArray, midPoint + 1, rightSlice, 0, rightSize); // @step:merge

        int leftPointer = 0; // @step:merge
        int rightPointer = 0; // @step:merge
        int mergeIndex = leftStart; // @step:merge

        while (leftPointer < leftSize && rightPointer < rightSize) { // @step:compare
            if (leftSlice[leftPointer] <= rightSlice[rightPointer]) { // @step:compare
                sortedArray[mergeIndex] = leftSlice[leftPointer]; // @step:merge
                leftPointer++; // @step:merge
            } else {
                sortedArray[mergeIndex] = rightSlice[rightPointer]; // @step:merge
                rightPointer++; // @step:merge
            }
            mergeIndex++; // @step:merge
        }

        while (leftPointer < leftSize) {
            sortedArray[mergeIndex++] = leftSlice[leftPointer++]; // @step:merge
        }
        while (rightPointer < rightSize) {
            sortedArray[mergeIndex++] = rightSlice[rightPointer++]; // @step:merge
        }
    }

    public static int[] timSort(int[] inputArray) { // @step:initialize
        int[] sortedArray = inputArray.clone(); // @step:initialize
        int arrayLength = sortedArray.length; // @step:initialize

        // Sort individual runs using insertion sort
        for (int runStart = 0; runStart < arrayLength; runStart += MIN_RUN_SIZE) { // @step:insertion-pass
            int runEnd = Math.min(runStart + MIN_RUN_SIZE - 1, arrayLength - 1); // @step:insertion-pass
            insertionSortRun(sortedArray, runStart, runEnd); // @step:insertion-pass
        }

        // Merge sorted runs in increasing size
        for (int mergeSize = MIN_RUN_SIZE; mergeSize < arrayLength; mergeSize *= 2) { // @step:merge
            for (int leftStart = 0; leftStart < arrayLength; leftStart += 2 * mergeSize) { // @step:merge
                int midPoint = Math.min(leftStart + mergeSize - 1, arrayLength - 1); // @step:merge
                int rightEnd = Math.min(leftStart + 2 * mergeSize - 1, arrayLength - 1); // @step:merge

                if (midPoint < rightEnd) { // @step:merge
                    mergeRuns(sortedArray, leftStart, midPoint, rightEnd); // @step:merge
                }
            }
        }

        // @step:mark-sorted
        return sortedArray; // @step:complete
    }
}
