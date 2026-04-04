import java.util.Arrays;

public class StoogeSort {
    private static int[] workingArray;

    private static void stoogeSortRange(int startIndex, int endIndex) {
        if (startIndex >= endIndex) return;

        // @step:compare
        if (workingArray[startIndex] > workingArray[endIndex]) {
            // @step:swap
            int temporaryValue = workingArray[startIndex]; // @step:swap
            workingArray[startIndex] = workingArray[endIndex]; // @step:swap
            workingArray[endIndex] = temporaryValue; // @step:swap
        }

        int rangeLength = endIndex - startIndex + 1;
        if (rangeLength > 2) {
            int thirdLength = rangeLength / 3;

            stoogeSortRange(startIndex, endIndex - thirdLength); // Sort first 2/3
            stoogeSortRange(startIndex + thirdLength, endIndex); // Sort last 2/3
            stoogeSortRange(startIndex, endIndex - thirdLength); // Sort first 2/3 again
        }
    }

    public static int[] stoogeSort(int[] inputArray) { // @step:initialize
        workingArray = Arrays.copyOf(inputArray, inputArray.length); // @step:initialize

        stoogeSortRange(0, workingArray.length - 1);

        // @step:mark-sorted

        return workingArray; // @step:complete
    }
}
