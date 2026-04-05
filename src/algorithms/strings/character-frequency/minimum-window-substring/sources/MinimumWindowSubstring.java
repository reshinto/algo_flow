// Minimum Window Substring
// Finds the smallest contiguous window in `text` that contains all characters of `pattern`.
// Returns an empty string if no such window exists.
// Time: O(n + m) where n = text.length(), m = pattern.length()
// Space: O(σ) — frequency maps bounded by alphabet size

import java.util.HashMap;
import java.util.Map;

public class MinimumWindowSubstring {

    public static String minimumWindowSubstring(String text, String pattern) {
        if (pattern.isEmpty() || text.length() < pattern.length()) return ""; // @step:initialize

        Map<Character, Integer> targetFrequency = new HashMap<>(); // @step:initialize
        for (char charVal : pattern.toCharArray()) { // @step:initialize
            targetFrequency.put(charVal, targetFrequency.getOrDefault(charVal, 0) + 1); // @step:initialize
        }

        Map<Character, Integer> windowFrequency = new HashMap<>(); // @step:initialize
        int required = targetFrequency.size(); // @step:initialize
        int satisfied = 0; // @step:initialize
        int leftIndex = 0; // @step:initialize
        int bestStart = -1; // @step:initialize
        int bestLength = Integer.MAX_VALUE; // @step:initialize

        for (int rightIndex = 0; rightIndex < text.length(); rightIndex++) { // @step:expand-window
            char rightChar = text.charAt(rightIndex); // @step:expand-window
            windowFrequency.put(rightChar, windowFrequency.getOrDefault(rightChar, 0) + 1); // @step:update-frequency

            if (targetFrequency.containsKey(rightChar) && // @step:window-match
                    windowFrequency.get(rightChar).equals(targetFrequency.get(rightChar))) { // @step:window-match
                satisfied += 1; // @step:window-match
            }

            while (satisfied == required) { // @step:shrink-window
                int windowLength = rightIndex - leftIndex + 1; // @step:add-to-result
                if (windowLength < bestLength) { // @step:add-to-result
                    bestLength = windowLength; // @step:add-to-result
                    bestStart = leftIndex; // @step:add-to-result
                }

                char leftChar = text.charAt(leftIndex); // @step:shrink-window
                windowFrequency.put(leftChar, windowFrequency.get(leftChar) - 1); // @step:update-frequency

                if (targetFrequency.containsKey(leftChar) && // @step:shrink-window
                        windowFrequency.get(leftChar) < targetFrequency.get(leftChar)) { // @step:shrink-window
                    satisfied -= 1; // @step:shrink-window
                }

                leftIndex += 1; // @step:shrink-window
            }
        }

        return bestStart == -1 ? "" : text.substring(bestStart, bestStart + bestLength); // @step:complete
    }
}
