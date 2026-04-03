public class DualPivotQuickSort {
    public static int[] dualPivotQuickSort(int[] inputArray) { // @step:initialize
        int[] sortedArray = inputArray.clone(); // @step:initialize
        if (sortedArray.length > 1) { // @step:initialize
            partition(sortedArray, 0, sortedArray.length - 1); // @step:initialize
        }
        return sortedArray; // @step:complete
    }

    private static void partition(int[] sortedArray, int low, int high) {
        if (low >= high) return; // @step:partition

        // Ensure pivot1 <= pivot2
        if (sortedArray[low] > sortedArray[high]) { // @step:partition
            int temporaryPivot = sortedArray[low]; // @step:partition
            sortedArray[low] = sortedArray[high]; // @step:partition
            sortedArray[high] = temporaryPivot; // @step:partition
        }

        int pivot1 = sortedArray[low]; // @step:partition
        int pivot2 = sortedArray[high]; // @step:partition

        int lessThanPointer = low + 1; // @step:partition
        int greaterThanPointer = high - 1; // @step:partition
        int currentPointer = low + 1; // @step:partition

        while (currentPointer <= greaterThanPointer) { // @step:compare
            if (sortedArray[currentPointer] < pivot1) { // @step:compare
                int temporaryLt = sortedArray[lessThanPointer]; // @step:swap
                sortedArray[lessThanPointer] = sortedArray[currentPointer]; // @step:swap
                sortedArray[currentPointer] = temporaryLt; // @step:swap
                lessThanPointer++; // @step:swap
                currentPointer++; // @step:swap
            } else if (sortedArray[currentPointer] > pivot2) { // @step:compare
                while (greaterThanPointer > currentPointer && sortedArray[greaterThanPointer] > pivot2) { // @step:compare
                    greaterThanPointer--; // @step:compare
                }
                int temporaryGt = sortedArray[greaterThanPointer]; // @step:swap
                sortedArray[greaterThanPointer] = sortedArray[currentPointer]; // @step:swap
                sortedArray[currentPointer] = temporaryGt; // @step:swap
                greaterThanPointer--; // @step:swap
            } else {
                currentPointer++; // @step:compare
            }
        }

        // Place pivot1 and pivot2 in their final positions
        lessThanPointer--; // @step:pivot-placed
        greaterThanPointer++; // @step:pivot-placed
        int temporaryP1 = sortedArray[low]; // @step:pivot-placed
        sortedArray[low] = sortedArray[lessThanPointer]; // @step:pivot-placed
        sortedArray[lessThanPointer] = temporaryP1; // @step:pivot-placed
        int temporaryP2 = sortedArray[high]; // @step:pivot-placed
        sortedArray[high] = sortedArray[greaterThanPointer]; // @step:pivot-placed
        sortedArray[greaterThanPointer] = temporaryP2; // @step:pivot-placed

        // Both pivots are now at their final sorted positions
        // @step:mark-sorted

        // Recursively sort three partitions
        partition(sortedArray, low, lessThanPointer - 1); // @step:mark-sorted
        partition(sortedArray, lessThanPointer + 1, greaterThanPointer - 1); // @step:mark-sorted
        partition(sortedArray, greaterThanPointer + 1, high); // @step:mark-sorted
    }
}
