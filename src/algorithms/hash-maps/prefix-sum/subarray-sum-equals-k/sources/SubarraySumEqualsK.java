// Subarray Sum Equals K — count subarrays whose elements sum to the target using prefix sums and a hash map
import java.util.HashMap;
import java.util.Map;

public class SubarraySumEqualsK {
    public static int subarraySumEqualsK(int[] numbers, int target) {
        Map<Integer, Integer> prefixCounts = new HashMap<>(); // @step:initialize
        prefixCounts.put(0, 1); // @step:initialize
        int currentSum = 0;
        int totalCount = 0;
        for (int elementIndex = 0; elementIndex < numbers.length; elementIndex++) {
            currentSum += numbers[elementIndex]; // @step:check-prefix
            int needed = currentSum - target; // @step:check-prefix
            if (prefixCounts.containsKey(needed)) { // @step:prefix-found
                totalCount += prefixCounts.get(needed); // @step:prefix-found
            }
            // Store the running prefix sum count for future lookups
            prefixCounts.put(currentSum, prefixCounts.getOrDefault(currentSum, 0) + 1); // @step:increment-count
        }
        return totalCount; // @step:complete
    }
}
