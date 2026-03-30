// Majority Element — find the element that appears more than n/2 times using a frequency map
import java.util.HashMap;
import java.util.Map;

public class MajorityElement {
    public static int majorityElement(int[] numbers) {
        Map<Integer, Integer> frequencyMap = new HashMap<>(); // @step:initialize
        int threshold = numbers.length / 2; // @step:initialize
        for (int elementIndex = 0; elementIndex < numbers.length; elementIndex++) {
            int currentNum = numbers[elementIndex]; // @step:increment-count
            int updatedCount = frequencyMap.getOrDefault(currentNum, 0) + 1; // @step:increment-count
            frequencyMap.put(currentNum, updatedCount); // @step:increment-count
            if (updatedCount > threshold) { // @step:key-found
                return currentNum; // @step:key-found
            }
        }
        return -1; // @step:complete
    }
}
