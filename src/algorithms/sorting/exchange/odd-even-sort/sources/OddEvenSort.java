public class OddEvenSort {
    public static int[] oddEvenSort(int[] inputArray) { // @step:initialize
        int[] sortedArray = inputArray.clone(); // @step:initialize
        int arrayLength = sortedArray.length; // @step:initialize
        boolean sorted = false; // @step:initialize

        while (!sorted) {
            sorted = true;

            // Odd phase: compare pairs at (1,2), (3,4), (5,6), ...
            // @step:odd-phase
            for (int oddIndex = 1; oddIndex < arrayLength - 1; oddIndex += 2) { // @step:compare
                if (sortedArray[oddIndex] > sortedArray[oddIndex + 1]) { // @step:compare
                    // @step:swap
                    int temporaryValue = sortedArray[oddIndex]; // @step:swap
                    sortedArray[oddIndex] = sortedArray[oddIndex + 1]; // @step:swap
                    sortedArray[oddIndex + 1] = temporaryValue; // @step:swap
                    sorted = false;
                }
            }

            // Even phase: compare pairs at (0,1), (2,3), (4,5), ...
            // @step:even-phase
            for (int evenIndex = 0; evenIndex < arrayLength - 1; evenIndex += 2) { // @step:compare
                if (sortedArray[evenIndex] > sortedArray[evenIndex + 1]) { // @step:compare
                    // @step:swap
                    int temporaryValue = sortedArray[evenIndex]; // @step:swap
                    sortedArray[evenIndex] = sortedArray[evenIndex + 1]; // @step:swap
                    sortedArray[evenIndex + 1] = temporaryValue; // @step:swap
                    sorted = false;
                }
            }
        }

        // All elements are in their sorted positions
        // @step:mark-sorted

        return sortedArray; // @step:complete
    }
}
