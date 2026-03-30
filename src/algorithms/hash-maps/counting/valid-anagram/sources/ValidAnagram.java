// Valid Anagram — determine if two strings are anagrams using character frequency counts
import java.util.HashMap;
import java.util.Map;

public class ValidAnagram {
    public static boolean validAnagram(String textA, String textB) {
        if (textA.length() != textB.length()) return false; // @step:initialize
        Map<Character, Integer> charCounts = new HashMap<>(); // @step:initialize
        for (int charIndex = 0; charIndex < textA.length(); charIndex++) {
            char currentChar = textA.charAt(charIndex); // @step:increment-count
            charCounts.put(currentChar, charCounts.getOrDefault(currentChar, 0) + 1); // @step:increment-count
        }
        for (int charIndex = 0; charIndex < textB.length(); charIndex++) {
            char currentChar = textB.charAt(charIndex); // @step:decrement-count
            int updatedCount = charCounts.getOrDefault(currentChar, 0) - 1; // @step:decrement-count
            if (updatedCount < 0) return false; // @step:complete
            charCounts.put(currentChar, updatedCount); // @step:decrement-count
        }
        return true; // @step:complete
    }
}
