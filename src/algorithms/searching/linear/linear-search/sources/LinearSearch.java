public class LinearSearch {
    public static int linearSearch(int[] array, int targetValue) { // @step:initialize
        for (int currentIndex = 0; currentIndex < array.length; currentIndex++) { // @step:visit
            int currentValue = array[currentIndex]; // @step:compare
            if (currentValue == targetValue) { // @step:compare,found
                return currentIndex; // @step:found
            }
        }

        return -1; // @step:complete
    }
}
