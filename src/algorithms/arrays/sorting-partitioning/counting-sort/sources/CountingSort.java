// Counting Sort — O(n+k) sort by counting frequencies and reconstructing sorted order
public class CountingSort {
    public static int[] countingSort(int[] inputArray) {
        if (inputArray.length == 0) { // @step:initialize
            return new int[0]; // @step:initialize
        }

        int maxValue = inputArray[0]; // @step:initialize
        for (int scanIndex = 0; scanIndex < inputArray.length; scanIndex++) {
            if (inputArray[scanIndex] > maxValue) maxValue = inputArray[scanIndex];
        }
        int[] countArray = new int[maxValue + 1]; // @step:initialize

        // Count the frequency of each element
        for (int scanIndex = 0; scanIndex < inputArray.length; scanIndex++) {
            countArray[inputArray[scanIndex]]++; // @step:visit
        }

        // Reconstruct the sorted array from count frequencies
        int[] sortedArray = new int[inputArray.length]; // @step:compare
        int outputIndex = 0;
        for (int currentValue = 0; currentValue <= maxValue; currentValue++) {
            for (int repeatIndex = 0; repeatIndex < countArray[currentValue]; repeatIndex++) {
                sortedArray[outputIndex++] = currentValue; // @step:compare
            }
        }

        return sortedArray; // @step:complete
    }
}
