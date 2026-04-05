// First Non-Repeating Character
// Returns the index of the first character that appears exactly once, or -1 if none.
// Time: O(n) — two passes over the string (bounded by alphabet size)
// Space: O(1) — frequency map bounded by alphabet size (26 letters)

import java.util.HashMap;
import java.util.Map;

public class FirstNonRepeatingCharacter {

    public static int firstNonRepeatingCharacter(String text) {
        Map<Character, Integer> frequencyMap = new HashMap<>(); // @step:initialize

        for (char charVal : text.toCharArray()) { // @step:update-frequency
            frequencyMap.put(charVal, frequencyMap.getOrDefault(charVal, 0) + 1); // @step:update-frequency
        }

        for (int charIdx = 0; charIdx < text.length(); charIdx++) { // @step:compare
            char charVal = text.charAt(charIdx); // @step:compare
            if (frequencyMap.getOrDefault(charVal, 0) == 1) return charIdx; // @step:found
        }

        return -1; // @step:complete
    }
}
