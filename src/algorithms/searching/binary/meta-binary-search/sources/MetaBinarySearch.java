public class MetaBinarySearch {
    public static int metaBinarySearch(int[] sortedArray, int targetValue) { // @step:initialize
        int arrayLength = sortedArray.length; // @step:initialize
        if (arrayLength == 0) return -1; // @step:initialize

        int bitCount = (int) Math.floor(Math.log(arrayLength) / Math.log(2)); // @step:initialize
        int position = 0; // @step:initialize

        for (int bitIndex = bitCount; bitIndex >= 0; bitIndex--) { // @step:compare
            int newPosition = position | (1 << bitIndex); // @step:compare

            if (newPosition < arrayLength && sortedArray[newPosition] <= targetValue) { // @step:compare,eliminate
                position = newPosition; // @step:eliminate
            }
        }

        if (sortedArray[position] == targetValue) { // @step:compare,found
            return position; // @step:found
        }

        return -1; // @step:complete
    }
}
