import java.util.HashMap;
import java.util.Map;

public class HashSearch {
    public static int hashSearch(int[] array, int targetValue) { // @step:initialize
        Map<Integer, Integer> hashMap = new HashMap<>(); // @step:initialize

        // Build phase: insert every element into the hash map
        for (int elementIndex = 0; elementIndex < array.length; elementIndex++) { // @step:visit
            hashMap.put(array[elementIndex], elementIndex); // @step:visit
        }

        // Search phase: O(1) lookup
        if (hashMap.containsKey(targetValue)) { // @step:compare,found
            return hashMap.get(targetValue); // @step:found
        }

        return -1; // @step:complete
    }
}
