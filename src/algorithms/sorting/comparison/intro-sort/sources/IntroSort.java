public class IntroSort {
    private static final int INSERTION_SORT_THRESHOLD = 16;

    private static void insertionSortSlice(int[] sortedArray, int sliceStart, int sliceEnd) { // @step:insertion-pass
        for (int outerIndex = sliceStart + 1; outerIndex <= sliceEnd; outerIndex++) { // @step:insertion-pass
            int currentValue = sortedArray[outerIndex]; // @step:insertion-pass
            int innerIndex = outerIndex - 1; // @step:insertion-pass

            while (innerIndex >= sliceStart && sortedArray[innerIndex] > currentValue) { // @step:compare
                sortedArray[innerIndex + 1] = sortedArray[innerIndex]; // @step:swap
                innerIndex--; // @step:swap
            }
            sortedArray[innerIndex + 1] = currentValue; // @step:swap
        }
    }

    private static void heapify(int[] sortedArray, int heapSize, int rootIndex) { // @step:heapify
        int largestIndex = rootIndex; // @step:heapify
        int leftChild = 2 * rootIndex + 1; // @step:heapify
        int rightChild = 2 * rootIndex + 2; // @step:heapify

        if (leftChild < heapSize && sortedArray[leftChild] > sortedArray[largestIndex]) { // @step:compare
            largestIndex = leftChild; // @step:heapify
        }
        if (rightChild < heapSize && sortedArray[rightChild] > sortedArray[largestIndex]) { // @step:compare
            largestIndex = rightChild; // @step:heapify
        }

        if (largestIndex != rootIndex) { // @step:swap
            int temporaryValue = sortedArray[rootIndex]; // @step:swap
            sortedArray[rootIndex] = sortedArray[largestIndex]; // @step:swap
            sortedArray[largestIndex] = temporaryValue; // @step:swap
            heapify(sortedArray, heapSize, largestIndex); // @step:heapify
        }
    }

    private static void heapSort(int[] sortedArray, int sliceStart, int sliceEnd) { // @step:heapify
        int sliceLength = sliceEnd - sliceStart + 1; // @step:heapify

        for (int buildIndex = sliceLength / 2 - 1; buildIndex >= 0; buildIndex--) { // @step:heapify
            heapify(sortedArray, sliceLength, buildIndex); // @step:heapify
        }

        for (int extractIndex = sliceLength - 1; extractIndex > 0; extractIndex--) { // @step:swap
            int temporaryValue = sortedArray[sliceStart]; // @step:swap
            sortedArray[sliceStart] = sortedArray[sliceStart + extractIndex]; // @step:swap
            sortedArray[sliceStart + extractIndex] = temporaryValue; // @step:swap
            heapify(sortedArray, extractIndex, 0); // @step:heapify
        }
    }

    private static int lomutoPartition(int[] sortedArray, int partitionStart, int partitionEnd) { // @step:partition
        int pivotValue = sortedArray[partitionEnd]; // @step:partition
        int partitionIndex = partitionStart - 1; // @step:partition

        for (int scanIndex = partitionStart; scanIndex < partitionEnd; scanIndex++) { // @step:compare
            if (sortedArray[scanIndex] <= pivotValue) { // @step:compare
                partitionIndex++; // @step:swap
                int temporaryValue = sortedArray[partitionIndex]; // @step:swap
                sortedArray[partitionIndex] = sortedArray[scanIndex]; // @step:swap
                sortedArray[scanIndex] = temporaryValue; // @step:swap
            }
        }

        int temporaryValue = sortedArray[partitionIndex + 1]; // @step:swap
        sortedArray[partitionIndex + 1] = sortedArray[partitionEnd]; // @step:swap
        sortedArray[partitionEnd] = temporaryValue; // @step:swap
        return partitionIndex + 1; // @step:partition
    }

    private static void introSortRecurse(
        int[] sortedArray, int rangeStart, int rangeEnd, int depthLimit
    ) {
        int rangeSize = rangeEnd - rangeStart + 1;

        if (rangeSize <= INSERTION_SORT_THRESHOLD) { // @step:insertion-pass
            insertionSortSlice(sortedArray, rangeStart, rangeEnd); // @step:insertion-pass
            return;
        }

        if (depthLimit == 0) { // @step:heapify
            heapSort(sortedArray, rangeStart, rangeEnd); // @step:heapify
            return;
        }

        int pivotIndex = lomutoPartition(sortedArray, rangeStart, rangeEnd); // @step:partition
        introSortRecurse(sortedArray, rangeStart, pivotIndex - 1, depthLimit - 1); // @step:partition
        introSortRecurse(sortedArray, pivotIndex + 1, rangeEnd, depthLimit - 1); // @step:partition
    }

    public static int[] introSort(int[] inputArray) { // @step:initialize
        int[] sortedArray = inputArray.clone(); // @step:initialize
        int arrayLength = sortedArray.length; // @step:initialize

        if (arrayLength <= 1) { // @step:initialize
            return sortedArray; // @step:complete
        }

        int depthLimit = 2 * (int) (Math.log(arrayLength) / Math.log(2)); // @step:initialize
        introSortRecurse(sortedArray, 0, arrayLength - 1, depthLimit); // @step:partition

        // @step:mark-sorted
        return sortedArray; // @step:complete
    }
}
