import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class SpaghettiSort {
    public static int[] spaghettiSort(int[] inputArray) { // @step:initialize
        int arrayLength = inputArray.length; // @step:initialize

        List<Integer> remainingStrands = new ArrayList<>(); // @step:initialize
        for (int value : inputArray) { // @step:initialize
            remainingStrands.add(value); // @step:initialize
        }

        List<Integer> sortedResult = new ArrayList<>(); // @step:initialize

        // Repeatedly find and remove the tallest strand (maximum element)
        for (int extractionPass = 0; extractionPass < arrayLength; extractionPass++) { // @step:find-tallest
            int tallestIndex = 0; // @step:find-tallest
            int tallestValue = remainingStrands.get(0); // @step:find-tallest

            // Scan all remaining strands to find the tallest
            for (int scanIndex = 1; scanIndex < remainingStrands.size(); scanIndex++) { // @step:compare
                if (remainingStrands.get(scanIndex) > tallestValue) { // @step:compare
                    tallestIndex = scanIndex; // @step:compare
                    tallestValue = remainingStrands.get(scanIndex); // @step:compare
                }
            }

            // Remove the tallest strand and prepend to build ascending result
            remainingStrands.remove(tallestIndex); // @step:swap
            sortedResult.add(0, tallestValue); // @step:swap — prepend max

            // @step:mark-sorted
        }

        return sortedResult.stream().mapToInt(Integer::intValue).toArray(); // @step:complete
    }
}
