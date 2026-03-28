// Merge Two Sorted Arrays — O(n+m) merge using two pointers
public class MergeSortedArrays {
    public static int[] mergeSortedArrays(int[] firstArray, int[] secondArray) {
        int[] merged = new int[firstArray.length + secondArray.length]; // @step:initialize
        int firstPointer = 0; // @step:initialize
        int secondPointer = 0; // @step:initialize
        int mergedIndex = 0; // @step:initialize

        // Compare front elements from each array, place the smaller into result
        while (firstPointer < firstArray.length && secondPointer < secondArray.length) {
            if (firstArray[firstPointer] <= secondArray[secondPointer]) { // @step:compare
                merged[mergedIndex++] = firstArray[firstPointer++]; // @step:visit
            } else {
                merged[mergedIndex++] = secondArray[secondPointer++]; // @step:visit
            }
        }

        // Drain remaining elements from whichever array has leftovers
        while (firstPointer < firstArray.length) {
            merged[mergedIndex++] = firstArray[firstPointer++]; // @step:visit
        }
        while (secondPointer < secondArray.length) {
            merged[mergedIndex++] = secondArray[secondPointer++]; // @step:visit
        }

        return merged; // @step:complete
    }
}
