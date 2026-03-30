// Contiguous Array — find the longest subarray with equal number of 0s and 1s
import java.util.HashMap;

public class ContiguousArray {
    public static int contiguousArray(int[] numbers) {
        HashMap<Integer, Integer> prefixSumMap = new HashMap<>(); // @step:initialize
        prefixSumMap.put(0, -1);
        int runningSum = 0;
        int maxLength = 0;
        for (int elementIndex = 0; elementIndex < numbers.length; elementIndex++) {
            runningSum += numbers[elementIndex] == 0 ? -1 : 1; // @step:check-prefix
            if (prefixSumMap.containsKey(runningSum)) {
                int subarrayLength = elementIndex - prefixSumMap.get(runningSum); // @step:prefix-found
                maxLength = Math.max(maxLength, subarrayLength);
            } else {
                prefixSumMap.put(runningSum, elementIndex); // @step:insert-key
            }
        }
        return maxLength; // @step:complete
    }
}
