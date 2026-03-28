// Subarray Sum Equals K — O(n) via prefix sum + hash map
import java.util.HashMap;
import java.util.Map;

public class SubarraySumEqualsK {
    public static int subarraySumEqualsK(int[] inputArray, int target) {
        Map<Integer, Integer> prefixSumMap = new HashMap<>(); // @step:initialize
        prefixSumMap.put(0, 1); // @step:initialize
        int runningSum = 0; // @step:initialize
        int foundCount = 0; // @step:initialize

        for (int scanIndex = 0; scanIndex < inputArray.length; scanIndex++) {
            runningSum += inputArray[scanIndex]; // @step:visit

            int lookupKey = runningSum - target; // @step:compare

            if (prefixSumMap.containsKey(lookupKey)) { // @step:compare
                foundCount += prefixSumMap.get(lookupKey); // @step:compare
            }

            prefixSumMap.put(runningSum, prefixSumMap.getOrDefault(runningSum, 0) + 1); // @step:visit
        }

        return foundCount; // @step:complete
    }
}
