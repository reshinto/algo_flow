public class CombSort {
    public static int[] combSort(int[] inputArray) { // @step:initialize
        int[] sortedArray = inputArray.clone(); // @step:initialize
        int arrayLength = sortedArray.length; // @step:initialize
        final double SHRINK_FACTOR = 1.3; // @step:initialize
        int gap = arrayLength; // @step:initialize
        boolean sorted = false; // @step:initialize

        while (!sorted) {
            // Shrink the gap by the shrink factor
            // @step:gap-update
            gap = (int) Math.floor(gap / SHRINK_FACTOR); // @step:gap-update
            if (gap <= 1) {
                gap = 1;
                sorted = true; // assume sorted until a swap proves otherwise
            }

            // Perform a pass with the current gap
            for (int startIndex = 0; startIndex + gap < arrayLength; startIndex++) { // @step:compare
                int compareIndex = startIndex + gap;
                if (sortedArray[startIndex] > sortedArray[compareIndex]) { // @step:compare
                    // @step:swap
                    int temporaryValue = sortedArray[startIndex]; // @step:swap
                    sortedArray[startIndex] = sortedArray[compareIndex]; // @step:swap
                    sortedArray[compareIndex] = temporaryValue; // @step:swap
                    sorted = false; // a swap occurred — need another pass
                }
            }
        }

        // All elements are now in their sorted positions
        // @step:mark-sorted

        return sortedArray; // @step:complete
    }
}
