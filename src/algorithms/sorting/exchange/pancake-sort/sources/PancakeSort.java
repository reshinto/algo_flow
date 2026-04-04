public class PancakeSort {
    public static int[] pancakeSort(int[] inputArray) { // @step:initialize
        int[] sortedArray = inputArray.clone(); // @step:initialize
        int arrayLength = sortedArray.length; // @step:initialize

        for (int unsortedSize = arrayLength; unsortedSize > 1; unsortedSize--) {
            // Find the index of the maximum element in the unsorted portion
            // @step:find-max
            int maxIndex = 0; // @step:find-max
            for (int searchIndex = 1; searchIndex < unsortedSize; searchIndex++) { // @step:compare
                if (sortedArray[searchIndex] > sortedArray[maxIndex]) { // @step:compare
                    maxIndex = searchIndex; // @step:compare
                }
            }

            // If the max is not already at the end, flip it there
            if (maxIndex != unsortedSize - 1) {
                // Flip max to front if not already there
                if (maxIndex != 0) {
                    // @step:flip
                    int flipLeft = 0; // @step:flip
                    int flipRight = maxIndex; // @step:flip
                    while (flipLeft < flipRight) {
                        // @step:swap
                        int temporaryValue = sortedArray[flipLeft]; // @step:swap
                        sortedArray[flipLeft] = sortedArray[flipRight]; // @step:swap
                        sortedArray[flipRight] = temporaryValue; // @step:swap
                        flipLeft++;
                        flipRight--;
                    }
                }

                // Flip front to end of unsorted portion
                // @step:flip
                int flipLeft = 0; // @step:flip
                int flipRight = unsortedSize - 1; // @step:flip
                while (flipLeft < flipRight) {
                    // @step:swap
                    int temporaryValue = sortedArray[flipLeft]; // @step:swap
                    sortedArray[flipLeft] = sortedArray[flipRight]; // @step:swap
                    sortedArray[flipRight] = temporaryValue; // @step:swap
                    flipLeft++;
                    flipRight--;
                }
            }

            // The element at unsortedSize - 1 is now in its sorted position
            // @step:mark-sorted
        }

        return sortedArray; // @step:complete
    }
}
