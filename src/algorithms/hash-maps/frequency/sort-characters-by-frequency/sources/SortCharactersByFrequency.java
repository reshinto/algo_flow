// Sort Characters by Frequency — sort a string by character frequency using a frequency map + bucket sort
import java.util.*;

public class SortCharactersByFrequency {
    public static String sortCharactersByFrequency(String text) {
        Map<Character, Integer> freqMap = new HashMap<>(); // @step:initialize
        for (int charIndex = 0; charIndex < text.length(); charIndex++) {
            char currentChar = text.charAt(charIndex);
            freqMap.put(currentChar, freqMap.getOrDefault(currentChar, 0) + 1); // @step:increment-count
        }
        // Bucket sort: index = frequency, value = list of chars with that frequency
        @SuppressWarnings("unchecked")
        List<Character>[] buckets = new List[text.length() + 1];
        for (int bucketIdx = 0; bucketIdx < buckets.length; bucketIdx++) {
            buckets[bucketIdx] = new ArrayList<>();
        }
        for (Map.Entry<Character, Integer> entry : freqMap.entrySet()) {
            buckets[entry.getValue()].add(entry.getKey()); // @step:key-found
        }
        StringBuilder result = new StringBuilder();
        for (int bucketIdx = buckets.length - 1; bucketIdx >= 0; bucketIdx--) {
            for (char ch : buckets[bucketIdx]) {
                result.append(String.valueOf(ch).repeat(bucketIdx)); // @step:key-found
            }
        }
        return result.toString(); // @step:complete
    }
}
