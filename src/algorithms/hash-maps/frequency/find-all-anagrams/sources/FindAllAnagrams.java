// Find All Anagrams — slide a window over text and record start indices where window is an anagram of pattern
import java.util.*;

public class FindAllAnagrams {
    public static List<Integer> findAllAnagrams(String text, String pattern) {
        Map<Character, Integer> patternFreq = new HashMap<>(); // @step:initialize
        for (int patternIdx = 0; patternIdx < pattern.length(); patternIdx++) {
            char patternChar = pattern.charAt(patternIdx);
            patternFreq.put(patternChar, patternFreq.getOrDefault(patternChar, 0) + 1); // @step:increment-count
        }
        Map<Character, Integer> windowFreq = new HashMap<>();
        int windowSize = pattern.length();
        List<Integer> result = new ArrayList<>();
        for (int rightIdx = 0; rightIdx < text.length(); rightIdx++) {
            // Expand window: add incoming character
            char incomingChar = text.charAt(rightIdx);
            windowFreq.put(incomingChar, windowFreq.getOrDefault(incomingChar, 0) + 1); // @step:expand-window
            // Shrink window: remove outgoing character once full window is established
            if (rightIdx >= windowSize) {
                char outgoingChar = text.charAt(rightIdx - windowSize);
                int outgoingCount = windowFreq.get(outgoingChar) - 1; // @step:shrink-window
                if (outgoingCount == 0) {
                    windowFreq.remove(outgoingChar); // @step:decrement-count
                } else {
                    windowFreq.put(outgoingChar, outgoingCount); // @step:decrement-count
                }
            }
            // Check if current window matches pattern frequency map
            if (rightIdx >= windowSize - 1 && windowFreq.equals(patternFreq)) {
                result.add(rightIdx - windowSize + 1); // @step:key-found
            }
        }
        return result; // @step:complete
    }
}
