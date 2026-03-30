// Contains Duplicate II — find if the same value appears within maxDistance index gap
import java.util.HashMap;
import java.util.Map;

public class ContainsDuplicateII {
    public static boolean containsDuplicateII(int[] numbers, int maxDistance) {
        Map<Integer, Integer> indexMap = new HashMap<>(); // @step:initialize
        for (int currentIndex = 0; currentIndex < numbers.length; currentIndex++) {
            int current = numbers[currentIndex];
            if (indexMap.containsKey(current)) { // @step:check-duplicate
                int storedIndex = indexMap.get(current);
                if (Math.abs(currentIndex - storedIndex) <= maxDistance) { // @step:key-found
                    return true; // @step:key-found
                }
                // Too far apart — update stored index to keep closest occurrence
                indexMap.put(current, currentIndex); // @step:update-value
            } else {
                // First time seeing this value — store its index
                indexMap.put(current, currentIndex); // @step:insert-key
            }
        }
        return false; // @step:complete
    }
}
