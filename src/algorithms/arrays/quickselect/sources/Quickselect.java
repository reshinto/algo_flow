// Quickselect — O(n) average via Lomuto partition, recurse only on relevant half
public class Quickselect {
    public static int[] quickselect(int[] inputArray, int targetK) {
        int arrayLength = inputArray.length;

        if (arrayLength == 0 || targetK < 1 || targetK > arrayLength) { // @step:initialize
            return new int[]{-1, -1}; // @step:initialize
        }

        int[] workArray = inputArray.clone(); // @step:initialize
        int targetIndex = targetK - 1; // @step:initialize  (0-based index for kth smallest)

        int kthElement = selectKth(workArray, 0, workArray.length - 1, targetIndex);

        // Find where kth element ended up after partitioning
        int pivotIndex = -1;
        for (int searchIndex = 0; searchIndex < workArray.length; searchIndex++) {
            if (workArray[searchIndex] == kthElement) {
                pivotIndex = searchIndex;
                break;
            }
        }

        return new int[]{kthElement, pivotIndex}; // @step:complete
    }

    private static int lomutoPartition(int[] array, int rangeStart, int rangeEnd) {
        int pivotValue = array[rangeEnd]; // @step:compare
        int boundaryIndex = rangeStart;

        for (int scanIndex = rangeStart; scanIndex < rangeEnd; scanIndex++) {
            if (array[scanIndex] <= pivotValue) { // @step:compare
                int tempValue = array[boundaryIndex]; // @step:swap
                array[boundaryIndex] = array[scanIndex]; // @step:swap
                array[scanIndex] = tempValue; // @step:swap
                boundaryIndex++;
            }
        }

        int tempValue = array[boundaryIndex]; // @step:swap
        array[boundaryIndex] = array[rangeEnd]; // @step:swap
        array[rangeEnd] = tempValue; // @step:swap
        return boundaryIndex;
    }

    private static int selectKth(int[] array, int rangeStart, int rangeEnd, int targetPosition) {
        if (rangeStart == rangeEnd) { // @step:compare
            return array[rangeStart]; // @step:compare
        }

        int pivotFinalIndex = lomutoPartition(array, rangeStart, rangeEnd); // @step:compare

        if (pivotFinalIndex == targetPosition) { // @step:compare
            return array[pivotFinalIndex]; // @step:compare
        } else if (targetPosition < pivotFinalIndex) {
            return selectKth(array, rangeStart, pivotFinalIndex - 1, targetPosition); // @step:compare
        } else {
            return selectKth(array, pivotFinalIndex + 1, rangeEnd, targetPosition); // @step:compare
        }
    }
}
