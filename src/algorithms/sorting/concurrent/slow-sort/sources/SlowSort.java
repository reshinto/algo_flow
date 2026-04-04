import java.util.Arrays;

public class SlowSort {
    private static int[] workingArray;

    private static void slowSortRange(int startIndex, int endIndex) {
        if (startIndex >= endIndex) return;

        int midIndex = (startIndex + endIndex) / 2;

        slowSortRange(startIndex, midIndex); // Sort first half
        slowSortRange(midIndex + 1, endIndex); // Sort second half

        // Find the maximum of both halves (now at their respective ends)
        // @step:compare
        if (workingArray[midIndex] > workingArray[endIndex]) {
            // @step:swap
            int temporaryValue = workingArray[midIndex]; // @step:swap
            workingArray[midIndex] = workingArray[endIndex]; // @step:swap
            workingArray[endIndex] = temporaryValue; // @step:swap
        }

        // The maximum is now at endIndex — recursively sort the rest
        slowSortRange(startIndex, endIndex - 1); // @step:mark-sorted
    }

    public static int[] slowSort(int[] inputArray) { // @step:initialize
        workingArray = Arrays.copyOf(inputArray, inputArray.length); // @step:initialize

        slowSortRange(0, workingArray.length - 1);

        return workingArray; // @step:complete
    }
}
