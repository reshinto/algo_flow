import java.util.Arrays;

public class BitonicSortNetwork {
    public static int[] bitonicSortNetwork(int[] inputArray) { // @step:initialize
        int[] sortedArray = Arrays.copyOf(inputArray, inputArray.length); // @step:initialize
        int originalLength = sortedArray.length; // @step:initialize

        // Pad to next power of 2 with large sentinel values
        int paddedLength = 1; // @step:initialize
        while (paddedLength < originalLength) { // @step:initialize
            paddedLength *= 2; // @step:initialize
        }
        int[] paddedArray = Arrays.copyOf(sortedArray, paddedLength); // @step:initialize
        for (int fillIndex = originalLength; fillIndex < paddedLength; fillIndex++) { // @step:initialize
            paddedArray[fillIndex] = Integer.MAX_VALUE; // @step:initialize
        }

        // Bitonic sort network: log2(n) stages, each with sub-stages of compare-swap pairs
        for (int stageSize = 2; stageSize <= paddedLength; stageSize *= 2) { // @step:compare
            for (int subSize = stageSize; subSize >= 2; subSize /= 2) { // @step:compare
                int halfSubSize = subSize / 2; // @step:compare
                for (int elementIndex = 0; elementIndex < paddedLength; elementIndex++) { // @step:compare
                    int partnerIndex = elementIndex ^ halfSubSize; // @step:compare
                    if (partnerIndex > elementIndex) { // @step:compare
                        boolean ascending = (elementIndex & stageSize) == 0; // @step:compare
                        if ((ascending && paddedArray[elementIndex] > paddedArray[partnerIndex]) ||
                            (!ascending && paddedArray[elementIndex] < paddedArray[partnerIndex])) {
                            // @step:swap
                            int temporaryValue = paddedArray[elementIndex]; // @step:swap
                            paddedArray[elementIndex] = paddedArray[partnerIndex]; // @step:swap
                            paddedArray[partnerIndex] = temporaryValue; // @step:swap
                        }
                    }
                }
            }
        }

        // Remove padding sentinels
        // @step:mark-sorted
        return Arrays.copyOf(paddedArray, originalLength); // @step:complete
    }
}
