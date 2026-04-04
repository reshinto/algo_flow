import java.util.Arrays;

public class OddEvenMergeSort {
    public static int[] oddEvenMergeSort(int[] inputArray) { // @step:initialize
        int[] sortedArray = Arrays.copyOf(inputArray, inputArray.length); // @step:initialize
        int arrayLength = sortedArray.length; // @step:initialize

        if (arrayLength <= 1) {
            return sortedArray; // @step:complete
        }

        // Batcher's odd-even transposition sort:
        // Alternates between odd-phase and even-phase compare-swap passes
        int totalRounds = (int) Math.ceil(arrayLength / 2.0) * 2; // @step:merge

        for (int roundIndex = 0; roundIndex < totalRounds; roundIndex++) { // @step:compare
            boolean isOddRound = roundIndex % 2 == 0; // @step:compare
            int startIndex = isOddRound ? 0 : 1; // @step:compare

            for (int leftIndex = startIndex; leftIndex + 1 < arrayLength; leftIndex += 2) { // @step:compare
                if (sortedArray[leftIndex] > sortedArray[leftIndex + 1]) { // @step:compare
                    // @step:swap
                    int temporaryValue = sortedArray[leftIndex]; // @step:swap
                    sortedArray[leftIndex] = sortedArray[leftIndex + 1]; // @step:swap
                    sortedArray[leftIndex + 1] = temporaryValue; // @step:swap
                }
            }
        }

        // @step:mark-sorted

        return sortedArray; // @step:complete
    }
}
