public class MergeSort {
    public static int[] mergeSort(int[] inputArray) { // @step:initialize
        int[] sortedArray = inputArray.clone(); // @step:initialize
        int arrayLength = sortedArray.length; // @step:initialize

        mergeSortRecursive(sortedArray, 0, arrayLength); // @step:divide

        return sortedArray; // @step:complete
    }

    private static void mergeSortRecursive(int[] arr, int leftStart, int rightEnd) { // @step:divide
        if (rightEnd - leftStart <= 1) return; // @step:divide

        int midPoint = (leftStart + rightEnd) / 2; // @step:divide

        mergeSortRecursive(arr, leftStart, midPoint); // @step:divide
        mergeSortRecursive(arr, midPoint, rightEnd); // @step:divide

        // Merge the two sorted halves
        int leftSize = midPoint - leftStart; // @step:merge
        int rightSize = rightEnd - midPoint; // @step:merge
        int[] leftHalf = new int[leftSize]; // @step:merge
        int[] rightHalf = new int[rightSize]; // @step:merge

        System.arraycopy(arr, leftStart, leftHalf, 0, leftSize); // @step:merge
        System.arraycopy(arr, midPoint, rightHalf, 0, rightSize); // @step:merge

        int leftIndex = 0; // @step:merge
        int rightIndex = 0; // @step:merge
        int mergePosition = leftStart; // @step:merge

        while (leftIndex < leftSize && rightIndex < rightSize) { // @step:compare
            if (leftHalf[leftIndex] <= rightHalf[rightIndex]) { // @step:compare
                arr[mergePosition] = leftHalf[leftIndex]; // @step:swap
                leftIndex++; // @step:swap
            } else {
                arr[mergePosition] = rightHalf[rightIndex]; // @step:swap
                rightIndex++; // @step:swap
            }
            mergePosition++; // @step:swap
        }

        while (leftIndex < leftSize) { // @step:merge
            arr[mergePosition] = leftHalf[leftIndex]; // @step:merge
            leftIndex++; // @step:merge
            mergePosition++; // @step:merge
        }

        while (rightIndex < rightSize) { // @step:merge
            arr[mergePosition] = rightHalf[rightIndex]; // @step:merge
            rightIndex++; // @step:merge
            mergePosition++; // @step:merge
        }
    }
}
