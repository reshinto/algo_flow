public class QuickSort {
    public static int[] quickSortLomuto(int[] inputArray) { // @step:initialize
        int[] sortedArray = inputArray.clone(); // @step:initialize
        int arrayLength = sortedArray.length; // @step:initialize

        quickSortRecursive(sortedArray, 0, arrayLength - 1); // @step:partition

        return sortedArray; // @step:complete
    }

    private static int partition(int[] arr, int lowIndex, int highIndex) { // @step:partition
        int pivotValue = arr[highIndex]; // @step:partition
        int partitionIndex = lowIndex - 1; // @step:partition

        for (int scanIndex = lowIndex; scanIndex < highIndex; scanIndex++) { // @step:compare
            if (arr[scanIndex] <= pivotValue) { // @step:compare
                partitionIndex++; // @step:swap
                int temporaryValue = arr[partitionIndex]; // @step:swap
                arr[partitionIndex] = arr[scanIndex]; // @step:swap
                arr[scanIndex] = temporaryValue; // @step:swap
            }
        }

        // Place pivot in its final sorted position
        int temporaryValue = arr[partitionIndex + 1]; // @step:pivot-placed
        arr[partitionIndex + 1] = arr[highIndex]; // @step:pivot-placed
        arr[highIndex] = temporaryValue; // @step:pivot-placed

        return partitionIndex + 1; // @step:pivot-placed
    }

    private static void quickSortRecursive(int[] arr, int lowIndex, int highIndex) { // @step:partition
        if (lowIndex >= highIndex) return; // @step:partition

        int pivotFinalIndex = partition(arr, lowIndex, highIndex); // @step:pivot-placed

        quickSortRecursive(arr, lowIndex, pivotFinalIndex - 1); // @step:partition
        quickSortRecursive(arr, pivotFinalIndex + 1, highIndex); // @step:partition
    }
}
