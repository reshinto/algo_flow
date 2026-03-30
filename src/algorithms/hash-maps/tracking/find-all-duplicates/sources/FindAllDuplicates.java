// Find All Duplicates — find all elements that appear twice using a hash set
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

public class FindAllDuplicates {
    public static List<Integer> findAllDuplicates(int[] numbers) {
        HashSet<Integer> seenSet = new HashSet<>(); // @step:initialize
        List<Integer> duplicates = new ArrayList<>();
        for (int elementIndex = 0; elementIndex < numbers.length; elementIndex++) {
            int currentNum = numbers[elementIndex];
            if (seenSet.contains(currentNum)) { // @step:check-duplicate
                duplicates.add(currentNum); // @step:key-found
            } else {
                seenSet.add(currentNum); // @step:insert-key
            }
        }
        return duplicates; // @step:complete
    }
}
