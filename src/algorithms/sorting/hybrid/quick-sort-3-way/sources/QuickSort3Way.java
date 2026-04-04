public class QuickSort3Way {
    public static int[] quickSort3Way(int[] inputArray) { // @step:initialize
        int[] sortedArray = inputArray.clone(); // @step:initialize
        if (sortedArray.length > 1) { // @step:initialize
            partition3Way(sortedArray, 0, sortedArray.length - 1); // @step:initialize
        }
        return sortedArray; // @step:complete
    }

    private static void partition3Way(int[] sortedArray, int low, int high) {
        if (low >= high) return; // @step:partition

        int pivotValue = sortedArray[low]; // @step:partition
        int lessThanPointer = low; // @step:partition
        int greaterThanPointer = high; // @step:partition
        int currentPointer = low; // @step:partition

        // Dutch National Flag partitioning
        while (currentPointer <= greaterThanPointer) { // @step:compare
            if (sortedArray[currentPointer] < pivotValue) { // @step:compare
                int temporaryLt = sortedArray[lessThanPointer]; // @step:swap
                sortedArray[lessThanPointer] = sortedArray[currentPointer]; // @step:swap
                sortedArray[currentPointer] = temporaryLt; // @step:swap
                lessThanPointer++; // @step:swap
                currentPointer++; // @step:swap
            } else if (sortedArray[currentPointer] > pivotValue) { // @step:compare
                int temporaryGt = sortedArray[greaterThanPointer]; // @step:swap
                sortedArray[greaterThanPointer] = sortedArray[currentPointer]; // @step:swap
                sortedArray[currentPointer] = temporaryGt; // @step:swap
                greaterThanPointer--; // @step:swap
                // Do not advance currentPointer — recheck the swapped element
            } else {
                currentPointer++; // @step:compare
            }
        }

        // Elements at [lessThanPointer..greaterThanPointer] equal to pivot — mark as placed
        // @step:pivot-placed

        // Recursively sort the less-than and greater-than partitions
        partition3Way(sortedArray, low, lessThanPointer - 1); // @step:mark-sorted
        partition3Way(sortedArray, greaterThanPointer + 1, high); // @step:mark-sorted
    }
}
