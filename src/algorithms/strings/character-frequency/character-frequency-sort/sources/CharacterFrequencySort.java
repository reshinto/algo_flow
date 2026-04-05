// Character Frequency Sort
// Sorts a string by character frequency (descending) using bucket sort.
// Time: O(n) where n = length of text (bucket sort avoids O(n log n) comparison sort)
// Space: O(n) — frequency map and output string both scale with input size

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CharacterFrequencySort {

    public static String characterFrequencySort(String text) {
        if (text.isEmpty()) return ""; // @step:initialize

        Map<Character, Integer> frequencyMap = new HashMap<>(); // @step:initialize

        for (char charVal : text.toCharArray()) { // @step:update-frequency
            frequencyMap.put(charVal, frequencyMap.getOrDefault(charVal, 0) + 1); // @step:update-frequency
        }

        // Bucket sort: index = frequency, value = list of chars with that frequency
        int maxFrequency = text.length(); // @step:sort-by-frequency
        @SuppressWarnings("unchecked")
        List<Character>[] buckets = new ArrayList[maxFrequency + 1]; // @step:sort-by-frequency
        for (int bucketIdx = 0; bucketIdx <= maxFrequency; bucketIdx++) { // @step:sort-by-frequency
            buckets[bucketIdx] = new ArrayList<>(); // @step:sort-by-frequency
        }

        for (Map.Entry<Character, Integer> entry : frequencyMap.entrySet()) { // @step:sort-by-frequency
            buckets[entry.getValue()].add(entry.getKey()); // @step:sort-by-frequency
        }

        StringBuilder result = new StringBuilder(); // @step:build-output
        for (int freqIdx = maxFrequency; freqIdx >= 1; freqIdx--) { // @step:build-output
            for (char charVal : buckets[freqIdx]) { // @step:add-to-result
                result.append(String.valueOf(charVal).repeat(freqIdx)); // @step:add-to-result
            }
        }

        return result.toString(); // @step:complete
    }
}
