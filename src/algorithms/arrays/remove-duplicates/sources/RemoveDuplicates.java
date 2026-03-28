// Remove Duplicates from Sorted Array — O(n) two-pointer: write pointer tracks unique boundary
public class RemoveDuplicates {
    public static int[] removeDuplicates(int[] sortedArray) {
        if (sortedArray.length == 0) { // @step:initialize
            return new int[]{0}; // @step:initialize
        }

        int[] result = sortedArray.clone();
        int writePointer = 0; // @step:initialize

        for (int readPointer = 1; readPointer < result.length; readPointer++) {
            if (result[readPointer] != result[writePointer]) { // @step:compare
                writePointer++; // @step:swap
                result[writePointer] = result[readPointer]; // @step:swap
            }
        }

        int uniqueCount = writePointer + 1;
        int[] uniqueResult = new int[uniqueCount + 1];
        uniqueResult[0] = uniqueCount;
        for (int copyIndex = 0; copyIndex < uniqueCount; copyIndex++) {
            uniqueResult[copyIndex + 1] = result[copyIndex]; // @step:complete
        }
        return uniqueResult; // @step:complete
    }
}
