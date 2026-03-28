// Rotate Array (Reversal Method) — O(n) three-reversal technique with O(1) space
public class RotateArray {
    public static int[] rotateArray(int[] inputArray, int rotateCount) {
        int[] result = inputArray.clone(); // @step:initialize
        int arrayLength = result.length; // @step:initialize

        if (arrayLength == 0) { // @step:initialize
            return result; // @step:initialize
        }

        int effectiveRotation = rotateCount % arrayLength; // @step:initialize

        if (effectiveRotation == 0) { // @step:initialize
            return result; // @step:initialize
        }

        // Phase 1: reverse entire array
        reverseSegment(result, 0, arrayLength - 1); // @step:swap

        // Phase 2: reverse first effectiveRotation elements
        reverseSegment(result, 0, effectiveRotation - 1); // @step:swap

        // Phase 3: reverse remaining elements
        reverseSegment(result, effectiveRotation, arrayLength - 1); // @step:swap

        return result; // @step:complete
    }

    private static void reverseSegment(int[] arr, int leftPointer, int rightPointer) {
        while (leftPointer < rightPointer) {
            int tempValue = arr[leftPointer]; // @step:swap
            arr[leftPointer] = arr[rightPointer]; // @step:swap
            arr[rightPointer] = tempValue; // @step:swap
            leftPointer++; // @step:visit
            rightPointer--; // @step:visit
        }
    }
}
