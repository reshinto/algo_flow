// Longest Substring Without Repeating Characters — sliding window with hash map
import java.util.HashMap;

public class LongestSubstringWithoutRepeating {
    public static int longestSubstringWithoutRepeating(String text) {
        HashMap<Character, Integer> charIndexMap = new HashMap<>(); // @step:initialize
        int windowStart = 0;
        int maxLength = 0;
        for (int windowEnd = 0; windowEnd < text.length(); windowEnd++) {
            char currentChar = text.charAt(windowEnd);
            Integer previousIndex = charIndexMap.get(currentChar); // @step:check-duplicate
            if (previousIndex != null && previousIndex >= windowStart) {
                windowStart = previousIndex + 1; // @step:shrink-window
            }
            charIndexMap.put(currentChar, windowEnd); // @step:insert-key
            int currentLength = windowEnd - windowStart + 1; // @step:expand-window
            maxLength = Math.max(maxLength, currentLength);
        }
        return maxLength; // @step:complete
    }
}
