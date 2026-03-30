// N-Repeated Element — find the element repeated n times in an array of size 2n
import java.util.HashMap;

public class NRepeatedElement {
    public static int nRepeatedElement(int[] numbers) {
        HashMap<Integer, Integer> frequencyMap = new HashMap<>(); // @step:initialize
        int targetCount = numbers.length / 2;
        for (int elementIndex = 0; elementIndex < numbers.length; elementIndex++) {
            int currentNum = numbers[elementIndex];
            int updatedCount = frequencyMap.getOrDefault(currentNum, 0) + 1; // @step:increment-count
            frequencyMap.put(currentNum, updatedCount);
            if (updatedCount == targetCount) return currentNum; // @step:key-found
        }
        return -1; // @step:complete
    }
}
