// Find All Duplicates — O(n) time, O(1) space via sign-negation index marking
import java.util.ArrayList;
import java.util.List;

public class FindAllDuplicates {
    public static List<Integer> findAllDuplicates(int[] inputArray) {
        int[] result = inputArray.clone(); // @step:initialize
        List<Integer> duplicates = new ArrayList<>(); // @step:initialize

        // Mark visited positions by negating the value at the mapped index
        for (int scanIndex = 0; scanIndex < result.length; scanIndex++) {
            int mappedIndex = Math.abs(result[scanIndex]) - 1; // @step:compare

            if (result[mappedIndex] < 0) {
                // Already negative means we visited this index before — duplicate found
                duplicates.add(Math.abs(result[scanIndex])); // @step:compare
            } else {
                result[mappedIndex] = -result[mappedIndex]; // @step:swap
            }
        }

        return duplicates; // @step:complete
    }
}
