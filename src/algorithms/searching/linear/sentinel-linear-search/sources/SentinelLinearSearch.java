public class SentinelLinearSearch {
    public static int sentinelLinearSearch(int[] array, int targetValue) { // @step:initialize
        int arrayLength = array.length; // @step:initialize
        if (arrayLength == 0) return -1; // @step:initialize

        int lastElement = array[arrayLength - 1]; // @step:initialize
        array[arrayLength - 1] = targetValue; // @step:initialize — place sentinel

        int currentIndex = 0; // @step:initialize

        while (array[currentIndex] != targetValue) { // @step:visit
            currentIndex++; // @step:visit
        }

        array[arrayLength - 1] = lastElement; // @step:compare — restore last element

        if (currentIndex < arrayLength - 1 || lastElement == targetValue) { // @step:compare,found
            return currentIndex; // @step:found
        }

        return -1; // @step:complete
    }
}
