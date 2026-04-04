public class ExchangeSort {
    public static int[] exchangeSort(int[] inputArray) { // @step:initialize
        int[] sortedArray = inputArray.clone(); // @step:initialize
        int arrayLength = sortedArray.length; // @step:initialize

        for (int outerIndex = 0; outerIndex < arrayLength - 1; outerIndex++) {
            for (int innerIndex = outerIndex + 1; innerIndex < arrayLength; innerIndex++) {
                // @step:compare
                if (sortedArray[outerIndex] > sortedArray[innerIndex]) { // @step:compare
                    // @step:swap
                    int temporaryValue = sortedArray[outerIndex]; // @step:swap
                    sortedArray[outerIndex] = sortedArray[innerIndex]; // @step:swap
                    sortedArray[innerIndex] = temporaryValue; // @step:swap
                }
            }

            // The element at outerIndex is now in its final sorted position
            // @step:mark-sorted
        }

        return sortedArray; // @step:complete
    }
}
