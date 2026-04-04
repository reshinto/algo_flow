import java.util.Arrays;

public class PairwiseSortingNetwork {
    private static int[] networkArray;
    private static int networkLength;

    private static void compareAndSwap(int firstIndex, int secondIndex) {
        if (firstIndex < networkLength && secondIndex < networkLength) {
            if (networkArray[firstIndex] > networkArray[secondIndex]) {
                // @step:swap
                int temporaryValue = networkArray[firstIndex]; // @step:swap
                networkArray[firstIndex] = networkArray[secondIndex]; // @step:swap
                networkArray[secondIndex] = temporaryValue; // @step:swap
            }
        }
    }

    public static int[] pairwiseSortingNetwork(int[] inputArray) { // @step:initialize
        networkArray = Arrays.copyOf(inputArray, inputArray.length); // @step:initialize
        networkLength = networkArray.length; // @step:initialize

        if (networkLength <= 1) {
            return networkArray; // @step:complete
        }

        for (int outerStride = 1; outerStride < networkLength; outerStride *= 2) { // @step:compare
            for (int innerStride = outerStride; innerStride >= 1; innerStride /= 2) { // @step:compare
                for (int baseIndex = innerStride % outerStride; baseIndex + innerStride < networkLength; baseIndex += innerStride * 2) { // @step:compare
                    for (int pairIndex = 0; pairIndex < innerStride && baseIndex + pairIndex + innerStride < networkLength; pairIndex++) { // @step:compare
                        compareAndSwap(baseIndex + pairIndex, baseIndex + pairIndex + innerStride); // @step:compare
                    }
                }
            }
        }

        // @step:mark-sorted

        return networkArray; // @step:complete
    }
}
