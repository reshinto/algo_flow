public class CocktailShakerSort {
    public static int[] cocktailShakerSort(int[] inputArray) { // @step:initialize
        int[] sortedArray = inputArray.clone(); // @step:initialize
        int arrayLength = sortedArray.length; // @step:initialize
        int leftBound = 0; // @step:initialize
        int rightBound = arrayLength - 1; // @step:initialize
        boolean swapped = true; // @step:initialize

        while (swapped) {
            swapped = false;

            // Forward pass: left to right — bubble largest unsorted element to rightBound
            // @step:forward-pass
            for (int forwardIndex = leftBound; forwardIndex < rightBound; forwardIndex++) { // @step:compare
                if (sortedArray[forwardIndex] > sortedArray[forwardIndex + 1]) { // @step:compare
                    // @step:swap
                    int temporaryValue = sortedArray[forwardIndex]; // @step:swap
                    sortedArray[forwardIndex] = sortedArray[forwardIndex + 1]; // @step:swap
                    sortedArray[forwardIndex + 1] = temporaryValue; // @step:swap
                    swapped = true; // @step:swap
                }
            }

            // The rightmost unsorted element is now sorted
            // @step:mark-sorted
            rightBound--;

            if (!swapped) break;
            swapped = false;

            // Backward pass: right to left — bubble smallest unsorted element to leftBound
            // @step:backward-pass
            for (int backwardIndex = rightBound; backwardIndex > leftBound; backwardIndex--) { // @step:compare
                if (sortedArray[backwardIndex - 1] > sortedArray[backwardIndex]) { // @step:compare
                    // @step:swap
                    int temporaryValue = sortedArray[backwardIndex]; // @step:swap
                    sortedArray[backwardIndex] = sortedArray[backwardIndex - 1]; // @step:swap
                    sortedArray[backwardIndex - 1] = temporaryValue; // @step:swap
                    swapped = true; // @step:swap
                }
            }

            // The leftmost unsorted element is now sorted
            // @step:mark-sorted
            leftBound++;
        }

        return sortedArray; // @step:complete
    }
}
