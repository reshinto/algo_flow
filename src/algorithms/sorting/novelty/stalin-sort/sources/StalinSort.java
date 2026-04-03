import java.util.ArrayList;
import java.util.List;

public class StalinSort {
    public static int[] stalinSort(int[] inputArray) { // @step:initialize
        int arrayLength = inputArray.length; // @step:initialize

        if (arrayLength == 0) {
            return new int[0]; // @step:complete
        }

        List<Integer> survivingElements = new ArrayList<>(); // @step:initialize
        survivingElements.add(inputArray[0]); // @step:initialize — first element always survives
        int currentMaximum = inputArray[0]; // @step:initialize

        for (int scanIndex = 1; scanIndex < arrayLength; scanIndex++) { // @step:compare
            int candidateValue = inputArray[scanIndex]; // @step:compare

            if (candidateValue >= currentMaximum) { // @step:compare
                // Element is in order — keep it
                currentMaximum = candidateValue; // @step:compare
                survivingElements.add(candidateValue); // @step:compare — keep
            }
            // Otherwise the element is eliminated (out of order)
            // @step:compare — eliminate
        }

        return survivingElements.stream().mapToInt(Integer::intValue).toArray(); // @step:complete
    }
}
