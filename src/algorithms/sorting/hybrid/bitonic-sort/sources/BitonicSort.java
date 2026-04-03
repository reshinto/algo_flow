import java.util.Arrays;

public class BitonicSort {
    public static int[] bitonicSort(int[] inputArray) { // @step:initialize
        int arrayLength = inputArray.length; // @step:initialize
        if (arrayLength <= 1) return inputArray.clone(); // @step:initialize

        // Pad to the next power of 2 with Integer.MAX_VALUE so real elements sort first
        int paddedLength = 1; // @step:initialize
        while (paddedLength < arrayLength) paddedLength <<= 1; // @step:initialize
        int[] sortedArray = Arrays.copyOf(inputArray, paddedLength); // @step:initialize
        Arrays.fill(sortedArray, arrayLength, paddedLength, Integer.MAX_VALUE); // @step:initialize

        // Bitonic sort network
        for (int stage = 2; stage <= paddedLength; stage <<= 1) { // @step:compare
            for (int step = stage >> 1; step > 0; step >>= 1) { // @step:compare
                for (int elementIndex = 0; elementIndex < paddedLength; elementIndex++) { // @step:compare
                    int partnerIndex = elementIndex ^ step; // @step:compare

                    if (partnerIndex > elementIndex) { // @step:compare
                        boolean isAscending = (elementIndex & stage) == 0; // @step:compare

                        if (isAscending && sortedArray[elementIndex] > sortedArray[partnerIndex]) { // @step:swap
                            int temporaryValue = sortedArray[elementIndex]; // @step:swap
                            sortedArray[elementIndex] = sortedArray[partnerIndex]; // @step:swap
                            sortedArray[partnerIndex] = temporaryValue; // @step:swap
                        } else if (!isAscending && sortedArray[elementIndex] < sortedArray[partnerIndex]) { // @step:swap
                            int temporaryValue = sortedArray[elementIndex]; // @step:swap
                            sortedArray[elementIndex] = sortedArray[partnerIndex]; // @step:swap
                            sortedArray[partnerIndex] = temporaryValue; // @step:swap
                        }
                    }
                }
            }
        }

        // @step:mark-sorted
        return Arrays.copyOf(sortedArray, arrayLength); // @step:complete
    }
}
