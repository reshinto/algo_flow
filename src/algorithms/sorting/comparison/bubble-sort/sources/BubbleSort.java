public class BubbleSort {
    public static int[] bubbleSort(int[] inputArray) { // @step:initialize
        int[] sortedArray = inputArray.clone(); // @step:initialize
        int arrayLength = sortedArray.length; // @step:initialize

        for (int outerIndex = 0; outerIndex < arrayLength - 1; outerIndex++) { // @step:outer-loop,mark-sorted
            boolean swappedThisPass = false; // @step:outer-loop

            // Each pass bubbles the next-largest element into position
            for (int innerIndex = 0; innerIndex < arrayLength - 1 - outerIndex; innerIndex++) { // @step:inner-loop
                if (sortedArray[innerIndex] > sortedArray[innerIndex + 1]) { // @step:compare
                    int temporaryValue = sortedArray[innerIndex]; // @step:swap
                    sortedArray[innerIndex] = sortedArray[innerIndex + 1]; // @step:swap
                    sortedArray[innerIndex + 1] = temporaryValue; // @step:swap
                    swappedThisPass = true; // @step:swap
                }
            }

            // No swaps means already sorted — exit early
            if (!swappedThisPass) break; // @step:early-exit
        }

        return sortedArray; // @step:complete
    }
}
