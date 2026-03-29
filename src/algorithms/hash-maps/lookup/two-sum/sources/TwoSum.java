// Two Sum — find two indices whose values add up to the target using a hash map
import java.util.HashMap;
import java.util.Map;

public class TwoSum {
    public static int[] twoSum(int[] numbers, int target) {
        Map<Integer, Integer> map = new HashMap<>(); // @step:initialize
        for (int idx = 0; idx < numbers.length; idx++) {
            int complement = target - numbers[idx]; // @step:lookup-key
            if (map.containsKey(complement)) { // @step:key-found
                return new int[]{map.get(complement), idx}; // @step:key-found
            }
            // Complement not found — store current number for future lookups
            map.put(numbers[idx], idx); // @step:insert-key
        }
        return new int[]{-1, -1}; // @step:complete
    }
}
