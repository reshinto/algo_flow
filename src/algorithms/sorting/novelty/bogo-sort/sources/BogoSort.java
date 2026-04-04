import java.util.Arrays;

public class BogoSort {
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

    private static void shuffleArray(int[] array) { // @step:shuffle
        for (int shuffleIndex = array.length - 1; shuffleIndex > 0; shuffleIndex--) { // @step:shuffle
            int swapTarget = nextRandom() % (shuffleIndex + 1); // @step:shuffle
            int temporaryValue = array[shuffleIndex]; // @step:swap
            array[shuffleIndex] = array[swapTarget]; // @step:swap
            array[swapTarget] = temporaryValue; // @step:swap
        }
    }

    public static int[] bogoSort(int[] inputArray) { // @step:initialize
        int[] sortedArray = Arrays.copyOf(inputArray, inputArray.length); // @step:initialize
        int maxIterations = 100; // @step:initialize
        seed = 42; // @step:initialize — reset seed for determinism

        int iterationCount = 0;
        while (!isSorted(sortedArray) && iterationCount < maxIterations) {
            shuffleArray(sortedArray);
            iterationCount++;
        }

        // @step:mark-sorted

        return sortedArray; // @step:complete
    }
}
