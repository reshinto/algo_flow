// Contains Duplicate — determine if any value appears at least twice using a hash set
import java.util.HashSet;
import java.util.Set;

public class ContainsDuplicate {
    public static boolean containsDuplicate(int[] numbers) {
        Set<Integer> seen = new HashSet<>(); // @step:initialize
        for (int elementIndex = 0; elementIndex < numbers.length; elementIndex++) {
            int current = numbers[elementIndex];
            if (seen.contains(current)) { // @step:key-found
                return true; // @step:key-found
            }
            // Not seen yet — record it for future duplicate checks
            seen.add(current); // @step:insert-key
        }
        return false; // @step:complete
    }
}
