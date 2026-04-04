import java.util.Arrays;

public class BozoSort {
    private static int seed = 42;

    private static int nextRandom() {
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        return seed;
    }

    private static boolean isSorted(int[] array) { // @step:check-sorted
        for (int checkIndex = 0; checkIndex + 1 < array.length; checkIndex++) { // @step:compare
            if (array[checkIndex] > array[checkIndex + 1]) { // @step:compare
                return false; // @step:compare
            }
        }
        return true; // @step:check-sorted
    }

    public static int[] bozoSort(int[] inputArray) { // @step:initialize
        int[] sortedArray = Arrays.copyOf(inputArray, inputArray.length); // @step:initialize
        int arrayLength = sortedArray.length; // @step:initialize
        int maxIterations = 200; // @step:initialize
        seed = 42; // @step:initialize — reset seed for determinism

        int iterationCount = 0;
        while (!isSorted(sortedArray) && iterationCount < maxIterations) {
            // Pick two random distinct indices and swap them
            int firstSwapIndex = nextRandom() % arrayLength; // @step:swap
            int secondSwapIndex = nextRandom() % arrayLength; // @step:swap

            if (firstSwapIndex != secondSwapIndex) { // @step:swap
                int temporaryValue = sortedArray[firstSwapIndex]; // @step:swap
                sortedArray[firstSwapIndex] = sortedArray[secondSwapIndex]; // @step:swap
                sortedArray[secondSwapIndex] = temporaryValue; // @step:swap
            }

            iterationCount++;
        }

        return sortedArray; // @step:complete
    }
}
