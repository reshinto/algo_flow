// Number of Good Pairs — count pairs (i, j) where nums[i] === nums[j] and i < j
import java.util.HashMap;

public class NumberOfGoodPairs {
    public static int numberOfGoodPairs(int[] numbers) {
        HashMap<Integer, Integer> frequencyMap = new HashMap<>(); // @step:initialize
        int totalPairs = 0;
        for (int elementIndex = 0; elementIndex < numbers.length; elementIndex++) {
            int currentNum = numbers[elementIndex];
            int currentCount = frequencyMap.getOrDefault(currentNum, 0);
            totalPairs += currentCount; // @step:key-found
            frequencyMap.put(currentNum, currentCount + 1); // @step:increment-count
        }
        return totalPairs; // @step:complete
    }
}
