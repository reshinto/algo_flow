// Top K Frequent Elements — find the k most frequent elements using frequency map + bucket sort
import java.util.*;

public class TopKFrequentElements {
    public static int[] topKFrequentElements(int[] numbers, int topK) {
        Map<Integer, Integer> freqMap = new HashMap<>(); // @step:initialize
        for (int num : numbers) {
            freqMap.put(num, freqMap.getOrDefault(num, 0) + 1); // @step:increment-count
        }
        // Bucket sort: index = frequency, value = list of elements with that frequency
        @SuppressWarnings("unchecked")
        List<Integer>[] buckets = new List[numbers.length + 1];
        for (int bucketIdx = 0; bucketIdx < buckets.length; bucketIdx++) {
            buckets[bucketIdx] = new ArrayList<>();
        }
        for (Map.Entry<Integer, Integer> entry : freqMap.entrySet()) {
            buckets[entry.getValue()].add(entry.getKey()); // @step:key-found
        }
        int[] result = new int[topK];
        int resultIdx = 0;
        for (int bucketIdx = buckets.length - 1; bucketIdx >= 0 && resultIdx < topK; bucketIdx--) {
            for (int num : buckets[bucketIdx]) {
                result[resultIdx++] = num; // @step:key-found
                if (resultIdx == topK) break;
            }
        }
        return result; // @step:complete
    }
}
