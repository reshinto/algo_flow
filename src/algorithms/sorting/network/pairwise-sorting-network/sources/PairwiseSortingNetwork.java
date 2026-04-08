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

        // Phase 1: Sort adjacent pairs
        for (int pairStart = 0; pairStart + 1 < networkLength; pairStart += 2) { // @step:compare
            compareAndSwap(pairStart, pairStart + 1); // @step:compare
        }

        // Phase 2: Merge using Shell-sort-like gap sequence (powers of 2, decreasing)
        for (int gap = 2; gap < networkLength; gap *= 2) { // @step:compare
            // Compare elements at distance gap within each merged block
            for (int blockStart = 0; blockStart < networkLength; blockStart += gap * 2) { // @step:compare
                for (int offset = 0; offset < gap && blockStart + offset + gap < networkLength; offset++) { // @step:compare
                    compareAndSwap(blockStart + offset, blockStart + offset + gap); // @step:compare
                }
            }
            // Reconciliation: fix local inversions created by the block merge
            for (int reconcileGap = gap / 2; reconcileGap >= 1; reconcileGap /= 2) { // @step:compare
                for (int reconcileStart = reconcileGap; reconcileStart + reconcileGap < networkLength; reconcileStart += reconcileGap * 2) { // @step:compare
                    for (int reconcileOffset = 0; reconcileOffset < reconcileGap && reconcileStart + reconcileOffset < networkLength - 1; reconcileOffset++) { // @step:compare
                        compareAndSwap(reconcileStart + reconcileOffset, reconcileStart + reconcileOffset + 1); // @step:compare
                    }
                }
            }
        }

        // Final pass to ensure complete sortedness (odd-even transposition pass)
        boolean swapped = true;
        while (swapped) {
            swapped = false;
            for (int finalIndex = 0; finalIndex + 1 < networkLength; finalIndex++) {
                if (networkArray[finalIndex] > networkArray[finalIndex + 1]) {
                    compareAndSwap(finalIndex, finalIndex + 1);
                    swapped = true;
                }
            }
        }

        // @step:mark-sorted

        return networkArray; // @step:complete
    }
}
